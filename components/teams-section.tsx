"use client"

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Progress } from "@/components/ui/progress"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Crown } from "lucide-react"
import { BadgeIcon, teamBadges } from "./badge-system"

export function TeamsSection() {
  const departments = [
    {
      name: "Marketing",
      members: 12,
      avgSteps: 9845,
      rank: 1,
      weeklyGoal: 120000,
      currentSteps: 118140,
      color: "bg-yellow-500",
      textColor: "text-yellow-500",
      badges: ["team-player", "department-champion", "challenge-winner"],
      topPerformers: [
        { name: "Sarah Johnson", steps: 12450, avatar: "/professional-woman-diverse.png" },
        { name: "Mike Chen", steps: 11890, avatar: "/professional-man.png" },
        { name: "Lisa Rodriguez", steps: 11234, avatar: "/professional-woman-diverse.png" },
      ],
    },
    {
      name: "Engineering",
      members: 18,
      avgSteps: 9234,
      rank: 2,
      weeklyGoal: 180000,
      currentSteps: 166212,
      color: "bg-blue-500",
      textColor: "text-blue-500",
      badges: ["team-player", "challenge-winner"],
      topPerformers: [
        { name: "Alex Kumar", steps: 11567, avatar: "/professional-man.png" },
        { name: "Emma Wilson", steps: 10890, avatar: "/professional-woman-diverse.png" },
        { name: "David Park", steps: 10234, avatar: "/professional-man.png" },
      ],
    },
    {
      name: "Sales",
      members: 15,
      avgSteps: 8967,
      rank: 3,
      weeklyGoal: 150000,
      currentSteps: 134505,
      color: "bg-green-500",
      textColor: "text-green-500",
      badges: ["team-player"],
      topPerformers: [
        { name: "Rachel Green", steps: 10456, avatar: "/professional-woman-diverse.png" },
        { name: "Tom Anderson", steps: 9890, avatar: "/professional-man.png" },
        { name: "Maria Garcia", steps: 9234, avatar: "/professional-woman-diverse.png" },
      ],
    },
    {
      name: "Human Resources",
      members: 8,
      avgSteps: 8543,
      rank: 4,
      weeklyGoal: 80000,
      currentSteps: 68344,
      color: "bg-purple-500",
      textColor: "text-purple-500",
      badges: ["team-player"],
      topPerformers: [
        { name: "Jennifer Lee", steps: 9876, avatar: "/professional-woman-diverse.png" },
        { name: "Robert Kim", steps: 9234, avatar: "/professional-man.png" },
        { name: "Amanda Davis", steps: 8890, avatar: "/professional-woman-diverse.png" },
      ],
    },
  ]

  return (
    <div className="space-y-6">
      <div className="text-center space-y-2">
        <h1 className="text-3xl font-bold text-foreground">Department Teams</h1>
        <p className="text-muted-foreground">Track progress and compete across departments</p>
      </div>

      {/* Department Overview Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        {departments.map((dept, index) => (
          <Card key={index} className="bg-card/50 border-border relative overflow-hidden">
            {dept.rank === 1 && (
              <div className="absolute top-2 right-2">
                <Crown className="w-5 h-5 text-yellow-500" />
              </div>
            )}
            <CardContent className="p-6">
              <div className="flex items-center gap-3 mb-4">
                <div className={`w-3 h-3 rounded-full ${dept.color}`} />
                <h3 className="font-semibold text-foreground">{dept.name}</h3>
                <Badge variant="outline" className="text-xs">
                  #{dept.rank}
                </Badge>
              </div>

              <div className="space-y-3">
                <div className="flex items-center justify-between">
                  <span className="text-sm text-muted-foreground">Members</span>
                  <span className="font-semibold text-foreground">{dept.members}</span>
                </div>

                <div className="flex items-center justify-between">
                  <span className="text-sm text-muted-foreground">Avg Steps</span>
                  <span className="font-semibold text-foreground">{dept.avgSteps.toLocaleString()}</span>
                </div>

                <div className="space-y-2">
                  <div className="flex items-center justify-between">
                    <span className="text-sm text-muted-foreground">Weekly Goal</span>
                    <span className="text-xs text-muted-foreground">
                      {dept.currentSteps.toLocaleString()}/{dept.weeklyGoal.toLocaleString()}
                    </span>
                  </div>
                  <Progress value={(dept.currentSteps / dept.weeklyGoal) * 100} className="h-2" />
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Detailed Department Cards */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {departments.map((dept, index) => (
          <Card key={index} className="bg-card/50 border-border">
            <CardHeader>
              <CardTitle className="flex items-center gap-3">
                <div className={`w-4 h-4 rounded-full ${dept.color}`} />
                {dept.name} Department
                {dept.rank === 1 && <Crown className="w-5 h-5 text-yellow-500" />}
              </CardTitle>
              <CardDescription>
                {dept.members} members • Rank #{dept.rank} • {dept.avgSteps.toLocaleString()} avg steps
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div className="space-y-2">
                  <div className="flex items-center justify-between">
                    <span className="text-sm font-medium text-foreground">Weekly Progress</span>
                    <span className="text-sm text-muted-foreground">
                      {Math.round((dept.currentSteps / dept.weeklyGoal) * 100)}%
                    </span>
                  </div>
                  <Progress value={(dept.currentSteps / dept.weeklyGoal) * 100} className="h-3" />
                  <p className="text-xs text-muted-foreground">
                    {dept.currentSteps.toLocaleString()} of {dept.weeklyGoal.toLocaleString()} steps
                  </p>
                </div>

                {/* Team Badges Section */}
                <div>
                  <h4 className="text-sm font-medium text-foreground mb-3">Team Badges</h4>
                  <div className="flex flex-wrap gap-2">
                    {dept.badges.map((badgeId) => {
                      const badge = teamBadges.find((b) => b.id === badgeId)
                      return badge ? (
                        <div
                          key={badgeId}
                          className="flex items-center gap-1 px-2 py-1 rounded-full bg-muted/30 border"
                        >
                          <BadgeIcon badge={badge} size="sm" />
                          <span className="text-xs font-medium">{badge.name}</span>
                        </div>
                      ) : null
                    })}
                  </div>
                </div>

                <div>
                  <h4 className="text-sm font-medium text-foreground mb-3">Top Performers</h4>
                  <div className="space-y-2">
                    {dept.topPerformers.map((performer, pIndex) => (
                      <div key={pIndex} className="flex items-center gap-3 p-2 rounded-lg bg-muted/30">
                        <div className="flex items-center gap-2">
                          <span className={`text-sm font-bold ${dept.textColor}`}>#{pIndex + 1}</span>
                          <Avatar className="w-8 h-8">
                            <AvatarImage src={performer.avatar || "/placeholder.svg"} alt={performer.name} />
                            <AvatarFallback>
                              {performer.name
                                .split(" ")
                                .map((n) => n[0])
                                .join("")}
                            </AvatarFallback>
                          </Avatar>
                        </div>
                        <div className="flex-1">
                          <p className="text-sm font-medium text-foreground">{performer.name}</p>
                        </div>
                        <div className="text-right">
                          <p className="text-sm font-semibold text-foreground">{performer.steps.toLocaleString()}</p>
                          <p className="text-xs text-muted-foreground">steps</p>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  )
}
