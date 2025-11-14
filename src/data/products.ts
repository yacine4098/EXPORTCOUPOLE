import datesImage from "@/assets/products/dates-pitted.jpeg";
import oliveOilImage from "@/assets/products/olive-oil.jpeg";
import spicesImage from "@/assets/products/spices-collection.jpeg";
import cayenneImage from "@/assets/products/cayenne-pepper.jpeg";
import tomatoesImage from "@/assets/products/tomatoes.jpeg";
import peanutsImage from "@/assets/products/peanuts.jpeg";

export interface ProductSpecification {
  label: string;
  value: string;
}

export interface Product {
  id: string;
  title: string;
  category: string;
  description: string;
  image: string;
  specifications: ProductSpecification[];
  packaging: ProductSpecification[];
  certifications: string[];
}

export const products: Product[] = [
  {
    id: "deglet-nour-datesqq",
    title: "Premium Algerian Deglet Nour Dates",
    category: "Dates",
    description: "Our Deglet Nour dates are harvested from the finest palm groves in Algeria. Known as the 'Queen of Dates,' Deglet Nour dates are prized for their delicate honey-like sweetness, soft texture, and golden amber color. Carefully processed and packaged to preserve freshness and quality during international shipping.",
    image: datesImage,
    specifications: [
      { label: "SKU", value: "DT-DN-P01" },
      { label: "Variety", value: "Deglet Nour" },
      { label: "Grade", value: "Premium Grade A" },
      { label: "Origin", value: "Algeria" },
      { label: "Cultivation", value: "Conventional" },
      { label: "Processing", value: "Pitted & Sorted" },
      { label: "Moisture Content", value: "18-22%" },
      { label: "Availability", value: "Year-round" }
    ],
    packaging: [
      { label: "Consumer Packaging", value: "500g, 1kg, 5kg boxes" },
      { label: "Bulk Packaging", value: "10kg cartons" },
      { label: "20ft Container", value: "~12,000 kg" },
      { label: "40ft Container", value: "~24,000 kg" }
    ],
    certifications: ["ISO 22000", "HACCP", "Organic (Available on request)"]
  },
  {
    id: "extra-virgin-olive-oil",
    title: "Extra Virgin Olive Oil",
    category: "Olive Oil",
    description: "Premium quality extra virgin olive oil from carefully selected Algerian olive groves. Cold-pressed within 24 hours of harvest to preserve maximum flavor, aroma, and nutritional benefits. Rich in antioxidants and polyphenols, our olive oil delivers an authentic Mediterranean taste with fruity notes and a peppery finish.",
    image: oliveOilImage,
    specifications: [
      { label: "SKU", value: "OO-EV-P01" },
      { label: "Type", value: "Extra Virgin Olive Oil" },
      { label: "Grade", value: "Premium" },
      { label: "Origin", value: "Algeria" },
      { label: "Cultivation", value: "Traditional Grove" },
      { label: "Extraction", value: "First Cold Press" },
      { label: "Acidity Level", value: "≤ 0.8%" },
      { label: "Peroxide Value", value: "≤ 20 meq O2/kg" },
      { label: "Availability", value: "Year-round" }
    ],
    packaging: [
      { label: "Consumer Packaging", value: "250ml, 500ml, 1L, 5L glass/PET bottles" },
      { label: "Bulk Packaging", value: "25L tins, 200L drums" },
      { label: "20ft Container", value: "~18,000 L" },
      { label: "40ft Container", value: "~36,000 L" }
    ],
    certifications: ["ISO 22000", "HACCP", "IOC Certified", "Organic (Available on request)"]
  },
  {
    id: "herbs-spices-collection",
    title: "Herbs & Spices Collection",
    category: "Herbs & Spices",
    description: "A comprehensive range of authentic Algerian herbs and spices including rosemary, thyme, fennel, cumin, coriander, and more. Sourced from the best growing regions of Algeria, our herbs and spices are carefully dried and processed to retain their natural essential oils, vibrant color, and intense flavor profile. Perfect for culinary and food manufacturing applications.",
    image: spicesImage,
    specifications: [
      { label: "SKU", value: "HS-COL-P01" },
      { label: "Product Range", value: "Mixed Herbs & Spices" },
      { label: "Grade", value: "Food Grade" },
      { label: "Origin", value: "Algeria" },
      { label: "Cultivation", value: "Natural & Organic" },
      { label: "Processing", value: "Cleaned, Dried & Sorted" },
      { label: "Moisture Content", value: "8-12%" },
      { label: "Availability", value: "Year-round" }
    ],
    packaging: [
      { label: "Consumer Packaging", value: "50g, 100g, 250g, 500g bags/jars" },
      { label: "Bulk Packaging", value: "5kg, 10kg, 25kg cartons/bags" },
      { label: "20ft Container", value: "~8,000 kg" },
      { label: "40ft Container", value: "~16,000 kg" }
    ],
    certifications: ["ISO 22000", "HACCP", "USDA Organic (Selected items)", "EU Organic (Selected items)"]
  },
  {
    id: "cayenne-pepper",
    title: "Premium Cayenne Pepper",
    category: "Herbs & Spices",
    description: "High-quality ground cayenne pepper with intense heat and vibrant red color. Sourced from premium Algerian peppers, our cayenne is carefully dried and finely ground to deliver consistent heat levels (30,000-50,000 SHU). Perfect for adding spice and depth to any culinary creation, from hot sauces to seasoning blends.",
    image: cayenneImage,
    specifications: [
      { label: "SKU", value: "SP-CAY-P01" },
      { label: "Spice Type", value: "Cayenne Pepper (Ground)" },
      { label: "Grade", value: "Premium" },
      { label: "Origin", value: "Algeria" },
      { label: "Heat Level (SHU)", value: "30,000 - 50,000" },
      { label: "Processing", value: "Dried & Ground" },
      { label: "Mesh Size", value: "40-60 mesh" },
      { label: "Moisture Content", value: "≤ 10%" },
      { label: "Availability", value: "Year-round" }
    ],
    packaging: [
      { label: "Consumer Packaging", value: "50g, 100g, 250g, 500g bags/jars" },
      { label: "Bulk Packaging", value: "10kg, 25kg cartons" },
      { label: "20ft Container", value: "~10,000 kg" },
      { label: "40ft Container", value: "~20,000 kg" }
    ],
    certifications: ["ISO 22000", "HACCP", "ASTA Certified"]
  },
  {
    id: "fresh-tomatoes",
    title: "Cherry Tomatoes",
    category: "Fresh Produce",
    description: "Fresh, vine-ripened cherry tomatoes with exceptional sweetness and flavor. Grown in Algeria's fertile agricultural regions under optimal sun exposure, our cherry tomatoes are hand-selected for their uniform size, bright color, and firm texture. Carefully packaged for export to maintain freshness during international shipping.",
    image: tomatoesImage,
    specifications: [
      { label: "SKU", value: "FP-TOM-P01" },
      { label: "Variety", value: "Cherry Tomatoes" },
      { label: "Grade", value: "Class I" },
      { label: "Origin", value: "Algeria" },
      { label: "Cultivation", value: "Greenhouse & Open Field" },
      { label: "Size", value: "20-35mm diameter" },
      { label: "Brix Level", value: "6-8°" },
      { label: "Availability", value: "October - June" }
    ],
    packaging: [
      { label: "Consumer Packaging", value: "250g, 500g punnets" },
      { label: "Bulk Packaging", value: "5kg cartons" },
      { label: "20ft Container (Reefer)", value: "~18,000 kg" },
      { label: "40ft Container (Reefer)", value: "~24,000 kg" }
    ],
    certifications: ["GlobalGAP", "HACCP", "ISO 22000"]
  },
  {
    id: "peanuts",
    title: "Premium Peanuts",
    category: "Nuts",
    description: "High-quality roasted and raw peanuts, carefully selected for international markets. Our peanuts are sourced from the finest growing regions in Algeria, ensuring superior taste, texture, and nutritional value. Available in various forms including in-shell, shelled, blanched, and roasted, suitable for snacking, confectionery, and food manufacturing.",
    image: peanutsImage,
    specifications: [
      { label: "SKU", value: "NT-PNT-P01" },
      { label: "Nut Type", value: "Peanuts (Groundnuts)" },
      { label: "Grade", value: "Premium Select" },
      { label: "Origin", value: "Algeria" },
      { label: "Processing", value: "Raw / Roasted / Blanched" },
      { label: "Size Count", value: "40/50, 50/60, 60/70 per oz" },
      { label: "Moisture Content", value: "≤ 7%" },
      { label: "Aflatoxin Level", value: "≤ 4 ppb (EU standards)" },
      { label: "Availability", value: "Year-round" }
    ],
    packaging: [
      { label: "Consumer Packaging", value: "250g, 500g, 1kg bags/tins" },
      { label: "Bulk Packaging", value: "25kg, 50kg vacuum bags" },
      { label: "20ft Container", value: "~18,000 kg" },
      { label: "40ft Container", value: "~25,000 kg" }
    ],
    certifications: ["ISO 22000", "HACCP", "BRC Food Safety", "Non-GMO"]
  }
];

export const getProductById = (id: string): Product | undefined => {
  return products.find(product => product.id === id);
};
