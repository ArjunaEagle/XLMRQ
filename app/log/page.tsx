"use client"

import type React from "react"

import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Calendar } from "@/components/ui/calendar"
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover"
import { Progress } from "@/components/ui/progress"
import { Navigation } from "@/components/navigation"
import { CalendarIcon, Plus, CheckCircle, Flame, Trophy, Target, TrendingUp } from "lucide-react"
import { format, isToday, isYesterday, differenceInDays, startOfDay } from "date-fns"
import { cn } from "@/lib/utils"

interface FoodWasteEntry {
  id: string
  foodItem: string
  category: string
  quantity: string
  unit: string
  reason: string
  date: Date
  notes: string
}

interface StreakData {
  currentStreak: number
  longestStreak: number
  lastLogDate: Date | null
  weeklyStreak: number
  totalItemsLogged: number
}

interface Milestone {
  id: string
  title: string
  description: string
  target: number
  type: "streak" | "total" | "weekly"
  achieved: boolean
  icon: string
}

const categories = [
  "Fruits",
  "Vegetables",
  "Dairy",
  "Meat & Poultry",
  "Seafood",
  "Grains & Cereals",
  "Bakery",
  "Beverages",
  "Condiments & Sauces",
  "Other",
]

const reasons = [
  "Expired/Past due date",
  "Spoiled/Moldy",
  "Cooked too much",
  "Bought too much",
  "Didn't like taste",
  "Forgot about it",
  "Poor quality",
  "Other",
]

const units = ["grams", "kg", "pieces", "cups", "liters", "ml", "slices", "portions"]

const milestones: Milestone[] = [
  {
    id: "1",
    title: "First Steps",
    description: "Log your first entry",
    target: 1,
    type: "total",
    achieved: false,
    icon: "🌱",
  },
  {
    id: "2",
    title: "Getting Started",
    description: "Log 5 entries",
    target: 5,
    type: "total",
    achieved: false,
    icon: "📝",
  },
  {
    id: "3",
    title: "Consistent Tracker",
    description: "3-day streak",
    target: 3,
    type: "streak",
    achieved: false,
    icon: "🔥",
  },
  {
    id: "4",
    title: "Week Warrior",
    description: "7-day streak",
    target: 7,
    type: "streak",
    achieved: false,
    icon: "⚡",
  },
  {
    id: "5",
    title: "Dedicated Logger",
    description: "Log 25 entries",
    target: 25,
    type: "total",
    achieved: false,
    icon: "🏆",
  },
  {
    id: "6",
    title: "Streak Master",
    description: "14-day streak",
    target: 14,
    type: "streak",
    achieved: false,
    icon: "🌟",
  },
  {
    id: "7",
    title: "Weekly Champion",
    description: "4-week streak",
    target: 4,
    type: "weekly",
    achieved: false,
    icon: "👑",
  },
]

export default function LogPage() {
  const [entries, setEntries] = useState<FoodWasteEntry[]>([])
  const [showForm, setShowForm] = useState(false)
  const [showSuccess, setShowSuccess] = useState(false)
  const [showMilestone, setShowMilestone] = useState<Milestone | null>(null)
  const [streakData, setStreakData] = useState<StreakData>({
    currentStreak: 0,
    longestStreak: 0,
    lastLogDate: null,
    weeklyStreak: 0,
    totalItemsLogged: 0,
  })
  const [formData, setFormData] = useState({
    foodItem: "",
    category: "",
    quantity: "",
    unit: "",
    reason: "",
    date: new Date(),
    notes: "",
  })

  const calculateStreak = (entries: FoodWasteEntry[]) => {
    if (entries.length === 0)
      return { currentStreak: 0, longestStreak: 0, lastLogDate: null, weeklyStreak: 0, totalItemsLogged: 0 }

    const sortedEntries = [...entries].sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime())
    const today = startOfDay(new Date())
    let currentStreak = 0
    let longestStreak = 0
    let tempStreak = 0
    let weeklyStreak = 0

    const lastEntryDate = startOfDay(new Date(sortedEntries[0].date))
    const daysSinceLastEntry = differenceInDays(today, lastEntryDate)

    if (daysSinceLastEntry <= 1) {
      const uniqueDates = new Set()
      for (const entry of sortedEntries) {
        const entryDate = startOfDay(new Date(entry.date))
        const daysDiff = differenceInDays(today, entryDate)
        if (daysDiff <= currentStreak + 1) {
          const dateKey = entryDate.toISOString()
          if (!uniqueDates.has(dateKey)) {
            uniqueDates.add(dateKey)
            currentStreak++
          }
        } else {
          break
        }
      }
    }

    const allUniqueDates = [...new Set(sortedEntries.map((entry) => startOfDay(new Date(entry.date)).toISOString()))]
      .map((date) => new Date(date))
      .sort((a, b) => b.getTime() - a.getTime())

    for (let i = 0; i < allUniqueDates.length; i++) {
      tempStreak = 1
      for (let j = i + 1; j < allUniqueDates.length; j++) {
        const daysDiff = differenceInDays(allUniqueDates[j - 1], allUniqueDates[j])
        if (daysDiff === 1) {
          tempStreak++
        } else {
          break
        }
      }
      longestStreak = Math.max(longestStreak, tempStreak)
    }

    sortedEntries.forEach((entry) => {
      const entryDate = new Date(entry.date)
      const weekKey = `${entryDate.getFullYear()}-${Math.floor(entryDate.getDate() / 7)}`
      weeklyStreak++
    })

    const totalItemsLogged = sortedEntries.reduce((acc, entry) => acc + Number.parseInt(entry.quantity || "0"), 0)

    return {
      currentStreak,
      longestStreak,
      lastLogDate: sortedEntries[0]?.date || null,
      weeklyStreak,
      totalItemsLogged,
    }
  }

  const checkMilestones = (newStreakData: StreakData) => {
    const updatedMilestones = milestones.map((milestone) => {
      let achieved = false
      switch (milestone.type) {
        case "total":
          achieved = entries.length >= milestone.target
          break
        case "streak":
          achieved = newStreakData.currentStreak >= milestone.target
          break
        case "weekly":
          achieved = newStreakData.weeklyStreak >= milestone.target
          break
      }

      if (achieved && !milestone.achieved) {
        setShowMilestone(milestone)
        setTimeout(() => setShowMilestone(null), 5000)
      }

      return { ...milestone, achieved }
    })

    return updatedMilestones
  }

  useEffect(() => {
    const newStreakData = calculateStreak(entries)
    setStreakData(newStreakData)
    checkMilestones(newStreakData)
  }, [entries])

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()

    const newEntry: FoodWasteEntry = {
      id: Date.now().toString(),
      ...formData,
    }

    setEntries([newEntry, ...entries])
    setFormData({
      foodItem: "",
      category: "",
      quantity: "",
      unit: "",
      reason: "",
      date: new Date(),
      notes: "",
    })

    setShowForm(false)
    setShowSuccess(true)
    setTimeout(() => setShowSuccess(false), 3000)
  }

  const handleInputChange = (field: string, value: any) => {
    setFormData((prev) => ({ ...prev, [field]: value }))
  }

  const getStreakStatus = () => {
    if (streakData.currentStreak === 0) return "Start your tracking streak!"
    if (streakData.lastLogDate && isToday(new Date(streakData.lastLogDate))) return "Logged today! 🎉"
    if (streakData.lastLogDate && isYesterday(new Date(streakData.lastLogDate))) return "Don't break the streak!"
    return "Keep it up!"
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-green-50 to-white pb-20 md:pb-0">
      <Navigation />

      <div className="container mx-auto px-4 py-8 max-w-4xl">
        {showSuccess && (
          <div className="mb-6 p-4 bg-[#4CAF50]/10 border border-[#4CAF50]/20 rounded-lg flex items-center gap-3">
            <CheckCircle className="w-5 h-5 text-[#4CAF50]" />
            <span className="text-[#4CAF50] font-medium">Food waste entry logged successfully!</span>
          </div>
        )}

        {showMilestone && (
          <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
            <Card className="border-0 shadow-2xl bg-gradient-to-br from-yellow-50 to-orange-50 max-w-md w-full">
              <CardContent className="p-8 text-center">
                <div className="text-6xl mb-4">{showMilestone.icon}</div>
                <h3 className="text-2xl font-serif font-bold text-[#2E2E2E] mb-2">Milestone Achieved!</h3>
                <h4 className="text-xl font-semibold text-[#4CAF50] mb-2">{showMilestone.title}</h4>
                <p className="text-gray-600 mb-6">{showMilestone.description}</p>
                <Button className="bg-[#4CAF50] hover:bg-[#45a049] text-white" onClick={() => setShowMilestone(null)}>
                  Awesome!
                </Button>
              </CardContent>
            </Card>
          </div>
        )}

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
          <Card className="border-0 shadow-lg bg-gradient-to-br from-orange-50 to-red-50">
            <CardContent className="p-6 text-center">
              <div className="flex items-center justify-center mb-3">
                <Flame className="w-8 h-8 text-orange-500 mr-2" />
                <span className="text-3xl font-bold text-orange-600">{streakData.currentStreak}</span>
              </div>
              <h3 className="font-serif font-semibold text-[#2E2E2E] mb-1">Current Streak</h3>
              <p className="text-sm text-gray-600">{getStreakStatus()}</p>
              <div className="mt-3">
                <Progress
                  value={(streakData.currentStreak / Math.max(streakData.longestStreak, 7)) * 100}
                  className="h-2"
                />
              </div>
            </CardContent>
          </Card>

          <Card className="border-0 shadow-lg bg-gradient-to-br from-green-50 to-emerald-50">
            <CardContent className="p-6 text-center">
              <div className="flex items-center justify-center mb-3">
                <Target className="w-8 h-8 text-green-500 mr-2" />
                <span className="text-3xl font-bold text-green-600">{streakData.totalItemsLogged}</span>
              </div>
              <h3 className="font-serif font-semibold text-[#2E2E2E] mb-1">Items Tracked</h3>
              <p className="text-sm text-gray-600">Total items logged</p>
              <div className="mt-3">
                <Progress value={Math.min((streakData.totalItemsLogged / 100) * 100, 100)} className="h-2" />
              </div>
            </CardContent>
          </Card>

          <Card className="border-0 shadow-lg bg-gradient-to-br from-blue-50 to-indigo-50">
            <CardContent className="p-6 text-center">
              <div className="flex items-center justify-center mb-3">
                <TrendingUp className="w-8 h-8 text-blue-500 mr-2" />
                <span className="text-3xl font-bold text-blue-600">{streakData.weeklyStreak}</span>
              </div>
              <h3 className="font-serif font-semibold text-[#2E2E2E] mb-1">Weekly Streak</h3>
              <p className="text-sm text-gray-600">Consecutive weeks</p>
              <div className="mt-3">
                <Progress value={(streakData.weeklyStreak / 12) * 100} className="h-2" />
              </div>
            </CardContent>
          </Card>
        </div>

        <Card className="mb-8 border-0 shadow-lg">
          <CardHeader>
            <CardTitle className="text-xl font-serif text-[#2E2E2E] flex items-center gap-2">
              <Trophy className="w-6 h-6 text-yellow-500" />
              Achievements
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              {milestones.slice(0, 8).map((milestone) => (
                <div
                  key={milestone.id}
                  className={cn(
                    "p-4 rounded-lg text-center transition-all",
                    milestone.achieved
                      ? "bg-gradient-to-br from-yellow-50 to-orange-50 border-2 border-yellow-200"
                      : "bg-gray-50 border-2 border-gray-200 opacity-60",
                  )}
                >
                  <div className="text-2xl mb-2">{milestone.icon}</div>
                  <h4 className="font-semibold text-sm text-[#2E2E2E] mb-1">{milestone.title}</h4>
                  <p className="text-xs text-gray-600">{milestone.description}</p>
                  {milestone.achieved && (
                    <div className="mt-2">
                      <span className="text-xs bg-green-100 text-green-700 px-2 py-1 rounded-full">Completed!</span>
                    </div>
                  )}
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        <div className="flex items-center justify-between mb-8">
          <div>
            <h1 className="text-3xl font-serif font-bold text-[#2E2E2E] mb-2">Log Food Waste</h1>
            <p className="text-gray-600">Track your food waste to identify patterns and reduce waste</p>
          </div>
          <Button className="bg-[#4CAF50] hover:bg-[#45a049] text-white" onClick={() => setShowForm(true)}>
            <Plus className="w-4 h-4 mr-2" />
            Add Entry
          </Button>
        </div>

        {showForm && (
          <Card className="mb-8 border-0 shadow-lg">
            <CardHeader>
              <CardTitle className="text-xl font-serif text-[#2E2E2E]">Add Food Waste Entry</CardTitle>
            </CardHeader>
            <CardContent>
              <form onSubmit={handleSubmit} className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="space-y-2">
                    <Label htmlFor="foodItem">Food Item *</Label>
                    <Input
                      id="foodItem"
                      placeholder="e.g., Bananas, Leftover pasta"
                      value={formData.foodItem}
                      onChange={(e) => handleInputChange("foodItem", e.target.value)}
                      required
                    />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="category">Category *</Label>
                    <Select
                      value={formData.category}
                      onValueChange={(value) => handleInputChange("category", value)}
                      required
                    >
                      <SelectTrigger>
                        <SelectValue placeholder="Select category" />
                      </SelectTrigger>
                      <SelectContent>
                        {categories.map((category) => (
                          <SelectItem key={category} value={category}>
                            {category}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="quantity">Quantity *</Label>
                    <Input
                      id="quantity"
                      type="number"
                      placeholder="e.g., 2"
                      value={formData.quantity}
                      onChange={(e) => handleInputChange("quantity", e.target.value)}
                      required
                    />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="unit">Unit *</Label>
                    <Select value={formData.unit} onValueChange={(value) => handleInputChange("unit", value)} required>
                      <SelectTrigger>
                        <SelectValue placeholder="Select unit" />
                      </SelectTrigger>
                      <SelectContent>
                        {units.map((unit) => (
                          <SelectItem key={unit} value={unit}>
                            {unit}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="reason">Reason for Waste *</Label>
                    <Select
                      value={formData.reason}
                      onValueChange={(value) => handleInputChange("reason", value)}
                      required
                    >
                      <SelectTrigger>
                        <SelectValue placeholder="Why was it wasted?" />
                      </SelectTrigger>
                      <SelectContent>
                        {reasons.map((reason) => (
                          <SelectItem key={reason} value={reason}>
                            {reason}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>

                  <div className="space-y-2">
                    <Label>Date *</Label>
                    <Popover>
                      <PopoverTrigger asChild>
                        <Button
                          variant="outline"
                          className={cn(
                            "w-full justify-start text-left font-normal",
                            !formData.date && "text-muted-foreground",
                          )}
                        >
                          <CalendarIcon className="mr-2 h-4 w-4" />
                          {formData.date ? format(formData.date, "PPP") : <span>Pick a date</span>}
                        </Button>
                      </PopoverTrigger>
                      <PopoverContent className="w-auto p-0">
                        <Calendar
                          mode="single"
                          selected={formData.date}
                          onSelect={(date) => handleInputChange("date", date || new Date())}
                          initialFocus
                        />
                      </PopoverContent>
                    </Popover>
                  </div>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="notes">Additional Notes (Optional)</Label>
                  <Textarea
                    id="notes"
                    placeholder="Any additional details about the waste..."
                    value={formData.notes}
                    onChange={(e) => handleInputChange("notes", e.target.value)}
                    rows={3}
                  />
                </div>

                <div className="flex gap-4">
                  <Button type="submit" className="bg-[#4CAF50] hover:bg-[#45a049] text-white">
                    Log Entry
                  </Button>
                  <Button type="button" variant="outline" onClick={() => setShowForm(false)}>
                    Cancel
                  </Button>
                </div>
              </form>
            </CardContent>
          </Card>
        )}

        <div className="space-y-6">
          <div className="flex items-center justify-between">
            <h2 className="text-2xl font-serif font-bold text-[#2E2E2E]">Recent Entries</h2>
            {entries.length > 0 && <span className="text-sm text-gray-500">{entries.length} entries logged</span>}
          </div>

          {entries.length === 0 ? (
            <Card className="border-0 shadow-lg">
              <CardContent className="p-12 text-center">
                <div className="w-16 h-16 bg-[#4CAF50]/10 rounded-full flex items-center justify-center mx-auto mb-4">
                  <Plus className="w-8 h-8 text-[#4CAF50]" />
                </div>
                <h3 className="text-xl font-serif font-semibold text-[#2E2E2E] mb-2">No entries yet</h3>
                <p className="text-gray-600 mb-6">Start tracking your food waste to see insights and reduce waste.</p>
                <Button className="bg-[#4CAF50] hover:bg-[#45a049] text-white" onClick={() => setShowForm(true)}>
                  <Plus className="w-4 h-4 mr-2" />
                  Add Your First Entry
                </Button>
              </CardContent>
            </Card>
          ) : (
            <div className="space-y-4">
              {entries.map((entry) => (
                <Card key={entry.id} className="border-0 shadow-lg hover:shadow-xl transition-shadow">
                  <CardContent className="p-6">
                    <div className="flex items-start justify-between">
                      <div className="flex-1">
                        <div className="flex items-center gap-3 mb-2">
                          <h3 className="text-lg font-serif font-semibold text-[#2E2E2E]">{entry.foodItem}</h3>
                          <span className="px-2 py-1 bg-[#4CAF50]/10 text-[#4CAF50] text-xs rounded-full">
                            {entry.category}
                          </span>
                        </div>
                        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-sm text-gray-600">
                          <div>
                            <span className="font-medium">Quantity:</span> {entry.quantity} {entry.unit}
                          </div>
                          <div>
                            <span className="font-medium">Reason:</span> {entry.reason}
                          </div>
                          <div>
                            <span className="font-medium">Date:</span> {format(entry.date, "MMM dd, yyyy")}
                          </div>
                        </div>
                        {entry.notes && (
                          <div className="mt-3 text-sm text-gray-600">
                            <span className="font-medium">Notes:</span> {entry.notes}
                          </div>
                        )}
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          )}
        </div>

        {entries.length > 0 && (
          <Card className="mt-8 border-0 shadow-lg bg-gradient-to-r from-[#4CAF50]/5 to-[#8BC34A]/5">
            <CardContent className="p-6">
              <h3 className="text-lg font-serif font-semibold text-[#2E2E2E] mb-4">Quick Stats</h3>
              <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
                <div className="text-center">
                  <div className="text-2xl font-bold text-[#4CAF50] mb-1">{entries.length}</div>
                  <div className="text-sm text-gray-600">Total Entries</div>
                </div>
                <div className="text-center">
                  <div className="text-2xl font-bold text-[#4CAF50] mb-1">
                    {entries.reduce((acc, entry) => acc + Number.parseInt(entry.quantity || "0"), 0)}
                  </div>
                  <div className="text-sm text-gray-600">Items Wasted</div>
                </div>
                <div className="text-center">
                  <div className="text-2xl font-bold text-[#4CAF50] mb-1">
                    {new Set(entries.map((entry) => entry.category)).size}
                  </div>
                  <div className="text-sm text-gray-600">Categories</div>
                </div>
                <div className="text-center">
                  <div className="text-2xl font-bold text-[#4CAF50] mb-1">{streakData.longestStreak}</div>
                  <div className="text-sm text-gray-600">Longest Streak</div>
                </div>
              </div>
            </CardContent>
          </Card>
        )}
      </div>
    </div>
  )
}
