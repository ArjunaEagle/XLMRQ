"use client"

import { useState } from "react"
import { Navigation } from "@/components/navigation"
import {
  Users,
  TrendingUp,
  Copy,
  Check,
  Globe,
  Shield,
  ArrowUp,
  Plus,
  ChevronRight,
  BarChart3,
  Target,
  Leaf,
} from "lucide-react"
import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"

export default function Dashboard() {
  const [copied, setCopied] = useState(false)

  const handleShare = () => {
    navigator.clipboard.writeText("Join me on FOOPTRA to reduce food waste!")
    setCopied(true)
    setTimeout(() => setCopied(false), 2000)
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-green-50 to-white pb-20 md:pb-0">
      <Navigation />

      {/* Main Content Container */}
      <div className="w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="py-6 lg:py-8">
          {/* Page Header */}
          <div className="mb-8">
            <div className="inline-flex items-center gap-2 bg-[#4CAF50]/10 px-4 py-2 rounded-full text-[#4CAF50] font-medium mb-4">
              <Leaf className="w-4 h-4" />
              Your Impact Dashboard
            </div>
            <h1 className="text-3xl md:text-4xl font-serif font-bold text-[#2E2E2E] mb-2">Welcome Back to FOOPTRA</h1>
            <p className="text-lg text-gray-600">
              Track your progress and see the positive impact you're making on the environment.
            </p>
          </div>

          {/* Desktop/Tablet Layout */}
          <div className="hidden md:grid md:grid-cols-2 gap-6 mb-8">
            {/* Food Waste Status */}
            <Card className="border-0 shadow-lg hover:shadow-xl transition-shadow">
              <CardContent className="p-5 lg:p-6">
                <div className="flex items-center justify-between mb-4">
                  <h3 className="text-[#2E2E2E] font-medium">Waste Reduction</h3>
                  <div className="flex items-center gap-2">
                    <TrendingUp className="w-4 h-4 text-[#4CAF50]" />
                    <span className="text-[#4CAF50] text-sm font-medium">Improving</span>
                  </div>
                </div>

                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <span className="text-gray-600 text-sm">This Week</span>
                    <div className="flex items-center gap-2">
                      <div className="flex gap-1">
                        {[...Array(5)].map((_, i) => (
                          <div
                            key={i}
                            className={`w-1 h-3 rounded-full ${i < 4 ? "bg-[#4CAF50]" : "bg-gray-300"}`}
                          ></div>
                        ))}
                      </div>
                      <span className="text-[#2E2E2E] text-sm font-medium">80%</span>
                    </div>
                  </div>

                  <div className="flex items-center justify-between">
                    <span className="text-gray-600 text-sm">Items Prevented</span>
                    <span className="text-[#2E2E2E] text-sm font-medium">23 items</span>
                  </div>

                  <div className="w-full bg-gray-200 rounded-full h-2">
                    <div className="bg-gradient-to-r from-[#4CAF50] to-[#8BC34A] h-2 rounded-full w-4/5"></div>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Community Card */}
            <Card className="border-0 shadow-lg hover:shadow-xl transition-shadow">
              <CardContent className="p-5 lg:p-6">
                <div className="flex items-center justify-between mb-4">
                  <div className="flex items-center gap-3">
                    <div className="w-8 h-8 bg-[#4CAF50]/10 rounded-lg flex items-center justify-center">
                      <Users className="w-4 h-4 text-[#4CAF50]" />
                    </div>
                    <div>
                      <h3 className="text-[#2E2E2E] font-medium">Friends</h3>
                      <p className="text-gray-600 text-xs">Share your progress</p>
                    </div>
                  </div>
                  <div className="bg-[#4CAF50]/10 px-2 py-1 rounded-full">
                    <span className="text-[#4CAF50] text-sm font-medium">5</span>
                  </div>
                </div>

                <Button onClick={handleShare} className="w-full bg-[#4CAF50] hover:bg-[#45a049] text-white font-medium">
                  {copied ? <Check className="w-4 h-4 mr-2" /> : <Copy className="w-4 h-4 mr-2" />}
                  {copied ? "Link Copied!" : "Invite Friends"}
                </Button>
              </CardContent>
            </Card>
          </div>

          {/* Mobile Layout */}
          <div className="md:hidden space-y-6 pb-32">
            {/* Food Waste Status */}
            <Card className="border-0 shadow-lg">
              <CardContent className="p-5">
                <div className="flex items-center justify-between mb-4">
                  <h3 className="text-[#2E2E2E] font-medium">Waste Reduction</h3>
                  <div className="flex items-center gap-2">
                    <TrendingUp className="w-4 h-4 text-[#4CAF50]" />
                    <span className="text-[#4CAF50] text-sm font-medium">Improving</span>
                  </div>
                </div>

                <div className="space-y-3">
                  <div className="flex items-center justify-between">
                    <span className="text-gray-600 text-sm">This Week</span>
                    <div className="flex items-center gap-2">
                      <div className="flex gap-1">
                        {[...Array(5)].map((_, i) => (
                          <div
                            key={i}
                            className={`w-1 h-3 rounded-full ${i < 4 ? "bg-[#4CAF50]" : "bg-gray-300"}`}
                          ></div>
                        ))}
                      </div>
                      <span className="text-[#2E2E2E] text-sm font-medium">80%</span>
                    </div>
                  </div>

                  <div className="flex items-center justify-between">
                    <span className="text-gray-600 text-sm">Items Prevented</span>
                    <span className="text-[#2E2E2E] text-sm font-medium">23 items</span>
                  </div>

                  <div className="w-full bg-gray-200 rounded-full h-2 mt-3">
                    <div className="bg-gradient-to-r from-[#4CAF50] to-[#8BC34A] h-2 rounded-full w-4/5"></div>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Community Card */}
            <Card className="border-0 shadow-lg">
              <CardContent className="p-5">
                <div className="flex items-center justify-between mb-4">
                  <div className="flex items-center gap-3">
                    <div className="w-8 h-8 bg-[#4CAF50]/10 rounded-lg flex items-center justify-center">
                      <Users className="w-4 h-4 text-[#4CAF50]" />
                    </div>
                    <div>
                      <h3 className="text-[#2E2E2E] font-medium">Friends</h3>
                      <p className="text-gray-600 text-xs">Share your progress</p>
                    </div>
                  </div>
                  <div className="bg-[#4CAF50]/10 px-2 py-1 rounded-full">
                    <span className="text-[#4CAF50] text-sm font-medium">5</span>
                  </div>
                </div>

                <Button onClick={handleShare} className="w-full bg-[#4CAF50] hover:bg-[#45a049] text-white font-medium">
                  {copied ? <Check className="w-4 h-4 mr-2" /> : <Copy className="w-4 h-4 mr-2" />}
                  {copied ? "Link Copied!" : "Invite Friends"}
                </Button>
              </CardContent>
            </Card>
          </div>

          {/* Quick Stats - Responsive Grid */}
          <div className="grid grid-cols-3 md:grid-cols-3 lg:grid-cols-6 gap-3 sm:gap-4 mb-8">
            <Card className="border-0 shadow-lg text-center">
              <CardContent className="p-4 lg:p-5">
                <div className="w-8 h-8 bg-[#4CAF50]/10 rounded-lg flex items-center justify-center mx-auto mb-2">
                  <Shield className="w-4 h-4 text-[#4CAF50]" />
                </div>
                <p className="text-[#2E2E2E] font-medium text-sm sm:text-base">99%</p>
                <p className="text-gray-600 text-xs">Success Rate</p>
              </CardContent>
            </Card>

            <Card className="border-0 shadow-lg text-center">
              <CardContent className="p-4 lg:p-5">
                <div className="w-8 h-8 bg-[#FFC107]/10 rounded-lg flex items-center justify-center mx-auto mb-2">
                  <Target className="w-4 h-4 text-[#FFC107]" />
                </div>
                <p className="text-[#2E2E2E] font-medium text-sm sm:text-base">156</p>
                <p className="text-gray-600 text-xs">Goals Met</p>
              </CardContent>
            </Card>

            <Card className="border-0 shadow-lg text-center">
              <CardContent className="p-4 lg:p-5">
                <div className="w-8 h-8 bg-[#8BC34A]/10 rounded-lg flex items-center justify-center mx-auto mb-2">
                  <TrendingUp className="w-4 h-4 text-[#8BC34A]" />
                </div>
                <p className="text-[#2E2E2E] font-medium text-sm sm:text-base">+12%</p>
                <p className="text-gray-600 text-xs">Improvement</p>
              </CardContent>
            </Card>

            {/* Additional stats for larger screens */}
            <Card className="hidden lg:block border-0 shadow-lg text-center">
              <CardContent className="p-5">
                <div className="w-8 h-8 bg-[#4CAF50]/10 rounded-lg flex items-center justify-center mx-auto mb-2">
                  <Globe className="w-4 h-4 text-[#4CAF50]" />
                </div>
                <p className="text-[#2E2E2E] font-medium">5kg</p>
                <p className="text-gray-600 text-xs">CO2 Saved</p>
              </CardContent>
            </Card>

            <Card className="hidden lg:block border-0 shadow-lg text-center">
              <CardContent className="p-5">
                <div className="w-8 h-8 bg-[#FFC107]/10 rounded-lg flex items-center justify-center mx-auto mb-2">
                  <Users className="w-4 h-4 text-[#FFC107]" />
                </div>
                <p className="text-[#2E2E2E] font-medium">1.2k</p>
                <p className="text-gray-600 text-xs">Community</p>
              </CardContent>
            </Card>

            <Card className="hidden lg:block border-0 shadow-lg text-center">
              <CardContent className="p-5">
                <div className="w-8 h-8 bg-[#8BC34A]/10 rounded-lg flex items-center justify-center mx-auto mb-2">
                  <BarChart3 className="w-4 h-4 text-[#8BC34A]" />
                </div>
                <p className="text-[#2E2E2E] font-medium">30</p>
                <p className="text-gray-600 text-xs">Days Active</p>
              </CardContent>
            </Card>
          </div>

          {/* Recent Activity - Full Width */}
          <Card className="border-0 shadow-lg">
            <CardContent className="p-5 sm:p-6 lg:p-8">
              <div className="flex items-center justify-between mb-6">
                <h3 className="text-[#2E2E2E] font-medium text-lg">Recent Activity</h3>
                <ChevronRight className="w-4 h-4 text-gray-400" />
              </div>

              <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
                <div className="flex items-center gap-3">
                  <div className="w-2 h-2 bg-[#4CAF50] rounded-full flex-shrink-0"></div>
                  <div className="flex-1 min-w-0">
                    <p className="text-[#2E2E2E] text-sm truncate">Food waste logged</p>
                    <p className="text-gray-600 text-xs">2 minutes ago</p>
                  </div>
                  <span className="text-[#4CAF50] text-sm flex-shrink-0">+Rp 37.500</span>
                </div>

                <div className="flex items-center gap-3">
                  <div className="w-2 h-2 bg-[#FFC107] rounded-full flex-shrink-0"></div>
                  <div className="flex-1 min-w-0">
                    <p className="text-[#2E2E2E] text-sm truncate">Goal completed</p>
                    <p className="text-gray-600 text-xs">5 minutes ago</p>
                  </div>
                  <ArrowUp className="w-3 h-3 text-[#FFC107] flex-shrink-0" />
                </div>

                <div className="flex items-center gap-3">
                  <div className="w-2 h-2 bg-[#8BC34A] rounded-full flex-shrink-0"></div>
                  <div className="flex-1 min-w-0">
                    <p className="text-[#2E2E2E] text-sm truncate">Friend joined</p>
                    <p className="text-gray-600 text-xs">1 hour ago</p>
                  </div>
                  <Plus className="w-3 h-3 text-[#8BC34A] flex-shrink-0" />
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  )
}
