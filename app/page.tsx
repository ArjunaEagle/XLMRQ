import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Carousel, CarouselContent, CarouselItem, CarouselNext, CarouselPrevious } from "@/components/ui/carousel"
import { Leaf, BarChart3, BookOpen, Trophy, Users, Target, Star, Quote } from "lucide-react"
import Link from "next/link"

export default function HomePage() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-green-50 to-white">
      {/* Header */}
      <header className="border-b bg-white/80 backdrop-blur-sm sticky top-0 z-50">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <div className="w-8 h-8 rounded-full bg-[#4CAF50] flex items-center justify-center">
                <Leaf className="w-5 h-5 text-white" />
              </div>
              <h1 className="text-2xl font-serif font-bold text-[#2E2E2E]">FOOPTRA</h1>
            </div>
            <nav className="hidden md:flex items-center gap-6">
              <Link href="/dashboard" className="text-[#2E2E2E] hover:text-[#4CAF50] transition-colors">
                Dashboard
              </Link>
              <Link href="/log" className="text-[#2E2E2E] hover:text-[#4CAF50] transition-colors">
                Log Food
              </Link>
              <Link href="/tips" className="text-[#2E2E2E] hover:text-[#4CAF50] transition-colors">
                Tips
              </Link>
              <Link href="/profile" className="text-[#2E2E2E] hover:text-[#4CAF50] transition-colors">
                Profile
              </Link>
            </nav>
            <Button className="bg-[#4CAF50] hover:bg-[#45a049] text-white" asChild>
              <Link href="/dashboard">Get Started</Link>
            </Button>
          </div>
        </div>
      </header>

      {/* Hero Section */}
      <section className="py-20 px-4">
        <div className="container mx-auto text-center max-w-4xl">
          <div className="mb-8">
            <div className="inline-flex items-center gap-2 bg-[#4CAF50]/10 px-4 py-2 rounded-full text-[#4CAF50] font-medium mb-6">
              <Leaf className="w-4 h-4" />
              Reduce Food Waste, Save Money
            </div>
            <h1 className="text-5xl md:text-6xl font-serif font-bold text-[#2E2E2E] mb-6 leading-tight">
              Track Your Food,
              <br />
              <span className="text-[#4CAF50]">Transform Your Impact</span>
            </h1>
            <p className="text-xl text-gray-600 mb-8 max-w-2xl mx-auto leading-relaxed">
              FOOPTRA helps you monitor, reduce, and eliminate food waste through intelligent tracking, personalized
              insights, and actionable recommendations.
            </p>
          </div>

          <div className="flex flex-col sm:flex-row gap-4 justify-center mb-12">
            <Button size="lg" className="bg-[#4CAF50] hover:bg-[#45a049] text-white px-8 py-3 text-lg" asChild>
              <Link href="/dashboard">Start Tracking Now</Link>
            </Button>
            <Button
              size="lg"
              variant="outline"
              className="border-[#4CAF50] text-[#4CAF50] hover:bg-[#4CAF50] hover:text-white px-8 py-3 text-lg bg-transparent"
              asChild
            >
              <Link href="/tips">Learn More</Link>
            </Button>
          </div>

          {/* Stats */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-3xl mx-auto">
            <div className="text-center">
              <div className="text-3xl font-bold text-[#4CAF50] mb-2">40%</div>
              <div className="text-gray-600">Food Waste Reduction</div>
            </div>
            <div className="text-center">
              <div className="text-3xl font-bold text-[#4CAF50] mb-2">$500+</div>
              <div className="text-gray-600">Average Annual Savings</div>
            </div>
            <div className="text-center">
              <div className="text-3xl font-bold text-[#4CAF50] mb-2">10k+</div>
              <div className="text-gray-600">Active Users</div>
            </div>
          </div>
        </div>
      </section>

      {/* Testimonials Carousel Section */}
      <section className="py-16 px-4 bg-gradient-to-r from-green-50 to-white">
        <div className="container mx-auto max-w-6xl">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-serif font-bold text-[#2E2E2E] mb-4">What Our Users Say</h2>
            <p className="text-lg text-gray-600">Real stories from people making a difference</p>
          </div>

          <Carousel className="w-full max-w-4xl mx-auto">
            <CarouselContent>
              <CarouselItem className="md:basis-1/2 lg:basis-1/3">
                <Card className="border-0 shadow-lg h-full">
                  <CardContent className="p-6">
                    <div className="flex items-center gap-1 mb-4">
                      {[...Array(5)].map((_, i) => (
                        <Star key={i} className="w-4 h-4 fill-[#FFC107] text-[#FFC107]" />
                      ))}
                    </div>
                    <Quote className="w-8 h-8 text-[#4CAF50] mb-4" />
                    <p className="text-gray-600 mb-4 italic">
                      "FOOPTRA helped me reduce my food waste by 60% in just 3 months. I'm saving over $200 monthly!"
                    </p>
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 bg-[#4CAF50] rounded-full flex items-center justify-center text-white font-semibold">
                        S
                      </div>
                      <div>
                        <p className="font-semibold text-[#2E2E2E]">Sarah Chen</p>
                        <p className="text-sm text-gray-500">Home Chef</p>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </CarouselItem>

              <CarouselItem className="md:basis-1/2 lg:basis-1/3">
                <Card className="border-0 shadow-lg h-full">
                  <CardContent className="p-6">
                    <div className="flex items-center gap-1 mb-4">
                      {[...Array(5)].map((_, i) => (
                        <Star key={i} className="w-4 h-4 fill-[#FFC107] text-[#FFC107]" />
                      ))}
                    </div>
                    <Quote className="w-8 h-8 text-[#4CAF50] mb-4" />
                    <p className="text-gray-600 mb-4 italic">
                      "The analytics dashboard is incredible. I can see exactly where I'm wasting food and how to
                      improve."
                    </p>
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 bg-[#8BC34A] rounded-full flex items-center justify-center text-white font-semibold">
                        M
                      </div>
                      <div>
                        <p className="font-semibold text-[#2E2E2E]">Marcus Johnson</p>
                        <p className="text-sm text-gray-500">Restaurant Owner</p>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </CarouselItem>

              <CarouselItem className="md:basis-1/2 lg:basis-1/3">
                <Card className="border-0 shadow-lg h-full">
                  <CardContent className="p-6">
                    <div className="flex items-center gap-1 mb-4">
                      {[...Array(5)].map((_, i) => (
                        <Star key={i} className="w-4 h-4 fill-[#FFC107] text-[#FFC107]" />
                      ))}
                    </div>
                    <Quote className="w-8 h-8 text-[#4CAF50] mb-4" />
                    <p className="text-gray-600 mb-4 italic">
                      "Love the gamification! My family competes to see who can waste the least food each week."
                    </p>
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 bg-[#FFC107] rounded-full flex items-center justify-center text-white font-semibold">
                        A
                      </div>
                      <div>
                        <p className="font-semibold text-[#2E2E2E]">Anna Rodriguez</p>
                        <p className="text-sm text-gray-500">Mother of 3</p>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </CarouselItem>

              <CarouselItem className="md:basis-1/2 lg:basis-1/3">
                <Card className="border-0 shadow-lg h-full">
                  <CardContent className="p-6">
                    <div className="flex items-center gap-1 mb-4">
                      {[...Array(5)].map((_, i) => (
                        <Star key={i} className="w-4 h-4 fill-[#FFC107] text-[#FFC107]" />
                      ))}
                    </div>
                    <Quote className="w-8 h-8 text-[#4CAF50] mb-4" />
                    <p className="text-gray-600 mb-4 italic">
                      "The expert tips are gold! I've learned so many storage techniques that keep my food fresh
                      longer."
                    </p>
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 bg-[#4CAF50] rounded-full flex items-center justify-center text-white font-semibold">
                        D
                      </div>
                      <div>
                        <p className="font-semibold text-[#2E2E2E]">David Kim</p>
                        <p className="text-sm text-gray-500">College Student</p>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </CarouselItem>

              <CarouselItem className="md:basis-1/2 lg:basis-1/3">
                <Card className="border-0 shadow-lg h-full">
                  <CardContent className="p-6">
                    <div className="flex items-center gap-1 mb-4">
                      {[...Array(5)].map((_, i) => (
                        <Star key={i} className="w-4 h-4 fill-[#FFC107] text-[#FFC107]" />
                      ))}
                    </div>
                    <Quote className="w-8 h-8 text-[#4CAF50] mb-4" />
                    <p className="text-gray-600 mb-4 italic">
                      "Simple to use but incredibly powerful. The impact tracking shows I've saved 500 lbs of food!"
                    </p>
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 bg-[#8BC34A] rounded-full flex items-center justify-center text-white font-semibold">
                        L
                      </div>
                      <div>
                        <p className="font-semibold text-[#2E2E2E]">Lisa Thompson</p>
                        <p className="text-sm text-gray-500">Environmental Activist</p>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </CarouselItem>
            </CarouselContent>
            <CarouselPrevious className="border-[#4CAF50] text-[#4CAF50] hover:bg-[#4CAF50] hover:text-white" />
            <CarouselNext className="border-[#4CAF50] text-[#4CAF50] hover:bg-[#4CAF50] hover:text-white" />
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
            <CarouselPrevious className="border-[#4CAF50] text-[#4CAF50] hover:bg-[#4CAF50] hover:text-white" />
            <CarouselNext className="border-[#4CAF50] text-[#4CAF50] hover:bg-[#4CAF50] hover:text-white" />
          </Carousel>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-20 px-4 bg-white">
        <div className="container mx-auto max-w-6xl">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-serif font-bold text-[#2E2E2E] mb-4">
              Everything You Need to Reduce Food Waste
            </h2>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto">
              Comprehensive tools and insights to help you make a real difference
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            <Card className="border-0 shadow-lg hover:shadow-xl transition-shadow">
              <CardContent className="p-8 text-center">
                <div className="w-16 h-16 bg-[#4CAF50]/10 rounded-full flex items-center justify-center mx-auto mb-6">
                  <BarChart3 className="w-8 h-8 text-[#4CAF50]" />
                </div>
                <h3 className="text-xl font-serif font-semibold text-[#2E2E2E] mb-4">Smart Analytics</h3>
                <p className="text-gray-600 leading-relaxed">
                  Visualize your food waste patterns with detailed charts and insights to identify improvement areas.
                </p>
              </CardContent>
            </Card>

            <Card className="border-0 shadow-lg hover:shadow-xl transition-shadow">
              <CardContent className="p-8 text-center">
                <div className="w-16 h-16 bg-[#FFC107]/10 rounded-full flex items-center justify-center mx-auto mb-6">
                  <Target className="w-8 h-8 text-[#FFC107]" />
                </div>
                <h3 className="text-xl font-serif font-semibold text-[#2E2E2E] mb-4">Goal Setting</h3>
                <p className="text-gray-600 leading-relaxed">
                  Set personalized waste reduction goals and track your progress with milestone celebrations.
                </p>
              </CardContent>
            </Card>

            <Card className="border-0 shadow-lg hover:shadow-xl transition-shadow">
              <CardContent className="p-8 text-center">
                <div className="w-16 h-16 bg-[#8BC34A]/10 rounded-full flex items-center justify-center mx-auto mb-6">
                  <BookOpen className="w-8 h-8 text-[#8BC34A]" />
                </div>
                <h3 className="text-xl font-serif font-semibold text-[#2E2E2E] mb-4">Expert Tips</h3>
                <p className="text-gray-600 leading-relaxed">
                  Access curated tips and strategies from food waste experts to maximize your impact.
                </p>
              </CardContent>
            </Card>

            <Card className="border-0 shadow-lg hover:shadow-xl transition-shadow">
              <CardContent className="p-8 text-center">
                <div className="w-16 h-16 bg-[#4CAF50]/10 rounded-full flex items-center justify-center mx-auto mb-6">
                  <Trophy className="w-8 h-8 text-[#4CAF50]" />
                </div>
                <h3 className="text-xl font-serif font-semibold text-[#2E2E2E] mb-4">Gamification</h3>
                <p className="text-gray-600 leading-relaxed">
                  Earn points, unlock achievements, and compete with friends to make waste reduction fun.
                </p>
              </CardContent>
            </Card>

            <Card className="border-0 shadow-lg hover:shadow-xl transition-shadow">
              <CardContent className="p-8 text-center">
                <div className="w-16 h-16 bg-[#FFC107]/10 rounded-full flex items-center justify-center mx-auto mb-6">
                  <Users className="w-8 h-8 text-[#FFC107]" />
                </div>
                <h3 className="text-xl font-serif font-semibold text-[#2E2E2E] mb-4">Community</h3>
                <p className="text-gray-600 leading-relaxed">
                  Connect with like-minded individuals and share your journey towards zero waste.
                </p>
              </CardContent>
            </Card>

            <Card className="border-0 shadow-lg hover:shadow-xl transition-shadow">
              <CardContent className="p-8 text-center">
                <div className="w-16 h-16 bg-[#8BC34A]/10 rounded-full flex items-center justify-center mx-auto mb-6">
                  <Leaf className="w-8 h-8 text-[#8BC34A]" />
                </div>
                <h3 className="text-xl font-serif font-semibold text-[#2E2E2E] mb-4">Impact Tracking</h3>
                <p className="text-gray-600 leading-relaxed">
                  See your environmental impact with CO2 savings and resource conservation metrics.
                </p>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 px-4 bg-gradient-to-r from-[#4CAF50] to-[#8BC34A]">
        <div className="container mx-auto text-center max-w-4xl">
          <h2 className="text-4xl font-serif font-bold text-white mb-6">Ready to Make a Difference?</h2>
          <p className="text-xl text-white/90 mb-8 max-w-2xl mx-auto">
            Join thousands of users who are already reducing their food waste and saving money with FOOPTRA.
          </p>
          <Button
            size="lg"
            className="bg-white text-[#4CAF50] hover:bg-gray-100 px-8 py-3 text-lg font-semibold"
            asChild
          >
            <Link href="/dashboard">Start Your Journey Today</Link>
          </Button>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-[#2E2E2E] text-white py-6 px-4">
        <div className="container mx-auto max-w-6xl">
          <div className="flex flex-col md:flex-row items-center justify-between gap-4">
            <div className="flex items-center gap-2">
              <div className="w-6 h-6 rounded-full bg-[#4CAF50] flex items-center justify-center">
                <Leaf className="w-4 h-4 text-white" />
              </div>
              <span className="font-serif font-bold">FOOPTRA</span>
            </div>
            <div className="flex items-center gap-6 text-sm text-gray-400">
              <Link href="/privacy" className="hover:text-white transition-colors">
                Privacy
              </Link>
              <Link href="/contact" className="hover:text-white transition-colors">
                Contact
              </Link>
              <span>&copy; 2024 FOOPTRA</span>
            </div>
          </div>
        </div>
      </footer>
    </div>
  )
}
