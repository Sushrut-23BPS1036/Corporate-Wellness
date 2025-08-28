"use client"

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Progress } from "@/components/ui/progress"
import { Trophy, Users, Award } from "lucide-react"
import { BadgeCard, individualBadges, teamBadges } from "./badge-system"

export function BadgesSection() {
  const earnedIndividual = individualBadges.filter((b) => b.earned)
  const unEarnedIndividual = individualBadges.filter((b) => !b.earned)
  const earnedTeam = teamBadges.filter((b) => b.earned)
  const unEarnedTeam = teamBadges.filter((b) => !b.earned)

  const totalBadges = individualBadges.length + teamBadges.length
  const earnedBadges = earnedIndividual.length + earnedTeam.length

  return (
    <div className="space-y-6">
      <div className="text-center space-y-2">
        <h1 className="text-3xl font-bold text-foreground">Badge Collection</h1>
        <p className="text-muted-foreground">Track your individual and team achievements</p>
      </div>

      {/* Progress Overview */}
      <Card className="bg-card/50 border-border">
        <CardContent className="p-6">
          <div className="flex items-center justify-between mb-4">
            <div>
              <h3 className="text-lg font-semibold text-foreground">Overall Progress</h3>
              <p className="text-sm text-muted-foreground">
                {earnedBadges} of {totalBadges} badges earned
              </p>
            </div>
            <div className="text-right">
              <p className="text-2xl font-bold text-primary">{Math.round((earnedBadges / totalBadges) * 100)}%</p>
              <p className="text-xs text-muted-foreground">Complete</p>
            </div>
          </div>
          <Progress value={(earnedBadges / totalBadges) * 100} className="h-3" />

          <div className="grid grid-cols-2 gap-4 mt-6">
            <div className="text-center p-4 rounded-lg bg-muted/30">
              <Trophy className="w-6 h-6 text-primary mx-auto mb-2" />
              <p className="text-lg font-bold text-foreground">{earnedIndividual.length}</p>
              <p className="text-xs text-muted-foreground">Individual Badges</p>
            </div>
            <div className="text-center p-4 rounded-lg bg-muted/30">
              <Users className="w-6 h-6 text-accent mx-auto mb-2" />
              <p className="text-lg font-bold text-foreground">{earnedTeam.length}</p>
              <p className="text-xs text-muted-foreground">Team Badges</p>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Badge Categories */}
      <Tabs defaultValue="individual" className="w-full">
        <TabsList className="grid w-full grid-cols-2">
          <TabsTrigger value="individual" className="flex items-center gap-2">
            <Trophy className="w-4 h-4" />
            Individual ({earnedIndividual.length}/{individualBadges.length})
          </TabsTrigger>
          <TabsTrigger value="team" className="flex items-center gap-2">
            <Users className="w-4 h-4" />
            Team ({earnedTeam.length}/{teamBadges.length})
          </TabsTrigger>
        </TabsList>

        <TabsContent value="individual" className="space-y-6">
          {earnedIndividual.length > 0 && (
            <Card className="bg-card/50 border-border">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Award className="w-5 h-5 text-primary" />
                  Earned Individual Badges
                </CardTitle>
                <CardDescription>Your personal achievements</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                  {earnedIndividual.map((badge) => (
                    <BadgeCard key={badge.id} badge={badge} />
                  ))}
                </div>
              </CardContent>
            </Card>
          )}

          {unEarnedIndividual.length > 0 && (
            <Card className="bg-card/50 border-border">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Trophy className="w-5 h-5 text-muted-foreground" />
                  Available Individual Badges
                </CardTitle>
                <CardDescription>Keep working towards these achievements</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                  {unEarnedIndividual.map((badge) => (
                    <BadgeCard key={badge.id} badge={badge} />
                  ))}
                </div>
              </CardContent>
            </Card>
          )}
        </TabsContent>

        <TabsContent value="team" className="space-y-6">
          {earnedTeam.length > 0 && (
            <Card className="bg-card/50 border-border">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Award className="w-5 h-5 text-primary" />
                  Earned Team Badges
                </CardTitle>
                <CardDescription>Your collaborative achievements</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                  {earnedTeam.map((badge) => (
                    <BadgeCard key={badge.id} badge={badge} />
                  ))}
                </div>
              </CardContent>
            </Card>
          )}

          {unEarnedTeam.length > 0 && (
            <Card className="bg-card/50 border-border">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Users className="w-5 h-5 text-muted-foreground" />
                  Available Team Badges
                </CardTitle>
                <CardDescription>Work with your team to unlock these</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                  {unEarnedTeam.map((badge) => (
                    <BadgeCard key={badge.id} badge={badge} />
                  ))}
                </div>
              </CardContent>
            </Card>
          )}
        </TabsContent>
      </Tabs>
    </div>
  )
}
