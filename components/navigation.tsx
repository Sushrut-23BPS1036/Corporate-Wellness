"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Activity, Target, Users, BarChart3, Settings, Footprints, Menu, X, Award, BookOpen } from "lucide-react"

interface NavigationProps {
  activeSection: string
  onSectionChange: (section: string) => void
}

export function Navigation({ activeSection, onSectionChange }: NavigationProps) {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false)

  const navItems = [
    { id: "health-data", label: "Health Data", icon: Activity },
    { id: "dashboard", label: "Dashboard", icon: BarChart3 },
    { id: "challenges", label: "Challenges", icon: Target },
    { id: "teams", label: "Teams", icon: Users },
    { id: "badges", label: "Badges", icon: Award },
    { id: "dailylog", label: "Daily Log", icon: BookOpen },
    { id: "profile", label: "Settings", icon: Settings },
  ]

  return (
    <nav className="bg-card/80 backdrop-blur-md border-b border-border/50 sticky top-0 z-50">
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between h-16">
          <div className="flex items-center gap-3">
            <div className="p-2 rounded-xl bg-gradient-to-br from-primary to-accent">
              <Footprints className="w-6 h-6 text-primary-foreground" />
            </div>
            <span className="text-xl font-bold bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent">
              HealthSync
            </span>
          </div>

          <div className="hidden md:flex items-center space-x-1">
            {navItems.map((item) => {
              const Icon = item.icon
              const isActive = activeSection === item.id
              return (
                <Button
                  key={item.id}
                  variant={isActive ? "default" : "ghost"}
                  onClick={() => onSectionChange(item.id)}
                  className={`flex items-center gap-2 transition-all duration-200 ${
                    isActive
                      ? "bg-gradient-to-r from-primary to-accent text-primary-foreground shadow-lg"
                      : "hover:bg-muted/50 hover:scale-105"
                  }`}
                >
                  <Icon className="w-4 h-4" />
                  {item.label}
                </Button>
              )
            })}
          </div>

          <Button
            variant="ghost"
            size="sm"
            className="md:hidden hover:bg-muted/50"
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
          >
            {isMobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
          </Button>
        </div>

        {isMobileMenuOpen && (
          <div className="md:hidden py-4 border-t border-border/50 animate-slide-up">
            <div className="flex flex-col space-y-2">
              {navItems.map((item) => {
                const Icon = item.icon
                const isActive = activeSection === item.id
                return (
                  <Button
                    key={item.id}
                    variant={isActive ? "default" : "ghost"}
                    onClick={() => {
                      onSectionChange(item.id)
                      setIsMobileMenuOpen(false)
                    }}
                    className={`flex items-center gap-2 justify-start transition-all duration-200 ${
                      isActive ? "bg-gradient-to-r from-primary to-accent text-primary-foreground" : "hover:bg-muted/50"
                    }`}
                  >
                    <Icon className="w-4 h-4" />
                    {item.label}
                  </Button>
                )
              })}
            </div>
          </div>
        )}
      </div>
    </nav>
  )
}
