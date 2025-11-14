'use client'

import Navigation from "@/components/Navigation"
import Footer from "@/components/Footer"
import { Award, Users, Target, Globe } from "lucide-react"
import { useLanguage } from "@/contexts/LanguageContext"

export const dynamic = 'force-dynamic'

export default function AboutPage() {
  const { t } = useLanguage()
  
  return (
    <div className="min-h-screen flex flex-col">
      <Navigation />
      
      {/* Hero Section */}
      <section className="bg-gradient-to-r from-primary to-secondary text-white py-20">
        <div className="container mx-auto px-4 text-center">
          <h1 className="text-4xl md:text-5xl font-bold mb-4">{t('about.title')}</h1>
          <p className="text-xl opacity-90 max-w-3xl mx-auto">
            {t('about.subtitle')}
          </p>
        </div>
      </section>

      {/* Company Info */}
      <section className="py-16">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
            <div>
              <h2 className="text-3xl font-bold mb-6">{t('about.story')}</h2>
              <p className="text-muted-foreground mb-4">
                {t('about.story.p1')}
              </p>
              <p className="text-muted-foreground mb-4">
                {t('about.story.p2')}
              </p>
              <p className="text-muted-foreground">
                {t('about.story.p3')}
              </p>
            </div>
            <div className="bg-muted/50 p-8 rounded-lg">
              <h3 className="text-2xl font-semibold mb-4">{t('about.mission')}</h3>
              <p className="text-muted-foreground mb-6">
                {t('about.mission.text')}
              </p>
              <h3 className="text-2xl font-semibold mb-4">{t('about.vision')}</h3>
              <p className="text-muted-foreground">
                {t('about.vision.text')}
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Values */}
      <section className="py-16 bg-muted/30">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold text-center mb-12">{t('about.values')}</h2>
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            <div className="text-center">
              <Award className="w-16 h-16 mx-auto mb-4 text-primary" />
              <h3 className="text-xl font-semibold mb-2">{t('about.values.quality')}</h3>
              <p className="text-muted-foreground">
                {t('about.values.quality.desc')}
              </p>
            </div>
            <div className="text-center">
              <Users className="w-16 h-16 mx-auto mb-4 text-primary" />
              <h3 className="text-xl font-semibold mb-2">{t('about.values.customer')}</h3>
              <p className="text-muted-foreground">
                {t('about.values.customer.desc')}
              </p>
            </div>
            <div className="text-center">
              <Target className="w-16 h-16 mx-auto mb-4 text-primary" />
              <h3 className="text-xl font-semibold mb-2">{t('about.values.integrity')}</h3>
              <p className="text-muted-foreground">
                {t('about.values.integrity.desc')}
              </p>
            </div>
            <div className="text-center">
              <Globe className="w-16 h-16 mx-auto mb-4 text-primary" />
              <h3 className="text-xl font-semibold mb-2">{t('about.values.sustainability')}</h3>
              <p className="text-muted-foreground">
                {t('about.values.sustainability.desc')}
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
              <div className="text-muted-foreground">{t('about.stats.experience')}</div>
            </div>
            <div>
              <div className="text-4xl font-bold text-primary mb-2">20+</div>
              <div className="text-muted-foreground">{t('about.stats.countries')}</div>
            </div>
            <div>
              <div className="text-4xl font-bold text-primary mb-2">500+</div>
              <div className="text-muted-foreground">{t('about.stats.clients')}</div>
            </div>
            <div>
              <div className="text-4xl font-bold text-primary mb-2">100%</div>
              <div className="text-muted-foreground">{t('about.stats.quality')}</div>
            </div>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  )
}
