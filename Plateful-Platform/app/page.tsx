"use client"

import { Canvas } from "@react-three/fiber"
import { OrbitControls, Float, Environment, Stars } from "@react-three/drei"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { ArrowRight, Users, Utensils, Heart, TrendingUp, Sun, Moon } from "lucide-react"
import Link from "next/link"
import { Suspense, useEffect } from "react"
import React from "react"

function FloatingPlate({
  position,
  color,
  rotation,
  isDark,
}: { position: [number, number, number]; color: string; rotation: [number, number, number]; isDark: boolean }) {
  return (
    <Float speed={2} rotationIntensity={1} floatIntensity={2}>
      <mesh position={position} rotation={rotation}>
        <cylinderGeometry args={[1.5, 1.5, 0.1, 32]} />
        <meshStandardMaterial
          color={color}
          metalness={isDark ? 0.8 : 0.2}
          roughness={isDark ? 0.2 : 0.8}
          emissive={isDark ? color : "#000000"}
          emissiveIntensity={isDark ? 0.1 : 0}
        />
      </mesh>
    </Float>
  )
}

function Scene3D() {
  const [isDark, setIsDark] = React.useState(false)

  React.useEffect(() => {
    const checkTheme = () => {
      setIsDark(document.documentElement.classList.contains("dark"))
    }

    checkTheme()

    const observer = new MutationObserver(checkTheme)
    observer.observe(document.documentElement, {
      attributes: true,
      attributeFilter: ["class"],
    })

    return () => observer.disconnect()
  }, [])

  return (
    <Canvas camera={{ position: [0, 0, 10], fov: 60 }}>
      {isDark && <Stars radius={100} depth={50} count={5000} factor={4} saturation={0} fade speed={1} />}

      <ambientLight intensity={isDark ? 0.3 : 0.6} />
      <pointLight position={[10, 10, 10]} intensity={isDark ? 0.8 : 1} color={isDark ? "#ff6b6b" : "#ffffff"} />
      <pointLight position={[-10, -10, -10]} intensity={isDark ? 0.4 : 0.5} color={isDark ? "#4ecdc4" : "#ffffff"} />
      <pointLight position={[0, 0, 5]} intensity={isDark ? 0.6 : 0.3} color={isDark ? "#ffeaa7" : "#ffffff"} />

      <FloatingPlate position={[-4, 2, -2]} color="#FF6B6B" rotation={[0.2, 0, 0.1]} isDark={isDark} />
      <FloatingPlate position={[4, -1, -3]} color="#4ECDC4" rotation={[-0.1, 0.3, 0]} isDark={isDark} />
      <FloatingPlate position={[2, 3, -1]} color="#45B7D1" rotation={[0.1, -0.2, 0.2]} isDark={isDark} />
      <FloatingPlate position={[-3, -2, -4]} color="#96CEB4" rotation={[0.3, 0.1, -0.1]} isDark={isDark} />
      <FloatingPlate position={[0, 1, -5]} color="#FFEAA7" rotation={[-0.2, 0.4, 0]} isDark={isDark} />
      <FloatingPlate position={[-1, -3, -2]} color="#DDA0DD" rotation={[0.1, -0.3, 0.2]} isDark={isDark} />

      <Environment preset={isDark ? "night" : "sunset"} />
      <OrbitControls enableZoom={false} enablePan={false} autoRotate autoRotateSpeed={isDark ? 1 : 0.5} />
    </Canvas>
  )
}

export default function HomePage() {
  useEffect(() => {
    const theme = localStorage.getItem("theme")
    const systemTheme = window.matchMedia("(prefers-color-scheme: dark)").matches ? "dark" : "light"
    const initialTheme = theme || systemTheme

    if (initialTheme === "dark") {
      document.documentElement.classList.add("dark")
    } else {
      document.documentElement.classList.remove("dark")
    }
  }, [])

  return (
    <div className="min-h-screen relative overflow-hidden">
      {/* 3D Background */}
      <div className="absolute inset-0 z-0">
        <Suspense
          fallback={
            <div className="w-full h-full bg-gradient-to-br from-orange-100 to-red-100 dark:from-gray-900 dark:to-gray-800" />
          }
        >
          <Scene3D />
        </Suspense>
      </div>

      {/* Content Overlay */}
      <div className="relative z-10 bg-white/80 dark:bg-gray-900/80 backdrop-blur-sm">
        {/* Header */}
        <header className="px-4 lg:px-6 h-16 flex items-center border-b bg-white/90 dark:bg-gray-900/90 backdrop-blur-sm border-orange-200 dark:border-gray-700">
          <Link href="/" className="flex items-center space-x-2">
            <div className="w-8 h-8 bg-gradient-to-r from-orange-500 to-red-500 rounded-full flex items-center justify-center">
              <Utensils className="w-5 h-5 text-white" />
            </div>
            <span className="text-xl font-bold bg-gradient-to-r from-orange-600 to-red-600 bg-clip-text text-transparent">
              Plateful
            </span>
          </Link>
          <nav className="ml-auto flex gap-4 sm:gap-6 items-center">
            <Link href="/about" className="text-sm font-medium hover:text-orange-600 transition-colors">
              About
            </Link>
            <Link href="/contact" className="text-sm font-medium hover:text-orange-600 transition-colors">
              Contact
            </Link>
            <Link href="/login" className="text-sm font-medium hover:text-orange-600 transition-colors">
              Login
            </Link>
            <Button
              variant="ghost"
              size="sm"
              onClick={() => {
                const html = document.documentElement
                if (html.classList.contains("dark")) {
                  html.classList.remove("dark")
                  localStorage.setItem("theme", "light")
                } else {
                  html.classList.add("dark")
                  localStorage.setItem("theme", "dark")
                }
              }}
              className="w-9 h-9 px-0"
            >
              <Sun className="h-[1.2rem] w-[1.2rem] rotate-0 scale-100 transition-all dark:-rotate-90 dark:scale-0" />
              <Moon className="absolute h-[1.2rem] w-[1.2rem] rotate-90 scale-0 transition-all dark:rotate-0 dark:scale-100" />
              <span className="sr-only">Toggle theme</span>
            </Button>
          </nav>
        </header>

        {/* Hero Section */}
        <section className="py-20 px-4 text-center">
          <div className="max-w-4xl mx-auto space-y-8">
            <h1 className="text-5xl md:text-7xl font-bold bg-gradient-to-r from-orange-600 via-red-500 to-pink-500 bg-clip-text text-transparent">
              Plateful
            </h1>
            <p className="text-2xl md:text-3xl font-semibold text-gray-700 dark:text-gray-300">
              Serving Surplus. Feeding Hope.
            </p>
            <p className="text-lg text-gray-600 dark:text-gray-400 max-w-2xl mx-auto">
              Connect restaurants with surplus food to NGOs and shelters. Together, we can reduce food waste and fight
              hunger in our communities.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link href="/register/restaurant">
                <Button
                  size="lg"
                  className="bg-gradient-to-r from-orange-500 to-red-500 hover:from-orange-600 hover:to-red-600 text-white px-8 py-3"
                >
                  I'm a Restaurant <ArrowRight className="ml-2 w-4 h-4" />
                </Button>
              </Link>
              <Link href="/register/ngo">
                <Button
                  size="lg"
                  variant="outline"
                  className="border-orange-500 text-orange-600 hover:bg-orange-50 dark:hover:bg-orange-950 px-8 py-3"
                >
                  I'm an NGO/Shelter <Heart className="ml-2 w-4 h-4" />
                </Button>
              </Link>
            </div>
          </div>
        </section>

        {/* Impact Statistics */}
        <section className="py-16 px-4 bg-white/90 dark:bg-gray-900/90">
          <div className="max-w-6xl mx-auto">
            <h2 className="text-3xl font-bold text-center mb-12 text-gray-800 dark:text-gray-200">Our Impact</h2>
            <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
              <Card className="text-center border-orange-200 dark:border-orange-800 bg-white/50 dark:bg-gray-800/50 backdrop-blur-sm">
                <CardContent className="p-6">
                  <div className="w-12 h-12 bg-orange-100 dark:bg-orange-900 rounded-full flex items-center justify-center mx-auto mb-4">
                    <Utensils className="w-6 h-6 text-orange-600 dark:text-orange-400" />
                  </div>
                  <h3 className="text-2xl font-bold text-orange-600 dark:text-orange-400">2,500+</h3>
                  <p className="text-gray-600 dark:text-gray-400">Meals Donated</p>
                </CardContent>
              </Card>
              <Card className="text-center border-red-200 dark:border-red-800 bg-white/50 dark:bg-gray-800/50 backdrop-blur-sm">
                <CardContent className="p-6">
                  <div className="w-12 h-12 bg-red-100 dark:bg-red-900 rounded-full flex items-center justify-center mx-auto mb-4">
                    <Users className="w-6 h-6 text-red-600 dark:text-red-400" />
                  </div>
                  <h3 className="text-2xl font-bold text-red-600 dark:text-red-400">150+</h3>
                  <p className="text-gray-600 dark:text-gray-400">Partner Restaurants</p>
                </CardContent>
              </Card>
              <Card className="text-center border-green-200 dark:border-green-800 bg-white/50 dark:bg-gray-800/50 backdrop-blur-sm">
                <CardContent className="p-6">
                  <div className="w-12 h-12 bg-green-100 dark:bg-green-900 rounded-full flex items-center justify-center mx-auto mb-4">
                    <Heart className="w-6 h-6 text-green-600 dark:text-green-400" />
                  </div>
                  <h3 className="text-2xl font-bold text-green-600 dark:text-green-400">75+</h3>
                  <p className="text-gray-600 dark:text-gray-400">NGOs & Shelters</p>
                </CardContent>
              </Card>
              <Card className="text-center border-blue-200 dark:border-blue-800 bg-white/50 dark:bg-gray-800/50 backdrop-blur-sm">
                <CardContent className="p-6">
                  <div className="w-12 h-12 bg-blue-100 dark:bg-blue-900 rounded-full flex items-center justify-center mx-auto mb-4">
                    <TrendingUp className="w-6 h-6 text-blue-600 dark:text-blue-400" />
                  </div>
                  <h3 className="text-2xl font-bold text-blue-600 dark:text-blue-400">95%</h3>
                  <p className="text-gray-600 dark:text-gray-400">Waste Reduction</p>
                </CardContent>
              </Card>
            </div>
          </div>
        </section>

        {/* How It Works */}
        <section className="py-16 px-4">
          <div className="max-w-6xl mx-auto">
            <h2 className="text-3xl font-bold text-center mb-12 text-gray-800 dark:text-gray-200">How It Works</h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              <div className="text-center">
                <div className="w-16 h-16 bg-gradient-to-r from-orange-500 to-red-500 rounded-full flex items-center justify-center mx-auto mb-4">
                  <span className="text-2xl font-bold text-white">1</span>
                </div>
                <h3 className="text-xl font-semibold mb-2 dark:text-gray-200">List Surplus Food</h3>
                <p className="text-gray-600 dark:text-gray-400">
                  Restaurants list their surplus food with details about quantity, type, and pickup time.
                </p>
              </div>
              <div className="text-center">
                <div className="w-16 h-16 bg-gradient-to-r from-red-500 to-pink-500 rounded-full flex items-center justify-center mx-auto mb-4">
                  <span className="text-2xl font-bold text-white">2</span>
                </div>
                <h3 className="text-xl font-semibold mb-2 dark:text-gray-200">Match & Claim</h3>
                <p className="text-gray-600 dark:text-gray-400">
                  NGOs and shelters browse available donations and claim what they need.
                </p>
              </div>
              <div className="text-center">
                <div className="w-16 h-16 bg-gradient-to-r from-pink-500 to-purple-500 rounded-full flex items-center justify-center mx-auto mb-4">
                  <span className="text-2xl font-bold text-white">3</span>
                </div>
                <h3 className="text-xl font-semibold mb-2 dark:text-gray-200">Pickup & Deliver</h3>
                <p className="text-gray-600 dark:text-gray-400">
                  Coordinate pickup times and deliver food to those who need it most.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* Call to Action */}
        <section className="py-16 px-4 bg-gradient-to-r from-orange-500 to-red-500 text-white">
          <div className="max-w-4xl mx-auto text-center">
            <h2 className="text-3xl font-bold mb-4">Join the Movement</h2>
            <p className="text-xl mb-8">
              Every meal matters. Every donation counts. Together, we can make a difference.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link href="/register/restaurant">
                <Button size="lg" variant="secondary" className="px-8 py-3">
                  Register as Restaurant
                </Button>
              </Link>
              <Link href="/register/ngo">
                <Button
                  size="lg"
                  variant="outline"
                  className="border-white text-white hover:bg-white hover:text-orange-600 px-8 py-3"
                >
                  Register as NGO
                </Button>
              </Link>
            </div>
          </div>
        </section>

        {/* Footer */}
        <footer className="py-8 px-4 bg-gray-900 dark:bg-gray-950 text-white">
          <div className="max-w-6xl mx-auto flex flex-col md:flex-row justify-between items-center">
            <div className="flex items-center space-x-2 mb-4 md:mb-0">
              <div className="w-8 h-8 bg-gradient-to-r from-orange-500 to-red-500 rounded-full flex items-center justify-center">
                <Utensils className="w-5 h-5 text-white" />
              </div>
              <span className="text-xl font-bold">Plateful</span>
            </div>
            <nav className="flex gap-6">
              <Link href="/about" className="hover:text-orange-400 transition-colors">
                About
              </Link>
              <Link href="/contact" className="hover:text-orange-400 transition-colors">
                Contact
              </Link>
              <Link href="/privacy" className="hover:text-orange-400 transition-colors">
                Privacy
              </Link>
              <Link href="/terms" className="hover:text-orange-400 transition-colors">
                Terms
              </Link>
            </nav>
          </div>
          <div className="text-center mt-4 pt-4 border-t border-gray-700 dark:border-gray-800">
            <p className="text-gray-400">&copy; 2024 Plateful. Serving Surplus. Feeding Hope.</p>
          </div>
        </footer>
      </div>
    </div>
  )
}
