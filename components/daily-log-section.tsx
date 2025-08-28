"use client"

import type React from "react"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import { Checkbox } from "@/components/ui/checkbox"
import { Calendar, CheckCircle, Clock, Target, TrendingUp, Heart, Brain, Utensils, Dumbbell } from "lucide-react"

export function DailyLogSection() {
  const [currentDate] = useState(
    new Date().toLocaleDateString("en-US", {
      weekday: "long",
      year: "numeric",
      month: "long",
      day: "numeric",
    }),
  )

  const [formData, setFormData] = useState({
    energyLevel: "",
    stepsGoal: "",
    waterIntake: "",
    sleepHours: "",
    stressLevel: "",
    workoutCompleted: false,
    healthyMeals: "",
    goalReflection: "",
    tomorrowGoals: "",
    gratitude: "",
  })

  const [isSubmitted, setIsSubmitted] = useState(false)

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    setIsSubmitted(true)
    // Here you would typically save to database
    console.log("[v0] Daily log submitted:", formData)
  }

  const handleInputChange = (field: string, value: string | boolean) => {
    setFormData((prev) => ({ ...prev, [field]: value }))
  }

  if (isSubmitted) {
    return (
      <div className="space-y-6">
        <div className="flex items-center gap-3">
          <Calendar className="w-6 h-6 text-primary" />
          <h1 className="text-3xl font-bold text-foreground">Daily Wellness Log</h1>
        </div>

        <Card className="bg-green-950/20 border-green-800">
          <CardContent className="pt-6">
            <div className="flex items-center gap-3 text-green-400">
              <CheckCircle className="w-8 h-8" />
              <div>
                <h3 className="text-xl font-semibold">Log Submitted Successfully!</h3>
                <p className="text-green-300">Great job staying consistent with your wellness journey.</p>
              </div>
            </div>
          </CardContent>
        </Card>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <Card>
            <CardContent className="pt-6">
              <div className="flex items-center gap-2 text-primary">
                <TrendingUp className="w-5 h-5" />
                <span className="font-medium">Streak: 7 days</span>
              </div>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="pt-6">
              <div className="flex items-center gap-2 text-primary">
                <Target className="w-5 h-5" />
                <span className="font-medium">Goals Met: 85%</span>
              </div>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="pt-6">
              <div className="flex items-center gap-2 text-primary">
                <Heart className="w-5 h-5" />
                <span className="font-medium">Wellness Score: 8.2</span>
              </div>
            </CardContent>
          </Card>
        </div>

        <Button onClick={() => setIsSubmitted(false)} className="w-full md:w-auto">
          Edit Today's Log
        </Button>
      </div>
    )
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center gap-3">
        <Calendar className="w-6 h-6 text-primary" />
        <div>
          <h1 className="text-3xl font-bold text-foreground">Daily Wellness Log</h1>
          <p className="text-muted-foreground">{currentDate}</p>
        </div>
      </div>

      <form onSubmit={handleSubmit} className="space-y-6">
        {/* Physical Wellness */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Dumbbell className="w-5 h-5 text-primary" />
              Physical Wellness
            </CardTitle>
            <CardDescription>Track your physical activity and health metrics</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="energyLevel">How's your energy level today?</Label>
                <RadioGroup
                  value={formData.energyLevel}
                  onValueChange={(value) => handleInputChange("energyLevel", value)}
                >
                  <div className="flex items-center space-x-2">
                    <RadioGroupItem value="low" id="energy-low" />
                    <Label htmlFor="energy-low">Low</Label>
                  </div>
                  <div className="flex items-center space-x-2">
                    <RadioGroupItem value="moderate" id="energy-moderate" />
                    <Label htmlFor="energy-moderate">Moderate</Label>
                  </div>
                  <div className="flex items-center space-x-2">
                    <RadioGroupItem value="high" id="energy-high" />
                    <Label htmlFor="energy-high">High</Label>
                  </div>
                </RadioGroup>
              </div>

              <div className="space-y-2">
                <Label htmlFor="stepsGoal">Steps taken today</Label>
                <Input
                  id="stepsGoal"
                  type="number"
                  placeholder="e.g., 8500"
                  value={formData.stepsGoal}
                  onChange={(e) => handleInputChange("stepsGoal", e.target.value)}
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="waterIntake">Water intake (glasses)</Label>
                <Input
                  id="waterIntake"
                  type="number"
                  placeholder="e.g., 8"
                  value={formData.waterIntake}
                  onChange={(e) => handleInputChange("waterIntake", e.target.value)}
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="sleepHours">Hours of sleep last night</Label>
                <Input
                  id="sleepHours"
                  type="number"
                  step="0.5"
                  placeholder="e.g., 7.5"
                  value={formData.sleepHours}
                  onChange={(e) => handleInputChange("sleepHours", e.target.value)}
                />
              </div>
            </div>

            <div className="flex items-center space-x-2">
              <Checkbox
                id="workoutCompleted"
                checked={formData.workoutCompleted}
                onCheckedChange={(checked) => handleInputChange("workoutCompleted", checked as boolean)}
              />
              <Label htmlFor="workoutCompleted">I completed a workout today</Label>
            </div>
          </CardContent>
        </Card>

        {/* Mental Wellness */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Brain className="w-5 h-5 text-primary" />
              Mental Wellness
            </CardTitle>
            <CardDescription>Reflect on your mental and emotional state</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="stressLevel">Stress level today</Label>
              <RadioGroup
                value={formData.stressLevel}
                onValueChange={(value) => handleInputChange("stressLevel", value)}
              >
                <div className="flex items-center space-x-2">
                  <RadioGroupItem value="low" id="stress-low" />
                  <Label htmlFor="stress-low">Low - Feeling calm and relaxed</Label>
                </div>
                <div className="flex items-center space-x-2">
                  <RadioGroupItem value="moderate" id="stress-moderate" />
                  <Label htmlFor="stress-moderate">Moderate - Some pressure but manageable</Label>
                </div>
                <div className="flex items-center space-x-2">
                  <RadioGroupItem value="high" id="stress-high" />
                  <Label htmlFor="stress-high">High - Feeling overwhelmed</Label>
                </div>
              </RadioGroup>
            </div>

            <div className="space-y-2">
              <Label htmlFor="gratitude">What are you grateful for today?</Label>
              <Textarea
                id="gratitude"
                placeholder="Share something that made you feel grateful today..."
                value={formData.gratitude}
                onChange={(e) => handleInputChange("gratitude", e.target.value)}
                rows={3}
              />
            </div>
          </CardContent>
        </Card>

        {/* Nutrition */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Utensils className="w-5 h-5 text-primary" />
              Nutrition
            </CardTitle>
            <CardDescription>Track your eating habits</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="healthyMeals">How many healthy meals did you have today?</Label>
              <RadioGroup
                value={formData.healthyMeals}
                onValueChange={(value) => handleInputChange("healthyMeals", value)}
              >
                <div className="flex items-center space-x-2">
                  <RadioGroupItem value="0-1" id="meals-01" />
                  <Label htmlFor="meals-01">0-1 meals</Label>
                </div>
                <div className="flex items-center space-x-2">
                  <RadioGroupItem value="2" id="meals-2" />
                  <Label htmlFor="meals-2">2 meals</Label>
                </div>
                <div className="flex items-center space-x-2">
                  <RadioGroupItem value="3+" id="meals-3plus" />
                  <Label htmlFor="meals-3plus">3+ meals</Label>
                </div>
              </RadioGroup>
            </div>
          </CardContent>
        </Card>

        {/* Goal Reflection */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Target className="w-5 h-5 text-primary" />
              Goal Reflection
            </CardTitle>
            <CardDescription>Reflect on your wellness goals and progress</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="goalReflection">How did you progress toward your wellness goals today?</Label>
              <Textarea
                id="goalReflection"
                placeholder="Reflect on your achievements, challenges, and learnings..."
                value={formData.goalReflection}
                onChange={(e) => handleInputChange("goalReflection", e.target.value)}
                rows={4}
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="tomorrowGoals">What wellness goals do you want to focus on tomorrow?</Label>
              <Textarea
                id="tomorrowGoals"
                placeholder="Set your intentions for tomorrow..."
                value={formData.tomorrowGoals}
                onChange={(e) => handleInputChange("tomorrowGoals", e.target.value)}
                rows={3}
              />
            </div>
          </CardContent>
        </Card>

        <Button type="submit" className="w-full md:w-auto" size="lg">
          <Clock className="w-4 h-4 mr-2" />
          Submit Daily Log
        </Button>
      </form>
    </div>
  )
}
