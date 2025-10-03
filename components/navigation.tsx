"use client"

import { useState } from "react"
import { usePathname } from "next/navigation"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Leaf, Home, BarChart3, BookOpen, User, Plus, Menu, X } from "lucide-react"

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
      <header className="border-b bg-white sticky top-0 z-50 hidden md:block shadow-sm">
        <div className="container mx-auto px-6 py-4">
          <div className="flex items-center justify-between">
            {/* Logo */}
            <Link href="/" className="flex items-center gap-3 group">
              <div className="w-10 h-10 rounded-xl bg-[#4CAF50] flex items-center justify-center shadow-sm transition-all duration-300 group-hover:shadow-md">
                <Leaf className="w-5 h-5 text-white" />
              </div>
              <h1 className="text-xl font-semibold text-[#374151] transition-colors duration-300 group-hover:text-[#4CAF50]">
                FOOPTRA
              </h1>
            </Link>

            {/* Navigation Card */}
            <nav className="flex items-center bg-white rounded-2xl shadow-sm border border-gray-100 p-1.5">
              {navItems.map((item) => {
                const Icon = item.icon
                return (
                  <Link
                    key={item.href}
                    href={item.href}
                    className={`relative flex items-center gap-2.5 px-4 py-2.5 rounded-xl transition-all duration-300 ${
                      isActiveRoute(item.href)
                        ? "text-[#4CAF50] bg-[#4CAF50]/5 font-medium shadow-sm"
                        : "text-[#374151] hover:text-[#4CAF50] hover:bg-gray-50"
                    }`}
                  >
                    {/* Active indicator - left border */}
                    {isActiveRoute(item.href) && (
                      <span className="absolute left-0 top-1/2 -translate-y-1/2 w-1 h-8 bg-[#4CAF50] rounded-r-full" />
                    )}

                    {/* Icon - small and minimal */}
                    <Icon className="w-4 h-4 flex-shrink-0" />

                    {/* Label */}
                    <span className="text-sm font-medium whitespace-nowrap">{item.label}</span>
                  </Link>
                )
              })}
            </nav>

            {/* CTA Button */}
            <Button
              className="bg-[#4CAF50] hover:bg-[#45a049] text-white font-medium px-5 py-2.5 rounded-xl shadow-sm hover:shadow-md transition-all duration-300"
              asChild
            >
              <Link href="/dashboard" className="flex items-center gap-2">
                <BarChart3 className="w-4 h-4" />
                Get Started
              </Link>
            </Button>
          </div>
        </div>
      </header>

      <header className="border-b bg-white sticky top-0 z-50 md:hidden shadow-sm">
        <div className="container mx-auto px-4 py-3">
          <div className="flex items-center justify-between">
            {/* Logo */}
            <Link href="/" className="flex items-center gap-2">
              <div className="w-9 h-9 rounded-lg bg-[#4CAF50] flex items-center justify-center shadow-sm">
                <Leaf className="w-5 h-5 text-white" />
              </div>
              <h1 className="text-lg font-semibold text-[#374151]">FOOPTRA</h1>
            </Link>

            {/* Hamburger Menu Button */}
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="p-2 rounded-lg hover:bg-gray-100 transition-colors duration-200"
              aria-label="Toggle menu"
            >
              {mobileMenuOpen ? <X className="w-6 h-6 text-[#374151]" /> : <Menu className="w-6 h-6 text-[#374151]" />}
            </button>
          </div>

          {/* Mobile Menu Dropdown */}
          {mobileMenuOpen && (
            <nav className="mt-4 pb-4 space-y-1 animate-fade-in-down">
              {navItems.map((item) => {
                const Icon = item.icon
                return (
                  <Link
                    key={item.href}
                    href={item.href}
                    onClick={() => setMobileMenuOpen(false)}
                    className={`relative flex items-center gap-3 px-4 py-3 rounded-xl transition-all duration-300 ${
                      isActiveRoute(item.href)
                        ? "text-[#4CAF50] bg-[#4CAF50]/5 font-medium"
                        : "text-[#374151] hover:text-[#4CAF50] hover:bg-gray-50"
                    }`}
                  >
                    {/* Active indicator - left border */}
                    {isActiveRoute(item.href) && (
                      <span className="absolute left-0 top-1/2 -translate-y-1/2 w-1 h-10 bg-[#4CAF50] rounded-r-full" />
                    )}

                    {/* Icon */}
                    <Icon className="w-5 h-5 flex-shrink-0" />

                    {/* Label */}
                    <span className="text-sm font-medium">{item.label}</span>
                  </Link>
                )
              })}
            </nav>
          )}
        </div>
      </header>
    </>
  )
}
