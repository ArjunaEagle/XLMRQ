"use client"

import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Carousel, CarouselContent, CarouselItem, CarouselNext, CarouselPrevious } from "@/components/ui/carousel"
import { Navigation } from "@/components/navigation"
import { Leaf, BarChart3, BookOpen, Trophy, Users, Target, Star, Quote, Sparkles, Award } from "lucide-react"
import Link from "next/link"
import { useEffect, useRef } from "react"

export default function HomePage() {
  const heroRef = useRef<HTMLElement>(null)
  const statsRef = useRef<HTMLDivElement>(null)
  const featuresRef = useRef<HTMLElement>(null)

  useEffect(() => {
    const observerOptions = {
      threshold: 0.1,
      rootMargin: "0px 0px -100px 0px",
    }

    const observer = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add("animate-fade-in-up")
        }
      })
    }, observerOptions)

    const elements = document.querySelectorAll(".animate-on-scroll")
    elements.forEach((el) => observer.observe(el))

    return () => observer.disconnect()
  }, [])

  return (
    <div className="min-h-screen bg-gradient-to-br from-[#E8F5E9] via-[#F1F8E9] to-white">
      <Navigation />

      {/* Hero Section */}
      <section ref={heroRef} className="py-24 px-4 relative overflow-hidden">
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          <div className="absolute top-20 right-10 w-72 h-72 bg-[#4CAF50]/10 rounded-full blur-3xl" />
          <div className="absolute bottom-20 left-10 w-96 h-96 bg-[#8BC34A]/10 rounded-full blur-3xl" />
        </div>

        <div className="container mx-auto text-center max-w-5xl relative z-10">
          <div className="mb-8 animate-on-scroll opacity-0">
            <div className="inline-flex items-center gap-2 bg-gradient-to-r from-[#4CAF50]/20 to-[#8BC34A]/20 backdrop-blur-sm px-6 py-3 rounded-full text-[#2E7D32] font-semibold mb-8 border border-[#4CAF50]/30 hover:scale-105 transition-transform duration-300">
              <Sparkles className="w-5 h-5" />
              Reduce Food Waste, Save Money
            </div>
            <h1 className="text-6xl md:text-7xl lg:text-8xl font-serif font-bold text-[#1B5E20] mb-8 leading-tight tracking-tight">
              Track Your Food,
              <br />
              <span className="bg-gradient-to-r from-[#4CAF50] to-[#8BC34A] bg-clip-text text-transparent">
                Transform Your Impact
              </span>
            </h1>
            <p className="text-xl md:text-2xl text-[#424242] mb-12 max-w-3xl mx-auto leading-relaxed font-light">
              FOOPTRA helps you monitor, reduce, and eliminate food waste through intelligent tracking, personalized
              insights, and actionable recommendations.
            </p>
          </div>

          <div className="flex flex-col sm:flex-row gap-5 justify-center mb-16 animate-on-scroll opacity-0">
            <Button
              size="lg"
              className="bg-gradient-to-r from-[#66BB6A] to-[#4CAF50] hover:from-[#4CAF50] hover:to-[#388E3C] text-white px-10 py-7 text-lg font-semibold rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-105 border-0"
              asChild
            >
              <Link href="/dashboard">Start Tracking Now</Link>
            </Button>
            <Button
              size="lg"
              variant="outline"
              className="border-2 border-[#4CAF50] text-[#2E7D32] hover:bg-[#4CAF50] hover:text-white px-10 py-7 text-lg font-semibold rounded-2xl bg-white/80 backdrop-blur-sm shadow-md hover:shadow-lg transition-all duration-300 hover:scale-105"
              asChild
            >
              <Link href="/tips">Learn More</Link>
            </Button>
          </div>
        </div>
      </section>

      {/* Stats */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-2xl mx-auto">
        <div className="text-center">
          <div className="text-3xl font-bold text-[#4CAF50] mb-2">40%</div>
          <div className="text-gray-600">Food Waste Reduction</div>
        </div>
        <div className="text-center">
          <div className="text-3xl font-bold text-[#4CAF50] mb-2">10k+</div>
          <div className="text-gray-600">Active Users</div>
        </div>
      </div>

      {/* Testimonials Carousel Section */}
      <section className="py-20 px-4 bg-gradient-to-br from-white to-[#F1F8E9] animate-on-scroll opacity-0">
        <div className="container mx-auto max-w-6xl">
          <div className="text-center mb-16">
            <div className="inline-flex items-center gap-2 bg-[#4CAF50]/10 px-4 py-2 rounded-full text-[#2E7D32] font-medium mb-4">
              <Award className="w-4 h-4" />
              Testimonials
            </div>
            <h2 className="text-4xl md:text-5xl font-serif font-bold text-[#1B5E20] mb-4">What Our Users Say</h2>
            <p className="text-xl text-[#424242] font-light">Real stories from people making a difference</p>
          </div>

          <Carousel className="w-full max-w-5xl mx-auto">
            <CarouselContent>
              <CarouselItem className="md:basis-1/2 lg:basis-1/3">
                <Card className="border-0 shadow-lg h-full bg-white/80 backdrop-blur-sm rounded-3xl hover:shadow-xl transition-all duration-300 hover:scale-105">
                  <CardContent className="p-8">
                    <div className="flex items-center gap-1 mb-4">
                      {[...Array(5)].map((_, i) => (
                        <Star key={i} className="w-5 h-5 fill-[#FFC107] text-[#FFC107]" />
                      ))}
                    </div>
                    <Quote className="w-10 h-10 text-[#4CAF50] mb-4" />
                    <p className="text-[#424242] mb-6 italic leading-relaxed">
                      "FOOPTRA helped me reduce my food waste by 60% in just 3 months. I'm saving over $200 monthly!"
                    </p>
                    <div className="flex items-center gap-3">
                      <div className="w-12 h-12 bg-gradient-to-br from-[#4CAF50] to-[#66BB6A] rounded-full flex items-center justify-center text-white font-semibold text-lg shadow-md">
                        S
                      </div>
                      <div>
                        <p className="font-semibold text-[#1B5E20]">Sarah Chen</p>
                        <p className="text-sm text-[#616161]">Home Chef</p>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </CarouselItem>

              <CarouselItem className="md:basis-1/2 lg:basis-1/3">
                <Card className="border-0 shadow-lg h-full bg-white/80 backdrop-blur-sm rounded-3xl hover:shadow-xl transition-all duration-300 hover:scale-105">
                  <CardContent className="p-8">
                    <div className="flex items-center gap-1 mb-4">
                      {[...Array(5)].map((_, i) => (
                        <Star key={i} className="w-5 h-5 fill-[#FFC107] text-[#FFC107]" />
                      ))}
                    </div>
                    <Quote className="w-10 h-10 text-[#4CAF50] mb-4" />
                    <p className="text-[#424242] mb-6 italic leading-relaxed">
                      "The analytics dashboard is incredible. I can see exactly where I'm wasting food and how to
                      improve."
                    </p>
                    <div className="flex items-center gap-3">
                      <div className="w-12 h-12 bg-gradient-to-br from-[#8BC34A] to-[#AED581] rounded-full flex items-center justify-center text-white font-semibold text-lg shadow-md">
                        M
                      </div>
                      <div>
                        <p className="font-semibold text-[#1B5E20]">Marcus Johnson</p>
                        <p className="text-sm text-[#616161]">Restaurant Owner</p>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </CarouselItem>

              <CarouselItem className="md:basis-1/2 lg:basis-1/3">
                <Card className="border-0 shadow-lg h-full bg-white/80 backdrop-blur-sm rounded-3xl hover:shadow-xl transition-all duration-300 hover:scale-105">
                  <CardContent className="p-8">
                    <div className="flex items-center gap-1 mb-4">
                      {[...Array(5)].map((_, i) => (
                        <Star key={i} className="w-5 h-5 fill-[#FFC107] text-[#FFC107]" />
                      ))}
                    </div>
                    <Quote className="w-10 h-10 text-[#4CAF50] mb-4" />
                    <p className="text-[#424242] mb-6 italic leading-relaxed">
                      "Love the gamification! My family competes to see who can waste the least food each week."
                    </p>
                    <div className="flex items-center gap-3">
                      <div className="w-12 h-12 bg-gradient-to-br from-[#FFC107] to-[#FFD54F] rounded-full flex items-center justify-center text-white font-semibold text-lg shadow-md">
                        A
                      </div>
                      <div>
                        <p className="font-semibold text-[#1B5E20]">Anna Rodriguez</p>
                        <p className="text-sm text-[#616161]">Mother of 3</p>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </CarouselItem>

              <CarouselItem className="md:basis-1/2 lg:basis-1/3">
                <Card className="border-0 shadow-lg h-full bg-white/80 backdrop-blur-sm rounded-3xl hover:shadow-xl transition-all duration-300 hover:scale-105">
                  <CardContent className="p-8">
                    <div className="flex items-center gap-1 mb-4">
                      {[...Array(5)].map((_, i) => (
                        <Star key={i} className="w-5 h-5 fill-[#FFC107] text-[#FFC107]" />
                      ))}
                    </div>
                    <Quote className="w-10 h-10 text-[#4CAF50] mb-4" />
                    <p className="text-[#424242] mb-6 italic leading-relaxed">
                      "The expert tips are gold! I've learned so many storage techniques that keep my food fresh
                      longer."
                    </p>
                    <div className="flex items-center gap-3">
                      <div className="w-12 h-12 bg-gradient-to-br from-[#4CAF50] to-[#66BB6A] rounded-full flex items-center justify-center text-white font-semibold text-lg shadow-md">
                        D
                      </div>
                      <div>
                        <p className="font-semibold text-[#1B5E20]">David Kim</p>
                        <p className="text-sm text-[#616161]">College Student</p>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </CarouselItem>

              <CarouselItem className="md:basis-1/2 lg:basis-1/3">
                <Card className="border-0 shadow-lg h-full bg-white/80 backdrop-blur-sm rounded-3xl hover:shadow-xl transition-all duration-300 hover:scale-105">
                  <CardContent className="p-8">
                    <div className="flex items-center gap-1 mb-4">
                      {[...Array(5)].map((_, i) => (
                        <Star key={i} className="w-5 h-5 fill-[#FFC107] text-[#FFC107]" />
                      ))}
                    </div>
                    <Quote className="w-10 h-10 text-[#4CAF50] mb-4" />
                    <p className="text-[#424242] mb-6 italic leading-relaxed">
                      "Simple to use but incredibly powerful. The impact tracking shows I've saved 500 lbs of food!"
                    </p>
                    <div className="flex items-center gap-3">
                      <div className="w-12 h-12 bg-gradient-to-br from-[#8BC34A] to-[#AED581] rounded-full flex items-center justify-center text-white font-semibold text-lg shadow-md">
                        L
                      </div>
                      <div>
                        <p className="font-semibold text-[#1B5E20]">Lisa Thompson</p>
                        <p className="text-sm text-[#616161]">Environmental Activist</p>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </CarouselItem>
            </CarouselContent>
            <CarouselPrevious className="border-2 border-[#4CAF50] text-[#4CAF50] hover:bg-[#4CAF50] hover:text-white rounded-full shadow-md transition-all duration-300" />
            <CarouselNext className="border-2 border-[#4CAF50] text-[#4CAF50] hover:bg-[#4CAF50] hover:text-white rounded-full shadow-md transition-all duration-300" />
          </Carousel>
        </div>
      </section>

      {/* Photo Carousel Section */}
      <section className="py-16 px-4 bg-white">
        <div className="container mx-auto max-w-6xl">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-serif font-bold text-[#2E2E2E] mb-4">See FOOPTRA in Action</h2>
            <p className="text-lg text-gray-600">Real moments of sustainable living and food waste reduction</p>
          </div>

          <Carousel className="w-full max-w-5xl mx-auto">
            <CarouselContent>
              <CarouselItem className="md:basis-1/2 lg:basis-1/3">
                <Card className="border-0 shadow-lg overflow-hidden">
                  <div className="aspect-square relative">
                    <img
                      src="/placeholder-8dzb2.png"
                      alt="Organized refrigerator with fresh vegetables"
                      className="w-full h-full object-cover"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent" />
                    <div className="absolute bottom-4 left-4 text-white">
                      <h3 className="font-semibold text-lg">Smart Organization</h3>
                      <p className="text-sm opacity-90">Proper storage extends food life</p>
                    </div>
                  </div>
                </Card>
              </CarouselItem>

              <CarouselItem className="md:basis-1/2 lg:basis-1/3">
                <Card className="border-0 shadow-lg overflow-hidden">
                  <div className="aspect-square relative">
                    <img
                      src="/family-cooking.png"
                      alt="Family cooking together with fresh ingredients"
                      className="w-full h-full object-cover"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent" />
                    <div className="absolute bottom-4 left-4 text-white">
                      <h3 className="font-semibold text-lg">Family Cooking</h3>
                      <p className="text-sm opacity-90">Making meals together reduces waste</p>
                    </div>
                  </div>
                </Card>
              </CarouselItem>

              <CarouselItem className="md:basis-1/2 lg:basis-1/3">
                <Card className="border-0 shadow-lg overflow-hidden">
                  <div className="aspect-square relative">
                    <img
                      src="/colorful-meal-prep.png"
                      alt="Meal prep containers with healthy portions"
                      className="w-full h-full object-cover"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent" />
                    <div className="absolute bottom-4 left-4 text-white">
                      <h3 className="font-semibold text-lg">Meal Planning</h3>
                      <p className="text-sm opacity-90">Plan ahead, waste less</p>
                    </div>
                  </div>
                </Card>
              </CarouselItem>

              <CarouselItem className="md:basis-1/2 lg:basis-1/3">
                <Card className="border-0 shadow-lg overflow-hidden">
                  <div className="aspect-square relative">
                    <img
                      src="/food-tracking-app.png"
                      alt="Person using FOOPTRA app to track food"
                      className="w-full h-full object-cover"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent" />
                    <div className="absolute bottom-4 left-4 text-white">
                      <h3 className="font-semibold text-lg">Easy Tracking</h3>
                      <p className="text-sm opacity-90">Log food waste in seconds</p>
                    </div>
                  </div>
                </Card>
              </CarouselItem>

              <CarouselItem className="md:basis-1/2 lg:basis-1/3">
                <Card className="border-0 shadow-lg overflow-hidden">
                  <div className="aspect-square relative">
                    <img
                      src="/placeholder-i0zjl.png"
                      alt="Compost bin with organic waste and plants"
                      className="w-full h-full object-cover"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent" />
                    <div className="absolute bottom-4 left-4 text-white">
                      <h3 className="font-semibold text-lg">Composting</h3>
                      <p className="text-sm opacity-90">Turn waste into garden gold</p>
                    </div>
                  </div>
                </Card>
              </CarouselItem>

              <CarouselItem className="md:basis-1/2 lg:basis-1/3">
                <Card className="border-0 shadow-lg overflow-hidden">
                  <div className="aspect-square relative">
                    <img
                      src="/food-waste-dashboard.png"
                      alt="FOOPTRA analytics dashboard with charts"
                      className="w-full h-full object-cover"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent" />
                    <div className="absolute bottom-4 left-4 text-white">
                      <h3 className="font-semibold text-lg">Track Progress</h3>
                      <p className="text-sm opacity-90">See your impact grow</p>
                    </div>
                  </div>
                </Card>
              </CarouselItem>
            </CarouselContent>
            <CarouselPrevious className="border-2 border-[#4CAF50] text-[#4CAF50] hover:bg-[#4CAF50] hover:text-white rounded-full shadow-md transition-all duration-300" />
            <CarouselNext className="border-2 border-[#4CAF50] text-[#4CAF50] hover:bg-[#4CAF50] hover:text-white rounded-full shadow-md transition-all duration-300" />
          </Carousel>
        </div>
      </section>

      {/* Features Section */}
      <section ref={featuresRef} className="py-24 px-4 bg-white animate-on-scroll opacity-0">
        <div className="container mx-auto max-w-6xl">
          <div className="text-center mb-20">
            <div className="inline-flex items-center gap-2 bg-[#4CAF50]/10 px-4 py-2 rounded-full text-[#2E7D32] font-medium mb-4">
              <Sparkles className="w-4 h-4" />
              Features
            </div>
            <h2 className="text-4xl md:text-5xl font-serif font-bold text-[#1B5E20] mb-6">
              Everything You Need to Reduce Food Waste
            </h2>
            <p className="text-xl text-[#424242] max-w-3xl mx-auto font-light">
              Comprehensive tools and insights to help you make a real difference
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            <Card className="border-0 shadow-lg hover:shadow-2xl transition-all duration-500 bg-white rounded-3xl group hover:scale-105">
              <CardContent className="p-10 text-center">
                <div className="w-20 h-20 bg-gradient-to-br from-[#4CAF50]/20 to-[#66BB6A]/20 rounded-3xl flex items-center justify-center mx-auto mb-6 group-hover:scale-110 transition-transform duration-300 shadow-md">
                  <BarChart3 className="w-10 h-10 text-[#4CAF50]" />
                </div>
                <h3 className="text-2xl font-serif font-semibold text-[#1B5E20] mb-4">Smart Analytics</h3>
                <p className="text-[#424242] leading-relaxed">
                  Visualize your food waste patterns with detailed charts and insights to identify improvement areas.
                </p>
              </CardContent>
            </Card>

            <Card className="border-0 shadow-lg hover:shadow-2xl transition-all duration-500 bg-white rounded-3xl group hover:scale-105">
              <CardContent className="p-10 text-center">
                <div className="w-20 h-20 bg-gradient-to-br from-[#FFC107]/20 to-[#FFD54F]/20 rounded-3xl flex items-center justify-center mx-auto mb-6 group-hover:scale-110 transition-transform duration-300 shadow-md">
                  <Target className="w-10 h-10 text-[#F57C00]" />
                </div>
                <h3 className="text-2xl font-serif font-semibold text-[#1B5E20] mb-4">Goal Setting</h3>
                <p className="text-[#424242] leading-relaxed">
                  Set personalized waste reduction goals and track your progress with milestone celebrations.
                </p>
              </CardContent>
            </Card>

            <Card className="border-0 shadow-lg hover:shadow-2xl transition-all duration-500 bg-white rounded-3xl group hover:scale-105">
              <CardContent className="p-10 text-center">
                <div className="w-20 h-20 bg-gradient-to-br from-[#8BC34A]/20 to-[#AED581]/20 rounded-3xl flex items-center justify-center mx-auto mb-6 group-hover:scale-110 transition-transform duration-300 shadow-md">
                  <BookOpen className="w-10 h-10 text-[#689F38]" />
                </div>
                <h3 className="text-2xl font-serif font-semibold text-[#1B5E20] mb-4">Expert Tips</h3>
                <p className="text-[#424242] leading-relaxed">
                  Access curated tips and strategies from food waste experts to maximize your impact.
                </p>
              </CardContent>
            </Card>

            <Card className="border-0 shadow-lg hover:shadow-2xl transition-all duration-500 bg-white rounded-3xl group hover:scale-105">
              <CardContent className="p-10 text-center">
                <div className="w-20 h-20 bg-gradient-to-br from-[#4CAF50]/20 to-[#66BB6A]/20 rounded-3xl flex items-center justify-center mx-auto mb-6 group-hover:scale-110 transition-transform duration-300 shadow-md">
                  <Trophy className="w-10 h-10 text-[#4CAF50]" />
                </div>
                <h3 className="text-2xl font-serif font-semibold text-[#1B5E20] mb-4">Gamification</h3>
                <p className="text-[#424242] leading-relaxed">
                  Earn points, unlock achievements, and compete with friends to make waste reduction fun.
                </p>
              </CardContent>
            </Card>

            <Card className="border-0 shadow-lg hover:shadow-2xl transition-all duration-500 bg-white rounded-3xl group hover:scale-105">
              <CardContent className="p-10 text-center">
                <div className="w-20 h-20 bg-gradient-to-br from-[#FFC107]/20 to-[#FFD54F]/20 rounded-3xl flex items-center justify-center mx-auto mb-6 group-hover:scale-110 transition-transform duration-300 shadow-md">
                  <Users className="w-10 h-10 text-[#F57C00]" />
                </div>
                <h3 className="text-2xl font-serif font-semibold text-[#1B5E20] mb-4">Community</h3>
                <p className="text-[#424242] leading-relaxed">
                  Connect with like-minded individuals and share your journey towards zero waste.
                </p>
              </CardContent>
            </Card>

            <Card className="border-0 shadow-lg hover:shadow-2xl transition-all duration-500 bg-white rounded-3xl group hover:scale-105">
              <CardContent className="p-10 text-center">
                <div className="w-20 h-20 bg-gradient-to-br from-[#8BC34A]/20 to-[#AED581]/20 rounded-3xl flex items-center justify-center mx-auto mb-6 group-hover:scale-110 transition-transform duration-300 shadow-md">
                  <Leaf className="w-10 h-10 text-[#689F38]" />
                </div>
                <h3 className="text-2xl font-serif font-semibold text-[#1B5E20] mb-4">Impact Tracking</h3>
                <p className="text-[#424242] leading-relaxed">
                  See your environmental impact with CO2 savings and resource conservation metrics.
                </p>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-24 px-4 bg-gradient-to-br from-[#4CAF50] via-[#66BB6A] to-[#8BC34A] relative overflow-hidden animate-on-scroll opacity-0">
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          <div className="absolute top-10 right-20 w-64 h-64 bg-white/10 rounded-full blur-3xl" />
          <div className="absolute bottom-10 left-20 w-80 h-80 bg-white/10 rounded-full blur-3xl" />
        </div>
        <div className="container mx-auto text-center max-w-4xl relative z-10">
          <h2 className="text-5xl md:text-6xl font-serif font-bold text-white mb-8 leading-tight">
            Ready to Make a Difference?
          </h2>
          <p className="text-xl md:text-2xl text-white/95 mb-12 max-w-3xl mx-auto font-light leading-relaxed">
            Join thousands of users who are already reducing their food waste and saving money with FOOPTRA.
          </p>
          <Button
            size="lg"
            className="bg-white text-[#2E7D32] hover:bg-[#F1F8E9] px-12 py-7 text-xl font-semibold rounded-2xl shadow-2xl hover:shadow-3xl transition-all duration-300 hover:scale-105"
            asChild
          >
            <Link href="/dashboard">Start Your Journey Today</Link>
          </Button>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-[#1B5E20] text-white py-8 px-4">
        <div className="container mx-auto max-w-6xl">
          <div className="flex flex-col md:flex-row items-center justify-between gap-6">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-2xl bg-gradient-to-br from-[#4CAF50] to-[#66BB6A] flex items-center justify-center shadow-lg">
                <Leaf className="w-6 h-6 text-white" />
              </div>
              <span className="font-serif font-bold text-2xl">FOOPTRA</span>
            </div>
            <div className="flex items-center gap-8 text-sm text-white/80">
              <Link href="/privacy" className="hover:text-white transition-colors duration-300 font-medium">
                Privacy
              </Link>
              <Link href="/contact" className="hover:text-white transition-colors duration-300 font-medium">
                Contact
              </Link>
              <span className="font-medium">&copy; 2025 FOOPTRA</span>
            </div>
          </div>
        </div>
      </footer>
    </div>
  )
}
