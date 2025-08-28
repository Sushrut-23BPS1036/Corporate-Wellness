"use client"

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Progress } from "@/components/ui/progress"
import { Target, Clock, Users, Trophy, Calendar, Footprints, Heart, Zap } from "lucide-react"

export function ChallengesSection() {
  const activeChallenges = [
    {
      id: 1,
      title: "10K Steps Daily",
      description: "Walk 10,000 steps every day this week",
      type: "Individual",
      duration: "7 days",
      progress: 71,
      participants: 156,
      reward: "Wellness Badge + 50 points",
      icon: Footprints,
      color: "primary",
    },
    {
      id: 2,
      title: "Team Cardio Challenge",
      description: "Complete 30 minutes of cardio as a team",
      type: "Team",
      duration: "14 days",
      progress: 45,
      participants: 24,
      reward: "Team Trophy + 100 points each",
      icon: Heart,
      color: "accent",
    },
    {
      id: 3,
      title: "Morning Energy Boost",
      description: "Complete a morning workout before 9 AM",
      type: "Individual",
      duration: "5 days",
      progress: 80,
      participants: 89,
      reward: "Early Bird Badge + 30 points",
      icon: Zap,
      color: "primary",
    },
  ]

  const upcomingChallenges = [
    {
      title: "Hydration Hero",
      description: "Drink 8 glasses of water daily",
      startDate: "Next Monday",
      type: "Individual",
    },
    {
      title: "Stair Climbing Championship",
      description: "Climb the most stairs in your building",
      startDate: "Next Week",
      type: "Team",
    },
  ]

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="text-center space-y-2">
        <h1 className="text-3xl font-bold text-foreground">Wellness Challenges</h1>
        <p className="text-muted-foreground">Join challenges and compete with your colleagues</p>
      </div>

      {/* Active Challenges */}
      <div>
        <h2 className="text-xl font-semibold text-foreground mb-4 flex items-center gap-2">
          <Target className="w-5 h-5 text-primary" />
          Active Challenges
        </h2>
        <div className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-4">
          {activeChallenges.map((challenge) => {
            const Icon = challenge.icon
            return (
              <Card key={challenge.id} className="bg-card/50 border-border hover:bg-card/70 transition-colors">
                <CardHeader>
                  <div className="flex items-start justify-between">
                    <div className="flex items-center gap-2">
                      <Icon className={`w-6 h-6 text-${challenge.color}`} />
                      <div>
                        <CardTitle className="text-lg">{challenge.title}</CardTitle>
                        <Badge variant={challenge.type === "Team" ? "default" : "secondary"} className="mt-1">
                          {challenge.type}
                        </Badge>
                      </div>
                    </div>
                  </div>
                  <CardDescription>{challenge.description}</CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="space-y-2">
                    <div className="flex justify-between text-sm">
                      <span className="text-muted-foreground">Progress</span>
                      <span className="text-foreground font-medium">{challenge.progress}%</span>
                    </div>
                    <Progress value={challenge.progress} className="h-2" />
                  </div>

                  <div className="flex items-center justify-between text-sm">
                    <div className="flex items-center gap-1 text-muted-foreground">
                      <Clock className="w-4 h-4" />
                      {challenge.duration}
                    </div>
                    <div className="flex items-center gap-1 text-muted-foreground">
                      <Users className="w-4 h-4" />
                      {challenge.participants} joined
                    </div>
                  </div>

                  <div className="p-3 rounded-lg bg-muted/30 border border-border">
                    <div className="flex items-center gap-2 mb-1">
                      <Trophy className="w-4 h-4 text-accent" />
                      <span className="text-sm font-medium text-foreground">Reward</span>
                    </div>
                    <p className="text-sm text-muted-foreground">{challenge.reward}</p>
                  </div>

                  <Button className="w-full" variant={challenge.progress > 0 ? "outline" : "default"}>
                    {challenge.progress > 0 ? "Continue Challenge" : "Join Challenge"}
                  </Button>
                </CardContent>
              </Card>
            )
          })}
        </div>
      </div>

      {/* Upcoming Challenges */}
      <div>
        <h2 className="text-xl font-semibold text-foreground mb-4 flex items-center gap-2">
          <Calendar className="w-5 h-5 text-accent" />
          Upcoming Challenges
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {upcomingChallenges.map((challenge, index) => (
            <Card key={index} className="bg-card/30 border-border border-dashed">
              <CardContent className="p-6">
                <div className="flex items-start justify-between">
                  <div className="space-y-2">
                    <h3 className="font-semibold text-foreground">{challenge.title}</h3>
                    <p className="text-sm text-muted-foreground">{challenge.description}</p>
                    <div className="flex items-center gap-4 text-sm">
                      <div className="flex items-center gap-1 text-muted-foreground">
                        <Calendar className="w-4 h-4" />
                        {challenge.startDate}
                      </div>
                      <Badge variant="outline">{challenge.type}</Badge>
                    </div>
                  </div>
                </div>
                <Button variant="ghost" className="w-full mt-4" disabled>
                  Coming Soon
                </Button>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </div>
  )
}
