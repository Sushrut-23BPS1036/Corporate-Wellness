"use client"

import type React from "react"

import { Badge } from "@/components/ui/badge"
import { Trophy, Medal, Award, Target, Users, Crown, Zap, Star, Calendar, Footprints } from "lucide-react"

export interface BadgeData {
  id: string
  name: string
  description: string
  type: "individual" | "team"
  tier: "bronze" | "silver" | "gold" | "platinum"
  icon: React.ReactNode
  earned: boolean
  earnedDate?: string
  progress?: number
  maxProgress?: number
}

export function BadgeIcon({ badge, size = "sm" }: { badge: BadgeData; size?: "sm" | "md" | "lg" }) {
  const sizeClasses = {
    sm: "w-4 h-4",
    md: "w-6 h-6",
    lg: "w-8 h-8",
  }

  const tierColors = {
    bronze: "text-orange-600",
    silver: "text-gray-400",
    gold: "text-yellow-500",
    platinum: "text-purple-400",
  }

  return (
    <div className={`${sizeClasses[size]} ${badge.earned ? tierColors[badge.tier] : "text-muted-foreground"}`}>
      {badge.icon}
    </div>
  )
}

export function BadgeCard({ badge }: { badge: BadgeData }) {
  const tierColors = {
    bronze: "border-orange-600/20 bg-orange-600/5",
    silver: "border-gray-400/20 bg-gray-400/5",
    gold: "border-yellow-500/20 bg-yellow-500/5",
    platinum: "border-purple-400/20 bg-purple-400/5",
  }

  const tierTextColors = {
    bronze: "text-orange-600",
    silver: "text-gray-400",
    gold: "text-yellow-500",
    platinum: "text-purple-400",
  }

  return (
    <div
      className={`p-4 rounded-lg border ${badge.earned ? tierColors[badge.tier] : "border-border bg-muted/20"} transition-all hover:scale-105`}
    >
      <div className="flex items-start gap-3">
        <div className={`p-2 rounded-full ${badge.earned ? "bg-background/50" : "bg-muted/50"}`}>
          <BadgeIcon badge={badge} size="md" />
        </div>
        <div className="flex-1 min-w-0">
          <div className="flex items-center gap-2 mb-1">
            <h4 className={`font-semibold text-sm ${badge.earned ? "text-foreground" : "text-muted-foreground"}`}>
              {badge.name}
            </h4>
            <Badge
              variant="outline"
              className={`text-xs ${badge.earned ? tierTextColors[badge.tier] : "text-muted-foreground"}`}
            >
              {badge.tier}
            </Badge>
            <Badge variant="secondary" className="text-xs">
              {badge.type}
            </Badge>
          </div>
          <p className="text-xs text-muted-foreground mb-2">{badge.description}</p>

          {badge.earned && badge.earnedDate && <p className="text-xs text-primary">Earned {badge.earnedDate}</p>}

          {!badge.earned && badge.progress !== undefined && badge.maxProgress && (
            <div className="space-y-1">
              <div className="flex justify-between text-xs">
                <span className="text-muted-foreground">Progress</span>
                <span className="text-muted-foreground">
                  {badge.progress}/{badge.maxProgress}
                </span>
              </div>
              <div className="w-full bg-muted rounded-full h-1.5">
                <div
                  className="bg-primary h-1.5 rounded-full transition-all"
                  style={{ width: `${(badge.progress / badge.maxProgress) * 100}%` }}
                />
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  )
}

// Predefined badge data
export const individualBadges: BadgeData[] = [
  {
    id: "first-steps",
    name: "First Steps",
    description: "Complete your first day of step tracking",
    type: "individual",
    tier: "bronze",
    icon: <Footprints />,
    earned: true,
    earnedDate: "2 weeks ago",
  },
  {
    id: "step-master",
    name: "Step Master",
    description: "Reach 10,000 steps in a single day",
    type: "individual",
    tier: "silver",
    icon: <Target />,
    earned: true,
    earnedDate: "1 week ago",
  },
  {
    id: "streak-warrior",
    name: "Streak Warrior",
    description: "Maintain a 7-day step goal streak",
    type: "individual",
    tier: "gold",
    icon: <Calendar />,
    earned: true,
    earnedDate: "3 days ago",
  },
  {
    id: "marathon-walker",
    name: "Marathon Walker",
    description: "Walk 26.2 miles in a single week",
    type: "individual",
    tier: "platinum",
    icon: <Medal />,
    earned: false,
    progress: 18.5,
    maxProgress: 26.2,
  },
  {
    id: "consistency-champion",
    name: "Consistency Champion",
    description: "Complete 30 days of step goals",
    type: "individual",
    tier: "gold",
    icon: <Star />,
    earned: false,
    progress: 12,
    maxProgress: 30,
  },
  {
    id: "overachiever",
    name: "Overachiever",
    description: "Exceed daily goal by 50% for 5 days",
    type: "individual",
    tier: "silver",
    icon: <Zap />,
    earned: false,
    progress: 2,
    maxProgress: 5,
  },
]

export const teamBadges: BadgeData[] = [
  {
    id: "team-player",
    name: "Team Player",
    description: "Join your first department challenge",
    type: "team",
    tier: "bronze",
    icon: <Users />,
    earned: true,
    earnedDate: "2 weeks ago",
  },
  {
    id: "department-champion",
    name: "Department Champion",
    description: "Help your department reach #1 ranking",
    type: "team",
    tier: "gold",
    icon: <Crown />,
    earned: true,
    earnedDate: "1 week ago",
  },
  {
    id: "challenge-winner",
    name: "Challenge Winner",
    description: "Win an inter-department challenge",
    type: "team",
    tier: "silver",
    icon: <Trophy />,
    earned: true,
    earnedDate: "5 days ago",
  },
  {
    id: "team-motivator",
    name: "Team Motivator",
    description: "Help 5 teammates reach their weekly goals",
    type: "team",
    tier: "silver",
    icon: <Award />,
    earned: false,
    progress: 3,
    maxProgress: 5,
  },
  {
    id: "department-unity",
    name: "Department Unity",
    description: "100% department participation in a challenge",
    type: "team",
    tier: "platinum",
    icon: <Users />,
    earned: false,
    progress: 10,
    maxProgress: 12,
  },
  {
    id: "cross-department",
    name: "Cross-Department Collaborator",
    description: "Complete challenges with 3 different departments",
    type: "team",
    tier: "gold",
    icon: <Star />,
    earned: false,
    progress: 1,
    maxProgress: 3,
  },
]
