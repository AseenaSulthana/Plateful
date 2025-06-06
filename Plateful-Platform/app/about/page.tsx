import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Utensils, Heart, Users, Shield, ArrowLeft } from "lucide-react"
import Link from "next/link"

export default function AboutPage() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-orange-50 to-red-50 dark:from-gray-900 dark:to-gray-800">
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
        <nav className="ml-auto flex gap-4 sm:gap-6">
          <Link
            href="/"
            className="text-sm font-medium hover:text-orange-600 dark:hover:text-orange-400 transition-colors"
          >
            <ArrowLeft className="w-4 h-4 inline mr-1" />
            Home
          </Link>
          <Link
            href="/contact"
            className="text-sm font-medium hover:text-orange-600 dark:hover:text-orange-400 transition-colors"
          >
            Contact
          </Link>
          <Link
            href="/login"
            className="text-sm font-medium hover:text-orange-600 dark:hover:text-orange-400 transition-colors"
          >
            Login
          </Link>
        </nav>
      </header>

      <div className="max-w-6xl mx-auto px-4 py-12">
        {/* Hero Section */}
        <div className="text-center mb-16">
          <h1 className="text-4xl md:text-6xl font-bold bg-gradient-to-r from-orange-600 to-red-600 bg-clip-text text-transparent mb-6">
            About Plateful
          </h1>
          <p className="text-xl text-gray-700 dark:text-gray-300 max-w-3xl mx-auto">
            We're on a mission to reduce food waste and fight hunger by connecting restaurants with surplus food to NGOs
            and shelters that serve those in need.
          </p>
        </div>

        {/* Mission Section */}
        <section className="mb-16">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div>
              <h2 className="text-3xl font-bold text-gray-800 mb-6">Our Mission</h2>
              <p className="text-lg text-gray-600 mb-4">
                Every day, millions of people go hungry while tons of perfectly good food goes to waste. Plateful
                bridges this gap by creating a seamless platform that connects restaurants with surplus food to
                organizations that feed those in need.
              </p>
              <p className="text-lg text-gray-600">
                Our tagline "Serving Surplus. Feeding Hope." encapsulates our commitment to transforming food waste into
                hope for communities across the nation.
              </p>
            </div>
            <div className="grid grid-cols-2 gap-4">
              <Card className="text-center border-orange-200">
                <CardContent className="p-6">
                  <Utensils className="w-12 h-12 text-orange-500 mx-auto mb-4" />
                  <h3 className="font-semibold text-gray-800">Reduce Waste</h3>
                  <p className="text-sm text-gray-600">Divert surplus food from landfills</p>
                </CardContent>
              </Card>
              <Card className="text-center border-red-200">
                <CardContent className="p-6">
                  <Heart className="w-12 h-12 text-red-500 mx-auto mb-4" />
                  <h3 className="font-semibold text-gray-800">Feed Hope</h3>
                  <p className="text-sm text-gray-600">Provide meals to those in need</p>
                </CardContent>
              </Card>
              <Card className="text-center border-blue-200">
                <CardContent className="p-6">
                  <Users className="w-12 h-12 text-blue-500 mx-auto mb-4" />
                  <h3 className="font-semibold text-gray-800">Build Community</h3>
                  <p className="text-sm text-gray-600">Connect businesses with nonprofits</p>
                </CardContent>
              </Card>
              <Card className="text-center border-green-200">
                <CardContent className="p-6">
                  <Shield className="w-12 h-12 text-green-500 mx-auto mb-4" />
                  <h3 className="font-semibold text-gray-800">Safe & Legal</h3>
                  <p className="text-sm text-gray-600">Protected by Good Samaritan laws</p>
                </CardContent>
              </Card>
            </div>
          </div>
        </section>

        {/* How It Works */}
        <section className="mb-16">
          <h2 className="text-3xl font-bold text-center text-gray-800 mb-12">How Plateful Works</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="text-center">
              <div className="w-20 h-20 bg-gradient-to-r from-orange-500 to-red-500 rounded-full flex items-center justify-center mx-auto mb-6">
                <span className="text-3xl font-bold text-white">1</span>
              </div>
              <h3 className="text-xl font-semibold mb-4">Restaurants List Surplus</h3>
              <p className="text-gray-600">
                Restaurants easily list their surplus food with details about quantity, type, pickup time, and location
                through our user-friendly platform.
              </p>
            </div>
            <div className="text-center">
              <div className="w-20 h-20 bg-gradient-to-r from-red-500 to-pink-500 rounded-full flex items-center justify-center mx-auto mb-6">
                <span className="text-3xl font-bold text-white">2</span>
              </div>
              <h3 className="text-xl font-semibold mb-4">NGOs Claim Donations</h3>
              <p className="text-gray-600">
                NGOs and shelters browse available donations in their area, claim what they need, and coordinate pickup
                times that work for both parties.
              </p>
            </div>
            <div className="text-center">
              <div className="w-20 h-20 bg-gradient-to-r from-pink-500 to-purple-500 rounded-full flex items-center justify-center mx-auto mb-6">
                <span className="text-3xl font-bold text-white">3</span>
              </div>
              <h3 className="text-xl font-semibold mb-4">Food Reaches Those in Need</h3>
              <p className="text-gray-600">
                Organizations pick up the donated food and serve it to people in their communities, creating a direct
                impact on hunger relief.
              </p>
            </div>
          </div>
        </section>

        {/* Food Safety & Legal */}
        <section className="mb-16">
          <div className="bg-white rounded-lg p-8 border border-orange-200">
            <h2 className="text-3xl font-bold text-gray-800 mb-6">Food Safety & Legal Protection</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              <div>
                <h3 className="text-xl font-semibold text-orange-600 mb-4">Food Safety Guidelines</h3>
                <ul className="space-y-2 text-gray-600">
                  <li>• Food must be unexpired and properly stored</li>
                  <li>• Maintain proper temperature during transport</li>
                  <li>• Follow local health department guidelines</li>
                  <li>• Document pickup and delivery times</li>
                  <li>• Ensure food packaging integrity</li>
                </ul>
              </div>
              <div>
                <h3 className="text-xl font-semibold text-blue-600 mb-4">Legal Protection</h3>
                <p className="text-gray-600 mb-4">
                  Plateful operates under the protection of the Bill Emerson Good Samaritan Food Donation Act, which
                  provides liability protection for food donors and nonprofit organizations.
                </p>
                <p className="text-gray-600">
                  This federal law encourages food donation by protecting donors from civil and criminal liability when
                  donating food in good faith.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* Call to Action */}
        <section className="text-center">
          <div className="bg-gradient-to-r from-orange-500 to-red-500 rounded-lg p-12 text-white">
            <h2 className="text-3xl font-bold mb-4">Join the Movement</h2>
            <p className="text-xl mb-8 opacity-90">
              Whether you're a restaurant with surplus food or an organization serving those in need, Plateful makes it
              easy to make a difference.
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
      </div>
    </div>
  )
}
