"use client"

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Progress } from "@/components/ui/progress"
import { Badge } from "@/components/ui/badge"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Footprints, Target, Trophy, Calendar, Award, Activity, Building2 } from "lucide-react"
import { useState } from "react"
import { BadgeCard, BadgeIcon, individualBadges, teamBadges } from "./badge-system"

export function DashboardSection() {
  const [selectedDepartment, setSelectedDepartment] = useState("all")

  const userStats = {
    todaySteps: 8432,
    goalSteps: 10000,
    weeklyAverage: 9234,
    currentStreak: 5,
    totalChallenges: 12,
    completedChallenges: 8,
    department: "Marketing", // Hardcoded department instead of using profile
  }

  const departments = [
    { id: "all", name: "All Departments" },
    { id: "marketing", name: "Marketing" },
    { id: "engineering", name: "Engineering" },
    { id: "sales", name: "Sales" },
    { id: "hr", name: "Human Resources" },
    { id: "finance", name: "Finance" },
    { id: "operations", name: "Operations" },
  ]

  const departmentStats = [
    { name: "Marketing", rank: 1, avgSteps: 9845, members: 12, color: "text-yellow-500" },
    { name: "Engineering", rank: 2, avgSteps: 9234, members: 18, color: "text-blue-500" },
    { name: "Sales", rank: 3, avgSteps: 8967, members: 15, color: "text-green-500" },
    { name: "HR", rank: 4, avgSteps: 8543, members: 8, color: "text-purple-500" },
  ]

  const recentBadges = [
    ...individualBadges.filter((b) => b.earned).slice(-2),
    ...teamBadges.filter((b) => b.earned).slice(-2),
  ]
    .sort((a, b) => new Date(b.earnedDate || "").getTime() - new Date(a.earnedDate || "").getTime())
    .slice(0, 3)

  const recentAchievements = [
    {
      title: "Department Champion",
      description: "Marketing team reached #1 this week",
      date: "2 days ago",
      department: "Marketing",
      badge: teamBadges.find((b) => b.id === "department-champion"),
    },
    {
      title: "Step Master",
      description: "Reached 10K steps for 5 days straight",
      date: "2 days ago",
      department: "Personal",
      badge: individualBadges.find((b) => b.id === "streak-warrior"),
    },
    {
      title: "Inter-Department Challenge",
      description: "Beat Engineering in weekly challenge",
      date: "1 week ago",
      department: "Marketing",
      badge: teamBadges.find((b) => b.id === "challenge-winner"),
    },
  ]

  return (
    <div className="space-y-6">
      <div className="text-center space-y-2">
        <h1 className="text-3xl font-bold text-foreground">Welcome to your Wellness Dashboard!</h1>
        <div className="flex items-center justify-center gap-2">
          <Building2 className="w-4 h-4 text-primary" />
          <p className="text-muted-foreground">
            {userStats.department} Department • Here's your wellness journey overview
          </p>
        </div>
      </div>

      {/* Department Filter */}
      <div className="flex justify-center">
        <Select value={selectedDepartment} onValueChange={setSelectedDepartment}>
          <SelectTrigger className="w-64 bg-card/50 border-border">
            <SelectValue placeholder="Select department view" />
          </SelectTrigger>
          <SelectContent>
            {departments.map((dept) => (
              <SelectItem key={dept.id} value={dept.id}>
                {dept.name}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        <Card className="bg-card/50 border-border">
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-muted-foreground">Today's Steps</p>
                <p className="text-2xl font-bold text-foreground">{userStats.todaySteps.toLocaleString()}</p>
              </div>
              <Footprints className="w-8 h-8 text-primary" />
            </div>
            <div className="mt-4">
              <Progress value={(userStats.todaySteps / userStats.goalSteps) * 100} className="h-2" />
              <p className="text-xs text-muted-foreground mt-2">
                {Math.round((userStats.todaySteps / userStats.goalSteps) * 100)}% of daily goal
              </p>
            </div>
          </CardContent>
        </Card>

        <Card className="bg-card/50 border-border">
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-muted-foreground">Dept. Ranking</p>
                <p className="text-2xl font-bold text-primary">#1</p>
              </div>
              <Building2 className="w-8 h-8 text-primary" />
            </div>
            <div className="mt-4">
              <Badge variant="secondary" className="text-xs bg-primary/10 text-primary">
                <Trophy className="w-3 h-3 mr-1" />
                {userStats.department} leads!
              </Badge>
            </div>
          </CardContent>
        </Card>

        <Card className="bg-card/50 border-border">
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-muted-foreground">Current Streak</p>
                <p className="text-2xl font-bold text-foreground">{userStats.currentStreak} days</p>
              </div>
              <Calendar className="w-8 h-8 text-accent" />
            </div>
            <div className="mt-4">
              <p className="text-xs text-muted-foreground">Keep it up!</p>
            </div>
          </CardContent>
        </Card>

        <Card className="bg-card/50 border-border">
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-muted-foreground">Team Challenges</p>
                <p className="text-2xl font-bold text-foreground">
                  {userStats.completedChallenges}/{userStats.totalChallenges}
                </p>
              </div>
              <Target className="w-8 h-8 text-accent" />
            </div>
            <div className="mt-4">
              <Progress value={(userStats.completedChallenges / userStats.totalChallenges) * 100} className="h-2" />
              <p className="text-xs text-muted-foreground mt-2">67% completed</p>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Recent Badges Section */}
      <Card className="bg-card/50 border-border">
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Award className="w-5 h-5 text-primary" />
            Recent Badges Earned
          </CardTitle>
          <CardDescription>Your latest achievements and milestones</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {recentBadges.map((badge) => (
              <BadgeCard key={badge.id} badge={badge} />
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Department Rankings & Recent Activity */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <Card className="bg-card/50 border-border">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Building2 className="w-5 h-5 text-primary" />
              Department Rankings
            </CardTitle>
            <CardDescription>This week's department leaderboard</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {departmentStats.map((dept, index) => (
                <div key={index} className="flex items-center justify-between p-3 rounded-lg bg-muted/30">
                  <div className="flex items-center gap-3">
                    <div
                      className={`w-8 h-8 rounded-full bg-muted flex items-center justify-center font-bold ${dept.color}`}
                    >
                      #{dept.rank}
                    </div>
                    <div>
                      <h4 className="font-semibold text-foreground">{dept.name}</h4>
                      <p className="text-sm text-muted-foreground">{dept.members} members</p>
                    </div>
                  </div>
                  <div className="text-right">
                    <p className="font-semibold text-foreground">{dept.avgSteps.toLocaleString()}</p>
                    <p className="text-xs text-muted-foreground">avg steps</p>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        <Card className="bg-card/50 border-border">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Award className="w-5 h-5 text-primary" />
              Recent Achievements
            </CardTitle>
            <CardDescription>Your latest wellness milestones</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {recentAchievements.map((achievement, index) => (
                <div key={index} className="flex items-start gap-3 p-3 rounded-lg bg-muted/30">
                  {achievement.badge ? (
                    <BadgeIcon badge={achievement.badge} size="md" />
                  ) : (
                    <Trophy className="w-5 h-5 text-accent mt-0.5" />
                  )}
                  <div className="flex-1">
                    <div className="flex items-center gap-2 mb-1">
                      <h4 className="font-semibold text-foreground">{achievement.title}</h4>
                      <Badge variant="outline" className="text-xs">
                        {achievement.department}
                      </Badge>
                      {achievement.badge && (
                        <Badge variant="secondary" className="text-xs">
                          {achievement.badge.tier}
                        </Badge>
                      )}
                    </div>
                    <p className="text-sm text-muted-foreground">{achievement.description}</p>
                    <p className="text-xs text-muted-foreground mt-1">{achievement.date}</p>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>

      <Card className="bg-card/50 border-border">
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Activity className="w-5 h-5 text-primary" />
            Quick Actions
          </CardTitle>
          <CardDescription>Get started with today's activities</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="p-4 rounded-lg bg-primary/10 border border-primary/20 cursor-pointer hover:bg-primary/15 transition-colors">
              <div className="flex items-center justify-between">
                <div>
                  <h4 className="font-semibold text-foreground">Join Team Challenge</h4>
                  <p className="text-sm text-muted-foreground">Marketing vs Engineering</p>
                </div>
                <Target className="w-6 h-6 text-primary" />
              </div>
            </div>

            <div className="p-4 rounded-lg bg-accent/10 border border-accent/20 cursor-pointer hover:bg-accent/15 transition-colors">
              <div className="flex items-center justify-between">
                <div>
                  <h4 className="font-semibold text-foreground">Department Leaderboard</h4>
                  <p className="text-sm text-muted-foreground">See team rankings</p>
                </div>
                <Building2 className="w-6 h-6 text-accent" />
              </div>
            </div>

            <div className="p-4 rounded-lg bg-muted/30 border border-border cursor-pointer hover:bg-muted/40 transition-colors">
              <div className="flex items-center justify-between">
                <div>
                  <h4 className="font-semibold text-foreground">Individual Stats</h4>
                  <p className="text-sm text-muted-foreground">View personal progress</p>
                </div>
                <Trophy className="w-6 h-6 text-primary" />
              </div>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
