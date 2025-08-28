"use client"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Heart, Footprints, Clock, Smartphone, Database, Activity, Zap, Shield } from "lucide-react"

interface HealthData {
  steps: number
  heartRate: number
  lastSync: string
  isConnected: boolean
}

export function HealthDataSection() {
  const [healthData, setHealthData] = useState<HealthData>({
    steps: 0,
    heartRate: 0,
    lastSync: "Never",
    isConnected: false,
  })
  const [isLoading, setIsLoading] = useState(false)
  const [status, setStatus] = useState("Disconnected")

  const connectToHealthConnect = async () => {
    setIsLoading(true)
    setStatus("Connecting...")

    try {
      // Simulate Android Health Connect integration
      await new Promise((resolve) => setTimeout(resolve, 2000))

      const mockData = {
        steps: Math.floor(Math.random() * 10000) + 5000,
        heartRate: Math.floor(Math.random() * 40) + 60,
        lastSync: new Date().toLocaleString(),
        isConnected: true,
      }

      setHealthData(mockData)
      setStatus("Connected")
    } catch (error) {
      setStatus("Connection Failed")
      console.error("Health Connect error:", error)
    } finally {
      setIsLoading(false)
    }
  }

  const syncHealthData = async () => {
    if (!healthData.isConnected) return

    setIsLoading(true)
    setStatus("Syncing...")

    try {
      await new Promise((resolve) => setTimeout(resolve, 1500))

      const updatedData = {
        ...healthData,
        steps: Math.floor(Math.random() * 10000) + 5000,
        heartRate: Math.floor(Math.random() * 40) + 60,
        lastSync: new Date().toLocaleString(),
      }

      setHealthData(updatedData)
      setStatus("Sync Complete")

      setTimeout(() => setStatus("Connected"), 2000)
    } catch (error) {
      setStatus("Sync Failed")
      console.error("Sync error:", error)
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <div className="space-y-8 animate-slide-up">
      <Card className="card-enhanced border-primary/20 bg-gradient-to-br from-card via-card to-primary/5">
        <CardHeader className="pb-4">
          <div className="flex items-center gap-3">
            <div className="p-3 rounded-xl bg-primary/10 border border-primary/20">
              <Smartphone className="h-6 w-6 text-primary" />
            </div>
            <div>
              <CardTitle className="text-xl">Android Health Connect</CardTitle>
              <CardDescription className="text-base">
                Seamlessly connect to Android Health Connect and unlock your fitness insights
              </CardDescription>
            </div>
          </div>
        </CardHeader>
        <CardContent className="space-y-6">
          <div className="flex items-center justify-between p-4 rounded-xl bg-muted/30 border border-border">
            <div className="flex items-center gap-3">
              <div
                className={`w-4 h-4 rounded-full ${healthData.isConnected ? "bg-green-500 animate-pulse" : "bg-red-500"}`}
              />
              <span className="font-semibold text-lg">{status}</span>
            </div>
            <Badge
              variant={healthData.isConnected ? "default" : "secondary"}
              className={healthData.isConnected ? "bg-green-500/10 text-green-600 border-green-500/20" : ""}
            >
              {healthData.isConnected ? "Connected" : "Disconnected"}
            </Badge>
          </div>

          <div className="flex gap-3">
            {!healthData.isConnected ? (
              <Button
                onClick={connectToHealthConnect}
                disabled={isLoading}
                size="lg"
                className="bg-gradient-to-r from-primary to-accent hover:from-primary/90 hover:to-accent/90 text-primary-foreground font-semibold"
              >
                <Activity className="w-4 h-4 mr-2" />
                {isLoading ? "Connecting..." : "Connect to Health Connect"}
              </Button>
            ) : (
              <Button
                onClick={syncHealthData}
                disabled={isLoading}
                size="lg"
                className="bg-gradient-to-r from-accent to-primary hover:from-accent/90 hover:to-primary/90"
              >
                <Zap className="w-4 h-4 mr-2" />
                {isLoading ? "Syncing..." : "Sync Data"}
              </Button>
            )}
          </div>
        </CardContent>
      </Card>

      {healthData.isConnected && (
        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          <Card className="card-enhanced border-accent/20 bg-gradient-to-br from-card to-accent/5">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-3">
              <CardTitle className="text-sm font-semibold text-muted-foreground uppercase tracking-wide">
                Daily Steps
              </CardTitle>
              <div className="p-2 rounded-lg bg-accent/10">
                <Footprints className="h-5 w-5 text-accent" />
              </div>
            </CardHeader>
            <CardContent>
              <div className="text-3xl font-bold text-foreground mb-1">{healthData.steps.toLocaleString()}</div>
              <p className="text-sm text-muted-foreground">steps today</p>
              <div className="mt-3 h-2 bg-muted rounded-full overflow-hidden">
                <div
                  className="h-full bg-gradient-to-r from-accent to-primary transition-all duration-1000"
                  style={{ width: `${Math.min((healthData.steps / 10000) * 100, 100)}%` }}
                />
              </div>
            </CardContent>
          </Card>

          <Card className="card-enhanced border-primary/20 bg-gradient-to-br from-card to-primary/5">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-3">
              <CardTitle className="text-sm font-semibold text-muted-foreground uppercase tracking-wide">
                Heart Rate
              </CardTitle>
              <div className="p-2 rounded-lg bg-primary/10">
                <Heart className="h-5 w-5 text-primary animate-pulse" />
              </div>
            </CardHeader>
            <CardContent>
              <div className="text-3xl font-bold text-foreground mb-1">{healthData.heartRate}</div>
              <p className="text-sm text-muted-foreground">bpm average</p>
              <Badge variant="outline" className="mt-2 text-xs">
                {healthData.heartRate < 70 ? "Resting" : healthData.heartRate < 100 ? "Normal" : "Active"}
              </Badge>
            </CardContent>
          </Card>

          <Card className="card-enhanced border-border bg-gradient-to-br from-card to-muted/20">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-3">
              <CardTitle className="text-sm font-semibold text-muted-foreground uppercase tracking-wide">
                Last Sync
              </CardTitle>
              <div className="p-2 rounded-lg bg-muted/20">
                <Clock className="h-5 w-5 text-muted-foreground" />
              </div>
            </CardHeader>
            <CardContent>
              <div className="text-base font-semibold text-foreground mb-1">{healthData.lastSync}</div>
              <p className="text-sm text-muted-foreground">last updated</p>
            </CardContent>
          </Card>
        </div>
      )}

      <Card className="card-enhanced border-border bg-gradient-to-br from-card to-muted/10">
        <CardHeader>
          <div className="flex items-center gap-3">
            <div className="p-3 rounded-xl bg-muted/20 border border-border">
              <Database className="h-6 w-6 text-foreground" />
            </div>
            <div>
              <CardTitle className="text-xl">Secure Data Storage</CardTitle>
              <CardDescription className="text-base">
                Your health data is encrypted, protected, and synced securely to the cloud
              </CardDescription>
            </div>
          </div>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="flex items-center justify-between p-4 rounded-xl bg-muted/30 border border-border">
              <div className="flex items-center gap-3">
                <Shield className="w-5 h-5 text-green-500" />
                <span className="font-medium">Encryption</span>
              </div>
              <Badge variant="outline" className="bg-green-500/10 text-green-600 border-green-500/20">
                AES-256
              </Badge>
            </div>

            <div className="flex items-center justify-between p-4 rounded-xl bg-muted/30 border border-border">
              <div className="flex items-center gap-3">
                <Database className="w-5 h-5 text-primary" />
                <span className="font-medium">Storage</span>
              </div>
              <Badge variant="outline" className="bg-primary/10 text-primary border-primary/20">
                Supabase Cloud
              </Badge>
            </div>

            <div className="flex items-center justify-between p-4 rounded-xl bg-muted/30 border border-border">
              <div className="flex items-center gap-3">
                <Clock className="w-5 h-5 text-accent" />
                <span className="font-medium">Retention</span>
              </div>
              <Badge variant="outline" className="bg-accent/10 text-accent border-accent/20">
                365 Days
              </Badge>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
