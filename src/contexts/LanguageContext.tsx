'use client'

import React, { createContext, useContext, useState, useEffect } from 'react'

type Language = 'en' | 'fr' | 'ar'

interface LanguageContextType {
  language: Language
  setLanguage: (lang: Language) => void
  t: (key: string) => string
}

const LanguageContext = createContext<LanguageContextType | undefined>(undefined)

const translations: Record<Language, Record<string, string>> = {
  en: {
    'nav.home': 'Home',
    'nav.about': 'About',
    'nav.products': 'Products',
    'nav.quality': 'Quality',
    'nav.contact': 'Contact',
    'home.hero.title': 'Premium Algerian Products',
    'home.hero.subtitle': 'Exporting Excellence Since 1998',
    'home.hero.description': 'Discover our premium selection of dates, olive oil, and traditional spices from Algeria',
    'home.hero.cta': 'Explore Products',
    'home.featured.title': 'Featured Products',
    'home.about.title': 'About 1000 Coupole Export',
    'home.about.description': 'We are a leading exporter of premium Algerian products, committed to delivering excellence in every shipment.',
    'contact.title': 'Contact Us',
    'contact.name': 'Full Name',
    'contact.company': 'Company Name',
    'contact.email': 'Email Address',
    'contact.phone': 'Phone Number',
    'contact.country': 'Country',
    'contact.message': 'Message',
    'contact.submit': 'Send Message',
    'products.all': 'All Products',
    'products.category': 'Category',
    'products.viewDetails': 'View Details',
  },
  fr: {
    'nav.home': 'Accueil',
    'nav.about': 'À Propos',
    'nav.products': 'Produits',
    'nav.quality': 'Qualité',
    'nav.contact': 'Contact',
    'home.hero.title': 'Produits Algériens de Qualité',
    'home.hero.subtitle': 'Excellence d\'Exportation Depuis 1998',
    'home.hero.description': 'Découvrez notre sélection premium de dattes, huile d\'olive et épices traditionnelles d\'Algérie',
    'home.hero.cta': 'Explorer les Produits',
    'home.featured.title': 'Produits Vedettes',
    'home.about.title': 'À Propos de 1000 Coupole Export',
    'home.about.description': 'Nous sommes un exportateur leader de produits algériens de qualité, engagés à offrir l\'excellence dans chaque envoi.',
    'contact.title': 'Nous Contacter',
    'contact.name': 'Nom Complet',
    'contact.company': 'Nom de l\'Entreprise',
    'contact.email': 'Adresse Email',
    'contact.phone': 'Numéro de Téléphone',
    'contact.country': 'Pays',
    'contact.message': 'Message',
    'contact.submit': 'Envoyer le Message',
    'products.all': 'Tous les Produits',
    'products.category': 'Catégorie',
    'products.viewDetails': 'Voir les Détails',
  },
  ar: {
    'nav.home': 'الرئيسية',
    'nav.about': 'من نحن',
    'nav.products': 'المنتجات',
    'nav.quality': 'الجودة',
    'nav.contact': 'اتصل بنا',
    'home.hero.title': 'منتجات جزائرية فاخرة',
    'home.hero.subtitle': 'التميز في التصدير منذ 1998',
    'home.hero.description': 'اكتشف مجموعتنا المميزة من التمور وزيت الزيتون والتوابل التقليدية من الجزائر',
    'home.hero.cta': 'استكشف المنتجات',
    'home.featured.title': 'المنتجات المميزة',
    'home.about.title': 'حول 1000 قبة للتصدير',
    'home.about.description': 'نحن مصدر رائد للمنتجات الجزائرية الممتازة، ملتزمون بتقديم التميز في كل شحنة.',
    'contact.title': 'اتصل بنا',
    'contact.name': 'الاسم الكامل',
    'contact.company': 'اسم الشركة',
    'contact.email': 'البريد الإلكتروني',
    'contact.phone': 'رقم الهاتف',
    'contact.country': 'الدولة',
    'contact.message': 'الرسالة',
    'contact.submit': 'إرسال الرسالة',
    'products.all': 'جميع المنتجات',
    'products.category': 'الفئة',
    'products.viewDetails': 'عرض التفاصيل',
  },
}

export function LanguageProvider({ children }: { children: React.ReactNode }) {
  const [language, setLanguageState] = useState<Language>('en')

  useEffect(() => {
    // Load language from localStorage on mount
    const savedLang = localStorage.getItem('language') as Language
    if (savedLang && ['en', 'fr', 'ar'].includes(savedLang)) {
      setLanguageState(savedLang)
      // Set document direction for Arabic
      document.documentElement.dir = savedLang === 'ar' ? 'rtl' : 'ltr'
      document.documentElement.lang = savedLang
    }
  }, [])

  const setLanguage = (lang: Language) => {
    setLanguageState(lang)
    localStorage.setItem('language', lang)
    // Set document direction for Arabic
    document.documentElement.dir = lang === 'ar' ? 'rtl' : 'ltr'
    document.documentElement.lang = lang
  }

  const t = (key: string): string => {
    return translations[language][key] || key
  }

  return (
    <LanguageContext.Provider value={{ language, setLanguage, t }}>
      {children}
    </LanguageContext.Provider>
  )
}

export function useLanguage() {
  const context = useContext(LanguageContext)
  if (context === undefined) {
    throw new Error('useLanguage must be used within a LanguageProvider')
  }
  return context
}
