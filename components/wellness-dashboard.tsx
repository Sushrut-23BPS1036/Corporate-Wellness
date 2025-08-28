"use client"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Progress } from "@/components/ui/progress"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Trophy, Target, Users, TrendingUp, Award, Footprints } from "lucide-react"

// Mock data for the prototype
const teamData = [
  {
    id: 1,
    name: "Sarah Chen",
    avatar: "/professional-woman-diverse.png",
    steps: 12847,
    goal: 10000,
    team: "Marketing",
    rank: 1,
  },
  {
    id: 2,
    name: "Mike Rodriguez",
    avatar: "/professional-man.png",
    steps: 11923,
    goal: 10000,
    team: "Engineering",
    rank: 2,
  },
  {
    id: 3,
    name: "Emily Johnson",
    avatar: "/professional-woman-diverse.png",
    steps: 10876,
    goal: 10000,
    team: "Design",
    rank: 3,
  },
  { id: 4, name: "David Kim", avatar: "/professional-man.png", steps: 9654, goal: 10000, team: "Sales", rank: 4 },
  { id: 5, name: "Lisa Wang", avatar: "/professional-woman-diverse.png", steps: 8932, goal: 10000, team: "HR", rank: 5 },
  {
    id: 6,
    name: "James Wilson",
    avatar: "/professional-man.png",
    steps: 8421,
    goal: 10000,
    team: "Finance",
    rank: 6,
  },
]

const teamStats = [
  { team: "Marketing", totalSteps: 45632, members: 8, avgSteps: 5704 },
  { team: "Engineering", totalSteps: 42156, members: 12, avgSteps: 3513 },
  { team: "Design", totalSteps: 38924, members: 6, avgSteps: 6487 },
  { team: "Sales", totalSteps: 35678, members: 10, avgSteps: 3568 },
]

export function WellnessDashboard() {
  const [activeTab, setActiveTab] = useState<"individual" | "teams">("individual")

  const getRankBadge = (rank: number) => {
    if (rank === 1)
      return (
        <Badge className="bg-accent text-accent-foreground">
          <Trophy className="w-3 h-3 mr-1" />
          1st
        </Badge>
      )
    if (rank === 2)
      return (
        <Badge variant="secondary">
          <Award className="w-3 h-3 mr-1" />
          2nd
        </Badge>
      )
    if (rank === 3)
      return (
        <Badge variant="outline">
          <Award className="w-3 h-3 mr-1" />
          3rd
        </Badge>
      )
    return <Badge variant="outline">{rank}th</Badge>
  }

  return (
    <div className="container mx-auto p-6 space-y-8">
      {/* Header */}
      <div className="text-center space-y-4">
        <div className="flex items-center justify-center gap-2 mb-4">
          <Footprints className="w-8 h-8 text-primary" />
          <h1 className="text-4xl font-bold text-foreground">WellnessHub</h1>
        </div>
        <p className="text-xl text-muted-foreground max-w-2xl mx-auto text-balance">
          Track your team's wellness journey and celebrate achievements together
        </p>
      </div>

      {/* Challenge Overview */}
      <Card className="bg-card border-border">
        <CardHeader className="text-center">
          <CardTitle className="text-2xl text-card-foreground">Current Challenge: 10K Steps Daily</CardTitle>
          <CardDescription className="text-lg">
            Join your colleagues in reaching 10,000 steps every day this week!
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="text-center space-y-2">
              <div className="text-3xl font-bold text-primary">156</div>
              <div className="text-sm text-muted-foreground">Total Participants</div>
            </div>
            <div className="text-center space-y-2">
              <div className="text-3xl font-bold text-accent">89%</div>
              <div className="text-sm text-muted-foreground">Goal Achievement Rate</div>
            </div>
            <div className="text-center space-y-2">
              <div className="text-3xl font-bold text-primary">1.2M</div>
              <div className="text-sm text-muted-foreground">Total Steps Today</div>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Tab Navigation */}
      <div className="flex justify-center space-x-4">
        <Button
          variant={activeTab === "individual" ? "default" : "outline"}
          onClick={() => setActiveTab("individual")}
          className="flex items-center gap-2"
        >
          <Target className="w-4 h-4" />
          Individual Leaderboard
        </Button>
        <Button
          variant={activeTab === "teams" ? "default" : "outline"}
          onClick={() => setActiveTab("teams")}
          className="flex items-center gap-2"
        >
          <Users className="w-4 h-4" />
          Team Rankings
        </Button>
      </div>

      {/* Individual Leaderboard */}
      {activeTab === "individual" && (
        <Card className="bg-card border-border">
          <CardHeader>
            <CardTitle className="flex items-center gap-2 text-card-foreground">
              <Trophy className="w-5 h-5 text-primary" />
              Individual Leaderboard
            </CardTitle>
            <CardDescription>Top performers in today's step challenge</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {teamData.map((member) => (
                <div
                  key={member.id}
                  className="flex items-center justify-between p-4 rounded-lg bg-muted/50 border border-border"
                >
                  <div className="flex items-center gap-4">
                    <div className="flex items-center gap-3">
                      {getRankBadge(member.rank)}
                      <Avatar className="w-10 h-10">
                        <AvatarImage src={member.avatar || "/placeholder.svg"} alt={member.name} />
                        <AvatarFallback>
                          {member.name
                            .split(" ")
                            .map((n) => n[0])
                            .join("")}
                        </AvatarFallback>
                      </Avatar>
                    </div>
                    <div>
                      <div className="font-semibold text-foreground">{member.name}</div>
                      <div className="text-sm text-muted-foreground">{member.team} Team</div>
                    </div>
                  </div>
                  <div className="text-right space-y-2">
                    <div className="flex items-center gap-2">
                      <Footprints className="w-4 h-4 text-primary" />
                      <span className="font-bold text-lg text-foreground">{member.steps.toLocaleString()}</span>
                      <span className="text-sm text-muted-foreground">steps</span>
                    </div>
                    <div className="w-32">
                      <Progress value={Math.min((member.steps / member.goal) * 100, 100)} className="h-2" />
                      <div className="text-xs text-muted-foreground mt-1">
                        {Math.round((member.steps / member.goal) * 100)}% of goal
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      )}

      {/* Team Rankings */}
      {activeTab === "teams" && (
        <Card className="bg-card border-border">
          <CardHeader>
            <CardTitle className="flex items-center gap-2 text-card-foreground">
              <Users className="w-5 h-5 text-primary" />
              Team Rankings
            </CardTitle>
            <CardDescription>Department performance in the wellness challenge</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {teamStats.map((team, index) => (
                <div
                  key={team.team}
                  className="flex items-center justify-between p-4 rounded-lg bg-muted/50 border border-border"
                >
                  <div className="flex items-center gap-4">
                    <div className="flex items-center gap-3">
                      {getRankBadge(index + 1)}
                      <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center">
                        <Users className="w-5 h-5 text-primary" />
                      </div>
                    </div>
                    <div>
                      <div className="font-semibold text-foreground">{team.team}</div>
                      <div className="text-sm text-muted-foreground">{team.members} members</div>
                    </div>
                  </div>
                  <div className="text-right space-y-1">
                    <div className="flex items-center gap-2">
                      <TrendingUp className="w-4 h-4 text-accent" />
                      <span className="font-bold text-lg text-foreground">{team.totalSteps.toLocaleString()}</span>
                      <span className="text-sm text-muted-foreground">total steps</span>
                    </div>
                    <div className="text-sm text-muted-foreground">
                      Avg: {team.avgSteps.toLocaleString()} steps/person
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      )}

      {/* Call to Action */}
      <Card className="bg-primary/5 border-primary/20">
        <CardContent className="text-center py-8">
          <h3 className="text-xl font-semibold text-foreground mb-2">Ready to Join the Challenge?</h3>
          <p className="text-muted-foreground mb-4">Connect your fitness tracker and start competing with your team!</p>
          <Button size="lg" className="bg-primary text-primary-foreground hover:bg-primary/90">
            <Footprints className="w-4 h-4 mr-2" />
            Connect Fitness Tracker
          </Button>
        </CardContent>
      </Card>
    </div>
  )
}
