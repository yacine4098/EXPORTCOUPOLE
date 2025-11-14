'use client'

import Navigation from "@/components/Navigation"
import Footer from "@/components/Footer"
import { ShieldCheck, Award, FileCheck, Microscope } from "lucide-react"
import { useLanguage } from "@/contexts/LanguageContext"

export const dynamic = 'force-dynamic'

export default function QualityPage() {
  const { t } = useLanguage()
  
  return (
    <div className="min-h-screen flex flex-col">
      <Navigation />
      
      {/* Hero Section */}
      <section className="bg-gradient-to-r from-primary to-secondary text-white py-20">
        <div className="container mx-auto px-4 text-center">
          <h1 className="text-4xl md:text-5xl font-bold mb-4">{t('quality.title')}</h1>
          <p className="text-xl opacity-90 max-w-3xl mx-auto">
            {t('quality.subtitle')}
          </p>
        </div>
      </section>

      {/* Quality Standards */}
      <section className="py-16">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold text-center mb-12">{t('quality.commitment')}</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-4xl mx-auto">
            <div className="bg-card p-6 rounded-lg border">
              <ShieldCheck className="w-12 h-12 text-primary mb-4" />
              <h3 className="text-xl font-semibold mb-3">{t('quality.testing')}</h3>
              <p className="text-muted-foreground">
                {t('quality.testing.desc')}
              </p>
            </div>
            <div className="bg-card p-6 rounded-lg border">
              <Award className="w-12 h-12 text-primary mb-4" />
              <h3 className="text-xl font-semibold mb-3">{t('quality.certified')}</h3>
              <p className="text-muted-foreground">
                {t('quality.certified.desc')}
              </p>
            </div>
            <div className="bg-card p-6 rounded-lg border">
              <FileCheck className="w-12 h-12 text-primary mb-4" />
              <h3 className="text-xl font-semibold mb-3">{t('quality.traceability')}</h3>
              <p className="text-muted-foreground">
                {t('quality.traceability.desc')}
              </p>
            </div>
            <div className="bg-card p-6 rounded-lg border">
              <Microscope className="w-12 h-12 text-primary mb-4" />
              <h3 className="text-xl font-semibold mb-3">{t('quality.laboratory')}</h3>
              <p className="text-muted-foreground">
                {t('quality.laboratory.desc')}
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Certifications */}
      <section className="py-16 bg-muted/30">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold text-center mb-12">{t('quality.certifications')}</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-5xl mx-auto">
            <div className="bg-card p-8 rounded-lg text-center border-2 border-primary/20">
              <Award className="w-16 h-16 mx-auto mb-4 text-primary" />
              <h3 className="text-2xl font-bold mb-2">ISO 22000</h3>
              <p className="text-muted-foreground">
                {t('quality.iso')}
              </p>
            </div>
            <div className="bg-card p-8 rounded-lg text-center border-2 border-primary/20">
              <Award className="w-16 h-16 mx-auto mb-4 text-primary" />
              <h3 className="text-2xl font-bold mb-2">HACCP</h3>
              <p className="text-muted-foreground">
                {t('quality.haccp')}
              </p>
            </div>
            <div className="bg-card p-8 rounded-lg text-center border-2 border-primary/20">
              <Award className="w-16 h-16 mx-auto mb-4 text-primary" />
              <h3 className="text-2xl font-bold mb-2">Organic Certified</h3>
              <p className="text-muted-foreground">
                {t('quality.organic')}
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Quality Process */}
      <section className="py-16">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold text-center mb-12">{t('quality.process')}</h2>
          <div className="max-w-4xl mx-auto space-y-6">
            <div className="flex gap-4">
              <div className="flex-shrink-0 w-12 h-12 bg-primary text-white rounded-full flex items-center justify-center font-bold text-lg">1</div>
              <div>
                <h3 className="text-xl font-semibold mb-2">{t('quality.step1')}</h3>
                <p className="text-muted-foreground">
                  {t('quality.step1.desc')}
                </p>
              </div>
            </div>
            <div className="flex gap-4">
              <div className="flex-shrink-0 w-12 h-12 bg-primary text-white rounded-full flex items-center justify-center font-bold text-lg">2</div>
              <div>
                <h3 className="text-xl font-semibold mb-2">{t('quality.step2')}</h3>
                <p className="text-muted-foreground">
                  {t('quality.step2.desc')}
                </p>
              </div>
            </div>
            <div className="flex gap-4">
              <div className="flex-shrink-0 w-12 h-12 bg-primary text-white rounded-full flex items-center justify-center font-bold text-lg">3</div>
              <div>
                <h3 className="text-xl font-semibold mb-2">{t('quality.step3')}</h3>
                <p className="text-muted-foreground">
                  {t('quality.step3.desc')}
                </p>
              </div>
            </div>
            <div className="flex gap-4">
              <div className="flex-shrink-0 w-12 h-12 bg-primary text-white rounded-full flex items-center justify-center font-bold text-lg">4</div>
              <div>
                <h3 className="text-xl font-semibold mb-2">{t('quality.step4')}</h3>
                <p className="text-muted-foreground">
                  {t('quality.step4.desc')}
                </p>
              </div>
            </div>
            <div className="flex gap-4">
              <div className="flex-shrink-0 w-12 h-12 bg-primary text-white rounded-full flex items-center justify-center font-bold text-lg">5</div>
              <div>
                <h3 className="text-xl font-semibold mb-2">{t('quality.step5')}</h3>
                <p className="text-muted-foreground">
                  {t('quality.step5.desc')}
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
