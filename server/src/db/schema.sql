-- Database Schema for 1000 Coupole Export

-- Users Table (for admin authentication)
CREATE TABLE IF NOT EXISTS users (
  id INT PRIMARY KEY AUTO_INCREMENT,
  email VARCHAR(255) UNIQUE NOT NULL,
  password_hash VARCHAR(255) NOT NULL,
  role ENUM('admin', 'manager') DEFAULT 'admin',
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
);

-- Products Table
CREATE TABLE IF NOT EXISTS products (
  id INT PRIMARY KEY AUTO_INCREMENT,
  slug VARCHAR(255) UNIQUE NOT NULL,
  title_en VARCHAR(255) NOT NULL,
  title_fr VARCHAR(255),
  title_ar VARCHAR(255),
  category_en VARCHAR(100) NOT NULL,
  category_fr VARCHAR(100),
  category_ar VARCHAR(100),
  description_en TEXT NOT NULL,
  description_fr TEXT,
  description_ar TEXT,
  featured BOOLEAN DEFAULT FALSE,
  active BOOLEAN DEFAULT TRUE,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  INDEX idx_category (category_en),
  INDEX idx_featured (featured),
  INDEX idx_active (active)
);

-- Product Images Table
CREATE TABLE IF NOT EXISTS product_images (
  id INT PRIMARY KEY AUTO_INCREMENT,
  product_id INT NOT NULL,
  image_url VARCHAR(500) NOT NULL,
  is_primary BOOLEAN DEFAULT FALSE,
  display_order INT DEFAULT 0,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  FOREIGN KEY (product_id) REFERENCES products(id) ON DELETE CASCADE,
  INDEX idx_product (product_id),
  INDEX idx_primary (is_primary)
);

-- Product Specifications Table
CREATE TABLE IF NOT EXISTS product_specifications (
  id INT PRIMARY KEY AUTO_INCREMENT,
  product_id INT NOT NULL,
  label_en VARCHAR(255) NOT NULL,
  label_fr VARCHAR(255),
  label_ar VARCHAR(255),
  value_en VARCHAR(500) NOT NULL,
  value_fr VARCHAR(500),
  value_ar VARCHAR(500),
  spec_order INT DEFAULT 0,
  FOREIGN KEY (product_id) REFERENCES products(id) ON DELETE CASCADE,
  INDEX idx_product (product_id)
);

-- Product Packaging Table
CREATE TABLE IF NOT EXISTS product_packaging (
  id INT PRIMARY KEY AUTO_INCREMENT,
  product_id INT NOT NULL,
  label_en VARCHAR(255) NOT NULL,
  label_fr VARCHAR(255),
  label_ar VARCHAR(255),
  value_en VARCHAR(500) NOT NULL,
  value_fr VARCHAR(500),
  value_ar VARCHAR(500),
  pack_order INT DEFAULT 0,
  FOREIGN KEY (product_id) REFERENCES products(id) ON DELETE CASCADE,
  INDEX idx_product (product_id)
);

-- Certifications Table
CREATE TABLE IF NOT EXISTS certifications (
  id INT PRIMARY KEY AUTO_INCREMENT,
  name VARCHAR(255) NOT NULL,
  logo_url VARCHAR(500),
  description_en TEXT,
  description_fr TEXT,
  description_ar TEXT,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Product Certifications Junction Table
CREATE TABLE IF NOT EXISTS product_certifications (
  product_id INT NOT NULL,
  certification_id INT NOT NULL,
  PRIMARY KEY (product_id, certification_id),
  FOREIGN KEY (product_id) REFERENCES products(id) ON DELETE CASCADE,
  FOREIGN KEY (certification_id) REFERENCES certifications(id) ON DELETE CASCADE
);

-- Inquiries Table
CREATE TABLE IF NOT EXISTS inquiries (
  id INT PRIMARY KEY AUTO_INCREMENT,
  name VARCHAR(255) NOT NULL,
  company VARCHAR(255) NOT NULL,
  email VARCHAR(255) NOT NULL,
  phone VARCHAR(50),
  country VARCHAR(100) NOT NULL,
  message TEXT NOT NULL,
  products_interested TEXT,
  status ENUM('new', 'in_progress', 'replied', 'closed') DEFAULT 'new',
  notes TEXT,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  INDEX idx_status (status),
  INDEX idx_created (created_at)
);

-- Page Content Table (for CMS)
CREATE TABLE IF NOT EXISTS page_content (
  id INT PRIMARY KEY AUTO_INCREMENT,
  page_name VARCHAR(100) NOT NULL,
  section_key VARCHAR(100) NOT NULL,
  content_en TEXT,
  content_fr TEXT,
  content_ar TEXT,
  content_type ENUM('text', 'html', 'json') DEFAULT 'text',
  updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  UNIQUE KEY unique_page_section (page_name, section_key)
);

-- Settings Table
CREATE TABLE IF NOT EXISTS settings (
  setting_key VARCHAR(100) PRIMARY KEY,
  setting_value TEXT,
  setting_type ENUM('string', 'number', 'boolean', 'json') DEFAULT 'string',
  updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
);
