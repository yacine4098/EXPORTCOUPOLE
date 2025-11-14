import bcrypt from 'bcryptjs';
import pool from './connection.js';
import dotenv from 'dotenv';

dotenv.config();

export async function seedDatabase() {
  const connection = await pool.getConnection();
  
  try {
    await connection.beginTransaction();

    // Create admin user
    const adminEmail = process.env.ADMIN_EMAIL || 'admin@1000coupole.com';
    const adminPassword = process.env.ADMIN_PASSWORD || 'admin123';
    const hashedPassword = await bcrypt.hash(adminPassword, 10);

    await connection.query(
      'INSERT INTO users (email, password_hash, role) VALUES (?, ?, ?) ON DUPLICATE KEY UPDATE password_hash = ?',
      [adminEmail, hashedPassword, 'admin', hashedPassword]
    );

    // Seed certifications
    const certifications = [
      { name: 'ISO 22000', description_en: 'Food Safety Management System' },
      { name: 'HACCP', description_en: 'Hazard Analysis Critical Control Point' },
      { name: 'Organic Certified', description_en: 'Certified Organic Products' },
      { name: 'IOC Certified', description_en: 'International Olive Council Certification' },
      { name: 'GlobalGAP', description_en: 'Good Agricultural Practices' },
      { name: 'BRC Food Safety', description_en: 'British Retail Consortium Food Safety' },
      { name: 'USDA Organic', description_en: 'USDA Organic Certification' },
      { name: 'EU Organic', description_en: 'European Union Organic Certification' },
      { name: 'ASTA Certified', description_en: 'American Spice Trade Association' },
      { name: 'Non-GMO', description_en: 'Non-Genetically Modified Organisms' }
    ];

    for (const cert of certifications) {
      await connection.query(
        'INSERT INTO certifications (name, description_en) VALUES (?, ?) ON DUPLICATE KEY UPDATE description_en = ?',
        [cert.name, cert.description_en, cert.description_en]
      );
    }

    // Seed page content
    const pageContents = [
      {
        page_name: 'about',
        section_key: 'company_story',
        content_en: 'Founded in Algeria, 1000 Coupole Export has been a trusted partner in premium food exports for years. We specialize in bringing the authentic taste of Algeria to international markets.',
        content_fr: 'Fondée en Algérie, 1000 Coupole Export est un partenaire de confiance dans l\'exportation de produits alimentaires premium depuis des années.',
        content_ar: 'تأسست شركة 1000 كوبول للتصدير في الجزائر، وهي شريك موثوق في تصدير المنتجات الغذائية الفاخرة منذ سنوات.'
      },
      {
        page_name: 'about',
        section_key: 'mission',
        content_en: 'Our mission is to share the finest Algerian products with the world, maintaining the highest standards of quality and authenticity.',
        content_fr: 'Notre mission est de partager les meilleurs produits algériens avec le monde, en maintenant les plus hauts standards de qualité et d\'authenticité.',
        content_ar: 'مهمتنا هي مشاركة أفضل المنتجات الجزائرية مع العالم، مع الحفاظ على أعلى معايير الجودة والأصالة.'
      },
      {
        page_name: 'quality',
        section_key: 'process',
        content_en: 'From harvest to packaging, every step of our process is carefully monitored to ensure premium quality. We follow international standards and maintain strict quality control at every stage.',
        content_fr: 'De la récolte à l\'emballage, chaque étape de notre processus est soigneusement surveillée pour garantir une qualité premium.',
        content_ar: 'من الحصاد إلى التعبئة، تتم مراقبة كل خطوة من عمليتنا بعناية لضمان الجودة الممتازة.'
      }
    ];

    for (const content of pageContents) {
      await connection.query(
        'INSERT INTO page_content (page_name, section_key, content_en, content_fr, content_ar) VALUES (?, ?, ?, ?, ?) ON DUPLICATE KEY UPDATE content_en = ?, content_fr = ?, content_ar = ?',
        [content.page_name, content.section_key, content.content_en, content.content_fr, content.content_ar, content.content_en, content.content_fr, content.content_ar]
      );
    }

    await connection.commit();
    console.log('✅ Database seeded successfully!');
    console.log(`📧 Admin email: ${adminEmail}`);
    console.log(`🔑 Admin password: ${adminPassword}`);
  } catch (error) {
    await connection.rollback();
    console.error('❌ Seeding failed:', error);
    throw error;
  } finally {
    connection.release();
  }
}

// Run seeding
seedDatabase()
  .then(() => {
    console.log('\n✨ Seeding complete!');
    process.exit(0);
  })
  .catch((error) => {
    console.error('Failed:', error);
    process.exit(1);
  });
