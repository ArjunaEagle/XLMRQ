"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Badge } from "@/components/ui/badge"
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs"
import {
  Search,
  ArrowLeft,
  Lightbulb,
  ShoppingCart,
  Refrigerator,
  ChefHat,
  Calendar,
  Recycle,
  Clock,
  Star,
  BookOpen,
  Heart,
} from "lucide-react"
import Link from "next/link"

interface Tip {
  id: string
  title: string
  description: string
  category: string
  difficulty: "Easy" | "Medium" | "Advanced"
  timeToImplement: string
  impact: "Low" | "Medium" | "High"
  tags: string[]
  content: string
  likes: number
}

const tips: Tip[] = [
  {
    id: "1",
    title: "First In, First Out (FIFO) Method",
    description: "Organize your fridge and pantry to use older items first",
    category: "Storage",
    difficulty: "Easy",
    timeToImplement: "15 minutes",
    impact: "High",
    tags: ["organization", "fridge", "pantry"],
    content:
      "Place newer items behind older ones in your fridge and pantry. This simple rotation system ensures you use items before they expire. Label items with purchase dates if needed.",
    likes: 127,
  },
  {
    id: "2",
    title: "Meal Planning Sunday",
    description: "Plan your weekly meals to buy only what you need",
    category: "Planning",
    difficulty: "Medium",
    timeToImplement: "30 minutes",
    impact: "High",
    tags: ["meal planning", "shopping", "weekly"],
    content:
      "Spend 30 minutes every Sunday planning your meals for the week. Check what you already have, plan recipes around those ingredients, and create a precise shopping list.",
    likes: 89,
  },
  {
    id: "3",
    title: "Proper Produce Storage",
    description: "Learn which fruits and vegetables should be stored together",
    category: "Storage",
    difficulty: "Easy",
    timeToImplement: "10 minutes",
    impact: "Medium",
    tags: ["fruits", "vegetables", "storage"],
    content:
      "Store ethylene-producing fruits (apples, bananas) separately from ethylene-sensitive vegetables (leafy greens, broccoli). Use perforated bags for vegetables that need airflow.",
    likes: 156,
  },
  {
    id: "4",
    title: "Creative Leftover Transformations",
    description: "Turn yesterday's dinner into today's exciting meal",
    category: "Cooking",
    difficulty: "Medium",
    timeToImplement: "20 minutes",
    impact: "Medium",
    tags: ["leftovers", "creativity", "recipes"],
    content:
      "Transform leftovers into new dishes: turn roast chicken into soup, pasta into frittata, or vegetables into smoothies. Keep a 'leftover jar' in your fridge for small amounts.",
    likes: 203,
  },
  {
    id: "5",
    title: "Smart Shopping List Strategy",
    description: "Shop with intention and avoid impulse purchases",
    category: "Shopping",
    difficulty: "Easy",
    timeToImplement: "5 minutes",
    impact: "High",
    tags: ["shopping", "planning", "budget"],
    content:
      "Always shop with a list based on planned meals. Stick to your list and avoid shopping when hungry. Check store flyers for sales and plan meals around discounted items.",
    likes: 94,
  },
  {
    id: "6",
    title: "Freezer Inventory Management",
    description: "Maximize your freezer space and prevent forgotten items",
    category: "Storage",
    difficulty: "Medium",
    timeToImplement: "45 minutes",
    impact: "High",
    tags: ["freezer", "inventory", "organization"],
    content:
      "Keep a freezer inventory list on your fridge. Label everything with contents and date. Use clear containers and organize by category. Set monthly freezer cleanout reminders.",
    likes: 78,
  },
  {
    id: "7",
    title: "Composting Basics",
    description: "Turn unavoidable food scraps into garden gold",
    category: "Recycling",
    difficulty: "Advanced",
    timeToImplement: "2 hours setup",
    impact: "Medium",
    tags: ["composting", "environment", "garden"],
    content:
      "Start a simple compost bin with fruit and vegetable scraps, coffee grounds, and eggshells. Avoid meat, dairy, and oils. Turn regularly and maintain proper moisture levels.",
    likes: 145,
  },
  {
    id: "8",
    title: "Portion Control Techniques",
    description: "Cook the right amount to minimize leftovers",
    category: "Cooking",
    difficulty: "Easy",
    timeToImplement: "5 minutes",
    impact: "Medium",
    tags: ["portions", "cooking", "planning"],
    content:
      "Use measuring tools and learn standard portion sizes. Cook based on actual appetite, not package instructions. Start with smaller portions and add more if needed.",
    likes: 67,
  },
]

const categories = ["All", "Storage", "Planning", "Cooking", "Shopping", "Recycling"]

export default function TipsPage() {
  const [searchTerm, setSearchTerm] = useState("")
  const [selectedCategory, setSelectedCategory] = useState("All")
  const [likedTips, setLikedTips] = useState<Set<string>>(new Set())

  const filteredTips = tips.filter((tip) => {
    const matchesSearch =
      tip.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      tip.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
      tip.tags.some((tag) => tag.toLowerCase().includes(searchTerm.toLowerCase()))
    const matchesCategory = selectedCategory === "All" || tip.category === selectedCategory
    return matchesSearch && matchesCategory
  })

  const handleLike = (tipId: string) => {
    setLikedTips((prev) => {
      const newLiked = new Set(prev)
      if (newLiked.has(tipId)) {
        newLiked.delete(tipId)
      } else {
        newLiked.add(tipId)
      }
      return newLiked
    })
  }

  const getCategoryIcon = (category: string) => {
    switch (category) {
      case "Storage":
        return <Refrigerator className="w-4 h-4" />
      case "Planning":
        return <Calendar className="w-4 h-4" />
      case "Cooking":
        return <ChefHat className="w-4 h-4" />
      case "Shopping":
        return <ShoppingCart className="w-4 h-4" />
      case "Recycling":
        return <Recycle className="w-4 h-4" />
      default:
        return <Lightbulb className="w-4 h-4" />
    }
  }

  const getImpactColor = (impact: string) => {
    switch (impact) {
      case "High":
        return "bg-[#4CAF50] text-white"
      case "Medium":
        return "bg-[#FFC107] text-white"
      case "Low":
        return "bg-gray-400 text-white"
      default:
        return "bg-gray-400 text-white"
    }
  }

  const getDifficultyColor = (difficulty: string) => {
    switch (difficulty) {
      case "Easy":
        return "bg-[#8BC34A]/10 text-[#8BC34A]"
      case "Medium":
        return "bg-[#FFC107]/10 text-[#FFC107]"
      case "Advanced":
        return "bg-red-100 text-red-600"
      default:
        return "bg-gray-100 text-gray-600"
    }
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-green-50 to-white">
      {/* Header */}
      <header className="border-b bg-white/80 backdrop-blur-sm sticky top-0 z-50">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-4">
              <Button variant="ghost" size="sm" asChild>
                <Link href="/" className="flex items-center gap-2">
                  <ArrowLeft className="w-4 h-4" />
                  Back
                </Link>
              </Button>
              <h1 className="text-2xl font-serif font-bold text-[#2E2E2E]">Expert Tips</h1>
            </div>
            <Button className="bg-[#4CAF50] hover:bg-[#45a049] text-white" asChild>
              <Link href="/log">Start Logging</Link>
            </Button>
          </div>
        </div>
      </header>

      <div className="container mx-auto px-4 py-8 max-w-6xl">
        {/* Hero Section */}
        <div className="text-center mb-12">
          <div className="inline-flex items-center gap-2 bg-[#4CAF50]/10 px-4 py-2 rounded-full text-[#4CAF50] font-medium mb-4">
            <BookOpen className="w-4 h-4" />
            Expert Knowledge
          </div>
          <h1 className="text-4xl font-serif font-bold text-[#2E2E2E] mb-4">Reduce Food Waste with Expert Tips</h1>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto">
            Discover practical strategies and proven techniques to minimize food waste, save money, and help the
            environment.
          </p>
        </div>

        {/* Search and Filters */}
        <div className="mb-8">
          <div className="flex flex-col md:flex-row gap-4 mb-6">
            <div className="relative flex-1">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
              <Input
                placeholder="Search tips, techniques, or keywords..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-10"
              />
            </div>
          </div>

          <Tabs value={selectedCategory} onValueChange={setSelectedCategory} className="w-full">
            <TabsList className="grid w-full grid-cols-3 md:grid-cols-6">
              {categories.map((category) => (
                <TabsTrigger key={category} value={category} className="text-xs md:text-sm">
                  {category}
                </TabsTrigger>
              ))}
            </TabsList>
          </Tabs>
        </div>

        {/* Tips Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
          {filteredTips.map((tip) => (
            <Card key={tip.id} className="border-0 shadow-lg hover:shadow-xl transition-all duration-300 group">
              <CardHeader className="pb-4">
                <div className="flex items-start justify-between mb-2">
                  <div className="flex items-center gap-2">
                    {getCategoryIcon(tip.category)}
                    <Badge variant="secondary" className="text-xs">
                      {tip.category}
                    </Badge>
                  </div>
                  <Button variant="ghost" size="sm" onClick={() => handleLike(tip.id)} className="p-1 h-auto">
                    <Heart
                      className={`w-4 h-4 ${likedTips.has(tip.id) ? "fill-red-500 text-red-500" : "text-gray-400"}`}
                    />
                  </Button>
                </div>
                <CardTitle className="text-lg font-serif text-[#2E2E2E] group-hover:text-[#4CAF50] transition-colors">
                  {tip.title}
                </CardTitle>
                <p className="text-sm text-gray-600">{tip.description}</p>
              </CardHeader>
              <CardContent className="pt-0">
                <p className="text-sm text-gray-700 mb-4 leading-relaxed">{tip.content}</p>

                <div className="space-y-3">
                  <div className="flex items-center justify-between text-xs">
                    <div className="flex items-center gap-1 text-gray-500">
                      <Clock className="w-3 h-3" />
                      {tip.timeToImplement}
                    </div>
                    <div className="flex items-center gap-1 text-gray-500">
                      <Star className="w-3 h-3" />
                      {tip.likes + (likedTips.has(tip.id) ? 1 : 0)}
                    </div>
                  </div>

                  <div className="flex items-center justify-between">
                    <Badge className={getDifficultyColor(tip.difficulty)}>{tip.difficulty}</Badge>
                    <Badge className={`${getImpactColor(tip.impact)} text-xs`}>{tip.impact} Impact</Badge>
                  </div>

                  <div className="flex flex-wrap gap-1">
                    {tip.tags.slice(0, 3).map((tag) => (
                      <Badge key={tag} variant="outline" className="text-xs">
                        {tag}
                      </Badge>
                    ))}
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* No Results */}
        {filteredTips.length === 0 && (
          <Card className="border-0 shadow-lg">
            <CardContent className="p-12 text-center">
              <div className="w-16 h-16 bg-[#4CAF50]/10 rounded-full flex items-center justify-center mx-auto mb-4">
                <Search className="w-8 h-8 text-[#4CAF50]" />
              </div>
              <h3 className="text-xl font-serif font-semibold text-[#2E2E2E] mb-2">No tips found</h3>
              <p className="text-gray-600 mb-6">Try adjusting your search terms or category filter.</p>
              <Button
                variant="outline"
                onClick={() => {
                  setSearchTerm("")
                  setSelectedCategory("All")
                }}
              >
                Clear Filters
              </Button>
            </CardContent>
          </Card>
        )}

        {/* Quick Stats */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mt-12">
          <Card className="border-0 shadow-lg bg-gradient-to-r from-[#4CAF50]/5 to-[#8BC34A]/5">
            <CardContent className="p-6 text-center">
              <div className="text-2xl font-bold text-[#4CAF50] mb-1">{tips.length}</div>
              <div className="text-sm text-gray-600">Expert Tips</div>
            </CardContent>
          </Card>
          <Card className="border-0 shadow-lg bg-gradient-to-r from-[#FFC107]/5 to-[#FF9800]/5">
            <CardContent className="p-6 text-center">
              <div className="text-2xl font-bold text-[#FFC107] mb-1">{categories.length - 1}</div>
              <div className="text-sm text-gray-600">Categories</div>
            </CardContent>
          </Card>
          <Card className="border-0 shadow-lg bg-gradient-to-r from-[#8BC34A]/5 to-[#4CAF50]/5">
            <CardContent className="p-6 text-center">
              <div className="text-2xl font-bold text-[#8BC34A] mb-1">
                {tips.reduce((sum, tip) => sum + tip.likes, 0)}
              </div>
              <div className="text-sm text-gray-600">Community Likes</div>
            </CardContent>
          </Card>
          <Card className="border-0 shadow-lg bg-gradient-to-r from-[#2196F3]/5 to-[#03A9F4]/5">
            <CardContent className="p-6 text-center">
              <div className="text-2xl font-bold text-[#2196F3] mb-1">
                {tips.filter((tip) => tip.difficulty === "Easy").length}
              </div>
              <div className="text-sm text-gray-600">Easy Tips</div>
            </CardContent>
          </Card>
        </div>

        {/* Call to Action */}
        <Card className="mt-12 border-0 shadow-lg bg-gradient-to-r from-[#4CAF50] to-[#8BC34A]">
          <CardContent className="p-8 text-center">
            <h3 className="text-2xl font-serif font-bold text-white mb-4">Ready to Put These Tips into Action?</h3>
            <p className="text-white/90 mb-6 max-w-2xl mx-auto">
              Start tracking your food waste today and see how these expert strategies can make a real difference in
              your daily life.
            </p>
            <Button size="lg" className="bg-white text-[#4CAF50] hover:bg-gray-100" asChild>
              <Link href="/log">Start Logging Food Waste</Link>
            </Button>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
