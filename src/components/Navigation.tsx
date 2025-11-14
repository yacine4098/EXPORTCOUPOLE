'use client'

import { useState } from "react"
import Link from "next/link"
import { Menu, X, Globe } from "lucide-react"
import { Button } from "@/components/ui/button"
import { useLanguage } from "@/contexts/LanguageContext"

const Navigation = () => {
  const [isOpen, setIsOpen] = useState(false)
  const { language, setLanguage, t } = useLanguage()

  const changeLanguage = (lang: 'en' | 'fr' | 'ar') => {
    setLanguage(lang)
  }

  const languageLabels: { [key: string]: string } = {
    en: 'EN',
    fr: 'FR',
    ar: 'ع'
  }

  return (
    <nav className="sticky top-0 z-50 bg-background/95 backdrop-blur-sm border-b border-border shadow-sm">
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between h-20">
          {/* Logo */}
          <Link href="/" className="flex items-center gap-3">
            <img src="/logo.png" alt="1000 Coupole Export" className="h-20 w-auto" />
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center gap-8">
            <Link href="/" className="text-foreground hover:text-primary transition-colors font-medium">
              {t('nav.home')}
            </Link>
            <Link href="/about" className="text-foreground hover:text-primary transition-colors font-medium">
              {t('nav.about')}
            </Link>
            <Link href="/products" className="text-foreground hover:text-primary transition-colors font-medium">
              {t('nav.products')}
            </Link>
            <Link href="/quality" className="text-foreground hover:text-primary transition-colors font-medium">
              {t('nav.quality')}
            </Link>
            <Link href="/contact" className="text-foreground hover:text-primary transition-colors font-medium">
              {t('nav.contact')}
            </Link>
            
            {/* Language Switcher */}
            <div className="relative group">
              <Button variant="default" size="sm" className="gap-2">
                <Globe className="w-4 h-4" />
                {languageLabels[language]}
              </Button>
              <div className="absolute right-0 mt-2 w-32 bg-white rounded-md shadow-lg opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-200">
                <button
                  onClick={() => changeLanguage('en')}
                  className="block w-full text-left px-4 py-2 hover:bg-gray-100 rounded-t-md"
                >
                  🇬🇧 English
                </button>
                <button
                  onClick={() => changeLanguage('fr')}
                  className="block w-full text-left px-4 py-2 hover:bg-gray-100"
                >
                  🇫🇷 Français
                </button>
                <button
                  onClick={() => changeLanguage('ar')}
                  className="block w-full text-left px-4 py-2 hover:bg-gray-100 rounded-b-md"
                >
                  🇩🇿 العربية
                </button>
              </div>
            </div>
          </div>

          {/* Mobile Menu Button */}
          <button
            className="md:hidden p-2 rounded-lg hover:bg-muted transition-colors"
            onClick={() => setIsOpen(!isOpen)}
          >
            {isOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>

        {/* Mobile Navigation */}
        {isOpen && (
          <div className="md:hidden py-4 border-t border-border">
            <div className="flex flex-col gap-4">
              <Link
                href="/"
                className="text-foreground hover:text-primary transition-colors font-medium py-2"
                onClick={() => setIsOpen(false)}
              >
                {t('nav.home')}
              </Link>
              <Link
                href="/about"
                className="text-foreground hover:text-primary transition-colors font-medium py-2"
                onClick={() => setIsOpen(false)}
              >
                {t('nav.about')}
              </Link>
              <Link
                href="/products"
                className="text-foreground hover:text-primary transition-colors font-medium py-2"
                onClick={() => setIsOpen(false)}
              >
                {t('nav.products')}
              </Link>
              <Link
                href="/quality"
                className="text-foreground hover:text-primary transition-colors font-medium py-2"
                onClick={() => setIsOpen(false)}
              >
                {t('nav.quality')}
              </Link>
              <Link
                href="/contact"
                className="text-foreground hover:text-primary transition-colors font-medium py-2"
                onClick={() => setIsOpen(false)}
              >
                {t('nav.contact')}
              </Link>
              
              {/* Mobile Language Switcher */}
              <div className="pt-2 border-t border-border">
                <div className="text-sm font-medium mb-2">Language:</div>
                <div className="flex gap-2">
                  <button
                    onClick={() => changeLanguage('en')}
                    className={`px-3 py-1 rounded ${
                      language === 'en' ? 'bg-primary text-white' : 'bg-gray-100'
                    }`}
                  >
                    🇬🇧 EN
                  </button>
                  <button
                    onClick={() => changeLanguage('fr')}
                    className={`px-3 py-1 rounded ${
                      language === 'fr' ? 'bg-primary text-white' : 'bg-gray-100'
                    }`}
                  >
                    🇫🇷 FR
                  </button>
                  <button
                    onClick={() => changeLanguage('ar')}
                    className={`px-3 py-1 rounded ${
                      language === 'ar' ? 'bg-primary text-white' : 'bg-gray-100'
                    }`}
                  >
                    🇩🇿 AR
                  </button>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </nav>
  )
}

export default Navigation
