import { useState } from 'react';
import { Mail, MapPin, Phone } from "lucide-react";
import Navigation from "@/components/Navigation";
import Footer from "@/components/Footer";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { useToast } from "@/hooks/use-toast";
import { useTranslation } from 'react-i18next';
import { inquiriesAPI } from '@/lib/api';

const Contact = () => {
  const { toast } = useToast();
  const { t } = useTranslation();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [formData, setFormData] = useState({
    name: '',
    company: '',
    email: '',
    phone: '',
    country: '',
    message: ''
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData(prev => ({
      ...prev,
      [e.target.id]: e.target.value
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    try {
      await inquiriesAPI.create(formData);
      
      toast({
        title: t('contact.form.success'),
        description: t('contact.form.successDescription'),
      });

      // Reset form
      setFormData({
        name: '',
        company: '',
        email: '',
        phone: '',
        country: '',
        message: ''
      });
    } catch (error) {
      toast({
        title: t('common.error'),
        description: 'Failed to send message. Please try again.',
        variant: 'destructive'
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="min-h-screen flex flex-col">
      <Navigation />
      
      {/* Hero */}
      <section className="bg-gradient-to-r from-secondary to-primary text-white py-20">
        <div className="container mx-auto px-4 text-center">
          <h1 className="text-4xl md:text-5xl font-bold mb-4">{t('contact.title')}</h1>
          <p className="text-xl opacity-95 max-w-3xl mx-auto">
            {t('contact.subtitle')}
          </p>
        </div>
      </section>

      {/* Contact Section */}
      <section className="py-16">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 max-w-6xl mx-auto">
            {/* Contact Form */}
            <div>
              <h2 className="text-3xl font-bold mb-6">{t('contact.form.title')}</h2>
              <p className="text-muted-foreground mb-8">
                {t('contact.form.description')}
              </p>
              
              <form onSubmit={handleSubmit} className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <Label htmlFor="name">{t('contact.form.name')} *</Label>
                    <Input 
                      id="name" 
                      required 
                      placeholder="John Doe" 
                      value={formData.name}
                      onChange={handleChange}
                    />
                  </div>
                  <div>
                    <Label htmlFor="company">{t('contact.form.company')} *</Label>
                    <Input 
                      id="company" 
                      required 
                      placeholder="Your Company"
                      value={formData.company}
                      onChange={handleChange}
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <Label htmlFor="email">{t('contact.form.email')} *</Label>
                    <Input 
                      id="email" 
                      type="email" 
                      required 
                      placeholder="john@company.com"
                      value={formData.email}
                      onChange={handleChange}
                    />
                  </div>
                  <div>
                    <Label htmlFor="phone">{t('contact.form.phone')}</Label>
                    <Input 
                      id="phone" 
                      type="tel" 
                      placeholder="+1 234 567 8900"
                      value={formData.phone}
                      onChange={handleChange}
                    />
                  </div>
                </div>

                <div>
                  <Label htmlFor="country">{t('contact.form.country')} *</Label>
                  <Input 
                    id="country" 
                    required 
                    placeholder="Your Country"
                    value={formData.country}
                    onChange={handleChange}
                  />
                </div>

                <div>
                  <Label htmlFor="message">{t('contact.form.message')} *</Label>
                  <Textarea 
                    id="message" 
                    required 
                    rows={6}
                    placeholder={t('contact.form.messagePlaceholder')}
                    className="resize-none"
                    value={formData.message}
                    onChange={handleChange}
                  />
                </div>

                <Button type="submit" size="lg" className="w-full" disabled={isSubmitting}>
                  {isSubmitting ? t('common.loading') : t('contact.form.submit')}
                </Button>
              </form>
            </div>

            {/* Contact Information */}
            <div>
              <h2 className="text-3xl font-bold mb-6">{t('contact.info.title')}</h2>
              
              <div className="space-y-6 mb-8">
                <div className="flex items-start gap-4">
                  <div className="w-12 h-12 bg-primary/10 rounded-full flex items-center justify-center flex-shrink-0">
                    <MapPin className="w-6 h-6 text-primary" />
                  </div>
                  <div>
                    <h3 className="font-semibold text-lg mb-1">{t('contact.info.location.title')}</h3>
                    <p className="text-muted-foreground">
                      Algeria<br />
                      North Africa
                    </p>
                  </div>
                </div>

                <div className="flex items-start gap-4">
                  <div className="w-12 h-12 bg-primary/10 rounded-full flex items-center justify-center flex-shrink-0">
                    <Mail className="w-6 h-6 text-primary" />
                  </div>
                  <div>
                    <h3 className="font-semibold text-lg mb-1">{t('contact.info.email.title')}</h3>
                    <a href="mailto:export@1000coupole.com" className="text-primary hover:underline">
                      export@1000coupole.com
                    </a>
                  </div>
                </div>

                <div className="flex items-start gap-4">
                  <div className="w-12 h-12 bg-primary/10 rounded-full flex items-center justify-center flex-shrink-0">
                    <Phone className="w-6 h-6 text-primary" />
                  </div>
                  <div>
                    <h3 className="font-semibold text-lg mb-1">{t('contact.info.phone.title')}</h3>
                    <p className="text-muted-foreground">
                      +213 XXX XXX XXX<br />
                      <span className="text-sm">{t('contact.info.phone.hours')}</span>
                    </p>
                  </div>
                </div>
              </div>

              <div className="bg-muted/50 p-6 rounded-lg">
                <h3 className="font-semibold text-lg mb-3">{t('contact.info.businessHours.title')}</h3>
                <div className="space-y-2 text-sm">
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">{t('contact.info.businessHours.weekdays')}</span>
                    <span className="font-medium">{t('contact.info.businessHours.weekdaysTime')}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">{t('contact.info.businessHours.saturday')}</span>
                    <span className="font-medium">{t('contact.info.businessHours.saturdayTime')}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">{t('contact.info.businessHours.sunday')}</span>
                    <span className="font-medium">{t('contact.info.businessHours.sundayTime')}</span>
                  </div>
                </div>
                <p className="text-xs text-muted-foreground mt-4">
                  {t('contact.info.businessHours.timezone')}
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default Contact;
