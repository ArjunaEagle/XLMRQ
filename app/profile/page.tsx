"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Switch } from "@/components/ui/switch"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Badge } from "@/components/ui/badge"
import { Progress } from "@/components/ui/progress"
import { Navigation } from "@/components/navigation"
import {
  User,
  Settings,
  Target,
  Bell,
  Shield,
  Download,
  Upload,
  Camera,
  Save,
  Trash2,
  Award,
  Calendar,
  TrendingDown,
  Leaf,
} from "lucide-react"

export default function ProfilePage() {
  const [profileData, setProfileData] = useState({
    name: "Arjuna",
    email: "arjuna.alazhar@email.com",
    bio: "Passionate about reducing food waste and living sustainably. On a mission to achieve zero waste by 2025!",
    location: "Yogyakarta",
    joinDate: "March 2024",
  })

  const [goals, setGoals] = useState({
    weeklyWasteReduction: 20,
    monthlySavingsTarget: 200,
    dailyLoggingStreak: 30,
  })

  const [preferences, setPreferences] = useState({
    units: "metric",
    currency: "USD",
    language: "English",
    timezone: "PST",
  })

  const [notifications, setNotifications] = useState({
    dailyReminders: true,
    weeklyReports: true,
    goalAchievements: true,
    tipOfTheDay: false,
    communityUpdates: false,
  })

  const [privacy, setPrivacy] = useState({
    profileVisibility: "public",
    shareStats: true,
    dataCollection: true,
  })

  const handleProfileUpdate = (field: string, value: string) => {
    setProfileData((prev) => ({ ...prev, [field]: value }))
  }

  const handleGoalUpdate = (field: string, value: number) => {
    setGoals((prev) => ({ ...prev, [field]: value }))
  }

  const handlePreferenceUpdate = (field: string, value: string) => {
    setPreferences((prev) => ({ ...prev, [field]: value }))
  }

  const handleNotificationToggle = (field: string) => {
    setNotifications((prev) => ({ ...prev, [field]: !prev[field as keyof typeof prev] }))
  }

  const handlePrivacyToggle = (field: string) => {
    setPrivacy((prev) => ({ ...prev, [field]: !prev[field as keyof typeof prev] }))
  }

  const achievements = [
    { name: "First Steps", description: "Logged your first food waste entry", earned: true, date: "Mar 15, 2024" },
    { name: "Week Warrior", description: "Logged waste for 7 consecutive days", earned: true, date: "Mar 22, 2024" },
    { name: "Goal Crusher", description: "Achieved your first weekly goal", earned: true, date: "Mar 29, 2024" },
    { name: "Eco Champion", description: "Reduced waste by 50% in a month", earned: false, date: null },
    { name: "Community Helper", description: "Shared 10 helpful tips", earned: false, date: null },
  ]

  const stats = {
    totalWasteLogged: "45.2 kg",
    moneySaved: "$387",
    co2Reduced: "23.1 kg",
    streakDays: 18,
    level: 3,
    points: 1247,
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-green-50 to-white pb-20 md:pb-0">
      <Navigation />

      <div className="container mx-auto px-4 py-8 max-w-6xl">
        <div className="flex items-center justify-between mb-8">
          <div>
            <h1 className="text-3xl font-serif font-bold text-[#2E2E2E] mb-2">Profile & Settings</h1>
            <p className="text-gray-600">Manage your account, goals, and preferences</p>
          </div>
          <Button className="bg-[#4CAF50] hover:bg-[#45a049] text-white">
            <Save className="w-4 h-4 mr-2" />
            Save Changes
          </Button>
        </div>

        <Tabs defaultValue="profile" className="w-full">
          <TabsList className="grid w-full grid-cols-2 md:grid-cols-5 mb-8">
            <TabsTrigger value="profile" className="flex items-center gap-2">
              <User className="w-4 h-4" />
              <span className="hidden sm:inline">Profile</span>
            </TabsTrigger>
            <TabsTrigger value="goals" className="flex items-center gap-2">
              <Target className="w-4 h-4" />
              <span className="hidden sm:inline">Goals</span>
            </TabsTrigger>
            <TabsTrigger value="settings" className="flex items-center gap-2">
              <Settings className="w-4 h-4" />
              <span className="hidden sm:inline">Settings</span>
            </TabsTrigger>
            <TabsTrigger value="notifications" className="flex items-center gap-2">
              <Bell className="w-4 h-4" />
              <span className="hidden sm:inline">Notifications</span>
            </TabsTrigger>
            <TabsTrigger value="privacy" className="flex items-center gap-2">
              <Shield className="w-4 h-4" />
              <span className="hidden sm:inline">Privacy</span>
            </TabsTrigger>
          </TabsList>

          {/* Profile Tab */}
          <TabsContent value="profile" className="space-y-8">
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
              {/* Profile Info */}
              <div className="lg:col-span-2">
                <Card className="border-0 shadow-lg">
                  <CardHeader>
                    <CardTitle className="text-xl font-serif text-[#2E2E2E]">Profile Information</CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-6">
                    <div className="flex items-center gap-6">
                      <div className="relative">
                        <Avatar className="w-20 h-20">
                          <AvatarImage src="/abstract-profile.png" />
                          <AvatarFallback className="bg-[#4CAF50] text-white text-xl">AJ</AvatarFallback>
                        </Avatar>
                        <Button
                          size="sm"
                          className="absolute -bottom-2 -right-2 w-8 h-8 rounded-full bg-[#4CAF50] hover:bg-[#45a049]"
                        >
                          <Camera className="w-4 h-4" />
                        </Button>
                      </div>
                      <div>
                        <h3 className="text-lg font-serif font-semibold text-[#2E2E2E]">{profileData.name}</h3>
                        <p className="text-gray-600">{profileData.email}</p>
                        <Badge className="mt-2 bg-[#4CAF50]/10 text-[#4CAF50]">Level {stats.level}</Badge>
                      </div>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div className="space-y-2">
                        <Label htmlFor="name">Full Name</Label>
                        <Input
                          id="name"
                          value={profileData.name}
                          onChange={(e) => handleProfileUpdate("name", e.target.value)}
                        />
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="email">Email Address</Label>
                        <Input
                          id="email"
                          type="email"
                          value={profileData.email}
                          onChange={(e) => handleProfileUpdate("email", e.target.value)}
                        />
                      </div>
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="bio">Bio</Label>
                      <Textarea
                        id="bio"
                        rows={3}
                        value={profileData.bio}
                        onChange={(e) => handleProfileUpdate("bio", e.target.value)}
                        placeholder="Tell us about your food waste reduction journey..."
                      />
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div className="space-y-2">
                        <Label htmlFor="location">Location</Label>
                        <Input
                          id="location"
                          value={profileData.location}
                          onChange={(e) => handleProfileUpdate("location", e.target.value)}
                        />
                      </div>
                      <div className="space-y-2">
                        <Label>Member Since</Label>
                        <Input value={profileData.joinDate} disabled />
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </div>

              {/* Stats Card */}
              <div>
                <Card className="border-0 shadow-lg">
                  <CardHeader>
                    <CardTitle className="text-xl font-serif text-[#2E2E2E]">Your Impact</CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-6">
                    <div className="text-center">
                      <div className="text-3xl font-bold text-[#4CAF50] mb-1">{stats.points}</div>
                      <div className="text-sm text-gray-600">Eco Points</div>
                      <Progress value={75} className="mt-2" />
                      <div className="text-xs text-gray-500 mt-1">253 points to Level 4</div>
                    </div>

                    <div className="space-y-4">
                      <div className="flex items-center justify-between">
                        <div className="flex items-center gap-2">
                          <TrendingDown className="w-4 h-4 text-[#4CAF50]" />
                          <span className="text-sm">Waste Logged</span>
                        </div>
                        <span className="font-semibold text-[#2E2E2E]">{stats.totalWasteLogged}</span>
                      </div>
                      <div className="flex items-center justify-between">
                        <div className="flex items-center gap-2">
                          <span className="text-sm">💰</span>
                          <span className="text-sm">Money Saved</span>
                        </div>
                        <span className="font-semibold text-[#2E2E2E]">{stats.moneySaved}</span>
                      </div>
                      <div className="flex items-center justify-between">
                        <div className="flex items-center gap-2">
                          <Leaf className="w-4 h-4 text-[#8BC34A]" />
                          <span className="text-sm">CO₂ Reduced</span>
                        </div>
                        <span className="font-semibold text-[#2E2E2E]">{stats.co2Reduced}</span>
                      </div>
                      <div className="flex items-center justify-between">
                        <div className="flex items-center gap-2">
                          <Calendar className="w-4 h-4 text-[#FFC107]" />
                          <span className="text-sm">Current Streak</span>
                        </div>
                        <span className="font-semibold text-[#2E2E2E]">{stats.streakDays} days</span>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </div>
            </div>

            {/* Achievements */}
            <Card className="border-0 shadow-lg">
              <CardHeader>
                <CardTitle className="text-xl font-serif text-[#2E2E2E] flex items-center gap-2">
                  <Award className="w-5 h-5 text-[#FFC107]" />
                  Achievements
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                  {achievements.map((achievement, index) => (
                    <div
                      key={index}
                      className={`p-4 rounded-lg border-2 ${
                        achievement.earned ? "border-[#4CAF50] bg-[#4CAF50]/5" : "border-gray-200 bg-gray-50 opacity-60"
                      }`}
                    >
                      <div className="flex items-center gap-3 mb-2">
                        <div
                          className={`w-10 h-10 rounded-full flex items-center justify-center ${
                            achievement.earned ? "bg-[#4CAF50]" : "bg-gray-400"
                          }`}
                        >
                          <Award className="w-5 h-5 text-white" />
                        </div>
                        <div>
                          <h4 className="font-semibold text-[#2E2E2E]">{achievement.name}</h4>
                          {achievement.earned && achievement.date && (
                            <p className="text-xs text-gray-500">{achievement.date}</p>
                          )}
                        </div>
                      </div>
                      <p className="text-sm text-gray-600">{achievement.description}</p>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          {/* Goals Tab */}
          <TabsContent value="goals" className="space-y-8">
            <Card className="border-0 shadow-lg">
              <CardHeader>
                <CardTitle className="text-xl font-serif text-[#2E2E2E]">Personal Goals</CardTitle>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="space-y-4">
                  <div>
                    <Label htmlFor="weeklyReduction">Weekly Waste Reduction Target (%)</Label>
                    <div className="flex items-center gap-4 mt-2">
                      <Input
                        id="weeklyReduction"
                        type="number"
                        value={goals.weeklyWasteReduction}
                        onChange={(e) => handleGoalUpdate("weeklyWasteReduction", Number.parseInt(e.target.value))}
                        className="w-24"
                      />
                      <span className="text-sm text-gray-600">Current progress: 78%</span>
                    </div>
                    <Progress value={78} className="mt-2" />
                  </div>

                  <div>
                    <Label htmlFor="monthlySavings">Monthly Savings Target ($)</Label>
                    <div className="flex items-center gap-4 mt-2">
                      <Input
                        id="monthlySavings"
                        type="number"
                        value={goals.monthlySavingsTarget}
                        onChange={(e) => handleGoalUpdate("monthlySavingsTarget", Number.parseInt(e.target.value))}
                        className="w-24"
                      />
                      <span className="text-sm text-gray-600">Current progress: 92%</span>
                    </div>
                    <Progress value={92} className="mt-2" />
                  </div>

                  <div>
                    <Label htmlFor="dailyStreak">Daily Logging Streak Target (days)</Label>
                    <div className="flex items-center gap-4 mt-2">
                      <Input
                        id="dailyStreak"
                        type="number"
                        value={goals.dailyLoggingStreak}
                        onChange={(e) => handleGoalUpdate("dailyLoggingStreak", Number.parseInt(e.target.value))}
                        className="w-24"
                      />
                      <span className="text-sm text-gray-600">Current streak: 18 days</span>
                    </div>
                    <Progress value={60} className="mt-2" />
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          {/* Settings Tab */}
          <TabsContent value="settings" className="space-y-8">
            <Card className="border-0 shadow-lg">
              <CardHeader>
                <CardTitle className="text-xl font-serif text-[#2E2E2E]">App Preferences</CardTitle>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="space-y-2">
                    <Label htmlFor="units">Measurement Units</Label>
                    <Select value={preferences.units} onValueChange={(value) => handlePreferenceUpdate("units", value)}>
                      <SelectTrigger>
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="metric">Metric (kg, liters)</SelectItem>
                        <SelectItem value="imperial">Imperial (lbs, gallons)</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="currency">Currency</Label>
                    <Select
                      value={preferences.currency}
                      onValueChange={(value) => handlePreferenceUpdate("currency", value)}
                    >
                      <SelectTrigger>
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="USD">USD ($)</SelectItem>
                        <SelectItem value="EUR">EUR (€)</SelectItem>
                        <SelectItem value="GBP">GBP (£)</SelectItem>
                        <SelectItem value="CAD">CAD (C$)</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="language">Language</Label>
                    <Select
                      value={preferences.language}
                      onValueChange={(value) => handlePreferenceUpdate("language", value)}
                    >
                      <SelectTrigger>
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="English">English</SelectItem>
                        <SelectItem value="Spanish">Español</SelectItem>
                        <SelectItem value="French">Français</SelectItem>
                        <SelectItem value="German">Deutsch</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="timezone">Timezone</Label>
                    <Select
                      value={preferences.timezone}
                      onValueChange={(value) => handlePreferenceUpdate("timezone", value)}
                    >
                      <SelectTrigger>
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="PST">Pacific (PST)</SelectItem>
                        <SelectItem value="MST">Mountain (MST)</SelectItem>
                        <SelectItem value="CST">Central (CST)</SelectItem>
                        <SelectItem value="EST">Eastern (EST)</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Data Management */}
            <Card className="border-0 shadow-lg">
              <CardHeader>
                <CardTitle className="text-xl font-serif text-[#2E2E2E]">Data Management</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex items-center justify-between p-4 bg-[#4CAF50]/5 rounded-lg">
                  <div>
                    <h4 className="font-semibold text-[#2E2E2E]">Export Data</h4>
                    <p className="text-sm text-gray-600">Download all your food waste data</p>
                  </div>
                  <Button variant="outline" className="flex items-center gap-2 bg-transparent">
                    <Download className="w-4 h-4" />
                    Export
                  </Button>
                </div>

                <div className="flex items-center justify-between p-4 bg-[#FFC107]/5 rounded-lg">
                  <div>
                    <h4 className="font-semibold text-[#2E2E2E]">Import Data</h4>
                    <p className="text-sm text-gray-600">Import data from another app</p>
                  </div>
                  <Button variant="outline" className="flex items-center gap-2 bg-transparent">
                    <Upload className="w-4 h-4" />
                    Import
                  </Button>
                </div>

                <div className="flex items-center justify-between p-4 bg-red-50 rounded-lg">
                  <div>
                    <h4 className="font-semibold text-red-600">Delete Account</h4>
                    <p className="text-sm text-gray-600">Permanently delete your account and all data</p>
                  </div>
                  <Button variant="destructive" className="flex items-center gap-2">
                    <Trash2 className="w-4 h-4" />
                    Delete
                  </Button>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          {/* Notifications Tab */}
          <TabsContent value="notifications" className="space-y-8">
            <Card className="border-0 shadow-lg">
              <CardHeader>
                <CardTitle className="text-xl font-serif text-[#2E2E2E]">Notification Preferences</CardTitle>
              </CardHeader>
              <CardContent className="space-y-6">
                {Object.entries(notifications).map(([key, value]) => (
                  <div key={key} className="flex items-center justify-between">
                    <div>
                      <h4 className="font-medium text-[#2E2E2E] capitalize">{key.replace(/([A-Z])/g, " $1").trim()}</h4>
                      <p className="text-sm text-gray-600">
                        {key === "dailyReminders" && "Get reminded to log your food waste daily"}
                        {key === "weeklyReports" && "Receive weekly progress reports"}
                        {key === "goalAchievements" && "Celebrate when you reach your goals"}
                        {key === "tipOfTheDay" && "Daily tips to reduce food waste"}
                        {key === "communityUpdates" && "Updates from the FOOPTRA community"}
                      </p>
                    </div>
                    <Switch checked={value} onCheckedChange={() => handleNotificationToggle(key)} />
                  </div>
                ))}
              </CardContent>
            </Card>
          </TabsContent>

          {/* Privacy Tab */}
          <TabsContent value="privacy" className="space-y-8">
            <Card className="border-0 shadow-lg">
              <CardHeader>
                <CardTitle className="text-xl font-serif text-[#2E2E2E]">Privacy Settings</CardTitle>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="space-y-2">
                  <Label htmlFor="profileVisibility">Profile Visibility</Label>
                  <Select
                    value={privacy.profileVisibility}
                    onValueChange={(value) => setPrivacy((prev) => ({ ...prev, profileVisibility: value }))}
                  >
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="public">Public</SelectItem>
                      <SelectItem value="friends">Friends Only</SelectItem>
                      <SelectItem value="private">Private</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <div className="flex items-center justify-between">
                  <div>
                    <h4 className="font-medium text-[#2E2E2E]">Share Statistics</h4>
                    <p className="text-sm text-gray-600">Allow others to see your waste reduction stats</p>
                  </div>
                  <Switch checked={privacy.shareStats} onCheckedChange={() => handlePrivacyToggle("shareStats")} />
                </div>

                <div className="flex items-center justify-between">
                  <div>
                    <h4 className="font-medium text-[#2E2E2E]">Data Collection</h4>
                    <p className="text-sm text-gray-600">Help improve FOOPTRA by sharing anonymous usage data</p>
                  </div>
                  <Switch
                    checked={privacy.dataCollection}
                    onCheckedChange={() => handlePrivacyToggle("dataCollection")}
                  />
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  )
}
