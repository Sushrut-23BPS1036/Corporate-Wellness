"use client"

import type React from "react"
import { useState, useEffect } from "react"
import { View, Text, TouchableOpacity, StyleSheet, Alert, SafeAreaView } from "react-native"
import { createClient } from "@supabase/supabase-js"
import AppleHealthKit, { type HealthKitPermissions, type HealthInputOptions } from "react-native-health"

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL || "YOUR_SUPABASE_URL"
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY || "YOUR_SUPABASE_ANON_KEY"
const supabase = createClient(supabaseUrl, supabaseAnonKey)

// Health permissions configuration
const permissions: HealthKitPermissions = {
  permissions: {
    read: [AppleHealthKit.Constants.Permissions.Steps],
  },
}

interface AppState {
  status: "Not Connected" | "Connected. Ready to sync." | "Syncing..." | "Sync Complete"
  isPermissionGranted: boolean
}

const App: React.FC = () => {
  const [appState, setAppState] = useState<AppState>({
    status: "Not Connected",
    isPermissionGranted: false,
  })

  useEffect(() => {
    // Check if permissions are already granted when app loads
    checkHealthPermissions()
  }, [])

  /**
   * Check if health data permissions have already been granted
   */
  const checkHealthPermissions = (): void => {
    AppleHealthKit.isAvailable((error: string, available: boolean) => {
      if (error) {
        console.log("HealthKit not available:", error)
        return
      }

      if (available) {
        // Check if we already have permission to read steps
        AppleHealthKit.getAuthStatus(permissions, (error: string, authStatus: any) => {
          if (error) {
            console.log("Error checking auth status:", error)
            return
          }

          const hasStepsPermission = authStatus?.Steps === AppleHealthKit.Constants.Permissions.Read

          if (hasStepsPermission) {
            setAppState({
              status: "Connected. Ready to sync.",
              isPermissionGranted: true,
            })
          }
        })
      }
    })
  }

  /**
   * Request health data permissions and initialize HealthKit
   */
  const requestHealthPermissions = (): void => {
    AppleHealthKit.initHealthKit(permissions, (error: string) => {
      if (error) {
        console.log("Error initializing HealthKit:", error)
        Alert.alert("Error", "Failed to connect to health data. Please try again.")
        return
      }

      // Permissions granted successfully
      setAppState({
        status: "Connected. Ready to sync.",
        isPermissionGranted: true,
      })

      Alert.alert("Success", "Health data connected successfully!")
    })
  }

  /**
   * Get the total steps for the previous full day (midnight to 11:59 PM)
   */
  const getPreviousDaySteps = (): Promise<number> => {
    return new Promise((resolve, reject) => {
      const yesterday = new Date()
      yesterday.setDate(yesterday.getDate() - 1)
      yesterday.setHours(0, 0, 0, 0) // Start of previous day

      const endOfYesterday = new Date(yesterday)
      endOfYesterday.setHours(23, 59, 59, 999) // End of previous day

      const options: HealthInputOptions = {
        startDate: yesterday.toISOString(),
        endDate: endOfYesterday.toISOString(),
      }

      AppleHealthKit.getStepCount(options, (error: string, results: any) => {
        if (error) {
          console.log("Error fetching steps:", error)
          reject(error)
          return
        }

        // Sum up all step counts for the day
        const totalSteps = results?.value || 0
        resolve(totalSteps)
      })
    })
  }

  /**
   * Sync daily steps data to Supabase Edge Function
   */
  const syncDailySteps = async (): Promise<void> => {
    try {
      setAppState((prev) => ({ ...prev, status: "Syncing..." }))

      const {
        data: { user },
        error: authError,
      } = await supabase.auth.getUser()

      if (authError || !user) {
        Alert.alert("Authentication Error", "Please log in to sync your health data.")
        setAppState((prev) => ({ ...prev, status: "Connected. Ready to sync." }))
        return
      }

      // Get previous day's steps
      const stepCount = await getPreviousDaySteps()

      // Get the date for the previous day
      const yesterday = new Date()
      yesterday.setDate(yesterday.getDate() - 1)
      const date = yesterday.toISOString().split("T")[0] // Format: YYYY-MM-DD

      const payload = {
        date,
        stepCount,
      }

      console.log("Syncing steps data:", payload)

      const { data, error } = await supabase.functions.invoke("sync-health-data", {
        body: payload,
        headers: {
          Authorization: `Bearer ${(await supabase.auth.getSession()).data.session?.access_token}`,
        },
      })

      if (error) {
        console.error("Error calling Supabase function:", error)
        Alert.alert("Sync Error", "Failed to sync health data. Please try again.")
        setAppState((prev) => ({ ...prev, status: "Connected. Ready to sync." }))
        return
      }

      console.log("Sync successful:", data)
      setAppState((prev) => ({ ...prev, status: "Sync Complete" }))

      Alert.alert("Success", `Synced ${stepCount} steps for ${date}`)

      // Reset status after 3 seconds
      setTimeout(() => {
        setAppState((prev) => ({ ...prev, status: "Connected. Ready to sync." }))
      }, 3000)
    } catch (error) {
      console.error("Error in syncDailySteps:", error)
      Alert.alert("Error", "An unexpected error occurred during sync.")
      setAppState((prev) => ({ ...prev, status: "Connected. Ready to sync." }))
    }
  }

  /**
   * Handle button press - either request permissions or sync data
   */
  const handleButtonPress = (): void => {
    if (!appState.isPermissionGranted) {
      requestHealthPermissions()
    } else {
      syncDailySteps()
    }
  }

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.content}>
        <Text style={styles.title}>Wellness App Data Sync</Text>

        <Text style={styles.status}>Status: {appState.status}</Text>

        <TouchableOpacity style={styles.button} onPress={handleButtonPress} disabled={appState.status === "Syncing..."}>
          <Text style={styles.buttonText}>
            {appState.isPermissionGranted ? "Sync Daily Steps" : "Connect Health Data & Sync"}
          </Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#f5f5f5",
  },
  content: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    paddingHorizontal: 20,
  },
  title: {
    fontSize: 24,
    fontWeight: "bold",
    color: "#333",
    marginBottom: 40,
    textAlign: "center",
  },
  status: {
    fontSize: 16,
    color: "#666",
    marginBottom: 40,
    textAlign: "center",
  },
  button: {
    backgroundColor: "#007AFF",
    paddingHorizontal: 30,
    paddingVertical: 15,
    borderRadius: 8,
    minWidth: 250,
  },
  buttonText: {
    color: "white",
    fontSize: 16,
    fontWeight: "600",
    textAlign: "center",
  },
})

export default App
