'use client'

import Navigation from "@/components/Navigation"
import Footer from "@/components/Footer"
import { Award, Users, Target, Globe } from "lucide-react"

export const dynamic = 'force-dynamic'

export default function AboutPage() {
  return (
    <div className="min-h-screen flex flex-col">
      <Navigation />
      
      {/* Hero Section */}
      <section className="bg-gradient-to-r from-primary to-secondary text-white py-20">
        <div className="container mx-auto px-4 text-center">
          <h1 className="text-4xl md:text-5xl font-bold mb-4">About Us</h1>
          <p className="text-xl opacity-90 max-w-3xl mx-auto">
            Leading exporter of premium Algerian products to the world
          </p>
        </div>
      </section>

      {/* Company Info */}
      <section className="py-16">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
            <div>
              <h2 className="text-3xl font-bold mb-6">Our Story</h2>
              <p className="text-muted-foreground mb-4">
                1000 Coupole Export has been at the forefront of Algerian agricultural exports for over 15 years. 
                We specialize in sourcing and exporting the finest quality dates, olive oil, spices, and other premium products.
              </p>
              <p className="text-muted-foreground mb-4">
                Our commitment to quality, sustainability, and customer satisfaction has made us a trusted partner 
                for importers and distributors worldwide.
              </p>
              <p className="text-muted-foreground">
                We work directly with local farmers and producers to ensure the highest standards of quality 
                while supporting sustainable agricultural practices.
              </p>
            </div>
            <div className="bg-muted/50 p-8 rounded-lg">
              <h3 className="text-2xl font-semibold mb-4">Our Mission</h3>
              <p className="text-muted-foreground mb-6">
                To share the authentic taste of Algeria with the world by providing premium quality products 
                that meet international standards while preserving traditional production methods.
              </p>
              <h3 className="text-2xl font-semibold mb-4">Our Vision</h3>
              <p className="text-muted-foreground">
                To become the leading exporter of Algerian agricultural products, recognized globally for 
                our commitment to quality, sustainability, and innovation.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Values */}
      <section className="py-16 bg-muted/30">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold text-center mb-12">Our Values</h2>
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            <div className="text-center">
              <Award className="w-16 h-16 mx-auto mb-4 text-primary" />
              <h3 className="text-xl font-semibold mb-2">Quality First</h3>
              <p className="text-muted-foreground">
                We never compromise on quality, ensuring every product meets the highest standards
              </p>
            </div>
            <div className="text-center">
              <Users className="w-16 h-16 mx-auto mb-4 text-primary" />
              <h3 className="text-xl font-semibold mb-2">Customer Focus</h3>
              <p className="text-muted-foreground">
                Our customers' success is our priority, and we build lasting partnerships
              </p>
            </div>
            <div className="text-center">
              <Target className="w-16 h-16 mx-auto mb-4 text-primary" />
              <h3 className="text-xl font-semibold mb-2">Integrity</h3>
              <p className="text-muted-foreground">
                We operate with honesty, transparency, and ethical business practices
              </p>
            </div>
            <div className="text-center">
              <Globe className="w-16 h-16 mx-auto mb-4 text-primary" />
              <h3 className="text-xl font-semibold mb-2">Sustainability</h3>
              <p className="text-muted-foreground">
                We support sustainable farming practices that protect our environment
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Stats */}
      <section className="py-16">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 text-center">
            <div>
              <div className="text-4xl font-bold text-primary mb-2">15+</div>
              <div className="text-muted-foreground">Years Experience</div>
            </div>
            <div>
              <div className="text-4xl font-bold text-primary mb-2">20+</div>
              <div className="text-muted-foreground">Countries Served</div>
            </div>
            <div>
              <div className="text-4xl font-bold text-primary mb-2">500+</div>
              <div className="text-muted-foreground">Happy Clients</div>
            </div>
            <div>
              <div className="text-4xl font-bold text-primary mb-2">100%</div>
              <div className="text-muted-foreground">Quality Guaranteed</div>
            </div>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  )
}
