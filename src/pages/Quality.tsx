import { Award, CheckCircle, FileCheck, ShieldCheck } from "lucide-react";
import Navigation from "@/components/Navigation";
import Footer from "@/components/Footer";
import { useTranslation } from "react-i18next";

const Quality = () => {
  const { t } = useTranslation();
  const certifications = [
    {
      name: "ISO 22000",
      description: "Food Safety Management System certification ensuring the highest standards in food production and handling."
    },
    {
      name: "HACCP",
      description: "Hazard Analysis and Critical Control Points certification for systematic preventive approach to food safety."
    },
    {
      name: "Organic Certification",
      description: "Available for select products meeting organic farming and processing standards."
    },
    {
      name: "Export Standards",
      description: "Compliance with international export regulations and destination country requirements."
    }
  ];

  const qualitySteps = [
    {
      title: "Source Selection",
      description: "We partner only with trusted farmers and producers who meet our strict quality criteria."
    },
    {
      title: "Inspection",
      description: "Every batch undergoes thorough inspection for quality, freshness, and compliance."
    },
    {
      title: "Laboratory Testing",
      description: "Regular laboratory analysis ensures products meet safety and quality standards."
    },
    {
      title: "Traceability",
      description: "Complete documentation and traceability from farm to final destination."
    }
  ];

  return (
    <div className="min-h-screen flex flex-col">
      <Navigation />
      
      {/* Hero */}
      <section className="bg-gradient-to-r from-secondary to-primary text-white py-20">
        <div className="container mx-auto px-4 text-center">
          <h1 className="text-4xl md:text-5xl font-bold mb-4">{t('quality.title')}</h1>
          <p className="text-xl opacity-95 max-w-3xl mx-auto">
            {t('quality.subtitle')}
          </p>
        </div>
      </section>

      {/* Quality Commitment */}
      <section className="py-16">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto text-center">
            <div className="w-20 h-20 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-6">
              <ShieldCheck className="w-10 h-10 text-primary" />
            </div>
            <h2 className="text-3xl font-bold mb-6">{t('quality.commitment.title')}</h2>
            <p className="text-lg text-muted-foreground mb-8">
              {t('quality.commitment.description')}
            </p>
          </div>
        </div>
      </section>

      {/* Certifications */}
      <section className="py-16 bg-muted/30">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold mb-12 text-center">{t('quality.certifications.title')}</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-4xl mx-auto">
            {certifications.map((cert, index) => (
              <div key={index} className="bg-background p-6 rounded-lg shadow-[var(--shadow-elegant)] flex gap-4">
                <div className="flex-shrink-0">
                  <div className="w-12 h-12 bg-primary/10 rounded-full flex items-center justify-center">
                    <Award className="w-6 h-6 text-primary" />
                  </div>
                </div>
                <div>
                  <h3 className="text-xl font-semibold mb-2">{cert.name}</h3>
                  <p className="text-muted-foreground">{cert.description}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Quality Control Process */}
      <section className="py-16">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold mb-12 text-center">{t('quality.process.title')}</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {qualitySteps.map((step, index) => (
              <div key={index} className="text-center space-y-4">
                <div className="relative">
                  <div className="w-16 h-16 bg-primary text-primary-foreground rounded-full flex items-center justify-center mx-auto text-2xl font-bold">
                    {index + 1}
                  </div>
                  {index < qualitySteps.length - 1 && (
                    <div className="hidden lg:block absolute top-1/2 left-full w-full h-0.5 bg-primary/20 -translate-y-1/2" />
                  )}
                </div>
                <h3 className="text-xl font-semibold">{step.title}</h3>
                <p className="text-muted-foreground">{step.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Standards */}
      <section className="py-16 bg-muted/30">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto">
            <h2 className="text-3xl font-bold mb-8 text-center">{t('quality.standards.title')}</h2>
            <div className="space-y-4">
              {[
                "Compliance with international food safety regulations",
                "Regular third-party audits and inspections",
                "Strict temperature and humidity control during storage",
                "Professional packaging to maintain freshness",
                "Complete batch traceability and documentation",
                "Rapid response to quality inquiries and concerns",
                "Continuous improvement of quality management systems"
              ].map((standard, index) => (
                <div key={index} className="flex items-start gap-3 bg-background p-4 rounded-lg">
                  <CheckCircle className="w-6 h-6 text-primary flex-shrink-0 mt-0.5" />
                  <span className="text-lg">{standard}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default Quality;
