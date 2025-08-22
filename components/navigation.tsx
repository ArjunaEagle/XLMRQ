"use client"

import { useState } from "react"
import { usePathname } from "next/navigation"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Leaf, Home, BarChart3, BookOpen, User, Menu, X, Plus } from "lucide-react"

export function Navigation() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)
  const pathname = usePathname()

  const isActiveRoute = (path: string) => {
    return pathname === path
  }

  const navItems = [
    { href: "/", label: "Home", icon: Home },
    { href: "/dashboard", label: "Dashboard", icon: BarChart3 },
    { href: "/log", label: "Log Food", icon: Plus },
    { href: "/tips", label: "Tips", icon: BookOpen },
    { href: "/profile", label: "Profile", icon: User },
  ]

  return (
    <>
      {/* Header Navigation */}
      <header className="border-b bg-white/80 backdrop-blur-sm sticky top-0 z-50">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <Link href="/" className="flex items-center gap-2">
              <div className="w-8 h-8 rounded-full bg-[#4CAF50] flex items-center justify-center">
                <Leaf className="w-5 h-5 text-white" />
              </div>
              <h1 className="text-2xl font-serif font-bold text-[#2E2E2E]">FOOPTRA</h1>
            </Link>

            {/* Desktop Navigation */}
            <nav className="hidden md:flex items-center gap-6">
              {navItems.map((item) => (
                <Link
                  key={item.href}
                  href={item.href}
                  className={`transition-colors ${
                    isActiveRoute(item.href) ? "text-[#4CAF50] font-medium" : "text-[#2E2E2E] hover:text-[#4CAF50]"
                  }`}
                >
                  {item.label}
                </Link>
              ))}
            </nav>

            {/* Mobile Menu Button */}
            <Button variant="ghost" size="sm" className="md:hidden" onClick={() => setMobileMenuOpen(!mobileMenuOpen)}>
              {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
            </Button>

            {/* Desktop CTA */}
            <Button className="hidden md:flex bg-[#4CAF50] hover:bg-[#45a049] text-white" asChild>
              <Link href="/dashboard">Get Started</Link>
            </Button>
          </div>
        </div>

        {/* Mobile Menu */}
        {mobileMenuOpen && (
          <div className="md:hidden border-t bg-white/95 backdrop-blur-sm">
            <nav className="container mx-auto px-4 py-4 space-y-2">
              {navItems.map((item) => {
                const Icon = item.icon
                return (
                  <Link
                    key={item.href}
                    href={item.href}
                    className={`flex items-center gap-3 px-3 py-2 rounded-lg transition-colors ${
                      isActiveRoute(item.href)
                        ? "bg-[#4CAF50]/10 text-[#4CAF50] font-medium"
                        : "text-[#2E2E2E] hover:bg-gray-100"
                    }`}
                    onClick={() => setMobileMenuOpen(false)}
                  >
                    <Icon className="w-5 h-5" />
                    {item.label}
                  </Link>
                )
              })}
            </nav>
          </div>
        )}
      </header>

      {/* Bottom Navigation - Mobile Only */}
      <div className="fixed bottom-0 left-0 right-0 bg-white/95 backdrop-blur-xl border-t border-gray-200 md:hidden z-50 shadow-lg">
        <div className="flex items-center justify-around py-2 px-2 safe-area-pb">
          {navItems.slice(0, 4).map((item) => {
            const Icon = item.icon
            return (
              <Link
                key={item.href}
                href={item.href}
                className={`flex flex-col items-center gap-1 p-3 min-w-0 rounded-xl transition-all duration-200 ${
                  isActiveRoute(item.href)
                    ? "text-[#4CAF50] bg-[#4CAF50]/10"
                    : "text-gray-600 hover:text-[#4CAF50] hover:bg-gray-100"
                }`}
              >
                <Icon className="w-5 h-5" />
                <span className="text-xs font-medium truncate">{item.label}</span>
              </Link>
            )
          })}
          <Link
            href="/profile"
            className={`flex flex-col items-center gap-1 p-3 min-w-0 rounded-xl transition-all duration-200 ${
              isActiveRoute("/profile")
                ? "text-[#4CAF50] bg-[#4CAF50]/10"
                : "text-gray-600 hover:text-[#4CAF50] hover:bg-gray-100"
            }`}
          >
            <User className="w-5 h-5" />
            <span className="text-xs font-medium">Profile</span>
          </Link>
        </div>
      </div>
    </>
  )
}
