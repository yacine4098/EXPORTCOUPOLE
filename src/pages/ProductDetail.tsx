import { useState, useEffect } from "react";
import { useParams, Link, Navigate } from "react-router-dom";
import { ArrowLeft, Package, ShieldCheck, Truck, Loader2 } from "lucide-react";
import Navigation from "@/components/Navigation";
import Footer from "@/components/Footer";
import { Button } from "@/components/ui/button";
import { Table, TableBody, TableCell, TableRow } from "@/components/ui/table";
import { productsAPI } from "@/lib/api";
import { useTranslation } from "react-i18next";

interface Specification {
  label_en: string;
  label_fr: string;
  label_ar: string;
  value_en: string;
  value_fr: string;
  value_ar: string;
}

interface Packaging {
  label_en: string;
  label_fr: string;
  label_ar: string;
  value_en: string;
  value_fr: string;
  value_ar: string;
}

interface Certification {
  name: string;
}

interface ProductImage {
  image_url: string;
}

interface Product {
  id: number;
  slug: string;
  title_en: string;
  title_fr: string;
  title_ar: string;
  category_en: string;
  category_fr: string;
  category_ar: string;
  description_en: string;
  description_fr: string;
  description_ar: string;
  images: ProductImage[];
  specifications: Specification[];
  packaging: Packaging[];
  certifications: Certification[];
}

const ProductDetail = () => {
  const { id } = useParams();
  const [product, setProduct] = useState<Product | null>(null);
  const [loading, setLoading] = useState(true);
  const [notFound, setNotFound] = useState(false);
  const { t, i18n } = useTranslation();

  useEffect(() => {
    const fetchProduct = async () => {
      try {
        setLoading(true);
        const lang = i18n.language || 'en';
        const response = await productsAPI.getBySlug(id || "", lang);
        setProduct(response.data);
      } catch (error: any) {
        console.error('Error fetching product:', error);
        if (error.response?.status === 404) {
          setNotFound(true);
        }
      } finally {
        setLoading(false);
      }
    };

    if (id) {
      fetchProduct();
    }
  }, [id, i18n.language]);

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <Loader2 className="h-8 w-8 animate-spin text-primary" />
      </div>
    );
  }

  if (notFound || !product) {
    return <Navigate to="/products" replace />;
  }

  const primaryImage = product.images?.find(img => img.image_url)?.image_url || '/placeholder.svg';
  const imageUrl = primaryImage.startsWith('http') ? primaryImage : `http://localhost:5000${primaryImage}`;
  
  // Get localized field
  const lang = i18n.language || 'en';
  const titleField = `title_${lang}` as keyof Product;
  const categoryField = `category_${lang}` as keyof Product;
  const descriptionField = `description_${lang}` as keyof Product;
  const labelField = `label_${lang}` as keyof Specification;
  const valueField = `value_${lang}` as keyof Specification;

  return (
    <div className="min-h-screen flex flex-col">
      <Navigation />
      
      <div className="container mx-auto px-4 py-8">
        <Link to="/products">
          <Button variant="ghost" className="gap-2 mb-6">
            <ArrowLeft className="w-4 h-4" />
            {t('productDetail.backToProducts')}
          </Button>
        </Link>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
          {/* Product Image */}
          <div className="space-y-4">
            <div className="aspect-square rounded-lg overflow-hidden bg-muted">
              <img
                src={imageUrl}
                alt={String(product[titleField])}
                className="w-full h-full object-cover"
              />
            </div>
          </div>

          {/* Product Info */}
          <div className="space-y-6">
            <div>
              <div className="text-sm text-primary font-medium mb-2">{String(product[categoryField])}</div>
              <h1 className="text-3xl md:text-4xl font-bold mb-4">{String(product[titleField])}</h1>
              <p className="text-lg text-muted-foreground">{String(product[descriptionField])}</p>
            </div>

            {/* Product Specifications */}
            {product.specifications && product.specifications.length > 0 && (
              <div>
                <h2 className="text-2xl font-semibold mb-4">{t('productDetail.specifications')}</h2>
                <Table>
                  <TableBody>
                    {product.specifications.map((spec, index) => (
                      <TableRow key={index}>
                        <TableCell className="font-medium">{String(spec[labelField])}</TableCell>
                        <TableCell>{String(spec[valueField])}</TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </div>
            )}

            {/* Packaging & Export Details */}
            {product.packaging && product.packaging.length > 0 && (
              <div>
                <h2 className="text-2xl font-semibold mb-4">{t('productDetail.packaging')}</h2>
                <Table>
                  <TableBody>
                    {product.packaging.map((pack, index) => (
                      <TableRow key={index}>
                        <TableCell className="font-medium">{String(pack[labelField])}</TableCell>
                        <TableCell>{String(pack[valueField])}</TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </div>
            )}

            {/* Certifications */}
            {product.certifications && product.certifications.length > 0 && (
              <div>
                <h2 className="text-2xl font-semibold mb-4">{t('productDetail.certifications')}</h2>
                <div className="flex flex-wrap gap-2">
                  {product.certifications.map((cert, index) => (
                    <div key={index} className="px-4 py-2 bg-primary/10 text-primary rounded-full text-sm font-medium flex items-center gap-2">
                      <ShieldCheck className="w-4 h-4" />
                      {cert.name}
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Features */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 pt-4">
              <div className="text-center p-4 bg-muted/50 rounded-lg">
                <Package className="w-8 h-8 text-primary mx-auto mb-2" />
                <div className="font-medium">{t('productDetail.features.packaging')}</div>
              </div>
              <div className="text-center p-4 bg-muted/50 rounded-lg">
                <Truck className="w-8 h-8 text-primary mx-auto mb-2" />
                <div className="font-medium">{t('productDetail.features.shipping')}</div>
              </div>
              <div className="text-center p-4 bg-muted/50 rounded-lg">
                <ShieldCheck className="w-8 h-8 text-primary mx-auto mb-2" />
                <div className="font-medium">{t('productDetail.features.certified')}</div>
              </div>
            </div>

            {/* CTA */}
            <Link to="/contact" className="block">
              <Button size="lg" className="w-full">
                {t('products.requestQuote')}
              </Button>
            </Link>
          </div>
        </div>
      </div>

      <Footer />
    </div>
  );
};

export default ProductDetail;
