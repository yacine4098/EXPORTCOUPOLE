import { Link } from "react-router-dom";
import { ArrowRight, Award, Globe2, ShieldCheck, TrendingUp, Loader2, CheckCircle, FileCheck } from "lucide-react";
import { Button } from "@/components/ui/button";
import Navigation from "@/components/Navigation";
import Footer from "@/components/Footer";
import ProductCard from "@/components/ProductCard";
import { productsAPI } from "@/lib/api";
import { useState, useEffect } from "react";
import { useTranslation } from "react-i18next";

interface Product {
  id: number;
  slug: string;
  title: string;
  category: string;
  description: string;
  image?: string;
  featured?: boolean;
}

const Index = () => {
  const [featuredProducts, setFeaturedProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);
  const { t, i18n } = useTranslation();

  useEffect(() => {
    const fetchFeaturedProducts = async () => {
      try {
        const lang = i18n.language || 'en';
        const response = await productsAPI.getAll({ featured: true, lang });
        // Ensure response.data is an array before setting
        if (Array.isArray(response.data)) {
          setFeaturedProducts(response.data.slice(0, 6)); // Get first 6 featured products
        } else {
          console.error('API returned non-array data:', response.data);
          setFeaturedProducts([]);
        }
      } catch (error) {
        console.error('Error fetching featured products:', error);
        setFeaturedProducts([]);
      } finally {
        setLoading(false);
      }
    };

    fetchFeaturedProducts();
  }, [i18n.language]);

  return (
    <div className="min-h-screen flex flex-col">
      <Navigation />
      
      {/* Hero Section */}
      <section className="relative min-h-[500px] md:min-h-[600px] flex items-center justify-center overflow-hidden">
        <div 
          className="absolute inset-0"
          style={{
            backgroundImage: `url(/hero-image.png)`,
            backgroundSize: 'cover',
            backgroundPosition: 'center'
          }}
        />
        
        {/* Dark overlay */}
        <div className="absolute inset-0 bg-black/40" />
        
        <div className="container mx-auto px-4 relative z-10 text-center">
          <h1 className="text-3xl md:text-4xl lg:text-6xl font-bold text-white mb-4 md:mb-6 animate-fade-in">
            {t('home.hero.title')}
          </h1>
          <p className="text-lg md:text-xl lg:text-2xl text-white mb-3 md:mb-4 max-w-3xl mx-auto">
            {t('home.hero.subtitle')}
          </p>
          <p className="text-base md:text-lg text-white mb-6 md:mb-8 max-w-2xl mx-auto">
            {t('home.hero.description')}
          </p>
          <div className="flex flex-col sm:flex-row gap-3 md:gap-4 justify-center">
            <Link to="/products">
              <Button size="lg" variant="default" className="gap-2 bg-[#066810] hover:bg-[#066810]/90 text-white shadow-xl w-full sm:w-auto">
                {t('home.hero.exploreProducts')}
                <ArrowRight className="w-4 h-4 md:w-5 md:h-5" />
              </Button>
            </Link>
            <Link to="/contact">
              <Button size="lg" variant="outline" className="gap-2 bg-white hover:bg-white/90 text-[#066810] border-2 border-white shadow-xl w-full sm:w-auto">
                {t('home.hero.requestQuote')}
              </Button>
            </Link>
          </div>
        </div>
      </section>

      {/* Featured Products */}
      <section className="py-12 md:py-16 lg:py-20 bg-muted/30">
        <div className="container mx-auto px-4">
          <div className="text-center mb-8 md:mb-12">
            <h2 className="text-2xl md:text-3xl lg:text-4xl font-bold mb-3 md:mb-4">{t('home.products.title')}</h2>
            <p className="text-base md:text-lg text-muted-foreground max-w-2xl mx-auto">
              {t('home.products.subtitle')}
            </p>
          </div>
          
          {loading ? (
            <div className="flex justify-center items-center py-12 md:py-20">
              <Loader2 className="h-8 w-8 animate-spin text-primary" />
            </div>
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8">
              {featuredProducts.map((product) => (
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

          <div className="text-center mt-8 md:mt-12">
            <Link to="/products">
              <Button variant="outline" size="lg" className="gap-2 w-full sm:w-auto">
                {t('home.products.viewAll')}
                <ArrowRight className="w-4 h-4 md:w-5 md:h-5" />
              </Button>
            </Link>
          </div>
        </div>
      </section>

      {/* Quality & Certifications Section */}
      <section className="py-12 md:py-16 lg:py-20 bg-white">
        <div className="container mx-auto px-4">
          <div className="text-center mb-8 md:mb-12">
            <h2 className="text-2xl md:text-3xl lg:text-4xl font-bold mb-3 md:mb-4">{t('quality.title')}</h2>
            <p className="text-base md:text-lg text-muted-foreground max-w-3xl mx-auto">
              {t('quality.commitment.description')}
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 md:gap-8 mb-8 md:mb-12">
            <div className="bg-gradient-to-br from-primary/5 to-primary/10 p-6 md:p-8 rounded-lg border border-primary/20">
              <div className="w-14 h-14 md:w-16 md:h-16 bg-primary/20 rounded-full flex items-center justify-center mb-4 md:mb-6">
                <ShieldCheck className="w-7 h-7 md:w-8 md:h-8 text-primary" />
              </div>
              <h3 className="text-lg md:text-xl font-semibold mb-2 md:mb-3">ISO 22000</h3>
              <p className="text-sm md:text-base text-muted-foreground">Food Safety Management System certification ensuring the highest standards in food production and handling.</p>
            </div>

            <div className="bg-gradient-to-br from-accent/5 to-accent/10 p-6 md:p-8 rounded-lg border border-accent/20">
              <div className="w-14 h-14 md:w-16 md:h-16 bg-accent/20 rounded-full flex items-center justify-center mb-4 md:mb-6">
                <FileCheck className="w-7 h-7 md:w-8 md:h-8 text-accent" />
              </div>
              <h3 className="text-lg md:text-xl font-semibold mb-2 md:mb-3">HACCP</h3>
              <p className="text-sm md:text-base text-muted-foreground">Hazard Analysis and Critical Control Points certification for comprehensive food safety control.</p>
            </div>

            <div className="bg-gradient-to-br from-secondary/5 to-secondary/10 p-6 md:p-8 rounded-lg border border-secondary/20">
              <div className="w-14 h-14 md:w-16 md:h-16 bg-secondary/20 rounded-full flex items-center justify-center mb-4 md:mb-6">
                <CheckCircle className="w-7 h-7 md:w-8 md:h-8 text-secondary" />
              </div>
              <h3 className="text-lg md:text-xl font-semibold mb-2 md:mb-3">Organic Certified</h3>
              <p className="text-sm md:text-base text-muted-foreground">Certified organic products meeting international organic agriculture standards.</p>
            </div>
          </div>

          <div className="text-center">
            <Link to="/quality">
              <Button variant="default" size="lg" className="gap-2 bg-[#066810] hover:bg-[#066810]/90 w-full sm:w-auto">
                {t('nav.quality')}
                <ArrowRight className="w-4 h-4 md:w-5 md:h-5" />
              </Button>
            </Link>
          </div>
        </div>
      </section>

      {/* Why Choose Us */}
      <section className="py-12 md:py-16 lg:py-20">
        <div className="container mx-auto px-4">
          <div className="text-center mb-8 md:mb-12">
            <h2 className="text-2xl md:text-3xl lg:text-4xl font-bold mb-3 md:mb-4">{t('home.whyChoose.title')}</h2>
            <p className="text-base md:text-lg text-muted-foreground max-w-2xl mx-auto">
              {t('home.whyChoose.subtitle')}
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 md:gap-8">
            <div className="text-center space-y-3 md:space-y-4">
              <div className="w-14 h-14 md:w-16 md:h-16 bg-primary/10 rounded-full flex items-center justify-center mx-auto">
                <Award className="w-7 h-7 md:w-8 md:h-8 text-primary" />
              </div>
              <h3 className="text-lg md:text-xl font-semibold">{t('home.whyChoose.quality.title')}</h3>
              <p className="text-sm md:text-base text-muted-foreground">
                {t('home.whyChoose.quality.description')}
              </p>
            </div>

            <div className="text-center space-y-3 md:space-y-4">
              <div className="w-14 h-14 md:w-16 md:h-16 bg-primary/10 rounded-full flex items-center justify-center mx-auto">
                <Globe2 className="w-7 h-7 md:w-8 md:h-8 text-primary" />
              </div>
              <h3 className="text-lg md:text-xl font-semibold">{t('home.whyChoose.shipping.title')}</h3>
              <p className="text-sm md:text-base text-muted-foreground">
                {t('home.whyChoose.shipping.description')}
              </p>
            </div>

            <div className="text-center space-y-3 md:space-y-4">
              <div className="w-14 h-14 md:w-16 md:h-16 bg-primary/10 rounded-full flex items-center justify-center mx-auto">
                <ShieldCheck className="w-7 h-7 md:w-8 md:h-8 text-primary" />
              </div>
              <h3 className="text-lg md:text-xl font-semibold">{t('home.whyChoose.certified.title')}</h3>
              <p className="text-sm md:text-base text-muted-foreground">
                {t('home.whyChoose.certified.description')}
              </p>
            </div>

            <div className="text-center space-y-3 md:space-y-4">
              <div className="w-14 h-14 md:w-16 md:h-16 bg-primary/10 rounded-full flex items-center justify-center mx-auto">
                <TrendingUp className="w-7 h-7 md:w-8 md:h-8 text-primary" />
              </div>
              <h3 className="text-lg md:text-xl font-semibold">{t('home.whyChoose.pricing.title')}</h3>
              <p className="text-sm md:text-base text-muted-foreground">
                {t('home.whyChoose.pricing.description')}
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-12 md:py-16 lg:py-20 bg-gradient-to-r from-primary to-accent text-white">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-2xl md:text-3xl lg:text-4xl font-bold mb-3 md:mb-4">{t('home.cta.title')}</h2>
          <p className="text-base md:text-lg mb-6 md:mb-8 max-w-2xl mx-auto opacity-95">
            {t('home.cta.description')}
          </p>
          <Link to="/contact">
            <Button size="lg" variant="secondary" className="gap-2 w-full sm:w-auto">
              {t('home.cta.button')}
              <ArrowRight className="w-4 h-4 md:w-5 md:h-5" />
            </Button>
          </Link>
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default Index;
