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
import type { User } from "@supabase/supabase-js"

interface UserProfile {
  id: string
  full_name: string
  department: string
  email: string
  step_goal: number
}

interface DashboardContentProps {
  user: User
  profile: UserProfile | null
}

export function DashboardContent({ user, profile }: DashboardContentProps) {
  const [activeSection, setActiveSection] = useState("dashboard")

  const renderSection = () => {
    switch (activeSection) {
      case "dashboard":
        return <DashboardSection user={user} profile={profile} />
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
        return <ProfileSection user={user} profile={profile} />
      default:
        return <DashboardSection user={user} profile={profile} />
    }
  }

  return (
    <div className="min-h-screen bg-background">
      <Navigation activeSection={activeSection} onSectionChange={setActiveSection} user={user} profile={profile} />
      <main className="container mx-auto p-6">{renderSection()}</main>
    </div>
  )
}
