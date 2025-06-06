"use client"

import type React from "react"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Utensils, Heart, ArrowLeft } from "lucide-react"
import Link from "next/link"
import { useRouter } from "next/navigation"

export default function LoginPage() {
  const router = useRouter()
  const [formData, setFormData] = useState({
    email: "",
    password: "",
    userType: "",
  })

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    // Mock login - in real app, this would call an API
    console.log("Login:", formData)

    // Redirect based on user type
    if (formData.userType === "restaurant") {
      router.push("/dashboard/restaurant")
    } else if (formData.userType === "ngo") {
      router.push("/dashboard/ngo")
    }
  }

  const handleChange = (field: string, value: string) => {
    setFormData((prev) => ({ ...prev, [field]: value }))
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-orange-50 via-red-50 to-pink-50 dark:from-gray-900 dark:via-gray-800 dark:to-gray-900 py-8 px-4">
      <div className="max-w-md mx-auto">
        <div className="mb-6">
          <Link
            href="/"
            className="inline-flex items-center text-orange-600 dark:text-orange-400 hover:text-orange-700 dark:hover:text-orange-300"
          >
            <ArrowLeft className="w-4 h-4 mr-2" />
            Back to Home
          </Link>
        </div>

        <Card className="border-orange-200 dark:border-orange-800 bg-white/90 dark:bg-gray-900/90 backdrop-blur-sm">
          <CardHeader className="text-center">
            <div className="w-16 h-16 bg-gradient-to-r from-orange-500 to-red-500 rounded-full flex items-center justify-center mx-auto mb-4">
              <Utensils className="w-8 h-8 text-white" />
            </div>
            <CardTitle className="text-2xl text-gray-800 dark:text-gray-200">Welcome Back</CardTitle>
            <CardDescription className="dark:text-gray-400">
              Sign in to your Plateful account to continue making a difference.
            </CardDescription>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleSubmit} className="space-y-6">
              <div className="space-y-2">
                <Label htmlFor="userType">I am a *</Label>
                <Select onValueChange={(value) => handleChange("userType", value)} required>
                  <SelectTrigger>
                    <SelectValue placeholder="Select your role" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="restaurant">
                      <div className="flex items-center">
                        <Utensils className="w-4 h-4 mr-2" />
                        Restaurant
                      </div>
                    </SelectItem>
                    <SelectItem value="ngo">
                      <div className="flex items-center">
                        <Heart className="w-4 h-4 mr-2" />
                        NGO/Shelter
                      </div>
                    </SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div className="space-y-2">
                <Label htmlFor="email">Email Address *</Label>
                <Input
                  id="email"
                  type="email"
                  value={formData.email}
                  onChange={(e) => handleChange("email", e.target.value)}
                  required
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="password">Password *</Label>
                <Input
                  id="password"
                  type="password"
                  value={formData.password}
                  onChange={(e) => handleChange("password", e.target.value)}
                  required
                />
              </div>

              <Button
                type="submit"
                className="w-full bg-gradient-to-r from-orange-500 to-red-500 hover:from-orange-600 hover:to-red-600"
              >
                Sign In
              </Button>
            </form>

            <div className="mt-6 space-y-4">
              <div className="text-center">
                <Link href="/forgot-password" className="text-sm text-orange-600 hover:text-orange-700">
                  Forgot your password?
                </Link>
              </div>

              <div className="text-center">
                <p className="text-sm text-gray-600">Don't have an account?</p>
                <div className="flex flex-col sm:flex-row gap-2 mt-2">
                  <Link
                    href="/register/restaurant"
                    className="text-sm text-orange-600 hover:text-orange-700 font-medium"
                  >
                    Register as Restaurant
                  </Link>
                  <span className="hidden sm:inline text-gray-400">|</span>
                  <Link href="/register/ngo" className="text-sm text-blue-600 hover:text-blue-700 font-medium">
                    Register as NGO
                  </Link>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
