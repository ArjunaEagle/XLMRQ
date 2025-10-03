"use client"

import { Navigation } from "@/components/navigation"
import { Leaf, Droplets, TreePine, Wind } from "lucide-react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Line, LineChart, XAxis, YAxis, CartesianGrid, ResponsiveContainer } from "recharts"
import { ChartContainer, ChartTooltip, ChartTooltipContent } from "@/components/ui/chart"

const weeklyData = [
  { day: "Mon", waste: 2.5 },
  { day: "Tue", waste: 1.8 },
  { day: "Wed", waste: 2.2 },
  { day: "Thu", waste: 1.5 },
  { day: "Fri", waste: 1.9 },
  { day: "Sat", waste: 1.2 },
  { day: "Sun", waste: 1.0 },
]

const monthlyData = [
  { month: "Jan", waste: 45 },
  { month: "Feb", waste: 38 },
  { month: "Mar", waste: 42 },
  { month: "Apr", waste: 35 },
  { month: "May", waste: 30 },
  { month: "Jun", waste: 28 },
]

export default function Dashboard() {
  return (
    <div className="min-h-screen bg-[#F5F5F5] pb-20 md:pb-0">
      <Navigation />

      {/* Main Content Container */}
      <div className="w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="py-8 lg:py-12">
          <div className="mb-12">
            <div className="inline-flex items-center gap-2 bg-[#4CAF50]/10 px-4 py-2 rounded-full text-[#4CAF50] font-medium mb-4">
              <Leaf className="w-4 h-4" />
              Dashboard
            </div>
            <h1 className="text-3xl md:text-4xl font-bold text-[#2E2E2E] mb-2">Your Impact Overview</h1>
            <p className="text-gray-600">Track your food waste reduction and environmental impact.</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
            <Card className="border-0 shadow-md rounded-2xl bg-white hover:shadow-lg transition-shadow">
              <CardContent className="p-8">
                <div className="flex items-center gap-4 mb-4">
                  <div className="w-12 h-12 bg-[#4CAF50]/10 rounded-xl flex items-center justify-center">
                    <Wind className="w-6 h-6 text-[#4CAF50]" />
                  </div>
                  <div>
                    <p className="text-sm text-gray-600">CO₂ Reduced</p>
                    <p className="text-2xl font-bold text-[#4CAF50]">24.5 kg</p>
                  </div>
                </div>
                <p className="text-xs text-gray-500">Equivalent to 5 trees planted</p>
              </CardContent>
            </Card>

            <Card className="border-0 shadow-md rounded-2xl bg-white hover:shadow-lg transition-shadow">
              <CardContent className="p-8">
                <div className="flex items-center gap-4 mb-4">
                  <div className="w-12 h-12 bg-[#4CAF50]/10 rounded-xl flex items-center justify-center">
                    <Droplets className="w-6 h-6 text-[#4CAF50]" />
                  </div>
                  <div>
                    <p className="text-sm text-gray-600">Water Saved</p>
                    <p className="text-2xl font-bold text-[#4CAF50]">1,250 L</p>
                  </div>
                </div>
                <p className="text-xs text-gray-500">Enough for 25 showers</p>
              </CardContent>
            </Card>

            <Card className="border-0 shadow-md rounded-2xl bg-white hover:shadow-lg transition-shadow">
              <CardContent className="p-8">
                <div className="flex items-center gap-4 mb-4">
                  <div className="w-12 h-12 bg-[#4CAF50]/10 rounded-xl flex items-center justify-center">
                    <TreePine className="w-6 h-6 text-[#4CAF50]" />
                  </div>
                  <div>
                    <p className="text-sm text-gray-600">Land Preserved</p>
                    <p className="text-2xl font-bold text-[#4CAF50]">8.3 m²</p>
                  </div>
                </div>
                <p className="text-xs text-gray-500">Small garden equivalent</p>
              </CardContent>
            </Card>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-8">
            {/* Weekly Trend Chart */}
            <Card className="border-0 shadow-md rounded-2xl bg-white">
              <CardHeader className="pb-4">
                <CardTitle className="text-lg font-semibold text-[#2E2E2E]">Weekly Food Waste Trend</CardTitle>
                <p className="text-sm text-gray-600">Last 7 days (kg)</p>
              </CardHeader>
              <CardContent className="pt-0">
                <ChartContainer
                  config={{
                    waste: {
                      label: "Food Waste (kg)",
                      color: "#4CAF50",
                    },
                  }}
                  className="h-[300px] w-full"
                >
                  <ResponsiveContainer width="100%" height="100%">
                    <LineChart data={weeklyData} margin={{ top: 5, right: 10, left: 0, bottom: 5 }}>
                      <CartesianGrid strokeDasharray="3 3" stroke="#E0E0E0" />
                      <XAxis dataKey="day" stroke="#9E9E9E" style={{ fontSize: "12px" }} />
                      <YAxis stroke="#9E9E9E" style={{ fontSize: "12px" }} />
                      <ChartTooltip content={<ChartTooltipContent />} />
                      <Line
                        type="monotone"
                        dataKey="waste"
                        stroke="#4CAF50"
                        strokeWidth={3}
                        dot={{ fill: "#4CAF50", r: 4 }}
                        activeDot={{ r: 6 }}
                      />
                    </LineChart>
                  </ResponsiveContainer>
                </ChartContainer>
              </CardContent>
            </Card>

            {/* Monthly Trend Chart */}
            <Card className="border-0 shadow-md rounded-2xl bg-white">
              <CardHeader className="pb-4">
                <CardTitle className="text-lg font-semibold text-[#2E2E2E]">Monthly Food Waste Trend</CardTitle>
                <p className="text-sm text-gray-600">Last 6 months (kg)</p>
              </CardHeader>
              <CardContent className="pt-0">
                <ChartContainer
                  config={{
                    waste: {
                      label: "Food Waste (kg)",
                      color: "#FFC107",
                    },
                  }}
                  className="h-[300px] w-full"
                >
                  <ResponsiveContainer width="100%" height="100%">
                    <LineChart data={monthlyData} margin={{ top: 5, right: 10, left: 0, bottom: 5 }}>
                      <CartesianGrid strokeDasharray="3 3" stroke="#E0E0E0" />
                      <XAxis dataKey="month" stroke="#9E9E9E" style={{ fontSize: "12px" }} />
                      <YAxis stroke="#9E9E9E" style={{ fontSize: "12px" }} />
                      <ChartTooltip content={<ChartTooltipContent />} />
                      <Line
                        type="monotone"
                        dataKey="waste"
                        stroke="#FFC107"
                        strokeWidth={3}
                        dot={{ fill: "#FFC107", r: 4 }}
                        activeDot={{ r: 6 }}
                      />
                    </LineChart>
                  </ResponsiveContainer>
                </ChartContainer>
              </CardContent>
            </Card>
          </div>

          <Card className="border-0 shadow-md rounded-2xl bg-white">
            <CardContent className="p-8">
              <h3 className="text-lg font-semibold text-[#2E2E2E] mb-6">This Week's Summary</h3>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <div>
                  <p className="text-sm text-gray-600 mb-2">Total Waste Logged</p>
                  <p className="text-3xl font-bold text-[#2E2E2E]">12.1 kg</p>
                  <div className="mt-3 flex items-center gap-2">
                    <div className="flex-1 bg-gray-200 rounded-full h-2">
                      <div className="bg-[#4CAF50] h-2 rounded-full" style={{ width: "65%" }}></div>
                    </div>
                    <span className="text-sm text-[#4CAF50] font-medium">-35%</span>
                  </div>
                </div>

                <div>
                  <p className="text-sm text-gray-600 mb-2">Items Prevented</p>
                  <p className="text-3xl font-bold text-[#2E2E2E]">23</p>
                  <p className="text-sm text-gray-500 mt-3">From going to waste</p>
                </div>

                <div>
                  <p className="text-sm text-gray-600 mb-2">Money Saved</p>
                  <p className="text-3xl font-bold text-[#FFC107]">Rp 187.500</p>
                  <p className="text-sm text-gray-500 mt-3">Estimated value</p>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  )
}
