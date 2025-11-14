'use client'

import Navigation from "@/components/Navigation"
import Footer from "@/components/Footer"
import { ShieldCheck, Award, FileCheck, Microscope } from "lucide-react"

export const dynamic = 'force-dynamic'

export default function QualityPage() {
  return (
    <div className="min-h-screen flex flex-col">
      <Navigation />
      
      {/* Hero Section */}
      <section className="bg-gradient-to-r from-primary to-secondary text-white py-20">
        <div className="container mx-auto px-4 text-center">
          <h1 className="text-4xl md:text-5xl font-bold mb-4">Quality & Certifications</h1>
          <p className="text-xl opacity-90 max-w-3xl mx-auto">
            Meeting international standards with every shipment
          </p>
        </div>
      </section>

      {/* Quality Standards */}
      <section className="py-16">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold text-center mb-12">Our Quality Commitment</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-4xl mx-auto">
            <div className="bg-card p-6 rounded-lg border">
              <ShieldCheck className="w-12 h-12 text-primary mb-4" />
              <h3 className="text-xl font-semibold mb-3">Rigorous Testing</h3>
              <p className="text-muted-foreground">
                Every batch undergoes comprehensive quality control testing to ensure it meets our strict standards and customer requirements.
              </p>
            </div>
            <div className="bg-card p-6 rounded-lg border">
              <Award className="w-12 h-12 text-primary mb-4" />
              <h3 className="text-xl font-semibold mb-3">Certified Excellence</h3>
              <p className="text-muted-foreground">
                We maintain all major international food safety and quality certifications to guarantee the highest standards.
              </p>
            </div>
            <div className="bg-card p-6 rounded-lg border">
              <FileCheck className="w-12 h-12 text-primary mb-4" />
              <h3 className="text-xl font-semibold mb-3">Full Traceability</h3>
              <p className="text-muted-foreground">
                Complete traceability from farm to export, ensuring transparency and accountability at every step.
              </p>
            </div>
            <div className="bg-card p-6 rounded-lg border">
              <Microscope className="w-12 h-12 text-primary mb-4" />
              <h3 className="text-xl font-semibold mb-3">Laboratory Analysis</h3>
              <p className="text-muted-foreground">
                Advanced laboratory testing for contaminants, quality parameters, and compliance with international regulations.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Certifications */}
      <section className="py-16 bg-muted/30">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold text-center mb-12">Our Certifications</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-5xl mx-auto">
            <div className="bg-card p-8 rounded-lg text-center border-2 border-primary/20">
              <Award className="w-16 h-16 mx-auto mb-4 text-primary" />
              <h3 className="text-2xl font-bold mb-2">ISO 22000</h3>
              <p className="text-muted-foreground">
                Food Safety Management System certification ensuring safe food production and handling
              </p>
            </div>
            <div className="bg-card p-8 rounded-lg text-center border-2 border-primary/20">
              <Award className="w-16 h-16 mx-auto mb-4 text-primary" />
              <h3 className="text-2xl font-bold mb-2">HACCP</h3>
              <p className="text-muted-foreground">
                Hazard Analysis and Critical Control Points system for food safety
              </p>
            </div>
            <div className="bg-card p-8 rounded-lg text-center border-2 border-primary/20">
              <Award className="w-16 h-16 mx-auto mb-4 text-primary" />
              <h3 className="text-2xl font-bold mb-2">Organic Certified</h3>
              <p className="text-muted-foreground">
                Certified organic products available upon request for select items
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Quality Process */}
      <section className="py-16">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold text-center mb-12">Our Quality Process</h2>
          <div className="max-w-4xl mx-auto space-y-6">
            <div className="flex gap-4">
              <div className="flex-shrink-0 w-12 h-12 bg-primary text-white rounded-full flex items-center justify-center font-bold text-lg">1</div>
              <div>
                <h3 className="text-xl font-semibold mb-2">Source Selection</h3>
                <p className="text-muted-foreground">
                  We carefully select suppliers and farms that meet our quality standards and share our commitment to excellence.
                </p>
              </div>
            </div>
            <div className="flex gap-4">
              <div className="flex-shrink-0 w-12 h-12 bg-primary text-white rounded-full flex items-center justify-center font-bold text-lg">2</div>
              <div>
                <h3 className="text-xl font-semibold mb-2">Quality Inspection</h3>
                <p className="text-muted-foreground">
                  Products undergo thorough inspection for quality, freshness, and compliance with specifications.
                </p>
              </div>
            </div>
            <div className="flex gap-4">
              <div className="flex-shrink-0 w-12 h-12 bg-primary text-white rounded-full flex items-center justify-center font-bold text-lg">3</div>
              <div>
                <h3 className="text-xl font-semibold mb-2">Processing & Packaging</h3>
                <p className="text-muted-foreground">
                  State-of-the-art processing facilities ensure products are handled with care and packaged to maintain freshness.
                </p>
              </div>
            </div>
            <div className="flex gap-4">
              <div className="flex-shrink-0 w-12 h-12 bg-primary text-white rounded-full flex items-center justify-center font-bold text-lg">4</div>
              <div>
                <h3 className="text-xl font-semibold mb-2">Final Testing</h3>
                <p className="text-muted-foreground">
                  Comprehensive laboratory testing before shipment to verify quality parameters and safety standards.
                </p>
              </div>
            </div>
            <div className="flex gap-4">
              <div className="flex-shrink-0 w-12 h-12 bg-primary text-white rounded-full flex items-center justify-center font-bold text-lg">5</div>
              <div>
                <h3 className="text-xl font-semibold mb-2">Export & Documentation</h3>
                <p className="text-muted-foreground">
                  Complete documentation and certificates provided with each shipment for full compliance and traceability.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  )
}
