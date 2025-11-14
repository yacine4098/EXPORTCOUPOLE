'use client'

import Navigation from "@/components/Navigation"
import Footer from "@/components/Footer"
import { Button } from "@/components/ui/button"
import { ArrowRight, Star, Globe, Award } from "lucide-react"
import Link from "next/link"
import { useLanguage } from "@/contexts/LanguageContext"

export const dynamic = 'force-dynamic'

export default function HomePage() {
  const { t } = useLanguage()
  
  return (
    <div className="min-h-screen flex flex-col">
      <Navigation />
      
      {/* Hero Section */}
      <section 
        className="relative h-screen flex items-center justify-center text-white"
        style={{
          backgroundImage: "url('/hero-image.png')",
          backgroundSize: 'cover',
          backgroundPosition: 'center'
        }}
      >
        <div className="absolute inset-0 bg-gradient-to-r from-secondary/95 to-primary/95" />
        
        <div className="container mx-auto px-4 relative z-10 text-center">
          <img 
            src="/logo.png" 
            alt="1000 Coupole Export" 
            className="h-32 md:h-40 mx-auto mb-8 drop-shadow-2xl"
          />
          <h1 className="text-4xl md:text-6xl font-bold mb-6 animate-fade-in">
            {t('home.hero.title')}
          </h1>
          <p className="text-xl md:text-2xl mb-8 max-w-3xl mx-auto opacity-95">
            {t('home.hero.description')}
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link href="/products">
              <Button size="lg" className="gap-2 text-lg">
                {t('home.hero.cta')}
                <ArrowRight className="w-5 h-5" />
              </Button>
            </Link>
            <Link href="/contact">
              <Button size="lg" variant="outline" className="gap-2 text-lg bg-white/10 backdrop-blur-sm border-white/30 text-white hover:bg-white/20">
                {t('contact.title')}
              </Button>
            </Link>
          </div>
        </div>
      </section>

      {/* Features */}
      <section className="py-20 bg-muted/30">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl md:text-4xl font-bold text-center mb-12">{t('home.why.title')}</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="text-center p-6">
              <Award className="w-16 h-16 mx-auto mb-4 text-primary" />
              <h3 className="text-xl font-semibold mb-2">{t('home.why.quality')}</h3>
              <p className="text-muted-foreground">{t('home.why.quality.desc')}</p>
            </div>
            <div className="text-center p-6">
              <Globe className="w-16 h-16 mx-auto mb-4 text-primary" />
              <h3 className="text-xl font-semibold mb-2">{t('home.why.global')}</h3>
              <p className="text-muted-foreground">{t('home.why.global.desc')}</p>
            </div>
            <div className="text-center p-6">
              <Star className="w-16 h-16 mx-auto mb-4 text-primary" />
              <h3 className="text-xl font-semibold mb-2">{t('home.why.trusted')}</h3>
              <p className="text-muted-foreground">{t('home.why.trusted.desc')}</p>
            </div>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  )
}
