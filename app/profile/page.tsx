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
import { Skeleton } from "@/components/ui/skeleton"
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog"
import { toast } from "sonner"
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
  Trash2,
  Award,
  Calendar,
  TrendingDown,
  Leaf,
  Edit,
  Moon,
  Sun,
  Lock,
  DollarSign,
  Flame,
  CheckCircle2,
} from "lucide-react"

export default function ProfilePage() {
  const [isLoading, setIsLoading] = useState(false)
  const [isEditModalOpen, setIsEditModalOpen] = useState(false)
  const [isDarkMode, setIsDarkMode] = useState(false)

  const [profileData, setProfileData] = useState({
    name: "FOOPTRA User",
    email: "user.fooptra@email.com",
    bio: "Passionate about reducing food waste and living sustainably. On a mission to achieve zero waste by 2025!",
    location: "Yogyakarta, Indonesia",
    joinDate: "March 2024",
  })

  const [editData, setEditData] = useState({ ...profileData })

  const [goals, setGoals] = useState({
    weeklyWasteReduction: 20,
    monthlySavingsTarget: 200,
    dailyLoggingStreak: 30,
  })

  const [preferences, setPreferences] = useState({
    units: "metric",
    currency: "IDR",
    language: "English",
    timezone: "WIB",
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

  const [passwordData, setPasswordData] = useState({
    currentPassword: "",
    newPassword: "",
    confirmPassword: "",
  })

  const handleProfileUpdate = (field: string, value: string) => {
    setEditData((prev) => ({ ...prev, [field]: value }))
  }

  const handleSaveProfile = () => {
    setIsLoading(true)
    setTimeout(() => {
      setProfileData({ ...editData })
      setIsEditModalOpen(false)
      setIsLoading(false)
      toast.success("Profile updated successfully!", {
        description: "Your changes have been saved.",
      })
    }, 1000)
  }

  const handleGoalUpdate = (field: string, value: number) => {
    setGoals((prev) => ({ ...prev, [field]: value }))
    toast.success("Goal updated!", {
      description: "Your target has been adjusted.",
    })
  }

  const handlePreferenceUpdate = (field: string, value: string) => {
    setPreferences((prev) => ({ ...prev, [field]: value }))
  }

  const handleNotificationToggle = (field: string) => {
    setNotifications((prev) => ({ ...prev, [field as keyof typeof prev]: !prev[field as keyof typeof prev] }))
  }

  const handlePrivacyToggle = (field: string) => {
    setPrivacy((prev) => ({ ...prev, [field as keyof typeof prev]: !prev[field as keyof typeof prev] }))
  }

  const handlePasswordChange = () => {
    if (passwordData.newPassword !== passwordData.confirmPassword) {
      toast.error("Passwords don't match", {
        description: "Please make sure your passwords match.",
      })
      return
    }
    setIsLoading(true)
    setTimeout(() => {
      setPasswordData({ currentPassword: "", newPassword: "", confirmPassword: "" })
      setIsLoading(false)
      toast.success("Password changed successfully!", {
        description: "Your password has been updated.",
      })
    }, 1000)
  }

  const handleDarkModeToggle = () => {
    setIsDarkMode(!isDarkMode)
    toast.success(isDarkMode ? "Light mode enabled" : "Dark mode enabled", {
      description: "Your theme preference has been updated.",
    })
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
    moneySaved: "Rp 387.000",
    co2Reduced: "23.1 kg",
    waterSaved: "1,250 L",
    landSaved: "12.5 m²",
    streakDays: 18,
    level: 3,
    points: 1247,
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-green-50 via-white to-green-50/30 pb-20 md:pb-0">
      <Navigation />

      <div className="container mx-auto px-4 py-8 max-w-7xl">
        <div className="flex flex-col md:flex-row md:items-center justify-between mb-8 gap-4">
          <div className="space-y-1">
            <h1 className="text-3xl md:text-4xl font-bold text-[#374151] tracking-tight">Profile & Settings</h1>
            <p className="text-[#6B7280]">Manage your account, track your impact, and customize your experience</p>
          </div>
        </div>

        <Tabs defaultValue="profile" className="w-full">
          <TabsList className="w-full mb-8 h-auto p-1.5 bg-white shadow-sm border border-gray-100 overflow-x-auto rounded-xl">
            <div className="flex gap-2 min-w-max w-full md:grid md:grid-cols-5">
              <TabsTrigger
                value="profile"
                className="flex items-center justify-center gap-2 min-w-[100px] h-11 px-4 py-2 text-sm font-medium whitespace-nowrap rounded-lg data-[state=active]:bg-[#4CAF50] data-[state=active]:text-white data-[state=active]:shadow-md transition-all duration-200"
              >
                <User className="w-4 h-4 flex-shrink-0" />
                <span>Profile</span>
              </TabsTrigger>
              <TabsTrigger
                value="goals"
                className="flex items-center justify-center gap-2 min-w-[100px] h-11 px-4 py-2 text-sm font-medium whitespace-nowrap rounded-lg data-[state=active]:bg-[#4CAF50] data-[state=active]:text-white data-[state=active]:shadow-md transition-all duration-200"
              >
                <Target className="w-4 h-4 flex-shrink-0" />
                <span>Goals</span>
              </TabsTrigger>
              <TabsTrigger
                value="settings"
                className="flex items-center justify-center gap-2 min-w-[100px] h-11 px-4 py-2 text-sm font-medium whitespace-nowrap rounded-lg data-[state=active]:bg-[#4CAF50] data-[state=active]:text-white data-[state=active]:shadow-md transition-all duration-200"
              >
                <Settings className="w-4 h-4 flex-shrink-0" />
                <span>Settings</span>
              </TabsTrigger>
              <TabsTrigger
                value="notifications"
                className="flex items-center justify-center gap-2 min-w-[110px] h-11 px-4 py-2 text-sm font-medium whitespace-nowrap rounded-lg data-[state=active]:bg-[#4CAF50] data-[state=active]:text-white data-[state=active]:shadow-md transition-all duration-200"
              >
                <Bell className="w-4 h-4 flex-shrink-0" />
                <span>Notifications</span>
              </TabsTrigger>
              <TabsTrigger
                value="privacy"
                className="flex items-center justify-center gap-2 min-w-[100px] h-11 px-4 py-2 text-sm font-medium whitespace-nowrap rounded-lg data-[state=active]:bg-[#4CAF50] data-[state=active]:text-white data-[state=active]:shadow-md transition-all duration-200"
              >
                <Shield className="w-4 h-4 flex-shrink-0" />
                <span>Privacy</span>
              </TabsTrigger>
            </div>
          </TabsList>

          {/* Profile Tab */}
          <TabsContent value="profile" className="space-y-6">
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
              <div className="lg:col-span-2 space-y-6">
                <Card className="border-0 shadow-lg bg-white rounded-2xl overflow-hidden">
                  <CardHeader className="bg-gradient-to-r from-[#4CAF50]/5 to-[#8BC34A]/5 border-b border-gray-100">
                    <div className="flex items-center justify-between">
                      <CardTitle className="text-xl font-bold text-[#374151]">Profile Information</CardTitle>
                      <Dialog open={isEditModalOpen} onOpenChange={setIsEditModalOpen}>
                        <DialogTrigger asChild>
                          <Button
                            size="sm"
                            className="bg-[#4CAF50] hover:bg-[#45a049] text-white shadow-sm"
                            onClick={() => setEditData({ ...profileData })}
                          >
                            <Edit className="w-4 h-4 mr-2" />
                            Edit Profile
                          </Button>
                        </DialogTrigger>
                        <DialogContent className="sm:max-w-[500px]">
                          <DialogHeader>
                            <DialogTitle className="text-2xl font-bold text-[#374151]">Edit Profile</DialogTitle>
                          </DialogHeader>
                          <div className="space-y-4 py-4">
                            <div className="space-y-2">
                              <Label htmlFor="edit-name">Full Name</Label>
                              <Input
                                id="edit-name"
                                value={editData.name}
                                onChange={(e) => handleProfileUpdate("name", e.target.value)}
                                placeholder="Enter your name"
                              />
                            </div>
                            <div className="space-y-2">
                              <Label htmlFor="edit-email">Email Address</Label>
                              <Input
                                id="edit-email"
                                type="email"
                                value={editData.email}
                                onChange={(e) => handleProfileUpdate("email", e.target.value)}
                                placeholder="Enter your email"
                              />
                            </div>
                            <div className="space-y-2">
                              <Label htmlFor="edit-bio">Bio</Label>
                              <Textarea
                                id="edit-bio"
                                rows={4}
                                value={editData.bio}
                                onChange={(e) => handleProfileUpdate("bio", e.target.value)}
                                placeholder="Tell us about your journey..."
                              />
                            </div>
                            <div className="space-y-2">
                              <Label htmlFor="edit-location">Location</Label>
                              <Input
                                id="edit-location"
                                value={editData.location}
                                onChange={(e) => handleProfileUpdate("location", e.target.value)}
                                placeholder="Enter your location"
                              />
                            </div>
                          </div>
                          <div className="flex justify-end gap-3">
                            <Button variant="outline" onClick={() => setIsEditModalOpen(false)}>
                              Cancel
                            </Button>
                            <Button
                              className="bg-[#4CAF50] hover:bg-[#45a049] text-white"
                              onClick={handleSaveProfile}
                              disabled={isLoading}
                            >
                              {isLoading ? "Saving..." : "Save Changes"}
                            </Button>
                          </div>
                        </DialogContent>
                      </Dialog>
                    </div>
                  </CardHeader>
                  <CardContent className="p-6">
                    {isLoading ? (
                      <div className="space-y-6">
                        <div className="flex items-center gap-6">
                          <Skeleton className="w-24 h-24 rounded-full" />
                          <div className="space-y-2 flex-1">
                            <Skeleton className="h-6 w-48" />
                            <Skeleton className="h-4 w-64" />
                            <Skeleton className="h-6 w-20" />
                          </div>
                        </div>
                        <Skeleton className="h-20 w-full" />
                        <div className="grid grid-cols-2 gap-4">
                          <Skeleton className="h-10 w-full" />
                          <Skeleton className="h-10 w-full" />
                        </div>
                      </div>
                    ) : (
                      <div className="space-y-6">
                        <div className="flex items-start gap-6">
                          <div className="relative group">
                            <Avatar className="w-24 h-24 border-4 border-white shadow-lg ring-2 ring-[#4CAF50]/20">
                              <AvatarImage src="/placeholder.svg?height=96&width=96" />
                              <AvatarFallback className="bg-gradient-to-br from-[#4CAF50] to-[#8BC34A] text-white text-2xl font-bold">
                                {profileData.name
                                  .split(" ")
                                  .map((n) => n[0])
                                  .join("")
                                  .toUpperCase()}
                              </AvatarFallback>
                            </Avatar>
                            <Button
                              size="sm"
                              className="absolute -bottom-2 -right-2 w-10 h-10 rounded-full bg-[#4CAF50] hover:bg-[#45a049] shadow-lg group-hover:scale-110 transition-transform"
                            >
                              <Camera className="w-4 h-4" />
                            </Button>
                          </div>
                          <div className="flex-1 space-y-2">
                            <div className="flex items-center gap-3">
                              <h3 className="text-2xl font-bold text-[#374151]">{profileData.name}</h3>
                              <Badge className="bg-gradient-to-r from-[#4CAF50] to-[#8BC34A] text-white border-0 shadow-sm">
                                Level {stats.level}
                              </Badge>
                            </div>
                            <p className="text-[#6B7280] flex items-center gap-2">
                              <User className="w-4 h-4" />
                              {profileData.email}
                            </p>
                            <p className="text-sm text-[#9CA3AF]">
                              Member since {profileData.joinDate} • {profileData.location}
                            </p>
                          </div>
                        </div>

                        <div className="p-4 bg-gradient-to-r from-[#4CAF50]/5 to-[#8BC34A]/5 rounded-xl border border-[#4CAF50]/10">
                          <p className="text-[#374151] leading-relaxed">{profileData.bio}</p>
                        </div>
                      </div>
                    )}
                  </CardContent>
                </Card>

                <Card className="border-0 shadow-lg bg-white rounded-2xl overflow-hidden">
                  <CardHeader className="bg-gradient-to-r from-[#FFC107]/5 to-[#FFD54F]/5 border-b border-gray-100">
                    <CardTitle className="text-xl font-bold text-[#374151] flex items-center gap-2">
                      <Award className="w-5 h-5 text-[#FFC107]" />
                      Achievements
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="p-6">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      {achievements.map((achievement, index) => (
                        <div
                          key={index}
                          className={`group p-4 rounded-xl border-2 transition-all duration-300 ${
                            achievement.earned
                              ? "border-[#4CAF50] bg-gradient-to-br from-[#4CAF50]/5 to-[#8BC34A]/5 hover:shadow-md hover:scale-[1.02]"
                              : "border-gray-200 bg-gray-50/50 opacity-60"
                          }`}
                        >
                          <div className="flex items-start gap-3">
                            <div
                              className={`w-12 h-12 rounded-xl flex items-center justify-center flex-shrink-0 transition-transform group-hover:scale-110 ${
                                achievement.earned
                                  ? "bg-gradient-to-br from-[#4CAF50] to-[#8BC34A] shadow-lg"
                                  : "bg-gray-300"
                              }`}
                            >
                              {achievement.earned ? (
                                <CheckCircle2 className="w-6 h-6 text-white" />
                              ) : (
                                <Award className="w-6 h-6 text-white" />
                              )}
                            </div>
                            <div className="flex-1 min-w-0">
                              <h4 className="font-bold text-[#374151] mb-1">{achievement.name}</h4>
                              <p className="text-sm text-[#6B7280] mb-2">{achievement.description}</p>
                              {achievement.earned && achievement.date && (
                                <p className="text-xs text-[#4CAF50] font-medium flex items-center gap-1">
                                  <Calendar className="w-3 h-3" />
                                  {achievement.date}
                                </p>
                              )}
                            </div>
                          </div>
                        </div>
                      ))}
                    </div>
                  </CardContent>
                </Card>
              </div>

              <div className="space-y-6">
                <Card className="border-0 shadow-lg bg-gradient-to-br from-[#4CAF50] to-[#8BC34A] text-white rounded-2xl overflow-hidden">
                  <CardHeader>
                    <CardTitle className="text-xl font-bold text-white">Your Impact Summary</CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-6">
                    <div className="text-center p-4 bg-white/10 backdrop-blur-sm rounded-xl">
                      <div className="text-4xl font-bold mb-1">{stats.points}</div>
                      <div className="text-sm text-white/90 mb-3">Eco Points</div>
                      <Progress value={75} className="h-2 bg-white/20" />
                      <div className="text-xs text-white/80 mt-2">253 points to Level 4</div>
                    </div>

                    <div className="space-y-3">
                      <div className="flex items-center justify-between p-3 bg-white/10 backdrop-blur-sm rounded-lg hover:bg-white/20 transition-colors">
                        <div className="flex items-center gap-3">
                          <div className="w-10 h-10 rounded-lg bg-white/20 flex items-center justify-center">
                            <TrendingDown className="w-5 h-5" />
                          </div>
                          <span className="text-sm font-medium">Waste Logged</span>
                        </div>
                        <span className="font-bold">{stats.totalWasteLogged}</span>
                      </div>

                      <div className="flex items-center justify-between p-3 bg-white/10 backdrop-blur-sm rounded-lg hover:bg-white/20 transition-colors">
                        <div className="flex items-center gap-3">
                          <div className="w-10 h-10 rounded-lg bg-white/20 flex items-center justify-center">
                            <DollarSign className="w-5 h-5" />
                          </div>
                          <span className="text-sm font-medium">Money Saved</span>
                        </div>
                        <span className="font-bold">{stats.moneySaved}</span>
                      </div>

                      <div className="flex items-center justify-between p-3 bg-white/10 backdrop-blur-sm rounded-lg hover:bg-white/20 transition-colors">
                        <div className="flex items-center gap-3">
                          <div className="w-10 h-10 rounded-lg bg-white/20 flex items-center justify-center">
                            <Leaf className="w-5 h-5" />
                          </div>
                          <span className="text-sm font-medium">CO₂ Reduced</span>
                        </div>
                        <span className="font-bold">{stats.co2Reduced}</span>
                      </div>
                    </div>
                  </CardContent>
                </Card>

                <Card className="border-0 shadow-lg bg-white rounded-2xl overflow-hidden">
                  <CardHeader className="bg-gradient-to-r from-[#FFC107]/5 to-[#FFD54F]/5 border-b border-gray-100">
                    <CardTitle className="text-lg font-bold text-[#374151] flex items-center gap-2">
                      <Flame className="w-5 h-5 text-[#FFC107]" />
                      Daily Streak
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="p-6">
                    <div className="text-center space-y-4">
                      <div className="relative inline-block">
                        <div className="w-24 h-24 rounded-full bg-gradient-to-br from-[#FFC107] to-[#FFD54F] flex items-center justify-center shadow-lg">
                          <div className="text-3xl font-bold text-white">{stats.streakDays}</div>
                        </div>
                        <div className="absolute -top-2 -right-2 w-10 h-10 rounded-full bg-[#4CAF50] flex items-center justify-center shadow-lg animate-pulse">
                          <Flame className="w-5 h-5 text-white" />
                        </div>
                      </div>
                      <div>
                        <p className="text-sm font-medium text-[#374151]">Days in a row!</p>
                        <p className="text-xs text-[#6B7280] mt-1">Keep logging to maintain your streak</p>
                      </div>
                      <div className="pt-4 border-t border-gray-100">
                        <p className="text-xs text-[#9CA3AF] mb-2">Next milestone</p>
                        <Progress value={60} className="h-2" />
                        <p className="text-xs text-[#6B7280] mt-2">12 more days to reach 30-day streak!</p>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </div>
            </div>
          </TabsContent>

          {/* Goals Tab */}
          <TabsContent value="goals" className="space-y-6">
            <Card className="border-0 shadow-lg bg-white rounded-2xl overflow-hidden">
              <CardHeader className="bg-gradient-to-r from-[#4CAF50]/5 to-[#8BC34A]/5 border-b border-gray-100">
                <CardTitle className="text-xl font-bold text-[#374151]">Personal Goals</CardTitle>
              </CardHeader>
              <CardContent className="p-6 space-y-6">
                <div className="space-y-6">
                  <div className="p-5 bg-gradient-to-r from-[#4CAF50]/5 to-[#8BC34A]/5 rounded-xl border border-[#4CAF50]/20">
                    <div className="flex items-center justify-between mb-3">
                      <Label htmlFor="weeklyReduction" className="text-base font-semibold text-[#374151]">
                        Weekly Waste Reduction Target
                      </Label>
                      <Badge className="bg-[#4CAF50] text-white">78% Complete</Badge>
                    </div>
                    <div className="flex items-center gap-4 mb-3">
                      <Input
                        id="weeklyReduction"
                        type="number"
                        value={goals.weeklyWasteReduction}
                        onChange={(e) => handleGoalUpdate("weeklyWasteReduction", Number.parseInt(e.target.value))}
                        className="w-28 font-semibold"
                      />
                      <span className="text-sm text-[#6B7280]">% reduction target</span>
                    </div>
                    <Progress value={78} className="h-3 mb-2" />
                    <p className="text-xs text-[#6B7280]">You're doing great! Keep up the momentum.</p>
                  </div>

                  <div className="p-5 bg-gradient-to-r from-[#FFC107]/5 to-[#FFD54F]/5 rounded-xl border border-[#FFC107]/20">
                    <div className="flex items-center justify-between mb-3">
                      <Label htmlFor="monthlySavings" className="text-base font-semibold text-[#374151]">
                        Monthly Savings Target
                      </Label>
                      <Badge className="bg-[#FFC107] text-white">92% Complete</Badge>
                    </div>
                    <div className="flex items-center gap-4 mb-3">
                      <Input
                        id="monthlySavings"
                        type="number"
                        value={goals.monthlySavingsTarget}
                        onChange={(e) => handleGoalUpdate("monthlySavingsTarget", Number.parseInt(e.target.value))}
                        className="w-28 font-semibold"
                      />
                      <span className="text-sm text-[#6B7280]">thousand IDR</span>
                    </div>
                    <Progress value={92} className="h-3 mb-2" />
                    <p className="text-xs text-[#6B7280]">Almost there! Just Rp 16.000 more to reach your goal.</p>
                  </div>

                  <div className="p-5 bg-gradient-to-r from-blue-50 to-cyan-50 rounded-xl border border-blue-200/50">
                    <div className="flex items-center justify-between mb-3">
                      <Label htmlFor="dailyStreak" className="text-base font-semibold text-[#374151]">
                        Daily Logging Streak Target
                      </Label>
                      <Badge className="bg-blue-500 text-white">60% Complete</Badge>
                    </div>
                    <div className="flex items-center gap-4 mb-3">
                      <Input
                        id="dailyStreak"
                        type="number"
                        value={goals.dailyLoggingStreak}
                        onChange={(e) => handleGoalUpdate("dailyLoggingStreak", Number.parseInt(e.target.value))}
                        className="w-28 font-semibold"
                      />
                      <span className="text-sm text-[#6B7280]">days streak</span>
                    </div>
                    <Progress value={60} className="h-3 mb-2" />
                    <p className="text-xs text-[#6B7280]">Current streak: 18 days. Keep logging daily!</p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          {/* Settings Tab */}
          <TabsContent value="settings" className="space-y-6">
            <Card className="border-0 shadow-lg bg-white rounded-2xl overflow-hidden">
              <CardHeader className="bg-gradient-to-r from-[#4CAF50]/5 to-[#8BC34A]/5 border-b border-gray-100">
                <CardTitle className="text-xl font-bold text-[#374151]">App Preferences</CardTitle>
              </CardHeader>
              <CardContent className="p-6 space-y-6">
                <div className="flex items-center justify-between p-4 bg-gradient-to-r from-gray-50 to-gray-100 rounded-xl">
                  <div className="flex items-center gap-3">
                    {isDarkMode ? (
                      <Moon className="w-5 h-5 text-[#374151]" />
                    ) : (
                      <Sun className="w-5 h-5 text-[#FFC107]" />
                    )}
                    <div>
                      <h4 className="font-semibold text-[#374151]">Dark Mode</h4>
                      <p className="text-sm text-[#6B7280]">Toggle dark theme for better night viewing</p>
                    </div>
                  </div>
                  <Switch checked={isDarkMode} onCheckedChange={handleDarkModeToggle} />
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="space-y-2">
                    <Label htmlFor="units" className="text-sm font-semibold text-[#374151]">
                      Measurement Units
                    </Label>
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
                    <Label htmlFor="currency" className="text-sm font-semibold text-[#374151]">
                      Currency
                    </Label>
                    <Select
                      value={preferences.currency}
                      onValueChange={(value) => handlePreferenceUpdate("currency", value)}
                    >
                      <SelectTrigger>
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="IDR">IDR (Rp)</SelectItem>
                        <SelectItem value="USD">USD ($)</SelectItem>
                        <SelectItem value="EUR">EUR (€)</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="language" className="text-sm font-semibold text-[#374151]">
                      Language
                    </Label>
                    <Select
                      value={preferences.language}
                      onValueChange={(value) => handlePreferenceUpdate("language", value)}
                    >
                      <SelectTrigger>
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="English">English</SelectItem>
                        <SelectItem value="Indonesian">Bahasa Indonesia</SelectItem>
                        <SelectItem value="Spanish">Español</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="timezone" className="text-sm font-semibold text-[#374151]">
                      Timezone
                    </Label>
                    <Select
                      value={preferences.timezone}
                      onValueChange={(value) => handlePreferenceUpdate("timezone", value)}
                    >
                      <SelectTrigger>
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="WIB">WIB (GMT+7)</SelectItem>
                        <SelectItem value="WITA">WITA (GMT+8)</SelectItem>
                        <SelectItem value="WIT">WIT (GMT+9)</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card className="border-0 shadow-lg bg-white rounded-2xl overflow-hidden">
              <CardHeader className="bg-gradient-to-r from-blue-50 to-cyan-50 border-b border-gray-100">
                <CardTitle className="text-xl font-bold text-[#374151] flex items-center gap-2">
                  <Lock className="w-5 h-5 text-blue-500" />
                  Change Password
                </CardTitle>
              </CardHeader>
              <CardContent className="p-6">
                <div className="space-y-4 max-w-md">
                  <div className="space-y-2">
                    <Label htmlFor="currentPassword">Current Password</Label>
                    <Input
                      id="currentPassword"
                      type="password"
                      value={passwordData.currentPassword}
                      onChange={(e) => setPasswordData((prev) => ({ ...prev, currentPassword: e.target.value }))}
                      placeholder="Enter current password"
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="newPassword">New Password</Label>
                    <Input
                      id="newPassword"
                      type="password"
                      value={passwordData.newPassword}
                      onChange={(e) => setPasswordData((prev) => ({ ...prev, newPassword: e.target.value }))}
                      placeholder="Enter new password"
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="confirmPassword">Confirm New Password</Label>
                    <Input
                      id="confirmPassword"
                      type="password"
                      value={passwordData.confirmPassword}
                      onChange={(e) => setPasswordData((prev) => ({ ...prev, confirmPassword: e.target.value }))}
                      placeholder="Confirm new password"
                    />
                  </div>
                  <Button
                    className="bg-[#4CAF50] hover:bg-[#45a049] text-white w-full md:w-auto"
                    onClick={handlePasswordChange}
                    disabled={isLoading}
                  >
                    <Lock className="w-4 h-4 mr-2" />
                    {isLoading ? "Updating..." : "Update Password"}
                  </Button>
                </div>
              </CardContent>
            </Card>

            {/* Data Management */}
            <Card className="border-0 shadow-lg bg-white rounded-2xl overflow-hidden">
              <CardHeader className="bg-gradient-to-r from-[#4CAF50]/5 to-[#8BC34A]/5 border-b border-gray-100">
                <CardTitle className="text-xl font-bold text-[#374151]">Data Management</CardTitle>
              </CardHeader>
              <CardContent className="p-6 space-y-4">
                <div className="flex items-center justify-between p-4 bg-gradient-to-r from-[#4CAF50]/5 to-[#8BC34A]/5 rounded-xl border border-[#4CAF50]/20 hover:shadow-md transition-shadow">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-lg bg-[#4CAF50]/10 flex items-center justify-center">
                      <Download className="w-5 h-5 text-[#4CAF50]" />
                    </div>
                    <div>
                      <h4 className="font-semibold text-[#374151]">Export Data</h4>
                      <p className="text-sm text-[#6B7280]">Download all your food waste data</p>
                    </div>
                  </div>
                  <Button variant="outline" className="flex items-center gap-2 bg-transparent">
                    <Download className="w-4 h-4" />
                    Export
                  </Button>
                </div>

                <div className="flex items-center justify-between p-4 bg-gradient-to-r from-[#FFC107]/5 to-[#FFD54F]/5 rounded-xl border border-[#FFC107]/20 hover:shadow-md transition-shadow">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-lg bg-[#FFC107]/10 flex items-center justify-center">
                      <Upload className="w-5 h-5 text-[#FFC107]" />
                    </div>
                    <div>
                      <h4 className="font-semibold text-[#374151]">Import Data</h4>
                      <p className="text-sm text-[#6B7280]">Import data from another app</p>
                    </div>
                  </div>
                  <Button variant="outline" className="flex items-center gap-2 bg-transparent">
                    <Upload className="w-4 h-4" />
                    Import
                  </Button>
                </div>

                <div className="flex items-center justify-between p-4 bg-gradient-to-r from-red-50 to-red-100 rounded-xl border border-red-200 hover:shadow-md transition-shadow">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-lg bg-red-100 flex items-center justify-center">
                      <Trash2 className="w-5 h-5 text-red-600" />
                    </div>
                    <div>
                      <h4 className="font-semibold text-red-600">Delete Account</h4>
                      <p className="text-sm text-[#6B7280]">Permanently delete your account and all data</p>
                    </div>
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
          <TabsContent value="notifications" className="space-y-6">
            <Card className="border-0 shadow-lg bg-white rounded-2xl overflow-hidden">
              <CardHeader className="bg-gradient-to-r from-[#4CAF50]/5 to-[#8BC34A]/5 border-b border-gray-100">
                <CardTitle className="text-xl font-bold text-[#374151]">Notification Preferences</CardTitle>
              </CardHeader>
              <CardContent className="p-6 space-y-4">
                {Object.entries(notifications).map(([key, value]) => (
                  <div
                    key={key}
                    className="flex items-center justify-between p-4 bg-gray-50 rounded-xl hover:bg-gray-100 transition-colors"
                  >
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 rounded-lg bg-white flex items-center justify-center">
                        <Bell className="w-5 h-5 text-[#4CAF50]" />
                      </div>
                      <div>
                        <h4 className="font-semibold text-[#374151] capitalize">
                          {key.replace(/([A-Z])/g, " $1").trim()}
                        </h4>
                        <p className="text-sm text-[#6B7280]">
                          {key === "dailyReminders" && "Get reminded to log your food waste daily"}
                          {key === "weeklyReports" && "Receive weekly progress reports"}
                          {key === "goalAchievements" && "Celebrate when you reach your goals"}
                          {key === "tipOfTheDay" && "Daily tips to reduce food waste"}
                          {key === "communityUpdates" && "Updates from the FOOPTRA community"}
                        </p>
                      </div>
                    </div>
                    <Switch checked={value} onCheckedChange={() => handleNotificationToggle(key)} />
                  </div>
                ))}
              </CardContent>
            </Card>
          </TabsContent>

          {/* Privacy Tab */}
          <TabsContent value="privacy" className="space-y-6">
            <Card className="border-0 shadow-lg bg-white rounded-2xl overflow-hidden">
              <CardHeader className="bg-gradient-to-r from-[#4CAF50]/5 to-[#8BC34A]/5 border-b border-gray-100">
                <CardTitle className="text-xl font-bold text-[#374151]">Privacy Settings</CardTitle>
              </CardHeader>
              <CardContent className="p-6 space-y-6">
                <div className="space-y-2">
                  <Label htmlFor="profileVisibility" className="text-sm font-semibold text-[#374151]">
                    Profile Visibility
                  </Label>
                  <Select
                    value={privacy.profileVisibility}
                    onValueChange={(value) => setPrivacy((prev) => ({ ...prev, profileVisibility: value }))}
                  >
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="public">Public - Anyone can see your profile</SelectItem>
                      <SelectItem value="friends">Friends Only - Only friends can see</SelectItem>
                      <SelectItem value="private">Private - Only you can see</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <div className="flex items-center justify-between p-4 bg-gray-50 rounded-xl">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-lg bg-white flex items-center justify-center">
                      <Shield className="w-5 h-5 text-[#4CAF50]" />
                    </div>
                    <div>
                      <h4 className="font-semibold text-[#374151]">Share Statistics</h4>
                      <p className="text-sm text-[#6B7280]">Allow others to see your waste reduction stats</p>
                    </div>
                  </div>
                  <Switch checked={privacy.shareStats} onCheckedChange={() => handlePrivacyToggle("shareStats")} />
                </div>

                <div className="flex items-center justify-between p-4 bg-gray-50 rounded-xl">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-lg bg-white flex items-center justify-center">
                      <Shield className="w-5 h-5 text-[#4CAF50]" />
                    </div>
                    <div>
                      <h4 className="font-semibold text-[#374151]">Data Collection</h4>
                      <p className="text-sm text-[#6B7280]">Help improve FOOPTRA by sharing anonymous usage data</p>
                    </div>
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
