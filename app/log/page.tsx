import React, { useState, useEffect } from "react"
import { CalendarIcon, Plus, CheckCircle, Flame, Trophy, Target, TrendingUp, Home, BarChart3, User, Smartphone } from "lucide-react"

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
]

const formatDate = (date: Date) => {
  return date.toLocaleDateString('en-US', { 
    year: 'numeric', 
    month: 'short', 
    day: 'numeric' 
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

    const totalItemsLogged = sortedEntries.reduce((acc, entry) => acc + parseInt(entry.quantity || "0"), 0)

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
    <div className="w-full bg-gray-200 rounded-full h-2">
      <div 
        className="bg-green-500 h-2 rounded-full transition-all duration-500" 
        style={{ width: `${Math.min((value / max) * 100, 100)}%` }}
      ></div>
    </div>
  )

  return (
    <div className="min-h-screen bg-gradient-to-br from-green-50 to-white text-gray-900">
      {/* Header */}
      <header className="bg-white/80 backdrop-blur-xl border-b border-gray-200 px-4 sm:px-6 py-4 sticky top-0 z-50">
        <div className="flex items-center justify-between max-w-7xl mx-auto">
          <div className="flex items-center gap-3">
            <div>
              <h1 className="text-lg sm:text-xl font-bold text-green-600">FOOPTRA</h1>
              <p className="text-xs text-gray-500">Food Waste Logger</p>
            </div>
          </div>
          <div className="flex items-center gap-2">
            <div className="w-2 h-2 rounded-full bg-green-400 animate-pulse"></div>
            <span className="text-xs sm:text-sm text-green-600 font-medium">Tracking</span>
          </div>
        </div>
      </header>

      <div className="container mx-auto px-4 py-8 max-w-4xl pb-32 md:pb-8">
        {showSuccess && (
          <div className="mb-6 p-4 bg-green-50 border border-green-200 rounded-lg flex items-center gap-3">
            <CheckCircle className="w-5 h-5 text-green-600" />
            <span className="text-green-700 font-medium">Food waste entry logged successfully!</span>
          </div>
        )}

        {showMilestone && (
          <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
            <div className="bg-white rounded-lg shadow-2xl max-w-md w-full p-8 text-center">
              <div className="text-6xl mb-4">{showMilestone.icon}</div>
              <h3 className="text-2xl font-bold text-gray-800 mb-2">Milestone Achieved!</h3>
              <h4 className="text-xl font-semibold text-green-600 mb-2">{showMilestone.title}</h4>
              <p className="text-gray-600 mb-6">{showMilestone.description}</p>
              <button 
                className="bg-green-600 hover:bg-green-700 text-white px-6 py-2 rounded-lg transition-colors"
                onClick={() => setShowMilestone(null)}
              >
                Awesome!
              </button>
            </div>
          </div>
        )}

        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
          <div className="bg-gradient-to-br from-orange-50 to-red-50 rounded-lg shadow-lg p-6 text-center">
            <div className="flex items-center justify-center mb-3">
              <Flame className="w-8 h-8 text-orange-500 mr-2" />
              <span className="text-3xl font-bold text-orange-600">{streakData.currentStreak}</span>
            </div>
            <h3 className="font-semibold text-gray-800 mb-1">Current Streak</h3>
            <p className="text-sm text-gray-600">{getStreakStatus()}</p>
            <div className="mt-3">
              <ProgressBar value={streakData.currentStreak} max={Math.max(streakData.longestStreak, 7)} />
            </div>
          </div>

          <div className="bg-gradient-to-br from-green-50 to-emerald-50 rounded-lg shadow-lg p-6 text-center">
            <div className="flex items-center justify-center mb-3">
              <Target className="w-8 h-8 text-green-500 mr-2" />
              <span className="text-3xl font-bold text-green-600">{streakData.totalItemsLogged}</span>
            </div>
            <h3 className="font-semibold text-gray-800 mb-1">Items Tracked</h3>
            <p className="text-sm text-gray-600">Total items logged</p>
            <div className="mt-3">
              <ProgressBar value={streakData.totalItemsLogged} max={100} />
            </div>
          </div>

          <div className="bg-gradient-to-br from-blue-50 to-indigo-50 rounded-lg shadow-lg p-6 text-center">
            <div className="flex items-center justify-center mb-3">
              <TrendingUp className="w-8 h-8 text-blue-500 mr-2" />
              <span className="text-3xl font-bold text-blue-600">{streakData.weeklyStreak}</span>
            </div>
            <h3 className="font-semibold text-gray-800 mb-1">Weekly Streak</h3>
            <p className="text-sm text-gray-600">Consecutive weeks</p>
            <div className="mt-3">
              <ProgressBar value={streakData.weeklyStreak} max={12} />
            </div>
          </div>
        </div>

        {/* Achievements */}
        <div className="bg-white rounded-lg shadow-lg mb-8">
          <div className="p-6 border-b border-gray-200">
            <h2 className="text-xl font-bold text-gray-800 flex items-center gap-2">
              <Trophy className="w-6 h-6 text-yellow-500" />
              Achievements
            </h2>
          </div>
          <div className="p-6">
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
              {currentMilestones.map((milestone) => (
                <div
                  key={milestone.id}
                  className={`p-4 rounded-lg text-center transition-all ${
                    milestone.achieved
                      ? "bg-gradient-to-br from-yellow-50 to-orange-50 border-2 border-yellow-200"
                      : "bg-gray-50 border-2 border-gray-200 opacity-60"
                  }`}
                >
                  <div className="text-2xl mb-2">{milestone.icon}</div>
                  <h4 className="font-semibold text-sm text-gray-800 mb-1">{milestone.title}</h4>
                  <p className="text-xs text-gray-600">{milestone.description}</p>
                  {milestone.achieved && (
                    <div className="mt-2">
                      <span className="text-xs bg-green-100 text-green-700 px-2 py-1 rounded-full">Completed!</span>
                    </div>
                  )}
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Header with Add Button */}
        <div className="flex items-center justify-between mb-8">
          <div>
            <h1 className="text-3xl font-bold text-gray-800 mb-2">Log Food Waste</h1>
            <p className="text-gray-600">Track your food waste to identify patterns and reduce waste</p>
          </div>
          <button 
            className="bg-green-600 hover:bg-green-700 text-white px-4 py-2 rounded-lg flex items-center gap-2 transition-colors"
            onClick={() => setShowForm(true)}
          >
            <Plus className="w-4 h-4" />
            Add Entry
          </button>
        </div>

        {/* Form */}
        {showForm && (
          <div className="bg-white rounded-lg shadow-lg mb-8">
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
                      className="w-full p-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-green-500"
                      required
                    />
                  </div>

                  <div className="space-y-2">
                    <label className="text-sm font-medium text-gray-700">Category *</label>
                    <select
                      value={formData.category}
                      onChange={(e) => handleInputChange("category", e.target.value)}
                      className="w-full p-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-green-500"
                      required
                    >
                      <option value="">Select category</option>
                      {categories.map((category) => (
                        <option key={category} value={category}>{category}</option>
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
                      className="w-full p-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-green-500"
                      required
                    />
                  </div>

                  <div className="space-y-2">
                    <label className="text-sm font-medium text-gray-700">Unit *</label>
                    <select
                      value={formData.unit}
                      onChange={(e) => handleInputChange("unit", e.target.value)}
                      className="w-full p-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-green-500"
                      required
                    >
                      <option value="">Select unit</option>
                      {units.map((unit) => (
                        <option key={unit} value={unit}>{unit}</option>
                      ))}
                    </select>
                  </div>

                  <div className="space-y-2">
                    <label className="text-sm font-medium text-gray-700">Reason for Waste *</label>
                    <select
                      value={formData.reason}
                      onChange={(e) => handleInputChange("reason", e.target.value)}
                      className="w-full p-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-green-500"
                      required
                    >
                      <option value="">Why was it wasted?</option>
                      {reasons.map((reason) => (
                        <option key={reason} value={reason}>{reason}</option>
                      ))}
                    </select>
                  </div>

                  <div className="space-y-2">
                    <label className="text-sm font-medium text-gray-700">Date *</label>
                    <input
                      type="date"
                      value={formData.date.toISOString().split('T')[0]}
                      onChange={(e) => handleInputChange("date", new Date(e.target.value))}
                      className="w-full p-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-green-500"
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
                    className="w-full p-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-green-500"
                  />
                </div>

                <div className="flex gap-4">
                  <button 
                    type="submit" 
                    className="bg-green-600 hover:bg-green-700 text-white px-6 py-2 rounded-lg transition-colors"
                  >
                    Log Entry
                  </button>
                  <button 
                    type="button" 
                    onClick={() => setShowForm(false)}
                    className="border border-gray-300 text-gray-700 hover:bg-gray-50 px-6 py-2 rounded-lg transition-colors"
                  >
                    Cancel
                  </button>
                </div>
              </form>
            </div>
          </div>
        )}

        {/* Entries List */}
        <div className="space-y-6">
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
              <button 
                className="bg-green-600 hover:bg-green-700 text-white px-6 py-2 rounded-lg flex items-center gap-2 mx-auto transition-colors"
                onClick={() => setShowForm(true)}
              >
                <Plus className="w-4 h-4" />
                Add Your First Entry
              </button>
            </div>
          ) : (
            <div className="space-y-4">
              {entries.map((entry) => (
                <div key={entry.id} className="bg-white rounded-lg shadow-lg hover:shadow-xl transition-shadow p-6">
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
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Quick Stats */}
        {entries.length > 0 && (
          <div className="mt-8 bg-gradient-to-r from-green-50 to-emerald-50 rounded-lg shadow-lg p-6">
            <h3 className="text-lg font-bold text-gray-800 mb-4">Quick Stats</h3>
            <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
              <div className="text-center">
                <div className="text-2xl font-bold text-green-600 mb-1">{entries.length}</div>
                <div className="text-sm text-gray-600">Total Entries</div>
              </div>
              <div className="text-center">
                <div className="text-2xl font-bold text-green-600 mb-1">
                  {entries.reduce((acc, entry) => acc + parseInt(entry.quantity || "0"), 0)}
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
          </div>
        )}
      </div>

      {/* Bottom Navigation - Mobile Only */}
      <div className="fixed bottom-0 left-0 right-0 bg-white/95 backdrop-blur-xl border-t border-gray-200 md:hidden z-50 shadow-2xl">
        <div className="flex items-center justify-around py-4 px-2">
          <a
            href="/"
            className={`flex flex-col items-center gap-1 p-3 min-w-0 rounded-xl transition-all duration-200 cursor-pointer ${
              activeRoute === "/"
                ? "text-green-600 bg-green-100"
                : "text-gray-400 hover:text-gray-600 hover:bg-gray-100"
            }`}
            onClick={() => setActiveRoute("/")}
          >
            <Home className="w-5 h-5" />
            <span className="text-xs font-medium">Home</span>
          </a>

          <a
            href="/dashboard"
            className={`flex flex-col items-center gap-1 p-3 min-w-0 rounded-xl transition-all duration-200 cursor-pointer ${
              activeRoute === "/dashboard"
                ? "text-green-600 bg-green-100"
                : "text-gray-400 hover:text-gray-600 hover:bg-gray-100"
            }`}
            onClick={() => setActiveRoute("/dashboard")}
          >
            <BarChart3 className="w-5 h-5" />
            <span className="text-xs font-medium">Stats</span>
          </a>

          <a
            href="/log"
            className={`flex flex-col items-center gap-1 p-3 min-w-0 rounded-xl transition-all duration-200 cursor-pointer ${
              activeRoute === "/log"
                ? "text-green-600 bg-green-100"
                : "text-gray-400 hover:text-gray-600 hover:bg-gray-100"
            }`}
            onClick={() => setActiveRoute("/log")}
          >
            <Smartphone className="w-5 h-5" />
            <span className="text-xs font-medium">Logs</span>
          </a>

          <a
            href="/profile"
            className={`flex flex-col items-center gap-1 p-3 min-w-0 rounded-xl transition-all duration-200 cursor-pointer ${
              activeRoute === "/profile"
                ? "text-green-600 bg-green-100"
                : "text-gray-400 hover:text-gray-600 hover:bg-gray-100"
            }`}
            onClick={() => setActiveRoute("/profile")}
          >
            <User className="w-5 h-5" />
            <span className="text-xs font-medium">Profile</span>
          </a>
        </div>
      </div>
    </div>
  )
}
