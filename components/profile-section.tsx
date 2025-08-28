"use client"

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Progress } from "@/components/ui/progress"
import {
  User,
  Mail,
  Building2,
  Calendar,
  MapPin,
  Phone,
  Edit,
  Trophy,
  Target,
  Award,
  Activity,
  Footprints,
} from "lucide-react"
import { BadgeCard, individualBadges, teamBadges } from "./badge-system"

export function ProfileSection() {
  const userProfile = {
    firstName: "Demo",
    lastName: "User",
    email: "demo.user@company.com",
    department: "Marketing",
    role: "Employee",
    employeeId: "EMP-2024-0001",
    joinDate: "January 2024",
    location: "Office",
    phone: "Not provided",
    manager: "Not assigned",
    avatar: "/placeholder.svg",
  }

  const wellnessStats = {
    totalSteps: 2847392,
    totalChallenges: 24,
    completedChallenges: 18,
    currentStreak: 5,
    longestStreak: 12,
    averageDaily: 9234,
    joinedDate: "January 2024",
    totalBadges: individualBadges.filter((b) => b.earned).length + teamBadges.filter((b) => b.earned).length,
  }

  const earnedBadges = [...individualBadges.filter((b) => b.earned), ...teamBadges.filter((b) => b.earned)].sort(
    (a, b) => new Date(b.earnedDate || "").getTime() - new Date(a.earnedDate || "").getTime(),
  )

  return (
    <div className="space-y-6">
      {/* Profile Header */}
      <Card className="bg-card/50 border-border">
        <CardContent className="p-6">
          <div className="flex flex-col md:flex-row items-start md:items-center gap-6">
            <Avatar className="w-24 h-24">
              <AvatarImage
                src={userProfile.avatar || "/placeholder.svg"}
                alt={`${userProfile.firstName} ${userProfile.lastName}`}
              />
              <AvatarFallback className="text-2xl bg-primary/10 text-primary">
                {userProfile.firstName[0]}
                {userProfile.lastName[0] || userProfile.firstName[1] || "U"}
              </AvatarFallback>
            </Avatar>

            <div className="flex-1 space-y-2">
              <div className="flex items-center justify-between">
                <h1 className="text-3xl font-bold text-foreground">
                  {userProfile.firstName} {userProfile.lastName}
                </h1>
                <Button variant="outline" size="sm" className="gap-2 bg-transparent">
                  <Edit className="w-4 h-4" />
                  Edit Profile
                </Button>
              </div>

              <div className="flex flex-wrap gap-2">
                <Badge variant="secondary" className="gap-1">
                  <Building2 className="w-3 h-3" />
                  {userProfile.department}
                </Badge>
                <Badge variant="outline" className="gap-1">
                  <User className="w-3 h-3" />
                  {userProfile.role}
                </Badge>
                <Badge variant="outline" className="gap-1">
                  <Award className="w-3 h-3" />
                  {wellnessStats.totalBadges} Badges
                </Badge>
              </div>

              <p className="text-muted-foreground">
                Employee ID: {userProfile.employeeId} • Joined {userProfile.joinDate}
              </p>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Contact Information & Work Details */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <Card className="bg-card/50 border-border">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Mail className="w-5 h-5 text-primary" />
              Contact Information
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="flex items-center gap-3">
              <Mail className="w-4 h-4 text-muted-foreground" />
              <div>
                <p className="text-sm text-muted-foreground">Email</p>
                <p className="font-medium text-foreground">{userProfile.email}</p>
              </div>
            </div>

            <div className="flex items-center gap-3">
              <Phone className="w-4 h-4 text-muted-foreground" />
              <div>
                <p className="text-sm text-muted-foreground">Phone</p>
                <p className="font-medium text-foreground">{userProfile.phone}</p>
              </div>
            </div>

            <div className="flex items-center gap-3">
              <MapPin className="w-4 h-4 text-muted-foreground" />
              <div>
                <p className="text-sm text-muted-foreground">Location</p>
                <p className="font-medium text-foreground">{userProfile.location}</p>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="bg-card/50 border-border">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Building2 className="w-5 h-5 text-primary" />
              Work Details
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="flex items-center gap-3">
              <Building2 className="w-4 h-4 text-muted-foreground" />
              <div>
                <p className="text-sm text-muted-foreground">Department</p>
                <p className="font-medium text-foreground">{userProfile.department}</p>
              </div>
            </div>

            <div className="flex items-center gap-3">
              <User className="w-4 h-4 text-muted-foreground" />
              <div>
                <p className="text-sm text-muted-foreground">Role</p>
                <p className="font-medium text-foreground">{userProfile.role}</p>
              </div>
            </div>

            <div className="flex items-center gap-3">
              <Calendar className="w-4 h-4 text-muted-foreground" />
              <div>
                <p className="text-sm text-muted-foreground">Manager</p>
                <p className="font-medium text-foreground">{userProfile.manager}</p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Wellness Journey Overview */}
      <Card className="bg-card/50 border-border">
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Activity className="w-5 h-5 text-primary" />
            Wellness Journey
          </CardTitle>
          <CardDescription>Your wellness stats since joining the program</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
            <div className="text-center p-4 rounded-lg bg-muted/30">
              <Footprints className="w-8 h-8 text-primary mx-auto mb-2" />
              <p className="text-2xl font-bold text-foreground">{wellnessStats.totalSteps.toLocaleString()}</p>
              <p className="text-sm text-muted-foreground">Total Steps</p>
            </div>

            <div className="text-center p-4 rounded-lg bg-muted/30">
              <Target className="w-8 h-8 text-accent mx-auto mb-2" />
              <p className="text-2xl font-bold text-foreground">
                {wellnessStats.completedChallenges}/{wellnessStats.totalChallenges}
              </p>
              <p className="text-sm text-muted-foreground">Challenges</p>
            </div>

            <div className="text-center p-4 rounded-lg bg-muted/30">
              <Trophy className="w-8 h-8 text-primary mx-auto mb-2" />
              <p className="text-2xl font-bold text-foreground">{wellnessStats.longestStreak}</p>
              <p className="text-sm text-muted-foreground">Longest Streak</p>
            </div>

            <div className="text-center p-4 rounded-lg bg-muted/30">
              <Award className="w-8 h-8 text-accent mx-auto mb-2" />
              <p className="text-2xl font-bold text-foreground">{wellnessStats.totalBadges}</p>
              <p className="text-sm text-muted-foreground">Badges Earned</p>
            </div>
          </div>

          <div className="space-y-4">
            <div>
              <div className="flex justify-between items-center mb-2">
                <span className="text-sm font-medium text-foreground">Challenge Completion Rate</span>
                <span className="text-sm text-muted-foreground">
                  {Math.round((wellnessStats.completedChallenges / wellnessStats.totalChallenges) * 100)}%
                </span>
              </div>
              <Progress
                value={(wellnessStats.completedChallenges / wellnessStats.totalChallenges) * 100}
                className="h-2"
              />
            </div>

            <div className="text-center p-4 rounded-lg bg-primary/10 border border-primary/20">
              <p className="text-sm text-muted-foreground">Daily Average</p>
              <p className="text-xl font-bold text-primary">{wellnessStats.averageDaily.toLocaleString()} steps</p>
              <p className="text-xs text-muted-foreground mt-1">Since {wellnessStats.joinedDate}</p>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Badges Collection */}
      <Card className="bg-card/50 border-border">
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Award className="w-5 h-5 text-primary" />
            Badge Collection
          </CardTitle>
          <CardDescription>All badges you've earned on your wellness journey</CardDescription>
        </CardHeader>
        <CardContent>
          {earnedBadges.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {earnedBadges.map((badge) => (
                <BadgeCard key={badge.id} badge={badge} />
              ))}
            </div>
          ) : (
            <div className="text-center py-8">
              <Award className="w-12 h-12 text-muted-foreground mx-auto mb-4" />
              <p className="text-muted-foreground">
                No badges earned yet. Start participating in challenges to earn your first badge!
              </p>
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  )
}
