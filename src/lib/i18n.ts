import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';
import LanguageDetector from 'i18next-browser-languagedetector';

// Translation resources
const resources = {
  en: {
    translation: {
      nav: {
        home: 'Home',
        about: 'About Us',
        products: 'Products',
        quality: 'Quality',
        contact: 'Contact'
      },
      home: {
        hero: {
          title: '1000 Coupole Export',
          subtitle: 'The Authentic Taste of Algeria, Delivered Globally',
          description: 'Premium Algerian dates, olive oil, herbs & spices for international markets',
          exploreProducts: 'Explore Products',
          requestQuote: 'Request Quote'
        },
        products: {
          title: 'Our Premium Products',
          subtitle: 'Discover our selection of high-quality Algerian products, ready for international export',
          viewAll: 'View All Products'
        },
        whyChoose: {
          title: 'Why Choose 1000 Coupole Export?',
          subtitle: 'Your trusted partner for premium Algerian food exports',
          quality: {
            title: 'Premium Quality',
            description: 'Only the finest Algerian products, carefully selected and processed to meet international standards'
          },
          shipping: {
            title: 'Global Shipping',
            description: 'Reliable logistics network ensuring your products arrive fresh and on time, anywhere in the world'
          },
          certified: {
            title: 'Certified Products',
            description: 'All our products meet international quality and safety certifications including ISO and HACCP'
          },
          pricing: {
            title: 'Competitive Pricing',
            description: 'Direct from source pricing with flexible terms for bulk orders and long-term partnerships'
          }
        },
        cta: {
          title: 'Ready to Import Premium Algerian Products?',
          description: 'Contact us today for a detailed quotation and discover how we can supply your business with the finest Algerian products',
          button: 'Contact Us for a Quote'
        }
      },
      products: {
        title: 'Our Products',
        subtitle: 'Discover our complete range of premium Algerian food products for export',
        all: 'All Products',
        noProducts: 'No products found in this category.',
        viewDetails: 'View Details',
        requestQuote: 'Request a Quote for This Product'
      },
      productDetail: {
        backToProducts: 'Back to Products',
        specifications: 'Product Specifications',
        packaging: 'Packaging & Export Details',
        certifications: 'Certifications',
        features: {
          packaging: 'Quality Packaging',
          shipping: 'Global Shipping',
          certified: 'Certified Quality'
        }
      },
      contact: {
        title: 'Contact Us',
        subtitle: 'Get in touch with our export team for inquiries, quotations, and partnership opportunities',
        form: {
          title: 'Send Us a Message',
          description: 'Fill out the form below and our export team will get back to you within 24 hours with a detailed response.',
          name: 'Full Name',
          company: 'Company Name',
          email: 'Email Address',
          phone: 'Phone Number',
          country: 'Country',
          message: 'Your Message',
          messagePlaceholder: `Please include:
- Products you're interested in
- Estimated quantities
- Preferred delivery terms
- Any specific requirements`,
          submit: 'Send Message',
          success: 'Message Sent!',
          successDescription: 'Thank you for your inquiry. We will respond within 24 hours.'
        },
        info: {
          title: 'Contact Information',
          location: {
            title: 'Our Location',
            address: `Algeria
North Africa`
          },
          email: {
            title: 'Email Us'
          },
          phone: {
            title: 'Call Us',
            hours: 'Monday - Friday: 9:00 AM - 6:00 PM (GMT+1)'
          },
          businessHours: {
            title: 'Business Hours',
            weekdays: 'Monday - Friday:',
            weekdaysTime: '9:00 AM - 6:00 PM',
            saturday: 'Saturday:',
            saturdayTime: '9:00 AM - 2:00 PM',
            sunday: 'Sunday:',
            sundayTime: 'Closed',
            timezone: '* All times are in GMT+1 (Algeria Time)'
          }
        }
      },
      about: {
        title: 'About 1000 Coupole Export',
        subtitle: 'Your trusted partner for premium Algerian food products since our establishment',
        story: {
          title: 'Our Story',
          p1: '1000 Coupole Export was founded with a clear mission: to share the rich agricultural heritage of Algeria with the world. We are deeply rooted in the fertile lands and centuries-old traditions of Algerian farming, where quality and authenticity are not just values—they\'re a way of life.',
          p2: 'From the sun-drenched date palms of the Sahara to the ancient olive groves of the Mediterranean coast, we carefully source and select only the finest products. Our commitment to excellence has made us a trusted name in international food exports.'
        },
        mission: {
          title: 'Our Mission',
          description: 'To deliver the authentic taste of Algeria to international markets while maintaining the highest standards of quality, sustainability, and customer service. We believe in building long-term partnerships based on trust, transparency, and mutual success.',
          sustainability: {
            title: 'Sustainability',
            description: 'We work closely with local farmers to promote sustainable agricultural practices that protect our environment for future generations.'
          },
          quality: {
            title: 'Quality First',
            description: 'Every product undergoes rigorous quality control to ensure it meets international standards and exceeds customer expectations.'
          },
          globalReach: {
            title: 'Global Reach',
            description: 'Our established logistics network ensures timely delivery to partners across Europe, Asia, Africa, and beyond.'
          },
          partnership: {
            title: 'Partnership',
            description: 'We believe in building lasting relationships with our clients based on trust, reliability, and mutual growth.'
          }
        },
        process: {
          title: 'Our Process',
          step1: {
            title: 'Careful Sourcing',
            description: 'We partner directly with trusted Algerian farmers and producers who share our commitment to quality and sustainability.'
          },
          step2: {
            title: 'Quality Control',
            description: 'Every batch is thoroughly inspected to ensure it meets our strict quality standards and international certifications.'
          },
          step3: {
            title: 'Professional Packaging',
            description: 'Products are carefully packaged in food-grade materials designed for safe transport and extended shelf life.'
          },
          step4: {
            title: 'Global Export',
            description: 'Our experienced logistics team ensures timely delivery to your destination with full documentation and support.'
          }
        }
      },
      quality: {
        title: 'Quality & Certifications',
        subtitle: 'Our commitment to excellence is reflected in every product we export',
        commitment: {
          title: 'Our Quality Commitment',
          description: 'At 1000 Coupole Export, quality is not just a promise—it\'s our guarantee. We implement rigorous quality control measures at every stage of production, from sourcing to packaging, ensuring that only the finest Algerian products reach international markets. Our dedication to excellence has earned us the trust of importers worldwide.'
        },
        certifications: {
          title: 'Our Certifications'
        },
        process: {
          title: 'Quality Control Process'
        },
        standards: {
          title: 'Our Quality Standards'
        }
      },
      common: {
        loading: 'Loading...',
        error: 'Error',
        required: 'Required'
      }
    }
  },
  fr: {
    translation: {
      nav: {
        home: 'Accueil',
        about: 'À Propos',
        products: 'Produits',
        quality: 'Qualité',
        contact: 'Contact'
      },
      home: {
        hero: {
          title: '1000 Coupole Export',
          subtitle: "Le Goût Authentique de l'Algérie, Livré dans le Monde Entier",
          description: "Dattes algériennes premium, huile d'olive, herbes et épices pour les marchés internationaux",
          exploreProducts: 'Explorer les Produits',
          requestQuote: 'Demander un Devis'
        },
        products: {
          title: 'Nos Produits Premium',
          subtitle: "Découvrez notre sélection de produits algériens de haute qualité, prêts pour l'exportation internationale",
          viewAll: 'Voir Tous les Produits'
        },
        whyChoose: {
          title: 'Pourquoi Choisir 1000 Coupole Export?',
          subtitle: 'Votre partenaire de confiance pour les exportations alimentaires algériennes premium',
          quality: {
            title: 'Qualité Premium',
            description: 'Seulement les meilleurs produits algériens, soigneusement sélectionnés et traités pour répondre aux normes internationales'
          },
          shipping: {
            title: 'Livraison Mondiale',
            description: "Réseau logistique fiable garantissant l'arrivée de vos produits frais et à temps, partout dans le monde"
          },
          certified: {
            title: 'Produits Certifiés',
            description: 'Tous nos produits répondent aux certifications internationales de qualité et de sécurité, y compris ISO et HACCP'
          },
          pricing: {
            title: 'Prix Compétitifs',
            description: 'Prix direct du producteur avec conditions flexibles pour les commandes en gros et partenariats à long terme'
          }
        },
        cta: {
          title: 'Prêt à Importer des Produits Algériens Premium?',
          description: "Contactez-nous dès aujourd'hui pour un devis détaillé et découvrez comment nous pouvons approvisionner votre entreprise avec les meilleurs produits algériens",
          button: 'Contactez-nous pour un Devis'
        }
      },
      products: {
        title: 'Nos Produits',
        subtitle: "Découvrez notre gamme complète de produits alimentaires algériens premium pour l'export",
        all: 'Tous les Produits',
        noProducts: 'Aucun produit trouvé dans cette catégorie.',
        viewDetails: 'Voir les Détails',
        requestQuote: 'Demander un Devis pour ce Produit'
      },
      productDetail: {
        backToProducts: 'Retour aux Produits',
        specifications: 'Spécifications du Produit',
        packaging: "Détails d'Emballage et d'Export",
        certifications: 'Certifications',
        features: {
          packaging: 'Emballage de Qualité',
          shipping: 'Livraison Mondiale',
          certified: 'Qualité Certifiée'
        }
      },
      contact: {
        title: 'Contactez-nous',
        subtitle: "Contactez notre équipe d'exportation pour des demandes, devis et opportunités de partenariat",
        form: {
          title: 'Envoyez-nous un Message',
          description: "Remplissez le formulaire ci-dessous et notre équipe d'exportation vous répondra dans les 24 heures avec une réponse détaillée.",
          name: 'Nom Complet',
          company: "Nom de l'Entreprise",
          email: 'Adresse Email',
          phone: 'Numéro de Téléphone',
          country: 'Pays',
          message: 'Votre Message',
          messagePlaceholder: `Veuillez inclure:
- Les produits qui vous intéressent
- Les quantités estimées
- Les conditions de livraison préférées
- Toute exigence spécifique`,
          submit: 'Envoyer le Message',
          success: 'Message Envoyé!',
          successDescription: 'Merci pour votre demande. Nous répondrons dans les 24 heures.'
        },
        info: {
          title: 'Informations de Contact',
          location: {
            title: 'Notre Localisation',
            address: `Algérie
Afrique du Nord`
          },
          email: {
            title: 'Envoyez-nous un Email'
          },
          phone: {
            title: 'Appelez-nous',
            hours: 'Lundi - Vendredi: 9h00 - 18h00 (GMT+1)'
          },
          businessHours: {
            title: "Heures d'Ouverture",
            weekdays: 'Lundi - Vendredi:',
            weekdaysTime: '9h00 - 18h00',
            saturday: 'Samedi:',
            saturdayTime: '9h00 - 14h00',
            sunday: 'Dimanche:',
            sundayTime: 'Fermé',
            timezone: '* Tous les horaires sont en GMT+1 (Heure Algérie)'
          }
        }
      },
      about: {
        title: 'À Propos de 1000 Coupole Export',
        subtitle: 'Votre partenaire de confiance pour les produits alimentaires algériens de qualité supérieure depuis notre création',
        story: {
          title: 'Notre Histoire',
          p1: '1000 Coupole Export a été fondée avec une mission claire : partager le riche patrimoine agricole de l\'Algérie avec le monde. Nous sommes profondément enracinés dans les terres fertiles et les traditions séculaires de l\'agriculture algérienne, où la qualité et l\'authenticité ne sont pas seulement des valeurs, mais un mode de vie.',
          p2: 'Des palmeraies ensoleillées du Sahara aux oliveraies anciennes de la côte méditerranéenne, nous sélectionnons soigneusement les meilleurs produits. Notre engagement envers l\'excellence a fait de nous un nom de confiance dans les exportations alimentaires internationales.'
        },
        mission: {
          title: 'Notre Mission',
          description: 'Livrer le goût authentique de l\'Algérie aux marchés internationaux tout en maintenant les plus hauts standards de qualité, durabilité et service client. Nous croyons en la construction de partenariats à long terme basés sur la confiance, la transparence et le succès mutuel.',
          sustainability: {
            title: 'Durabilité',
            description: 'Nous travaillons en étroite collaboration avec les agriculteurs locaux pour promouvoir des pratiques agricoles durables qui protègent notre environnement pour les générations futures.'
          },
          quality: {
            title: 'Qualité Avant Tout',
            description: 'Chaque produit subit un contrôle qualité rigoureux pour s\'assurer qu\'il répond aux normes internationales et dépasse les attentes des clients.'
          },
          globalReach: {
            title: 'Portée Mondiale',
            description: 'Notre réseau logistique établi assure une livraison dans les délais vers nos partenaires en Europe, Asie, Afrique et au-delà.'
          },
          partnership: {
            title: 'Partenariat',
            description: 'Nous croyons en la construction de relations durables avec nos clients basées sur la confiance, la fiabilité et la croissance mutuelle.'
          }
        },
        process: {
          title: 'Notre Processus',
          step1: {
            title: 'Approvisionnement Soigneux',
            description: 'Nous nous associons directement avec des agriculteurs et producteurs algériens de confiance qui partagent notre engagement envers la qualité et la durabilité.'
          },
          step2: {
            title: 'Contrôle Qualité',
            description: 'Chaque lot est minutieusement inspecté pour s\'assurer qu\'il respecte nos normes de qualité strictes et les certifications internationales.'
          },
          step3: {
            title: 'Emballage Professionnel',
            description: 'Les produits sont soigneusement emballés dans des matériaux de qualité alimentaire conçus pour un transport sûr et une longue durée de conservation.'
          },
          step4: {
            title: 'Export Mondial',
            description: 'Notre équipe logistique expérimentée assure une livraison dans les délais vers votre destination avec une documentation et un support complets.'
          }
        }
      },
      quality: {
        title: 'Qualité et Certifications',
        subtitle: 'Notre engagement envers l\'excellence se reflète dans chaque produit que nous exportons',
        commitment: {
          title: 'Notre Engagement Qualité',
          description: 'Chez 1000 Coupole Export, la qualité n\'est pas seulement une promesse, c\'est notre garantie. Nous mettons en œuvre des mesures de contrôle qualité rigoureuses à chaque étape de la production, de l\'approvisionnement à l\'emballage, garantissant que seuls les meilleurs produits algériens atteignent les marchés internationaux. Notre dévouement à l\'excellence nous a valu la confiance des importateurs du monde entier.'
        },
        certifications: {
          title: 'Nos Certifications'
        },
        process: {
          title: 'Processus de Contrôle Qualité'
        },
        standards: {
          title: 'Nos Normes de Qualité'
        }
      },
      common: {
        loading: 'Chargement...',
        error: 'Erreur',
        required: 'Requis'
      }
    }
  },
  ar: {
    translation: {
      nav: {
        home: 'الرئيسية',
        about: 'من نحن',
        products: 'المنتجات',
        quality: 'الجودة',
        contact: 'اتصل بنا'
      },
      home: {
        hero: {
          title: '1000 Coupole Export',
          subtitle: 'الطعم الأصيل للجزائر، يُسلّم عالمياً',
          description: 'تمور جزائرية فاخرة، زيت الزيتون، أعشاب وتوابل للأسواق العالمية',
          exploreProducts: 'استكشف المنتجات',
          requestQuote: 'اطلب عرض سعر'
        },
        products: {
          title: 'منتجاتنا المتميزة',
          subtitle: 'اكتشف مجموعتنا من المنتجات الجزائرية عالية الجودة، الجاهزة للتصدير الدولي',
          viewAll: 'عرض جميع المنتجات'
        },
        whyChoose: {
          title: 'لماذا تختار 1000 Coupole Export؟',
          subtitle: 'شريكك الموثوق لصادرات الأغذية الجزائرية المتميزة',
          quality: {
            title: 'جودة ممتازة',
            description: 'فقط أفضل المنتجات الجزائرية، مختارة ومعالجة بعناية لتلبية المعايير الدولية'
          },
          shipping: {
            title: 'شحن عالمي',
            description: 'شبكة لوجستية موثوقة تضمن وصول منتجاتك طازجة وفي الوقت المحدد، في أي مكان في العالم'
          },
          certified: {
            title: 'منتجات معتمدة',
            description: 'جميع منتجاتنا تلبي شهادات الجودة والسلامة الدولية بما في ذلك ISO و HACCP'
          },
          pricing: {
            title: 'أسعار تنافسية',
            description: 'أسعار مباشرة من المصدر مع شروط مرنة للطلبات بالجملة والشراكات طويلة الأجل'
          }
        },
        cta: {
          title: 'مستعد لاستيراد المنتجات الجزائرية المتميزة؟',
          description: 'اتصل بنا اليوم للحصول على عرض سعر مفصل واكتشف كيف يمكننا تزويد عملك بأفضل المنتجات الجزائرية',
          button: 'اتصل بنا للحصول على عرض سعر'
        }
      },
      products: {
        title: 'منتجاتنا',
        subtitle: 'اكتشف مجموعتنا الكاملة من المنتجات الغذائية الجزائرية المتميزة للتصدير',
        all: 'جميع المنتجات',
        noProducts: 'لم يتم العثور على منتجات في هذه الفئة.',
        viewDetails: 'عرض التفاصيل',
        requestQuote: 'اطلب عرض سعر لهذا المنتج'
      },
      productDetail: {
        backToProducts: 'العودة إلى المنتجات',
        specifications: 'مواصفات المنتج',
        packaging: 'تفاصيل التعبئة والتصدير',
        certifications: 'الشهادات',
        features: {
          packaging: 'تعبئة عالية الجودة',
          shipping: 'شحن عالمي',
          certified: 'جودة معتمدة'
        }
      },
      contact: {
        title: 'اتصل بنا',
        subtitle: 'تواصل مع فريق التصدير لدينا للاستفسارات والعروض وفرص الشراكة',
        form: {
          title: 'أرسل لنا رسالة',
          description: 'املأ النموذج أدناه وسيقوم فريق التصدير لدينا بالرد عليك في غضون 24 ساعة برد مفصل.',
          name: 'الاسم الكامل',
          company: 'اسم الشركة',
          email: 'عنوان البريد الإلكتروني',
          phone: 'رقم الهاتف',
          country: 'البلد',
          message: 'رسالتك',
          messagePlaceholder: `يرجى تضمين:
- المنتجات التي تهمك
- الكميات المقدرة
- شروط التسليم المفضلة
- أي متطلبات محددة`,
          submit: 'إرسال الرسالة',
          success: 'تم إرسال الرسالة!',
          successDescription: 'شكراً لاستفسارك. سنرد في غضون 24 ساعة.'
        },
        info: {
          title: 'معلومات الاتصال',
          location: {
            title: 'موقعنا',
            address: `الجزائر
شمال أفريقيا`
          },
          email: {
            title: 'راسلنا عبر البريد الإلكتروني'
          },
          phone: {
            title: 'اتصل بنا',
            hours: 'الاثنين - الجمعة: 9:00 صباحاً - 6:00 مساءً (GMT+1)'
          },
          businessHours: {
            title: 'ساعات العمل',
            weekdays: 'الاثنين - الجمعة:',
            weekdaysTime: '9:00 صباحاً - 6:00 مساءً',
            saturday: 'السبت:',
            saturdayTime: '9:00 صباحاً - 2:00 مساءً',
            sunday: 'الأحد:',
            sundayTime: 'مغلق',
            timezone: '* جميع الأوقات بتوقيت GMT+1 (توقيت الجزائر)'
          }
        }
      },
      about: {
        title: 'عن 1000 Coupole Export',
        subtitle: 'شريكك الموثوق للمنتجات الغذائية الجزائرية المتميزة منذ تأسيسنا',
        story: {
          title: 'قصتنا',
          p1: 'تأسست 1000 Coupole Export بمهمة واضحة: مشاركة التراث الزراعي الغني للجزائر مع العالم. نحن متجذرون بعمق في الأراضي الخصبة والتقاليد القديمة للزراعة الجزائرية، حيث الجودة والأصالة ليست مجرد قيم، بل هي أسلوب حياة.',
          p2: 'من أشجار النخيل المشمسة في الصحراء إلى بساتين الزيتون القديمة على ساحل البحر الأبيض المتوسط، نختار بعناية أفضل المنتجات فقط. التزامنا بالتميز جعلنا اسماً موثوقاً في صادرات الأغذية الدولية.'
        },
        mission: {
          title: 'مهمتنا',
          description: 'تقديم الطعم الأصيل للجزائر إلى الأسواق العالمية مع الحفاظ على أعلى معايير الجودة والاستدامة وخدمة العملاء. نحن نؤمن ببناء شراكات طويلة الأمد تقوم على الثقة والشفافية والنجاح المتبادل.',
          sustainability: {
            title: 'الاستدامة',
            description: 'نعمل بشكل وثيق مع المزارعين المحليين لتعزيز ممارسات زراعية مستدامة تحمي بيئتنا للأجيال القادمة.'
          },
          quality: {
            title: 'الجودة أولاً',
            description: 'كل منتج يخضع لرقابة جودة صارمة لضمان أنه يلبي المعايير الدولية ويتجاوز توقعات العملاء.'
          },
          globalReach: {
            title: 'انتشار عالمي',
            description: 'شبكتنا اللوجستية الراسخة تضمن التسليم في الوقت المناسب للشركاء في جميع أنحاء أوروبا وآسيا وأفريقيا وما بعدها.'
          },
          partnership: {
            title: 'الشراكة',
            description: 'نحن نؤمن ببناء علاقات دائمة مع عملائنا بناءً على الثقة والموثوقية والنمو المتبادل.'
          }
        },
        process: {
          title: 'عمليتنا',
          step1: {
            title: 'التوريد الدقيق',
            description: 'نتعاون مباشرة مع المزارعين والمنتجين الجزائريين الموثوقين الذين يشاركوننا التزامنا بالجودة والاستدامة.'
          },
          step2: {
            title: 'مراقبة الجودة',
            description: 'يتم فحص كل دفعة بدقة للتأكد من أنها تلبي معايير الجودة الصارمة والشهادات الدولية.'
          },
          step3: {
            title: 'التعبئة الاحترافية',
            description: 'يتم تعبئة المنتجات بعناية في مواد ذات جودة غذائية مصممة للنقل الآمن والعمر الافتراضي الطويل.'
          },
          step4: {
            title: 'التصدير العالمي',
            description: 'يضمن فريقنا اللوجستي المتمرس التسليم في الوقت المحدد إلى وجهتك مع التوثيق والدعم الكاملين.'
          }
        }
      },
      quality: {
        title: 'الجودة والشهادات',
        subtitle: 'التزامنا بالتميز ينعكس في كل منتج نقوم بتصديره',
        commitment: {
          title: 'التزامنا بالجودة',
          description: 'في 1000 Coupole Export، الجودة ليست مجرد وعد - إنها ضماننا. ننفذ تدابير رقابة جودة صارمة في كل مرحلة من مراحل الإنتاج، من التوريد إلى التعبئة، لضمان وصول أفضل المنتجات الجزائرية فقط إلى الأسواق العالمية. لقد أكسبنا تفانينا في التميز ثقة المستوردين في جميع أنحاء العالم.'
        },
        certifications: {
          title: 'شهاداتنا'
        },
        process: {
          title: 'عملية مراقبة الجودة'
        },
        standards: {
          title: 'معايير الجودة لدينا'
        }
      },
      common: {
        loading: 'جاري التحميل...',
        error: 'خطأ',
        required: 'مطلوب'
      }
    }
  }
};

i18n
  .use(LanguageDetector)
  .use(initReactI18next)
  .init({
    resources,
    fallbackLng: 'en',
    lng: 'en',
    interpolation: {
      escapeValue: false
    },
    detection: {
      order: ['localStorage', 'navigator'],
      caches: ['localStorage']
    }
  });

export default i18n;
