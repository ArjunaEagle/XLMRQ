"use client"

import type React from "react"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Calendar } from "@/components/ui/calendar"
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover"
import { Navigation } from "@/components/navigation"
import { CalendarIcon, Plus, CheckCircle } from "lucide-react"
import { format } from "date-fns"
import { cn } from "@/lib/utils"

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

export default function LogPage() {
  const [entries, setEntries] = useState<FoodWasteEntry[]>([])
  const [showForm, setShowForm] = useState(false)
  const [showSuccess, setShowSuccess] = useState(false)
  const [formData, setFormData] = useState({
    foodItem: "",
    category: "",
    quantity: "",
    unit: "",
    reason: "",
    date: new Date(),
    notes: "",
  })

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

  return (
    <div className="min-h-screen bg-gradient-to-br from-green-50 to-white pb-20 md:pb-0">
      <Navigation />

      <div className="container mx-auto px-4 py-8 max-w-4xl">
        {/* Success Message */}
        {showSuccess && (
          <div className="mb-6 p-4 bg-[#4CAF50]/10 border border-[#4CAF50]/20 rounded-lg flex items-center gap-3">
            <CheckCircle className="w-5 h-5 text-[#4CAF50]" />
            <span className="text-[#4CAF50] font-medium">Food waste entry logged successfully!</span>
          </div>
        )}

        {/* Page Header */}
        <div className="flex items-center justify-between mb-8">
          <div>
            <h1 className="text-3xl font-serif font-bold text-[#2E2E2E] mb-2">Log Food Waste</h1>
            <p className="text-gray-600">Track your food waste to identify patterns and reduce waste</p>
          </div>
          <Button className="bg-[#4CAF50] hover:bg-[#45a049] text-white" onClick={() => setShowForm(true)}>
            <Plus className="w-4 h-4 mr-2" />
            Add Entry
          </Button>
        </div>

        {/* Add Entry Form */}
        {showForm && (
          <Card className="mb-8 border-0 shadow-lg">
            <CardHeader>
              <CardTitle className="text-xl font-serif text-[#2E2E2E]">Add Food Waste Entry</CardTitle>
            </CardHeader>
            <CardContent>
              <form onSubmit={handleSubmit} className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="space-y-2">
                    <Label htmlFor="foodItem">Food Item *</Label>
                    <Input
                      id="foodItem"
                      placeholder="e.g., Bananas, Leftover pasta"
                      value={formData.foodItem}
                      onChange={(e) => handleInputChange("foodItem", e.target.value)}
                      required
                    />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="category">Category *</Label>
                    <Select
                      value={formData.category}
                      onValueChange={(value) => handleInputChange("category", value)}
                      required
                    >
                      <SelectTrigger>
                        <SelectValue placeholder="Select category" />
                      </SelectTrigger>
                      <SelectContent>
                        {categories.map((category) => (
                          <SelectItem key={category} value={category}>
                            {category}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="quantity">Quantity *</Label>
                    <Input
                      id="quantity"
                      type="number"
                      placeholder="e.g., 2"
                      value={formData.quantity}
                      onChange={(e) => handleInputChange("quantity", e.target.value)}
                      required
                    />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="unit">Unit *</Label>
                    <Select value={formData.unit} onValueChange={(value) => handleInputChange("unit", value)} required>
                      <SelectTrigger>
                        <SelectValue placeholder="Select unit" />
                      </SelectTrigger>
                      <SelectContent>
                        {units.map((unit) => (
                          <SelectItem key={unit} value={unit}>
                            {unit}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="reason">Reason for Waste *</Label>
                    <Select
                      value={formData.reason}
                      onValueChange={(value) => handleInputChange("reason", value)}
                      required
                    >
                      <SelectTrigger>
                        <SelectValue placeholder="Why was it wasted?" />
                      </SelectTrigger>
                      <SelectContent>
                        {reasons.map((reason) => (
                          <SelectItem key={reason} value={reason}>
                            {reason}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>

                  <div className="space-y-2">
                    <Label>Date *</Label>
                    <Popover>
                      <PopoverTrigger asChild>
                        <Button
                          variant="outline"
                          className={cn(
                            "w-full justify-start text-left font-normal",
                            !formData.date && "text-muted-foreground",
                          )}
                        >
                          <CalendarIcon className="mr-2 h-4 w-4" />
                          {formData.date ? format(formData.date, "PPP") : <span>Pick a date</span>}
                        </Button>
                      </PopoverTrigger>
                      <PopoverContent className="w-auto p-0">
                        <Calendar
                          mode="single"
                          selected={formData.date}
                          onSelect={(date) => handleInputChange("date", date || new Date())}
                          initialFocus
                        />
                      </PopoverContent>
                    </Popover>
                  </div>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="notes">Additional Notes (Optional)</Label>
                  <Textarea
                    id="notes"
                    placeholder="Any additional details about the waste..."
                    value={formData.notes}
                    onChange={(e) => handleInputChange("notes", e.target.value)}
                    rows={3}
                  />
                </div>

                <div className="flex gap-4">
                  <Button type="submit" className="bg-[#4CAF50] hover:bg-[#45a049] text-white">
                    Log Entry
                  </Button>
                  <Button type="button" variant="outline" onClick={() => setShowForm(false)}>
                    Cancel
                  </Button>
                </div>
              </form>
            </CardContent>
          </Card>
        )}

        {/* Recent Entries */}
        <div className="space-y-6">
          <div className="flex items-center justify-between">
            <h2 className="text-2xl font-serif font-bold text-[#2E2E2E]">Recent Entries</h2>
            {entries.length > 0 && <span className="text-sm text-gray-500">{entries.length} entries logged</span>}
          </div>

          {entries.length === 0 ? (
            <Card className="border-0 shadow-lg">
              <CardContent className="p-12 text-center">
                <div className="w-16 h-16 bg-[#4CAF50]/10 rounded-full flex items-center justify-center mx-auto mb-4">
                  <Plus className="w-8 h-8 text-[#4CAF50]" />
                </div>
                <h3 className="text-xl font-serif font-semibold text-[#2E2E2E] mb-2">No entries yet</h3>
                <p className="text-gray-600 mb-6">Start tracking your food waste to see insights and reduce waste.</p>
                <Button className="bg-[#4CAF50] hover:bg-[#45a049] text-white" onClick={() => setShowForm(true)}>
                  <Plus className="w-4 h-4 mr-2" />
                  Add Your First Entry
                </Button>
              </CardContent>
            </Card>
          ) : (
            <div className="space-y-4">
              {entries.map((entry) => (
                <Card key={entry.id} className="border-0 shadow-lg hover:shadow-xl transition-shadow">
                  <CardContent className="p-6">
                    <div className="flex items-start justify-between">
                      <div className="flex-1">
                        <div className="flex items-center gap-3 mb-2">
                          <h3 className="text-lg font-serif font-semibold text-[#2E2E2E]">{entry.foodItem}</h3>
                          <span className="px-2 py-1 bg-[#4CAF50]/10 text-[#4CAF50] text-xs rounded-full">
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
                            <span className="font-medium">Date:</span> {format(entry.date, "MMM dd, yyyy")}
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
        </div>

        {/* Quick Stats */}
        {entries.length > 0 && (
          <Card className="mt-8 border-0 shadow-lg bg-gradient-to-r from-[#4CAF50]/5 to-[#8BC34A]/5">
            <CardContent className="p-6">
              <h3 className="text-lg font-serif font-semibold text-[#2E2E2E] mb-4">Quick Stats</h3>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div className="text-center">
                  <div className="text-2xl font-bold text-[#4CAF50] mb-1">{entries.length}</div>
                  <div className="text-sm text-gray-600">Total Entries</div>
                </div>
                <div className="text-center">
                  <div className="text-2xl font-bold text-[#4CAF50] mb-1">
                    {entries.reduce((acc, entry) => acc + Number.parseInt(entry.quantity || "0"), 0)}
                  </div>
                  <div className="text-sm text-gray-600">Items Wasted</div>
                </div>
                <div className="text-center">
                  <div className="text-2xl font-bold text-[#4CAF50] mb-1">
                    {new Set(entries.map((entry) => entry.category)).size}
                  </div>
                  <div className="text-sm text-gray-600">Categories</div>
                </div>
              </div>
            </CardContent>
          </Card>
        )}
      </div>
    </div>
  )
}
