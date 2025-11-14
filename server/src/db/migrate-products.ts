import pool, { getConnection } from './connection.js';
import dotenv from 'dotenv';

dotenv.config();

// Product data from frontend (to be migrated)
const productsData = [
  {
    slug: 'deglet-nour-dates',
    title_en: 'Premium Algerian Deglet Nour Dates',
    title_fr: 'Dattes Deglet Nour Premium d\'Algérie',
    title_ar: 'تمور دقلة نور جزائرية فاخرة',
    category_en: 'Dates',
    category_fr: 'Dattes',
    category_ar: 'تمور',
    description_en: 'Our Deglet Nour dates are harvested from the finest palm groves in Algeria. Known as the "Queen of Dates," Deglet Nour dates are prized for their delicate honey-like sweetness, soft texture, and golden amber color.',
    description_fr: 'Nos dattes Deglet Nour sont récoltées dans les meilleures palmeraies d\'Algérie. Connues comme la "Reine des Dattes", elles sont appréciées pour leur douceur délicate semblable au miel.',
    description_ar: 'يتم حصاد تمور دقلة نور من أفضل بساتين النخيل في الجزائر. تُعرف بأنها "ملكة التمور"، وتتميز بحلاوتها الرقيقة الشبيهة بالعسل.',
    featured: true,
    active: true,
    specifications: [
      { label_en: 'SKU', label_fr: 'Référence', label_ar: 'رقم المنتج', value_en: 'DT-DN-P01', value_fr: 'DT-DN-P01', value_ar: 'DT-DN-P01' },
      { label_en: 'Variety', label_fr: 'Variété', label_ar: 'الصنف', value_en: 'Deglet Nour', value_fr: 'Deglet Nour', value_ar: 'دقلة نور' },
      { label_en: 'Grade', label_fr: 'Catégorie', label_ar: 'الدرجة', value_en: 'Premium Grade A', value_fr: 'Catégorie A Premium', value_ar: 'درجة ممتازة A' },
      { label_en: 'Origin', label_fr: 'Origine', label_ar: 'المنشأ', value_en: 'Algeria', value_fr: 'Algérie', value_ar: 'الجزائر' },
      { label_en: 'Processing', label_fr: 'Traitement', label_ar: 'المعالجة', value_en: 'Pitted & Sorted', value_fr: 'Dénoyautées et Triées', value_ar: 'منزوعة النوى ومصنفة' },
      { label_en: 'Availability', label_fr: 'Disponibilité', label_ar: 'التوفر', value_en: 'Year-round', value_fr: 'Toute l\'année', value_ar: 'على مدار السنة' }
    ],
    packaging: [
      { label_en: 'Consumer Packaging', label_fr: 'Emballage Consommateur', label_ar: 'التعبئة للمستهلك', value_en: '500g, 1kg, 5kg boxes', value_fr: 'Boîtes de 500g, 1kg, 5kg', value_ar: 'علب 500 جم، 1 كجم، 5 كجم' },
      { label_en: 'Bulk Packaging', label_fr: 'Emballage en Vrac', label_ar: 'التعبئة بالجملة', value_en: '10kg cartons', value_fr: 'Cartons de 10kg', value_ar: 'كرتون 10 كجم' },
      { label_en: '20ft Container', label_fr: 'Conteneur 20 pieds', label_ar: 'حاوية 20 قدم', value_en: '~12,000 kg', value_fr: '~12 000 kg', value_ar: '~12,000 كجم' },
      { label_en: '40ft Container', label_fr: 'Conteneur 40 pieds', label_ar: 'حاوية 40 قدم', value_en: '~24,000 kg', value_fr: '~24 000 kg', value_ar: '~24,000 كجم' }
    ],
    certifications: ['ISO 22000', 'HACCP', 'Organic Certified']
  },
  {
    slug: 'extra-virgin-olive-oil',
    title_en: 'Extra Virgin Olive Oil',
    title_fr: 'Huile d\'Olive Extra Vierge',
    title_ar: 'زيت الزيتون البكر الممتاز',
    category_en: 'Olive Oil',
    category_fr: 'Huile d\'Olive',
    category_ar: 'زيت الزيتون',
    description_en: 'Premium quality extra virgin olive oil from carefully selected Algerian olive groves. Cold-pressed within 24 hours of harvest to preserve maximum flavor, aroma, and nutritional benefits.',
    description_fr: 'Huile d\'olive extra vierge de qualité supérieure provenant de bosquets d\'oliviers algériens soigneusement sélectionnés. Pressée à froid dans les 24 heures suivant la récolte.',
    description_ar: 'زيت زيتون بكر ممتاز عالي الجودة من بساتين الزيتون الجزائرية المختارة بعناية. معصور على البارد خلال 24 ساعة من الحصاد.',
    featured: true,
    active: true,
    specifications: [
      { label_en: 'SKU', label_fr: 'Référence', label_ar: 'رقم المنتج', value_en: 'OO-EV-P01', value_fr: 'OO-EV-P01', value_ar: 'OO-EV-P01' },
      { label_en: 'Type', label_fr: 'Type', label_ar: 'النوع', value_en: 'Extra Virgin Olive Oil', value_fr: 'Huile d\'Olive Extra Vierge', value_ar: 'زيت زيتون بكر ممتاز' },
      { label_en: 'Origin', label_fr: 'Origine', label_ar: 'المنشأ', value_en: 'Algeria', value_fr: 'Algérie', value_ar: 'الجزائر' },
      { label_en: 'Extraction', label_fr: 'Extraction', label_ar: 'الاستخلاص', value_en: 'First Cold Press', value_fr: 'Première Pression à Froid', value_ar: 'عصر بارد أول' },
      { label_en: 'Acidity Level', label_fr: 'Niveau d\'Acidité', label_ar: 'مستوى الحموضة', value_en: '≤ 0.8%', value_fr: '≤ 0,8%', value_ar: '≤ 0.8%' }
    ],
    packaging: [
      { label_en: 'Consumer Packaging', label_fr: 'Emballage Consommateur', label_ar: 'التعبئة للمستهلك', value_en: '250ml, 500ml, 1L, 5L bottles', value_fr: 'Bouteilles de 250ml, 500ml, 1L, 5L', value_ar: 'زجاجات 250مل، 500مل، 1ل، 5ل' },
      { label_en: 'Bulk Packaging', label_fr: 'Emballage en Vrac', label_ar: 'التعبئة بالجملة', value_en: '25L tins, 200L drums', value_fr: 'Bidons de 25L, Fûts de 200L', value_ar: 'صفائح 25 لتر، براميل 200 لتر' }
    ],
    certifications: ['ISO 22000', 'HACCP', 'IOC Certified']
  },
  {
    slug: 'herbs-spices-collection',
    title_en: 'Herbs & Spices Collection',
    title_fr: 'Collection d\'Herbes et Épices',
    title_ar: 'مجموعة الأعشاب والتوابل',
    category_en: 'Herbs & Spices',
    category_fr: 'Herbes et Épices',
    category_ar: 'أعشاب وتوابل',
    description_en: 'A comprehensive range of authentic Algerian herbs and spices including rosemary, thyme, fennel, cumin, coriander, and more. Carefully dried and processed to retain natural essential oils.',
    description_fr: 'Une gamme complète d\'herbes et d\'épices algériennes authentiques, y compris le romarin, le thym, le fenouil, le cumin, la coriandre et plus encore.',
    description_ar: 'مجموعة شاملة من الأعشاب والتوابل الجزائرية الأصيلة بما في ذلك إكليل الجبل والزعتر والشمر والكمون والكزبرة والمزيد.',
    featured: true,
    active: true,
    specifications: [
      { label_en: 'SKU', label_fr: 'Référence', label_ar: 'رقم المنتج', value_en: 'HS-COL-P01', value_fr: 'HS-COL-P01', value_ar: 'HS-COL-P01' },
      { label_en: 'Origin', label_fr: 'Origine', label_ar: 'المنشأ', value_en: 'Algeria', value_fr: 'Algérie', value_ar: 'الجزائر' },
      { label_en: 'Processing', label_fr: 'Traitement', label_ar: 'المعالجة', value_en: 'Cleaned, Dried & Sorted', value_fr: 'Nettoyées, Séchées et Triées', value_ar: 'منظفة ومجففة ومصنفة' }
    ],
    packaging: [
      { label_en: 'Consumer Packaging', label_fr: 'Emballage Consommateur', label_ar: 'التعبئة للمستهلك', value_en: '50g, 100g, 250g, 500g bags', value_fr: 'Sachets de 50g, 100g, 250g, 500g', value_ar: 'أكياس 50 جم، 100 جم، 250 جم، 500 جم' },
      { label_en: 'Bulk Packaging', label_fr: 'Emballage en Vrac', label_ar: 'التعبئة بالجملة', value_en: '5kg, 10kg, 25kg bags', value_fr: 'Sacs de 5kg, 10kg, 25kg', value_ar: 'أكياس 5 كجم، 10 كجم، 25 كجم' }
    ],
    certifications: ['ISO 22000', 'HACCP', 'USDA Organic', 'EU Organic']
  }
];

async function migrateProducts() {
  const connection = await getConnection();
  
  try {
    console.log('🚀 Starting product migration...\n');
    await connection.beginTransaction();

    // Get certification IDs
    const certMap = new Map();
    const certs: any = await connection.query('SELECT id, name FROM certifications');
    certs[0].forEach((cert: any) => {
      certMap.set(cert.name, cert.id);
    });

    for (const productData of productsData) {
      console.log(`📦 Migrating: ${productData.title_en}`);

      // Insert product
      const [result]: any = await connection.query(
        `INSERT INTO products (slug, title_en, title_fr, title_ar, category_en, category_fr, category_ar,
          description_en, description_fr, description_ar, featured, active)
         VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)`,
        [productData.slug, productData.title_en, productData.title_fr, productData.title_ar,
         productData.category_en, productData.category_fr, productData.category_ar,
         productData.description_en, productData.description_fr, productData.description_ar,
         productData.featured, productData.active]
      );

      const productId = result.insertId;

      // Insert specifications
      for (let i = 0; i < productData.specifications.length; i++) {
        const spec = productData.specifications[i];
        await connection.query(
          `INSERT INTO product_specifications 
           (product_id, label_en, label_fr, label_ar, value_en, value_fr, value_ar, spec_order)
           VALUES (?, ?, ?, ?, ?, ?, ?, ?)`,
          [productId, spec.label_en, spec.label_fr, spec.label_ar,
           spec.value_en, spec.value_fr, spec.value_ar, i]
        );
      }

      // Insert packaging
      for (let i = 0; i < productData.packaging.length; i++) {
        const pack = productData.packaging[i];
        await connection.query(
          `INSERT INTO product_packaging 
           (product_id, label_en, label_fr, label_ar, value_en, value_fr, value_ar, pack_order)
           VALUES (?, ?, ?, ?, ?, ?, ?, ?)`,
          [productId, pack.label_en, pack.label_fr, pack.label_ar,
           pack.value_en, pack.value_fr, pack.value_ar, i]
        );
      }

      // Link certifications
      for (const certName of productData.certifications) {
        const certId = certMap.get(certName);
        if (certId) {
          await connection.query(
            'INSERT INTO product_certifications (product_id, certification_id) VALUES (?, ?)',
            [productId, certId]
          );
        }
      }

      console.log(`   ✅ Migrated successfully (ID: ${productId})\n`);
    }

    await connection.commit();
    console.log('✨ All products migrated successfully!');
    console.log('\n📝 Next steps:');
    console.log('   1. Update product images using admin panel');
    console.log('   2. Add remaining products from your data');
    console.log('   3. Test the API endpoints\n');
  } catch (error) {
    await connection.rollback();
    console.error('❌ Migration failed:', error);
    throw error;
  } finally {
    connection.release();
    await pool.end();
  }
}

// Run migration
migrateProducts().catch(console.error);
