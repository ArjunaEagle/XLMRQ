"use client"

import { useState, useEffect } from "react"
import { useRouter, usePathname } from "next/navigation"
import Link from "next/link"
import {
  Wifi,
  Smartphone,
  Users,
  TrendingUp,
  Home,
  BarChart3,
  User,
  Copy,
  Check,
  Globe,
  Zap,
  Shield,
  ArrowUp,
  Plus,
  ChevronRight,
} from "lucide-react"

export default function GrassIODashboard() {
  const [copied, setCopied] = useState(false)
  const [earnings, setEarnings] = useState(0)
  const [points, setPoints] = useState(0)
  const router = useRouter()
  const pathname = usePathname()

  // Animated counter effect
  useEffect(() => {
    const earnTimer = setInterval(() => {
      setEarnings((prev) => prev + Math.random() * 0.1)
    }, 2000)

    const pointsTimer = setInterval(() => {
      setPoints((prev) => prev + 1)
    }, 5000)

    return () => {
      clearInterval(earnTimer)
      clearInterval(pointsTimer)
    }
  }, [])

  const handleShare = () => {
    navigator.clipboard.writeText("")
    setCopied(true)
    setTimeout(() => setCopied(false), 2000)
  }

  const handleNavigation = (path: string) => {
    router.push(path)
  }

  const isActiveRoute = (path: string) => {
    return pathname === path
  }

  return (
    <div className="min-h-screen bg-black text-white overflow-x-hidden">
      {/* Header */}
      <header className="bg-black/80 backdrop-blur-xl border-b border-gray-800/50 px-4 sm:px-6 py-4 sticky top-0 z-50">
        <div className="flex items-center justify-between max-w-7xl mx-auto">
          <div className="flex items-center gap-3">
            <Link href="/" className="flex items-center gap-3 hover:opacity-80 transition-opacity">
              <div>
                <h1 className="text-lg sm:text-xl font-bold bg-gradient-to-r from-white to-gray-300 bg-clip-text text-transparent">
                  FOOPTRA
                </h1>
                <p className="text-xs text-gray-500">Dashboard</p>
              </div>
            </Link>
          </div>
          <div className="flex items-center gap-2">
            <div className="w-2 h-2 rounded-full bg-green-400 animate-pulse"></div>
            <span className="text-xs sm:text-sm text-green-400 font-medium">Active</span>
          </div>
        </div>
      </header>

      {/* Main Content Container */}
      <div className="w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="py-4 sm:py-6 lg:py-8">
          {/* Desktop/Tablet Layout */}
          <div className="hidden md:grid md:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
            {/* Main Earnings Card - Takes full width on medium, spans 2 cols on large */}
            <div className="md:col-span-2 lg:col-span-1">
              <div className="bg-gradient-to-br from-gray-900/90 to-gray-800/90 backdrop-blur-xl rounded-2xl p-6 lg:p-8 border border-gray-800/50 shadow-2xl shadow-black/20 h-full">
                <div className="text-center space-y-4 lg:space-y-6">
                  <div className="inline-flex items-center gap-2 bg-green-400/10 px-3 py-1 rounded-full">
                    <div className="w-2 h-2 bg-green-400 rounded-full animate-pulse"></div>
                    <span className="text-green-400 text-sm font-medium">Earning</span>
                  </div>

                  <div>
                    <p className="text-gray-400 text-sm mb-1">Total Earnings</p>
                    <div className="flex items-center justify-center gap-1">
                      <span className="text-green-400 text-xl lg:text-2xl">$</span>
                      <span className="text-4xl lg:text-5xl font-light text-white tracking-tight">
                        {earnings.toFixed(4)}
                      </span>
                    </div>
                  </div>

                  <div className="grid grid-cols-2 gap-4 pt-4">
                    <div className="text-center">
                      <p className="text-2xl lg:text-3xl font-light text-white">{points}</p>
                      <p className="text-xs text-gray-500">Points Today</p>
                    </div>
                    <div className="text-center">
                      <p className="text-2xl lg:text-3xl font-light text-white">24h</p>
                      <p className="text-xs text-gray-500">Uptime</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Connection Status */}
            <div className="bg-gray-900/50 backdrop-blur-xl rounded-2xl p-5 lg:p-6 border border-gray-800/50">
              <div className="flex items-center justify-between mb-4">
                <h3 className="text-white font-medium">Connection</h3>
                <div className="flex items-center gap-2">
                  <Wifi className="w-4 h-4 text-green-400" />
                  <span className="text-green-400 text-sm">Connected</span>
                </div>
              </div>

              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <span className="text-gray-400 text-sm">Network Quality</span>
                  <div className="flex items-center gap-2">
                    <div className="flex gap-1">
                      {[...Array(4)].map((_, i) => (
                        <div key={i} className={`w-1 h-3 rounded-full ${i < 3 ? "bg-green-400" : "bg-gray-700"}`}></div>
                      ))}
                    </div>
                    <span className="text-white text-sm">Good</span>
                  </div>
                </div>

                <div className="flex items-center justify-between">
                  <span className="text-gray-400 text-sm">Bandwidth Usage</span>
                  <span className="text-white text-sm">2.3 GB</span>
                </div>

                <div className="w-full bg-gray-800 rounded-full h-1.5">
                  <div className="bg-gradient-to-r from-green-400 to-emerald-400 h-1.5 rounded-full w-3/4"></div>
                </div>
              </div>
            </div>

            {/* Referral Card */}
            <div className="bg-gray-900/50 backdrop-blur-xl rounded-2xl p-5 lg:p-6 border border-gray-800/50">
              <div className="flex items-center justify-between mb-4">
                <div className="flex items-center gap-3">
                  <div className="w-8 h-8 bg-green-400/20 rounded-lg flex items-center justify-center">
                    <Users className="w-4 h-4 text-green-400" />
                  </div>
                  <div>
                    <h3 className="text-white font-medium">Referrals</h3>
                    <p className="text-gray-400 text-xs">Earn 20% from friends</p>
                  </div>
                </div>
                <div className="bg-green-400/10 px-2 py-1 rounded-full">
                  <span className="text-green-400 text-sm font-medium">15</span>
                </div>
              </div>

              <button
                onClick={handleShare}
                className="w-full bg-green-400 hover:bg-green-500 text-black font-medium py-3 rounded-xl transition-all duration-200 flex items-center justify-center gap-2"
              >
                {copied ? <Check className="w-4 h-4" /> : <Copy className="w-4 h-4" />}
                {copied ? "Link Copied!" : "Share Link"}
              </button>
            </div>
          </div>

          {/* Mobile Layout */}
          <div className="md:hidden space-y-4 sm:space-y-6 pb-32">
            {/* Main Earnings Card */}
            <div className="bg-gradient-to-br from-gray-900/90 to-gray-800/90 backdrop-blur-xl rounded-2xl p-6 border border-gray-800/50 shadow-2xl shadow-black/20">
              <div className="text-center space-y-4">
                <div className="inline-flex items-center gap-2 bg-green-400/10 px-3 py-1 rounded-full">
                  <div className="w-2 h-2 bg-green-400 rounded-full animate-pulse"></div>
                  <span className="text-green-400 text-sm font-medium">Earning</span>
                </div>

                <div>
                  <p className="text-gray-400 text-sm mb-1">Total Earnings</p>
                  <div className="flex items-center justify-center gap-1">
                    <span className="text-green-400 text-lg sm:text-xl">$</span>
                    <span className="text-3xl sm:text-4xl font-light text-white tracking-tight">
                      {earnings.toFixed(4)}
                    </span>
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-4 pt-4">
                  <div className="text-center">
                    <p className="text-xl sm:text-2xl font-light text-white">{points}</p>
                    <p className="text-xs text-gray-500">Points Today</p>
                  </div>
                  <div className="text-center">
                    <p className="text-xl sm:text-2xl font-light text-white">24h</p>
                    <p className="text-xs text-gray-500">Uptime</p>
                  </div>
                </div>
              </div>
            </div>

            {/* Connection Status */}
            <div className="bg-gray-900/50 backdrop-blur-xl rounded-2xl p-5 border border-gray-800/50">
              <div className="flex items-center justify-between mb-4">
                <h3 className="text-white font-medium">Connection</h3>
                <div className="flex items-center gap-2">
                  <Wifi className="w-4 h-4 text-green-400" />
                  <span className="text-green-400 text-sm">Connected</span>
                </div>
              </div>

              <div className="space-y-3">
                <div className="flex items-center justify-between">
                  <span className="text-gray-400 text-sm">Network Quality</span>
                  <div className="flex items-center gap-2">
                    <div className="flex gap-1">
                      {[...Array(4)].map((_, i) => (
                        <div key={i} className={`w-1 h-3 rounded-full ${i < 3 ? "bg-green-400" : "bg-gray-700"}`}></div>
                      ))}
                    </div>
                    <span className="text-white text-sm">Good</span>
                  </div>
                </div>

                <div className="flex items-center justify-between">
                  <span className="text-gray-400 text-sm">Bandwidth Usage</span>
                  <span className="text-white text-sm">2.3 GB</span>
                </div>

                <div className="w-full bg-gray-800 rounded-full h-1.5 mt-3">
                  <div className="bg-gradient-to-r from-green-400 to-emerald-400 h-1.5 rounded-full w-3/4"></div>
                </div>
              </div>
            </div>

            {/* Referral Card */}
            <div className="bg-gray-900/50 backdrop-blur-xl rounded-2xl p-5 border border-gray-800/50">
              <div className="flex items-center justify-between mb-4">
                <div className="flex items-center gap-3">
                  <div className="w-8 h-8 bg-green-400/20 rounded-lg flex items-center justify-center">
                    <Users className="w-4 h-4 text-green-400" />
                  </div>
                  <div>
                    <h3 className="text-white font-medium">Referrals</h3>
                    <p className="text-gray-400 text-xs">Earn 20% from friends</p>
                  </div>
                </div>
                <div className="bg-green-400/10 px-2 py-1 rounded-full">
                  <span className="text-green-400 text-sm font-medium">15</span>
                </div>
              </div>

              <button
                onClick={handleShare}
                className="w-full bg-green-400 hover:bg-green-500 text-black font-medium py-3 rounded-xl transition-all duration-200 flex items-center justify-center gap-2"
              >
                {copied ? <Check className="w-4 h-4" /> : <Copy className="w-4 h-4" />}
                {copied ? "Link Copied!" : "Share Link"}
              </button>
            </div>
          </div>

          {/* Quick Stats - Responsive Grid */}
          <div className="grid grid-cols-3 md:grid-cols-3 lg:grid-cols-6 gap-3 sm:gap-4 mb-6">
            <div className="bg-gray-900/50 backdrop-blur-xl rounded-xl p-4 lg:p-5 border border-gray-800/50 text-center">
              <div className="w-8 h-8 bg-blue-400/20 rounded-lg flex items-center justify-center mx-auto mb-2">
                <Shield className="w-4 h-4 text-blue-400" />
              </div>
              <p className="text-white font-medium text-sm sm:text-base">99.9%</p>
              <p className="text-gray-500 text-xs">Uptime</p>
            </div>

            <div className="bg-gray-900/50 backdrop-blur-xl rounded-xl p-4 lg:p-5 border border-gray-800/50 text-center">
              <div className="w-8 h-8 bg-purple-400/20 rounded-lg flex items-center justify-center mx-auto mb-2">
                <Zap className="w-4 h-4 text-purple-400" />
              </div>
              <p className="text-white font-medium text-sm sm:text-base">156</p>
              <p className="text-gray-500 text-xs">Speed</p>
            </div>

            <div className="bg-gray-900/50 backdrop-blur-xl rounded-xl p-4 lg:p-5 border border-gray-800/50 text-center">
              <div className="w-8 h-8 bg-orange-400/20 rounded-lg flex items-center justify-center mx-auto mb-2">
                <TrendingUp className="w-4 h-4 text-orange-400" />
              </div>
              <p className="text-white font-medium text-sm sm:text-base">+12%</p>
              <p className="text-gray-500 text-xs">Growth</p>
            </div>

            {/* Additional stats for larger screens */}
            <div className="hidden lg:block bg-gray-900/50 backdrop-blur-xl rounded-xl p-5 border border-gray-800/50 text-center">
              <div className="w-8 h-8 bg-green-400/20 rounded-lg flex items-center justify-center mx-auto mb-2">
                <Globe className="w-4 h-4 text-green-400" />
              </div>
              <p className="text-white font-medium">5</p>
              <p className="text-gray-500 text-xs">Nodes</p>
            </div>

            <div className="hidden lg:block bg-gray-900/50 backdrop-blur-xl rounded-xl p-5 border border-gray-800/50 text-center">
              <div className="w-8 h-8 bg-pink-400/20 rounded-lg flex items-center justify-center mx-auto mb-2">
                <Users className="w-4 h-4 text-pink-400" />
              </div>
              <p className="text-white font-medium">1.2k</p>
              <p className="text-gray-500 text-xs">Network</p>
            </div>

            <div className="hidden lg:block bg-gray-900/50 backdrop-blur-xl rounded-xl p-5 border border-gray-800/50 text-center">
              <div className="w-8 h-8 bg-yellow-400/20 rounded-lg flex items-center justify-center mx-auto mb-2">
                <Smartphone className="w-4 h-4 text-yellow-400" />
              </div>
              <p className="text-white font-medium">3</p>
              <p className="text-gray-500 text-xs">Devices</p>
            </div>
          </div>

          {/* Recent Activity - Full Width */}
          <div className="bg-gray-900/50 backdrop-blur-xl rounded-2xl p-5 sm:p-6 lg:p-8 border border-gray-800/50">
            <div className="flex items-center justify-between mb-6">
              <h3 className="text-white font-medium text-lg">Recent Activity</h3>
              <ChevronRight className="w-4 h-4 text-gray-400" />
            </div>

            <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
              <div className="flex items-center gap-3">
                <div className="w-2 h-2 bg-green-400 rounded-full flex-shrink-0"></div>
                <div className="flex-1 min-w-0">
                  <p className="text-white text-sm truncate">Bandwidth shared</p>
                  <p className="text-gray-500 text-xs">2 minutes ago</p>
                </div>
                <span className="text-green-400 text-sm flex-shrink-0">+0.0012</span>
              </div>

              <div className="flex items-center gap-3">
                <div className="w-2 h-2 bg-blue-400 rounded-full flex-shrink-0"></div>
                <div className="flex-1 min-w-0">
                  <p className="text-white text-sm truncate">Network optimization</p>
                  <p className="text-gray-500 text-xs">5 minutes ago</p>
                </div>
                <ArrowUp className="w-3 h-3 text-blue-400 flex-shrink-0" />
              </div>

              <div className="flex items-center gap-3">
                <div className="w-2 h-2 bg-purple-400 rounded-full flex-shrink-0"></div>
                <div className="flex-1 min-w-0">
                  <p className="text-white text-sm truncate">Referral joined</p>
                  <p className="text-gray-500 text-xs">1 hour ago</p>
                </div>
                <Plus className="w-3 h-3 text-purple-400 flex-shrink-0" />
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Bottom Navigation - Mobile Only */}
      <div className="fixed bottom-0 left-0 right-0 bg-black/95 backdrop-blur-xl border-t border-gray-700/80 md:hidden z-50 shadow-2xl shadow-black/50">
        <div className="flex items-center justify-around py-4 px-2">
          <Link
            href="/"
            className={`flex flex-col items-center gap-1 p-3 min-w-0 rounded-xl transition-all duration-200 ${
              pathname === "/"
                ? "text-green-400 bg-green-400/10"
                : "text-gray-400 hover:text-white hover:bg-gray-800/50"
            }`}
          >
            <Home className="w-5 h-5" />
            <span className="text-xs font-medium">Home</span>
          </Link>

          <Link
            href="/dashboard"
            className={`flex flex-col items-center gap-1 p-3 min-w-0 rounded-xl transition-all duration-200 ${
              pathname === "/dashboard"
                ? "text-green-400 bg-green-400/10"
                : "text-gray-400 hover:text-white hover:bg-gray-800/50"
            }`}
          >
            <BarChart3 className="w-5 h-5" />
            <span className="text-xs font-medium">Stats</span>
          </Link>

          <Link
            href="/log"
            className={`flex flex-col items-center gap-1 p-3 min-w-0 rounded-xl transition-all duration-200 ${
              pathname === "/log"
                ? "text-green-400 bg-green-400/10"
                : "text-gray-400 hover:text-white hover:bg-gray-800/50"
            }`}
          >
            <Smartphone className="w-5 h-5" />
            <span className="text-xs font-medium">Log</span>
          </Link>

          <Link
            href="/profile"
            className={`flex flex-col items-center gap-1 p-3 min-w-0 rounded-xl transition-all duration-200 ${
              pathname === "/profile"
                ? "text-green-400 bg-green-400/10"
                : "text-gray-400 hover:text-white hover:bg-gray-800/50"
            }`}
          >
            <User className="w-5 h-5" />
            <span className="text-xs font-medium">Profile</span>
          </Link>
        </div>
        <div className="h-safe-area-inset-bottom bg-black/95"></div>
      </div>

      {/* Desktop Navigation - Large Screens Only */}
      <div className="hidden lg:fixed lg:top-1/2 lg:left-6 lg:transform lg:-translate-y-1/2 lg:flex lg:flex-col lg:gap-4 lg:z-40">
        <Link
          href="/"
          className={`group relative w-12 h-12 backdrop-blur-xl rounded-xl border flex items-center justify-center transition-all ${
            pathname === "/"
              ? "bg-green-400/20 border-green-400/50 text-green-400"
              : "bg-gray-800/80 border-gray-700/50 text-gray-500 hover:text-white hover:bg-gray-700/80"
          }`}
        >
          <Home className="w-5 h-5" />
          <div className="absolute left-16 bg-gray-800 text-white px-2 py-1 rounded text-sm opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap">
            Home
          </div>
        </Link>

        <Link
          href="/dashboard"
          className={`group relative w-12 h-12 backdrop-blur-xl rounded-xl border flex items-center justify-center transition-all ${
            pathname === "/dashboard"
              ? "bg-green-400/20 border-green-400/50 text-green-400"
              : "bg-gray-800/80 border-gray-700/50 text-gray-500 hover:text-white hover:bg-gray-700/80"
          }`}
        >
          <BarChart3 className="w-5 h-5" />
          <div className="absolute left-16 bg-gray-800 text-white px-2 py-1 rounded text-sm opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap">
            Dashboard
          </div>
        </Link>

        <Link
          href="/log"
          className={`group relative w-12 h-12 backdrop-blur-xl rounded-xl border flex items-center justify-center transition-all ${
            pathname === "/log"
              ? "bg-green-400/20 border-green-400/50 text-green-400"
              : "bg-gray-800/80 border-gray-700/50 text-gray-500 hover:text-white hover:bg-gray-700/80"
          }`}
        >
          <Smartphone className="w-5 h-5" />
          <div className="absolute left-16 bg-gray-800 text-white px-2 py-1 rounded text-sm opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap">
            Log Food
          </div>
        </Link>

        <Link
          href="/profile"
          className={`group relative w-12 h-12 backdrop-blur-xl rounded-xl border flex items-center justify-center transition-all ${
            pathname === "/profile"
              ? "bg-green-400/20 border-green-400/50 text-green-400"
              : "bg-gray-800/80 border-gray-700/50 text-gray-500 hover:text-white hover:bg-gray-700/80"
          }`}
        >
          <User className="w-5 h-5" />
          <div className="absolute left-16 bg-gray-800 text-white px-2 py-1 rounded text-sm opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap">
            Profile
          </div>
        </Link>
      </div>
    </div>
  )
}
