"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Plus, Package, Clock, Star, Bell, LogOut, Utensils } from "lucide-react"
import Link from "next/link"

// Mock data
const mockDonations = [
  {
    id: 1,
    foodType: "Pasta & Salad",
    quantity: "20 servings",
    status: "claimed",
    claimedBy: "Hope Shelter",
    pickupTime: "2024-01-15 18:00",
    createdAt: "2024-01-15 14:30",
  },
  {
    id: 2,
    foodType: "Sandwiches",
    quantity: "15 servings",
    status: "available",
    pickupTime: "2024-01-15 19:00",
    createdAt: "2024-01-15 16:00",
  },
  {
    id: 3,
    foodType: "Pizza Slices",
    quantity: "30 servings",
    status: "completed",
    claimedBy: "Community Kitchen",
    pickupTime: "2024-01-14 17:30",
    createdAt: "2024-01-14 15:00",
  },
]

const mockFeedback = [
  {
    id: 1,
    donationId: 3,
    ngoName: "Community Kitchen",
    rating: 5,
    comment: "Excellent quality food! The pizza was still warm and fresh. Thank you for your generosity.",
    date: "2024-01-14",
  },
  {
    id: 2,
    donationId: 1,
    ngoName: "Hope Shelter",
    rating: 4,
    comment: "Great donation, helped feed many families tonight. The pasta was delicious.",
    date: "2024-01-13",
  },
]

export default function RestaurantDashboard() {
  const [activeTab, setActiveTab] = useState("overview")

  const getStatusColor = (status: string) => {
    switch (status) {
      case "available":
        return "bg-green-100 text-green-800"
      case "claimed":
        return "bg-yellow-100 text-yellow-800"
      case "completed":
        return "bg-blue-100 text-blue-800"
      default:
        return "bg-gray-100 text-gray-800"
    }
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-orange-50 to-red-50 dark:from-gray-900 dark:to-gray-800">
      {/* Header */}
      <header className="bg-white dark:bg-gray-900 border-b border-orange-200 dark:border-gray-700 px-4 py-4">
        <div className="max-w-7xl mx-auto flex items-center justify-between">
          <div className="flex items-center space-x-4">
            <Link href="/" className="flex items-center space-x-2">
              <div className="w-8 h-8 bg-gradient-to-r from-orange-500 to-red-500 rounded-full flex items-center justify-center">
                <Utensils className="w-5 h-5 text-white" />
              </div>
              <span className="text-xl font-bold text-gray-800 dark:text-gray-200">Plateful</span>
            </Link>
            <div className="hidden md:block">
              <h1 className="text-lg font-semibold text-gray-800 dark:text-gray-200">Restaurant Dashboard</h1>
              <p className="text-sm text-gray-600 dark:text-gray-400">Bella's Italian Kitchen</p>
            </div>
          </div>
          <div className="flex items-center space-x-4">
            <Button variant="ghost" size="sm">
              <Bell className="w-4 h-4" />
            </Button>
            <Button variant="ghost" size="sm">
              <LogOut className="w-4 h-4" />
            </Button>
          </div>
        </div>
      </header>

      <div className="max-w-7xl mx-auto px-4 py-8">
        <Tabs value={activeTab} onValueChange={setActiveTab}>
          <TabsList className="grid w-full grid-cols-4">
            <TabsTrigger value="overview">Overview</TabsTrigger>
            <TabsTrigger value="donations">My Donations</TabsTrigger>
            <TabsTrigger value="feedback">Feedback</TabsTrigger>
            <TabsTrigger value="new">New Donation</TabsTrigger>
          </TabsList>

          <TabsContent value="overview" className="space-y-6">
            {/* Stats Cards */}
            <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
              <Card className="bg-white/50 dark:bg-gray-800/50 backdrop-blur-sm">
                <CardContent className="p-6">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-sm font-medium text-gray-600 dark:text-gray-400">Total Donations</p>
                      <p className="text-2xl font-bold text-orange-600 dark:text-orange-400">24</p>
                    </div>
                    <Package className="w-8 h-8 text-orange-500" />
                  </div>
                </CardContent>
              </Card>
              <Card className="bg-white/50 dark:bg-gray-800/50 backdrop-blur-sm">
                <CardContent className="p-6">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-sm font-medium text-gray-600 dark:text-gray-400">Meals Donated</p>
                      <p className="text-2xl font-bold text-green-600 dark:text-green-400">480</p>
                    </div>
                    <Utensils className="w-8 h-8 text-green-500" />
                  </div>
                </CardContent>
              </Card>
              <Card className="bg-white/50 dark:bg-gray-800/50 backdrop-blur-sm">
                <CardContent className="p-6">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-sm font-medium text-gray-600 dark:text-gray-400">Active Listings</p>
                      <p className="text-2xl font-bold text-blue-600 dark:text-blue-400">3</p>
                    </div>
                    <Clock className="w-8 h-8 text-blue-500" />
                  </div>
                </CardContent>
              </Card>
              <Card className="bg-white/50 dark:bg-gray-800/50 backdrop-blur-sm">
                <CardContent className="p-6">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-sm font-medium text-gray-600 dark:text-gray-400">Avg Rating</p>
                      <p className="text-2xl font-bold text-yellow-600 dark:text-yellow-400">4.8</p>
                    </div>
                    <Star className="w-8 h-8 text-yellow-500" />
                  </div>
                </CardContent>
              </Card>
            </div>

            {/* Recent Activity */}
            <Card className="bg-white/50 dark:bg-gray-800/50 backdrop-blur-sm">
              <CardHeader>
                <CardTitle className="text-gray-900 dark:text-gray-100">Recent Donations</CardTitle>
                <CardDescription className="text-gray-600 dark:text-gray-400">
                  Your latest food donation activities
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {mockDonations.slice(0, 3).map((donation) => (
                    <div
                      key={donation.id}
                      className="flex items-center justify-between p-4 border rounded-lg bg-gray-50 dark:bg-gray-700 border-gray-200 dark:border-gray-600"
                    >
                      <div>
                        <h4 className="font-medium text-gray-900 dark:text-gray-100">{donation.foodType}</h4>
                        <p className="text-sm text-gray-600 dark:text-gray-400">{donation.quantity}</p>
                        {donation.claimedBy && (
                          <p className="text-sm text-blue-600 dark:text-blue-400">Claimed by {donation.claimedBy}</p>
                        )}
                      </div>
                      <div className="text-right">
                        <Badge className={getStatusColor(donation.status)}>{donation.status}</Badge>
                        <p className="text-sm text-gray-500 dark:text-gray-300 mt-1">
                          Pickup: {new Date(donation.pickupTime).toLocaleString()}
                        </p>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="donations" className="space-y-6">
            <div className="flex justify-between items-center">
              <h2 className="text-2xl font-bold text-gray-900 dark:text-gray-100">My Donations</h2>
              <Button className="bg-gradient-to-r from-orange-500 to-red-500">
                <Plus className="w-4 h-4 mr-2" />
                New Donation
              </Button>
            </div>

            <div className="grid gap-4">
              {mockDonations.map((donation) => (
                <Card key={donation.id} className="bg-white/50 dark:bg-gray-800/50 backdrop-blur-sm">
                  <CardContent className="p-6">
                    <div className="flex items-center justify-between">
                      <div>
                        <h3 className="text-lg font-semibold text-gray-900 dark:text-gray-100">{donation.foodType}</h3>
                        <p className="text-gray-600 dark:text-gray-400">{donation.quantity}</p>
                        <p className="text-sm text-gray-500 dark:text-gray-300">
                          Created: {new Date(donation.createdAt).toLocaleString()}
                        </p>
                        {donation.claimedBy && (
                          <p className="text-sm text-blue-600 dark:text-blue-400 mt-1">
                            Claimed by {donation.claimedBy}
                          </p>
                        )}
                      </div>
                      <div className="text-right">
                        <Badge className={getStatusColor(donation.status)}>{donation.status}</Badge>
                        <p className="text-sm text-gray-500 dark:text-gray-300 mt-2">
                          Pickup: {new Date(donation.pickupTime).toLocaleString()}
                        </p>
                        <div className="mt-2 space-x-2">
                          <Button variant="outline" size="sm">
                            Edit
                          </Button>
                          <Button variant="outline" size="sm">
                            Cancel
                          </Button>
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </TabsContent>

          <TabsContent value="feedback" className="space-y-6">
            <h2 className="text-2xl font-bold text-gray-900 dark:text-gray-100">Feedback from NGOs</h2>

            <div className="grid gap-4">
              {mockFeedback.map((feedback) => (
                <Card key={feedback.id} className="bg-white/50 dark:bg-gray-800/50 backdrop-blur-sm">
                  <CardContent className="p-6">
                    <div className="flex items-start justify-between">
                      <div className="flex-1">
                        <div className="flex items-center space-x-2 mb-2">
                          <h3 className="font-semibold text-gray-900 dark:text-gray-100">{feedback.ngoName}</h3>
                          <div className="flex">
                            {[...Array(5)].map((_, i) => (
                              <Star
                                key={i}
                                className={`w-4 h-4 ${
                                  i < feedback.rating
                                    ? "text-yellow-400 fill-current"
                                    : "text-gray-300 dark:text-gray-500"
                                }`}
                              />
                            ))}
                          </div>
                        </div>
                        <p className="text-gray-700 dark:text-gray-300 mb-2">{feedback.comment}</p>
                        <p className="text-sm text-gray-500 dark:text-gray-300">
                          Donation ID: #{feedback.donationId} • {feedback.date}
                        </p>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </TabsContent>

          <TabsContent value="new" className="space-y-6">
            <Card className="bg-white/50 dark:bg-gray-800/50 backdrop-blur-sm">
              <CardHeader>
                <CardTitle className="text-gray-900 dark:text-gray-100">List New Food Donation</CardTitle>
                <CardDescription className="text-gray-600 dark:text-gray-400">
                  Help reduce food waste by donating your surplus food to those in need.
                </CardDescription>
              </CardHeader>
              <CardContent>
                <Link href="/dashboard/restaurant/new-donation">
                  <Button className="w-full bg-gradient-to-r from-orange-500 to-red-500 hover:from-orange-600 hover:to-red-600">
                    <Plus className="w-4 h-4 mr-2" />
                    Create New Donation Listing
                  </Button>
                </Link>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  )
}
