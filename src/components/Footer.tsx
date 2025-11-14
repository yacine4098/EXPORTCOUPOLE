import { Link } from "react-router-dom";
import { Mail, Phone, MapPin } from "lucide-react";
import { useTranslation } from "react-i18next";

const Footer = () => {
  const { t } = useTranslation();
  return (
    <footer className="bg-secondary text-secondary-foreground">
      <div className="container mx-auto px-4 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          {/* Company Info */}
          <div className="space-y-4">
            <img src="/logo.png" alt="1000 Coupole Export" className="h-16 w-auto brightness-0 invert" />
            <p className="text-sm opacity-90">
              Premium Algerian products delivered globally. Quality, tradition, and excellence in every export.
            </p>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="font-semibold text-lg mb-4">Quick Links</h3>
            <div className="space-y-2">
              <Link to="/" className="block text-sm opacity-90 hover:opacity-100 transition-opacity">
                {t('nav.home')}
              </Link>
              <Link to="/about" className="block text-sm opacity-90 hover:opacity-100 transition-opacity">
                {t('nav.about')}
              </Link>
              <Link to="/products" className="block text-sm opacity-90 hover:opacity-100 transition-opacity">
                {t('nav.products')}
              </Link>
              <Link to="/quality" className="block text-sm opacity-90 hover:opacity-100 transition-opacity">
                {t('nav.quality')}
              </Link>
            </div>
          </div>

          {/* Products */}
          <div>
            <h3 className="font-semibold text-lg mb-4">Our Products</h3>
            <div className="space-y-2">
              <p className="text-sm opacity-90">Algerian Dates</p>
              <p className="text-sm opacity-90">Olive Oil</p>
              <p className="text-sm opacity-90">Herbs & Spices</p>
              <p className="text-sm opacity-90">Fresh Produce</p>
            </div>
          </div>

          {/* Contact Info */}
          <div>
            <h3 className="font-semibold text-lg mb-4">Contact Us</h3>
            <div className="space-y-3">
              <div className="flex items-start gap-2 text-sm">
                <MapPin className="w-4 h-4 mt-0.5 flex-shrink-0" />
                <span className="opacity-90">Algeria</span>
              </div>
              <div className="flex items-center gap-2 text-sm">
                <Mail className="w-4 h-4 flex-shrink-0" />
                <a href="mailto:export@1000coupole.com" className="opacity-90 hover:opacity-100 transition-opacity">
                  export@1000coupole.com
                </a>
              </div>
              <div className="flex items-center gap-2 text-sm">
                <Phone className="w-4 h-4 flex-shrink-0" />
                <span className="opacity-90">+213 XXX XXX XXX</span>
              </div>
            </div>
          </div>
        </div>

        <div className="border-t border-secondary-foreground/20 mt-8 pt-8 text-center text-sm opacity-75">
          <p>&copy; {new Date().getFullYear()} 1000 Coupole Export. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
