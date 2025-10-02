"use client"

import type React from "react"
import { useState, useEffect } from "react"
import { Plus, CheckCircle, Flame, Trophy, Target, TrendingUp, Sprout, FileText, Zap, Star } from "lucide-react"
import { Navigation } from "@/components/navigation"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"

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
  icon: React.ComponentType<{ className?: string }>
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
    icon: Sprout,
  },
  {
    id: "2",
    title: "Getting Started",
    description: "Log 5 entries",
    target: 5,
    type: "total",
    achieved: false,
    icon: FileText,
  },
  {
    id: "3",
    title: "Consistent Tracker",
    description: "3-day streak",
    target: 3,
    type: "streak",
    achieved: false,
    icon: Flame,
  },
  {
    id: "4",
    title: "Week Warrior",
    description: "7-day streak",
    target: 7,
    type: "streak",
    achieved: false,
    icon: Zap,
  },
  {
    id: "5",
    title: "Dedicated Logger",
    description: "Log 25 entries",
    target: 25,
    type: "total",
    achieved: false,
    icon: Trophy,
  },
  {
    id: "6",
    title: "Streak Master",
    description: "14-day streak",
    target: 14,
    type: "streak",
    achieved: false,
    icon: Star,
  },
]

const formatDate = (date: Date) => {
  return date.toLocaleDateString("en-US", {
    year: "numeric",
    month: "short",
    day: "numeric",
  })
}

const isToday = (date: Date) => {
  const today = new Date()
  return date.toDateString() === today.toDateString()
}

const isYesterday = (date: Date) => {
  const yesterday = new Date()
  yesterday.setDate(yesterday.getDate() - 1)
  return date.toDateString() === yesterday.toDateString()
}

const differenceInDays = (date1: Date, date2: Date) => {
  const timeDiff = Math.abs(date1.getTime() - date2.getTime())
  return Math.ceil(timeDiff / (1000 * 3600 * 24))
}

const startOfDay = (date: Date) => {
  const newDate = new Date(date)
  newDate.setHours(0, 0, 0, 0)
  return newDate
}

export default function LogPage() {
  const [entries, setEntries] = useState<FoodWasteEntry[]>([])
  const [showForm, setShowForm] = useState(false)
  const [showSuccess, setShowSuccess] = useState(false)
  const [showMilestone, setShowMilestone] = useState<Milestone | null>(null)
  const [activeRoute, setActiveRoute] = useState("/log")
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
    const weeklyStreak = 0

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

    const totalItemsLogged = sortedEntries.reduce((acc, entry) => acc + Number.parseInt(entry.quantity || "0"), 0)

    return {
      currentStreak,
      longestStreak,
      lastLogDate: sortedEntries[0]?.date || null,
      weeklyStreak: Math.floor(entries.length / 7),
      totalItemsLogged,
    }
  }

  const checkMilestones = (newStreakData: StreakData, currentMilestones: Milestone[]) => {
    return currentMilestones.map((milestone) => {
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
  }

  const [currentMilestones, setCurrentMilestones] = useState<Milestone[]>(milestones)

  useEffect(() => {
    const newStreakData = calculateStreak(entries)
    setStreakData(newStreakData)
    const updatedMilestones = checkMilestones(newStreakData, currentMilestones)
    setCurrentMilestones(updatedMilestones)
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

  const ProgressBar = ({ value, max = 100 }: { value: number; max?: number }) => (
    <div
      className="w-full h-2.5 rounded-full bg-gray-200/80 overflow-hidden"
      role="progressbar"
      aria-valuenow={Math.min(value, max)}
      aria-valuemin={0}
      aria-valuemax={max}
    >
      <div
        className="h-full bg-[#4CAF50] transition-[width] duration-500 ease-out"
        style={{ width: `${Math.min((value / max) * 100, 100)}%` }}
      />
    </div>
  )

  const inputClass =
    "w-full h-11 px-3 rounded-lg border border-gray-300 bg-white text-gray-900 placeholder:text-gray-400 focus:outline-none focus:ring-2 focus:ring-[#4CAF50] focus:border-[#4CAF50] transition-colors"
  const textareaClass =
    "w-full min-h-24 p-3 rounded-lg border border-gray-300 bg-white text-gray-900 placeholder:text-gray-400 focus:outline-none focus:ring-2 focus:ring-[#4CAF50] focus:border-[#4CAF50] transition-colors"

  return (
    <div className="min-h-screen bg-gradient-to-br from-green-50 to-white text-gray-900 text-pretty">
      {/* Navigation */}
      <Navigation />

      <div className="container mx-auto px-4 py-6 max-w-7xl pb-28 md:pb-10 grid grid-cols-1 md:grid-cols-[240px_1fr] gap-6">
        <aside className="hidden md:block sticky top-20 h-max">
          <Card className="border-0 shadow-sm rounded-xl">
            <CardContent className="p-0">
              <nav aria-label="Log sections" className="p-2">
                <a
                  href="#overview"
                  className="block px-3 py-2 rounded-md text-sm font-medium text-gray-700 hover:bg-green-50 hover:text-green-700 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#4CAF50] transition-colors"
                >
                  Overview
                </a>
                <a
                  href="#achievements"
                  className="block px-3 py-2 rounded-md text-sm font-medium text-gray-700 hover:bg-green-50 hover:text-green-700 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#4CAF50] transition-colors"
                >
                  Achievements
                </a>
                <a
                  href="#add-entry"
                  className="block px-3 py-2 rounded-md text-sm font-medium text-gray-700 hover:bg-green-50 hover:text-green-700 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#4CAF50] transition-colors"
                >
                  Add Entry
                </a>
                <a
                  href="#recent"
                  className="block px-3 py-2 rounded-md text-sm font-medium text-gray-700 hover:bg-green-50 hover:text-green-700 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#4CAF50] transition-colors"
                >
                  Recent Entries
                </a>
                <a
                  href="#quick-stats"
                  className="block px-3 py-2 rounded-md text-sm font-medium text-gray-700 hover:bg-green-50 hover:text-green-700 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#4CAF50] transition-colors"
                >
                  Quick Stats
                </a>
              </nav>
            </CardContent>
          </Card>
        </aside>

        <main id="overview" className="space-y-6">
          {/* Header (success/milestone toasts kept as-is) */}
          {showSuccess && (
            <div className="mb-6 p-4 bg-green-50 border border-green-200 rounded-lg flex items-center gap-3">
              <CheckCircle className="w-5 h-5 text-green-600" />
              <span className="text-green-700 font-medium">Food waste entry logged successfully!</span>
            </div>
          )}

          {showMilestone && (
            <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
              <div className="bg-white rounded-lg shadow-2xl max-w-md w-full p-8 text-center">
                <div className="text-6xl mb-4">
                  <showMilestone.icon className="w-8 h-8" />
                </div>
                <h3 className="text-2xl font-bold text-gray-800 mb-2">Milestone Achieved!</h3>
                <h4 className="text-xl font-semibold text-green-600 mb-2">{showMilestone.title}</h4>
                <p className="text-gray-600 mb-6">{showMilestone.description}</p>
                <Button onClick={() => setShowMilestone(null)}>Awesome!</Button>
              </div>
            </div>
          )}

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
            <Card className="bg-gradient-to-br from-orange-50 to-red-50 rounded-xl shadow-md p-6 text-center hover:shadow-lg transition-shadow">
              <CardContent>
                <div className="flex items-center justify-center mb-3">
                  <Flame className="w-8 h-8 text-orange-500 mr-2" />
                  <span className="text-3xl font-bold text-orange-600">{streakData.currentStreak}</span>
                </div>
                <h3 className="font-semibold text-gray-800 mb-1">Current Streak</h3>
                <p className="text-sm text-gray-600">{getStreakStatus()}</p>
                <div className="mt-3">
                  <ProgressBar value={streakData.currentStreak} max={Math.max(streakData.longestStreak, 7)} />
                </div>
              </CardContent>
            </Card>

            <Card className="bg-gradient-to-br from-green-50 to-emerald-50 rounded-xl shadow-md p-6 text-center hover:shadow-lg transition-shadow">
              <CardContent>
                <div className="flex items-center justify-center mb-3">
                  <Target className="w-8 h-8 text-green-500 mr-2" />
                  <span className="text-3xl font-bold text-green-600">{streakData.totalItemsLogged}</span>
                </div>
                <h3 className="font-semibold text-gray-800 mb-1">Items Tracked</h3>
                <p className="text-sm text-gray-600">Total items logged</p>
                <div className="mt-3">
                  <ProgressBar value={streakData.totalItemsLogged} max={100} />
                </div>
              </CardContent>
            </Card>

            <Card className="bg-gradient-to-br from-blue-50 to-indigo-50 rounded-xl shadow-md p-6 text-center hover:shadow-lg transition-shadow">
              <CardContent>
                <div className="flex items-center justify-center mb-3">
                  <TrendingUp className="w-8 h-8 text-blue-500 mr-2" />
                  <span className="text-3xl font-bold text-blue-600">{streakData.weeklyStreak}</span>
                </div>
                <h3 className="font-semibold text-gray-800 mb-1">Weekly Streak</h3>
                <p className="text-sm text-gray-600">Consecutive weeks</p>
                <div className="mt-3">
                  <ProgressBar value={streakData.weeklyStreak} max={12} />
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Achievements */}
          <section id="achievements" className="scroll-mt-24">
            <Card className="bg-white rounded-lg shadow-lg mb-8">
              <CardContent>
                <div className="p-6 border-b border-gray-200">
                  <h2 className="text-xl font-bold text-gray-800 flex items-center gap-2">
                    <Trophy className="w-6 h-6 text-yellow-500" />
                    Achievements
                  </h2>
                </div>
                <div className="p-6">
                  <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
                    {currentMilestones.map((milestone) => {
                      const IconComponent = milestone.icon
                      return (
                        <div
                          key={milestone.id}
                          className={`p-4 rounded-lg text-center transition-all duration-300 ${
                            milestone.achieved
                              ? "bg-gradient-to-br from-yellow-50 to-orange-50 border-2 border-yellow-200 hover:-translate-y-1 hover:shadow-lg"
                              : "bg-gray-50 border-2 border-gray-200 opacity-60 hover:opacity-100 hover:border-gray-300"
                          }`}
                        >
                          <div className="flex items-center justify-center mb-2">
                            <IconComponent
                              className={`w-8 h-8 transition-all duration-300 ${
                                milestone.achieved
                                  ? "text-[#4CAF50] hover:scale-110"
                                  : "text-gray-400 hover:text-gray-500"
                              }`}
                            />
                          </div>
                          <h4 className="font-semibold text-sm text-gray-800 mb-1">{milestone.title}</h4>
                          <p className="text-xs text-gray-600">{milestone.description}</p>
                          {milestone.achieved && (
                            <div className="mt-2">
                              <span className="text-xs bg-green-100 text-green-700 px-2 py-1 rounded-full">
                                Completed!
                              </span>
                            </div>
                          )}
                        </div>
                      )
                    })}
                  </div>
                </div>
              </CardContent>
            </Card>
          </section>

          {/* Section header with Add button */}
          <section id="add-entry" className="scroll-mt-24">
            <div className="flex items-center justify-between mb-8">
              <div>
                <h1 className="text-3xl font-bold text-gray-800 mb-1 text-balance">Log Food Waste</h1>
                <p className="text-gray-600 text-sm">Track your food waste to identify patterns and reduce waste</p>
              </div>
              {/* Swap to Button component for consistency and add smooth transition */}
              <Button className="bg-[#4CAF50] hover:bg-[#45a049] text-white" onClick={() => setShowForm(true)}>
                <Plus className="w-4 h-4 mr-2" />
                Add Entry
              </Button>
            </div>
          </section>

          {/* Form */}
          {showForm && (
            <Card className="bg-white rounded-lg shadow-lg mb-8">
              <CardContent>
                <div className="p-6 border-b border-gray-200">
                  <h2 className="text-xl font-bold text-gray-800">Add Food Waste Entry</h2>
                </div>
                <div className="p-6">
                  <form onSubmit={handleSubmit} className="space-y-6">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      <div className="space-y-2">
                        <label className="text-sm font-medium text-gray-700">Food Item *</label>
                        <input
                          type="text"
                          placeholder="e.g., Bananas, Leftover pasta"
                          value={formData.foodItem}
                          onChange={(e) => handleInputChange("foodItem", e.target.value)}
                          className={inputClass}
                          required
                        />
                      </div>

                      <div className="space-y-2">
                        <label className="text-sm font-medium text-gray-700">Category *</label>
                        <select
                          value={formData.category}
                          onChange={(e) => handleInputChange("category", e.target.value)}
                          className={inputClass}
                          required
                        >
                          <option value="">Select category</option>
                          {categories.map((category) => (
                            <option key={category} value={category}>
                              {category}
                            </option>
                          ))}
                        </select>
                      </div>

                      <div className="space-y-2">
                        <label className="text-sm font-medium text-gray-700">Quantity *</label>
                        <input
                          type="number"
                          placeholder="e.g., 2"
                          value={formData.quantity}
                          onChange={(e) => handleInputChange("quantity", e.target.value)}
                          className={inputClass}
                          required
                        />
                      </div>

                      <div className="space-y-2">
                        <label className="text-sm font-medium text-gray-700">Unit *</label>
                        <select
                          value={formData.unit}
                          onChange={(e) => handleInputChange("unit", e.target.value)}
                          className={inputClass}
                          required
                        >
                          <option value="">Select unit</option>
                          {units.map((unit) => (
                            <option key={unit} value={unit}>
                              {unit}
                            </option>
                          ))}
                        </select>
                      </div>

                      <div className="space-y-2">
                        <label className="text-sm font-medium text-gray-700">Reason for Waste *</label>
                        <select
                          value={formData.reason}
                          onChange={(e) => handleInputChange("reason", e.target.value)}
                          className={inputClass}
                          required
                        >
                          <option value="">Why was it wasted?</option>
                          {reasons.map((reason) => (
                            <option key={reason} value={reason}>
                              {reason}
                            </option>
                          ))}
                        </select>
                      </div>

                      <div className="space-y-2">
                        <label className="text-sm font-medium text-gray-700">Date *</label>
                        <input
                          type="date"
                          value={formData.date.toISOString().split("T")[0]}
                          onChange={(e) => handleInputChange("date", new Date(e.target.value))}
                          className={inputClass}
                          required
                        />
                      </div>
                    </div>

                    <div className="space-y-2">
                      <label className="text-sm font-medium text-gray-700">Additional Notes (Optional)</label>
                      <textarea
                        placeholder="Any additional details about the waste..."
                        value={formData.notes}
                        onChange={(e) => handleInputChange("notes", e.target.value)}
                        rows={3}
                        className={textareaClass}
                      />
                    </div>

                    <div className="flex gap-4">
                      <Button type="submit" className="bg-[#4CAF50] hover:bg-[#45a049] text-white">
                        Log Entry
                      </Button>
                      <Button
                        type="button"
                        variant="outline"
                        className="border-[#4CAF50] text-[#4CAF50] hover:bg-[#4CAF50] hover:text-white bg-transparent"
                        onClick={() => setShowForm(false)}
                      >
                        Cancel
                      </Button>
                    </div>
                  </form>
                </div>
              </CardContent>
            </Card>
          )}

          {/* Entries List */}
          <section id="recent" className="scroll-mt-24">
            <div className="flex items-center justify-between">
              <h2 className="text-2xl font-bold text-gray-800">Recent Entries</h2>
              {entries.length > 0 && <span className="text-sm text-gray-500">{entries.length} entries logged</span>}
            </div>

            {entries.length === 0 ? (
              <div className="bg-white rounded-lg shadow-lg p-12 text-center">
                <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
                  <Plus className="w-8 h-8 text-green-600" />
                </div>
                <h3 className="text-xl font-bold text-gray-800 mb-2">No entries yet</h3>
                <p className="text-gray-600 mb-6">Start tracking your food waste to see insights and reduce waste.</p>
                <Button
                  className="bg-[#4CAF50] hover:bg-[#45a049] text-white mx-auto"
                  onClick={() => setShowForm(true)}
                >
                  <Plus className="w-4 h-4 mr-2" />
                  Add Your First Entry
                </Button>
              </div>
            ) : (
              <div className="space-y-4">
                {entries.map((entry) => (
                  <Card key={entry.id} className="bg-white rounded-xl shadow-md hover:shadow-lg transition-shadow p-6">
                    <CardContent>
                      <div className="flex items-start justify-between">
                        <div className="flex-1">
                          <div className="flex items-center gap-3 mb-2">
                            <h3 className="text-lg font-bold text-gray-800">{entry.foodItem}</h3>
                            <span className="px-2 py-1 bg-green-100 text-green-700 text-xs rounded-full">
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
                              <span className="font-medium">Date:</span> {formatDate(entry.date)}
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
          </section>

          {/* Quick Stats */}
          <section id="quick-stats" className="scroll-mt-24">
            {entries.length > 0 && (
              <Card className="mt-8 bg-gradient-to-r from-green-50 to-emerald-50 rounded-xl shadow-md p-6">
                <CardContent>
                  <h3 className="text-lg font-bold text-gray-800 mb-4">Quick Stats</h3>
                  <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
                    <div className="text-center">
                      <div className="text-2xl font-bold text-green-600 mb-1">{entries.length}</div>
                      <div className="text-sm text-gray-600">Total Entries</div>
                    </div>
                    <div className="text-center">
                      <div className="text-2xl font-bold text-green-600 mb-1">
                        {entries.reduce((acc, entry) => acc + Number.parseInt(entry.quantity || "0"), 0)}
                      </div>
                      <div className="text-sm text-gray-600">Items Wasted</div>
                    </div>
                    <div className="text-center">
                      <div className="text-2xl font-bold text-green-600 mb-1">
                        {new Set(entries.map((entry) => entry.category)).size}
                      </div>
                      <div className="text-sm text-gray-600">Categories</div>
                    </div>
                    <div className="text-center">
                      <div className="text-2xl font-bold text-green-600 mb-1">{streakData.longestStreak}</div>
                      <div className="text-sm text-gray-600">Longest Streak</div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            )}
          </section>
        </main>
      </div>

      <footer className="border-t bg-white/70 backdrop-blur supports-[backdrop-filter]:bg-white/60">
        <div className="container mx-auto px-4 py-6 max-w-7xl text-sm text-gray-500 flex items-center justify-between">
          <span>© 2025 FOOPTRA</span>
          <span className="hidden md:inline">Track, reduce, and eliminate food waste.</span>
        </div>
      </footer>
    </div>
  )
}
