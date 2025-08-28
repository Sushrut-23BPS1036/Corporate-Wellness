"use client"

import { useState } from "react"
import { Navigation } from "@/components/navigation"
import { DashboardSection } from "@/components/dashboard-section"
import { WellnessDashboard } from "@/components/wellness-dashboard"
import { ChallengesSection } from "@/components/challenges-section"
import { TeamsSection } from "@/components/teams-section"
import { BadgesSection } from "@/components/badges-section"
import { ProfileSection } from "@/components/profile-section"
import { DailyLogSection } from "@/components/daily-log-section"
import { HealthDataSection } from "@/components/health-data-section"
import { Sparkles, Heart } from "lucide-react"

export default function Home() {
  const [activeSection, setActiveSection] = useState("health-data")

  const renderSection = () => {
    switch (activeSection) {
      case "health-data":
        return <HealthDataSection />
      case "dashboard":
        return <DashboardSection />
      case "leaderboard":
        return <WellnessDashboard />
      case "challenges":
        return <ChallengesSection />
      case "teams":
        return <TeamsSection />
      case "badges":
        return <BadgesSection />
      case "dailylog":
        return <DailyLogSection />
      case "profile":
        return <ProfileSection />
      default:
        return <HealthDataSection />
    }
  }

  return (
    <div className="min-h-screen bg-background">
      <Navigation activeSection={activeSection} onSectionChange={setActiveSection} />

      <div className="border-b bg-gradient-to-r from-primary/5 via-accent/5 to-primary/5 backdrop-blur-sm">
        <div className="container mx-auto px-6 py-8">
          <div className="flex items-center justify-between">
            <div className="space-y-2">
              <div className="flex items-center gap-3">
                <div className="p-2 rounded-xl bg-primary/10 border border-primary/20">
                  <Heart className="w-6 h-6 text-primary" />
                </div>
                <h1 className="text-3xl font-bold bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent">
                  Android Health Data Sync
                </h1>
              </div>
              <p className="text-muted-foreground max-w-2xl text-balance">
                Connect and sync your health data from Android Health Connect. Transform your wellness journey with
                intelligent insights and personalized tracking.
              </p>
            </div>

            <div className="hidden md:flex items-center gap-2 px-4 py-2 rounded-full bg-accent/10 border border-accent/20">
              <Sparkles className="w-4 h-4 text-accent" />
              <span className="text-sm font-medium text-accent">Your wellness matters</span>
            </div>
          </div>
        </div>
      </div>

      <main className="container mx-auto p-6 animate-fade-in">{renderSection()}</main>
    </div>
  )
}
