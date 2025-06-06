"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Input } from "@/components/ui/input"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Heart, MapPin, Clock, Users, Bell, LogOut, Search, Filter } from "lucide-react"
import Link from "next/link"

// Mock data
const mockAvailableDonations = [
  {
    id: 1,
    restaurant: "Bella's Italian Kitchen",
    foodType: "Pasta & Salad",
    quantity: "20 servings",
    distance: "0.8 miles",
    pickupTime: "2024-01-15 18:00",
    description: "Fresh pasta with marinara sauce and mixed green salad",
    address: "123 Main St, Downtown",
  },
  {
    id: 2,
    restaurant: "Golden Dragon Chinese",
    foodType: "Fried Rice & Vegetables",
    quantity: "25 servings",
    distance: "1.2 miles",
    pickupTime: "2024-01-15 19:30",
    description: "Vegetable fried rice with stir-fried mixed vegetables",
    address: "456 Oak Ave, Chinatown",
  },
  {
    id: 3,
    restaurant: "Taco Fiesta",
    foodType: "Tacos & Beans",
    quantity: "30 servings",
    distance: "2.1 miles",
    pickupTime: "2024-01-15 20:00",
    description: "Chicken and beef tacos with refried beans",
    address: "789 Pine St, West Side",
  },
]

const mockClaimedDonations = [
  {
    id: 4,
    restaurant: "Pizza Palace",
    foodType: "Pizza Slices",
    quantity: "15 servings",
    status: "confirmed",
    pickupTime: "2024-01-15 17:00",
    claimedAt: "2024-01-15 14:30",
  },
  {
    id: 5,
    restaurant: "Burger Barn",
    foodType: "Burgers & Fries",
    quantity: "12 servings",
    status: "picked-up",
    pickupTime: "2024-01-14 18:30",
    claimedAt: "2024-01-14 16:00",
  },
]

export default function NGODashboard() {
  const [activeTab, setActiveTab] = useState("browse")
  const [searchTerm, setSearchTerm] = useState("")
  const [filterType, setFilterType] = useState("all")

  const getStatusColor = (status: string) => {
    switch (status) {
      case "confirmed":
        return "bg-yellow-100 text-yellow-800"
      case "picked-up":
        return "bg-green-100 text-green-800"
      case "completed":
        return "bg-blue-100 text-blue-800"
      default:
        return "bg-gray-100 text-gray-800"
    }
  }

  const filteredDonations = mockAvailableDonations.filter((donation) => {
    const matchesSearch =
      donation.foodType.toLowerCase().includes(searchTerm.toLowerCase()) ||
      donation.restaurant.toLowerCase().includes(searchTerm.toLowerCase())
    const matchesFilter = filterType === "all" || donation.foodType.toLowerCase().includes(filterType)
    return matchesSearch && matchesFilter
  })

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-green-50 dark:from-gray-900 dark:to-gray-800">
      {/* Header */}
      <header className="bg-white dark:bg-gray-900 border-b border-blue-200 dark:border-gray-700 px-4 py-4">
        <div className="max-w-7xl mx-auto flex items-center justify-between">
          <div className="flex items-center space-x-4">
            <Link href="/" className="flex items-center space-x-2">
              <div className="w-8 h-8 bg-gradient-to-r from-blue-500 to-green-500 rounded-full flex items-center justify-center">
                <Heart className="w-5 h-5 text-white" />
              </div>
              <span className="text-xl font-bold text-gray-800 dark:text-gray-200">Plateful</span>
            </Link>
            <div className="hidden md:block">
              <h1 className="text-lg font-semibold text-gray-800 dark:text-gray-200">NGO Dashboard</h1>
              <p className="text-sm text-gray-600 dark:text-gray-400">Hope Community Shelter</p>
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
            <TabsTrigger value="browse">Browse Donations</TabsTrigger>
            <TabsTrigger value="claimed">My Claims</TabsTrigger>
            <TabsTrigger value="history">History</TabsTrigger>
            <TabsTrigger value="feedback">Give Feedback</TabsTrigger>
          </TabsList>

          <TabsContent value="browse" className="space-y-6">
            {/* Search and Filter */}
            <div className="flex flex-col md:flex-row gap-4">
              <div className="flex-1 relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
                <Input
                  placeholder="Search by food type or restaurant..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="pl-10"
                />
              </div>
              <Select value={filterType} onValueChange={setFilterType}>
                <SelectTrigger className="w-full md:w-48">
                  <Filter className="w-4 h-4 mr-2" />
                  <SelectValue placeholder="Filter by type" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Types</SelectItem>
                  <SelectItem value="pasta">Pasta</SelectItem>
                  <SelectItem value="pizza">Pizza</SelectItem>
                  <SelectItem value="rice">Rice</SelectItem>
                  <SelectItem value="tacos">Tacos</SelectItem>
                  <SelectItem value="burgers">Burgers</SelectItem>
                </SelectContent>
              </Select>
            </div>

            {/* Available Donations */}
            <div className="grid gap-4">
              {filteredDonations.map((donation) => (
                <Card key={donation.id} className="hover:shadow-lg transition-shadow">
                  <CardContent className="p-6">
                    <div className="flex flex-col md:flex-row md:items-center justify-between">
                      <div className="flex-1">
                        <div className="flex items-center space-x-2 mb-2">
                          <h3 className="text-lg font-semibold">{donation.foodType}</h3>
                          <Badge variant="secondary">{donation.quantity}</Badge>
                        </div>
                        <p className="text-blue-600 font-medium mb-1">{donation.restaurant}</p>
                        <p className="text-gray-600 mb-2">{donation.description}</p>
                        <div className="flex items-center space-x-4 text-sm text-gray-500">
                          <div className="flex items-center">
                            <MapPin className="w-4 h-4 mr-1" />
                            {donation.distance}
                          </div>
                          <div className="flex items-center">
                            <Clock className="w-4 h-4 mr-1" />
                            Pickup: {new Date(donation.pickupTime).toLocaleString()}
                          </div>
                        </div>
                        <p className="text-sm text-gray-500 mt-1">{donation.address}</p>
                      </div>
                      <div className="mt-4 md:mt-0 md:ml-4">
                        <Button className="bg-gradient-to-r from-blue-500 to-green-500 hover:from-blue-600 hover:to-green-600">
                          Claim Donation
                        </Button>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </TabsContent>

          <TabsContent value="claimed" className="space-y-6">
            <div className="flex justify-between items-center">
              <h2 className="text-2xl font-bold">My Claimed Donations</h2>
              <div className="flex items-center space-x-2">
                <Users className="w-5 h-5 text-blue-500" />
                <span className="text-sm text-gray-600">Serving 150+ people daily</span>
              </div>
            </div>

            <div className="grid gap-4">
              {mockClaimedDonations.map((donation) => (
                <Card key={donation.id}>
                  <CardContent className="p-6">
                    <div className="flex items-center justify-between">
                      <div>
                        <h3 className="text-lg font-semibold">{donation.foodType}</h3>
                        <p className="text-blue-600 font-medium">{donation.restaurant}</p>
                        <p className="text-gray-600">{donation.quantity}</p>
                        <p className="text-sm text-gray-500">
                          Claimed: {new Date(donation.claimedAt).toLocaleString()}
                        </p>
                      </div>
                      <div className="text-right">
                        <Badge className={getStatusColor(donation.status)}>{donation.status}</Badge>
                        <p className="text-sm text-gray-500 mt-2">
                          Pickup: {new Date(donation.pickupTime).toLocaleString()}
                        </p>
                        <div className="mt-2 space-x-2">
                          {donation.status === "confirmed" && (
                            <Button variant="outline" size="sm">
                              Confirm Pickup
                            </Button>
                          )}
                          {donation.status === "picked-up" && (
                            <Button variant="outline" size="sm">
                              Leave Feedback
                            </Button>
                          )}
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </TabsContent>

          <TabsContent value="history" className="space-y-6">
            <h2 className="text-2xl font-bold">Donation History</h2>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-6">
              <Card>
                <CardContent className="p-6">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-sm font-medium text-gray-600">Total Received</p>
                      <p className="text-2xl font-bold text-blue-600">42</p>
                    </div>
                    <Heart className="w-8 h-8 text-blue-500" />
                  </div>
                </CardContent>
              </Card>
              <Card>
                <CardContent className="p-6">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-sm font-medium text-gray-600">Meals Served</p>
                      <p className="text-2xl font-bold text-green-600">1,260</p>
                    </div>
                    <Users className="w-8 h-8 text-green-500" />
                  </div>
                </CardContent>
              </Card>
              <Card>
                <CardContent className="p-6">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-sm font-medium text-gray-600">This Month</p>
                      <p className="text-2xl font-bold text-purple-600">8</p>
                    </div>
                    <Clock className="w-8 h-8 text-purple-500" />
                  </div>
                </CardContent>
              </Card>
            </div>

            <Card>
              <CardHeader>
                <CardTitle>Recent Donations Received</CardTitle>
                <CardDescription>Your donation history from the past month</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {[...mockClaimedDonations, ...mockAvailableDonations.slice(0, 2)].map((donation, index) => (
                    <div key={index} className="flex items-center justify-between p-4 border rounded-lg">
                      <div>
                        <h4 className="font-medium">{donation.foodType}</h4>
                        <p className="text-sm text-gray-600">{donation.restaurant}</p>
                        <p className="text-sm text-gray-500">{donation.quantity}</p>
                      </div>
                      <div className="text-right">
                        <Badge className="bg-green-100 text-green-800">Completed</Badge>
                        <p className="text-sm text-gray-500 mt-1">Jan 14, 2024</p>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="feedback" className="space-y-6">
            <h2 className="text-2xl font-bold">Give Feedback</h2>

            <Card>
              <CardHeader>
                <CardTitle>Rate Your Recent Donations</CardTitle>
                <CardDescription>
                  Help restaurants improve by providing feedback on the food quality and donation process.
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-6">
                  {mockClaimedDonations
                    .filter((d) => d.status === "picked-up")
                    .map((donation) => (
                      <div key={donation.id} className="p-4 border rounded-lg">
                        <div className="flex items-center justify-between mb-4">
                          <div>
                            <h3 className="font-semibold">{donation.foodType}</h3>
                            <p className="text-blue-600">{donation.restaurant}</p>
                            <p className="text-sm text-gray-500">{donation.quantity}</p>
                          </div>
                          <Button className="bg-gradient-to-r from-blue-500 to-green-500">Leave Feedback</Button>
                        </div>
                      </div>
                    ))}
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  )
}
