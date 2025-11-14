'use client'

import { useState, useEffect } from "react"
import Navigation from "@/components/Navigation"
import Footer from "@/components/Footer"
import ProductCard from "@/components/ProductCard"
import { useLanguage } from "@/contexts/LanguageContext"

export const dynamic = 'force-dynamic'

export default function ProductsPage() {
  const [products, setProducts] = useState<any[]>([])
  const [loading, setLoading] = useState(true)
  const { language, t } = useLanguage()

  useEffect(() => {
    fetchProducts()
  }, [language])

  const fetchProducts = async () => {
    try {
      const response = await fetch(`/api/products?lang=${language}`)
      if (response.ok) {
        const data = await response.json()
        setProducts(Array.isArray(data) ? data : [])
      }
    } catch (error) {
      console.error('Error fetching products:', error)
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="min-h-screen flex flex-col">
      <Navigation />
      
      {/* Hero Section */}
      <section className="bg-gradient-to-r from-primary to-secondary text-white py-20">
        <div className="container mx-auto px-4 text-center">
          <h1 className="text-4xl md:text-5xl font-bold mb-4">{t('nav.products')}</h1>
          <p className="text-xl opacity-90 max-w-3xl mx-auto">
            {t('home.hero.description')}
          </p>
        </div>
      </section>

      {/* Products Grid */}
      <section className="py-16">
        <div className="container mx-auto px-4">
          {loading ? (
            <div className="text-center py-12">
              <div className="inline-block animate-spin rounded-full h-12 w-12 border-b-2 border-primary"></div>
              <p className="mt-4 text-muted-foreground">{t('products.loading')}</p>
            </div>
          ) : products.length === 0 ? (
            <div className="text-center py-12">
              <p className="text-muted-foreground text-lg">{t('products.none')}</p>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {products.map((product) => (
                <ProductCard
                  key={`${product.id}-${product.image}`}
                  id={product.slug}
                  title={product.title}
                  description={product.description}
                  image={product.image || '/placeholder.svg'}
                  category={product.category}
                />
              ))}
            </div>
          )}
        </div>
      </section>

      <Footer />
    </div>
  )
}
