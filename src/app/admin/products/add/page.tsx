'use client'

import { useState, useEffect } from "react"
import { useRouter } from "next/navigation"
import Link from "next/link"
import { ArrowLeft, Plus, Trash2, Upload } from "lucide-react"

export const dynamic = 'force-dynamic'

export default function AddProductPage() {
  const router = useRouter()
  const [loading, setLoading] = useState(false)
  const [certifications, setCertifications] = useState<any[]>([])
  
  const [formData, setFormData] = useState({
    title_en: '',
    title_fr: '',
    title_ar: '',
    category_en: '',
    category_fr: '',
    category_ar: '',
    description_en: '',
    description_fr: '',
    description_ar: '',
    slug: '',
    featured: false,
    active: true,
  })

  const [specifications, setSpecifications] = useState<any[]>([
    { label_en: '', label_fr: '', label_ar: '', value_en: '', value_fr: '', value_ar: '' }
  ])

  const [packaging, setPackaging] = useState<any[]>([
    { label_en: '', label_fr: '', label_ar: '', value_en: '', value_fr: '', value_ar: '' }
  ])

  const [selectedCertifications, setSelectedCertifications] = useState<number[]>([])
  const [images, setImages] = useState<File[]>([])
  const [primaryImageIndex, setPrimaryImageIndex] = useState(0)

  useEffect(() => {
    const token = localStorage.getItem('adminToken')
    if (!token) {
      router.push('/admin/login')
      return
    }
    fetchCertifications()
  }, [])

  const fetchCertifications = async () => {
    try {
      const token = localStorage.getItem('adminToken')
      const response = await fetch('/api/admin/certifications', {
        headers: { 'Authorization': `Bearer ${token}` }
      })
      if (response.ok) {
        const data = await response.json()
        setCertifications(data)
      }
    } catch (error) {
      console.error('Error fetching certifications:', error)
    }
  }

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value, type } = e.target
    setFormData(prev => ({
      ...prev,
      [name]: type === 'checkbox' ? (e.target as HTMLInputElement).checked : value
    }))
  }

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      setImages(Array.from(e.target.files))
    }
  }

  const addSpecification = () => {
    setSpecifications([...specifications, { label_en: '', label_fr: '', label_ar: '', value_en: '', value_fr: '', value_ar: '' }])
  }

  const removeSpecification = (index: number) => {
    setSpecifications(specifications.filter((_, i) => i !== index))
  }

  const updateSpecification = (index: number, field: string, value: string) => {
    const updated = [...specifications]
    updated[index] = { ...updated[index], [field]: value }
    setSpecifications(updated)
  }

  const addPackaging = () => {
    setPackaging([...packaging, { label_en: '', label_fr: '', label_ar: '', value_en: '', value_fr: '', value_ar: '' }])
  }

  const removePackaging = (index: number) => {
    setPackaging(packaging.filter((_, i) => i !== index))
  }

  const updatePackaging = (index: number, field: string, value: string) => {
    const updated = [...packaging]
    updated[index] = { ...updated[index], [field]: value }
    setPackaging(updated)
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)

    try {
      const token = localStorage.getItem('adminToken')
      
      // Create FormData for file upload
      const data = new FormData()
      
      // Add product data
      Object.keys(formData).forEach(key => {
        data.append(key, (formData as any)[key].toString())
      })
      
      // Add specifications
      data.append('specifications', JSON.stringify(specifications.filter(s => s.label_en)))
      
      // Add packaging
      data.append('packaging', JSON.stringify(packaging.filter(p => p.label_en)))
      
      // Add certifications
      data.append('certifications', JSON.stringify(selectedCertifications))
      
      // Add images
      images.forEach((image, index) => {
        data.append('images', image)
        if (index === primaryImageIndex) {
          data.append('primaryImageIndex', index.toString())
        }
      })

      const response = await fetch('/api/admin/products', {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${token}`
        },
        body: data
      })

      if (response.ok) {
        router.push('/admin/dashboard')
      } else {
        const error = await response.json()
        alert(error.message || 'Failed to create product')
      }
    } catch (error) {
      console.error('Error creating product:', error)
      alert('Failed to create product')
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <header className="bg-white shadow">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <div className="flex items-center gap-4">
            <Link href="/admin/dashboard" className="text-gray-600 hover:text-gray-900">
              <ArrowLeft className="w-6 h-6" />
            </Link>
            <h1 className="text-2xl font-bold text-gray-900">Add New Product</h1>
          </div>
        </div>
      </header>

      <main className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <form onSubmit={handleSubmit} className="space-y-8">
          {/* Basic Information */}
          <div className="bg-white rounded-lg shadow p-6">
            <h2 className="text-xl font-semibold mb-4">Basic Information</h2>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium mb-2">Slug (URL)</label>
                <input
                  type="text"
                  name="slug"
                  required
                  value={formData.slug}
                  onChange={handleInputChange}
                  className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-primary"
                  placeholder="premium-dates"
                />
              </div>
              
              <div className="flex items-center gap-4">
                <label className="flex items-center gap-2">
                  <input
                    type="checkbox"
                    name="featured"
                    checked={formData.featured}
                    onChange={handleInputChange}
                    className="w-4 h-4"
                  />
                  <span className="text-sm font-medium">Featured</span>
                </label>
                <label className="flex items-center gap-2">
                  <input
                    type="checkbox"
                    name="active"
                    checked={formData.active}
                    onChange={handleInputChange}
                    className="w-4 h-4"
                  />
                  <span className="text-sm font-medium">Active</span>
                </label>
              </div>
            </div>
          </div>

          {/* Multilingual Content */}
          <div className="bg-white rounded-lg shadow p-6">
            <h2 className="text-xl font-semibold mb-4">Product Details (3 Languages)</h2>
            
            <div className="space-y-6">
              {/* English */}
              <div className="border-l-4 border-blue-500 pl-4">
                <h3 className="font-semibold mb-3 text-blue-700">🇬🇧 English</h3>
                <div className="space-y-3">
                  <input
                    type="text"
                    name="title_en"
                    required
                    value={formData.title_en}
                    onChange={handleInputChange}
                    className="w-full px-4 py-2 border rounded-lg"
                    placeholder="Product Title (English)"
                  />
                  <input
                    type="text"
                    name="category_en"
                    required
                    value={formData.category_en}
                    onChange={handleInputChange}
                    className="w-full px-4 py-2 border rounded-lg"
                    placeholder="Category (English)"
                  />
                  <textarea
                    name="description_en"
                    required
                    value={formData.description_en}
                    onChange={handleInputChange}
                    rows={3}
                    className="w-full px-4 py-2 border rounded-lg"
                    placeholder="Description (English)"
                  />
                </div>
              </div>

              {/* French */}
              <div className="border-l-4 border-red-500 pl-4">
                <h3 className="font-semibold mb-3 text-red-700">🇫🇷 Français</h3>
                <div className="space-y-3">
                  <input
                    type="text"
                    name="title_fr"
                    value={formData.title_fr}
                    onChange={handleInputChange}
                    className="w-full px-4 py-2 border rounded-lg"
                    placeholder="Titre du Produit (Français)"
                  />
                  <input
                    type="text"
                    name="category_fr"
                    value={formData.category_fr}
                    onChange={handleInputChange}
                    className="w-full px-4 py-2 border rounded-lg"
                    placeholder="Catégorie (Français)"
                  />
                  <textarea
                    name="description_fr"
                    value={formData.description_fr}
                    onChange={handleInputChange}
                    rows={3}
                    className="w-full px-4 py-2 border rounded-lg"
                    placeholder="Description (Français)"
                  />
                </div>
              </div>

              {/* Arabic */}
              <div className="border-l-4 border-green-500 pl-4">
                <h3 className="font-semibold mb-3 text-green-700">🇩🇿 العربية</h3>
                <div className="space-y-3" dir="rtl">
                  <input
                    type="text"
                    name="title_ar"
                    value={formData.title_ar}
                    onChange={handleInputChange}
                    className="w-full px-4 py-2 border rounded-lg text-right"
                    placeholder="عنوان المنتج (العربية)"
                  />
                  <input
                    type="text"
                    name="category_ar"
                    value={formData.category_ar}
                    onChange={handleInputChange}
                    className="w-full px-4 py-2 border rounded-lg text-right"
                    placeholder="الفئة (العربية)"
                  />
                  <textarea
                    name="description_ar"
                    value={formData.description_ar}
                    onChange={handleInputChange}
                    rows={3}
                    className="w-full px-4 py-2 border rounded-lg text-right"
                    placeholder="الوصف (العربية)"
                  />
                </div>
              </div>
            </div>
          </div>

          {/* Images */}
          <div className="bg-white rounded-lg shadow p-6">
            <h2 className="text-xl font-semibold mb-4">Product Images</h2>
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium mb-2">Upload Images</label>
                <input
                  type="file"
                  multiple
                  accept="image/*"
                  onChange={handleImageChange}
                  className="w-full px-4 py-2 border rounded-lg"
                />
                <p className="text-sm text-gray-500 mt-1">Select multiple images. First image will be primary.</p>
              </div>
              {images.length > 0 && (
                <div className="grid grid-cols-4 gap-4">
                  {images.map((image, index) => (
                    <div key={index} className="relative">
                      <img
                        src={URL.createObjectURL(image)}
                        alt={`Preview ${index}`}
                        className="w-full h-32 object-cover rounded"
                      />
                      {index === 0 && (
                        <span className="absolute top-2 left-2 bg-primary text-white text-xs px-2 py-1 rounded">
                          Primary
                        </span>
                      )}
                    </div>
                  ))}
                </div>
              )}
            </div>
          </div>

          {/* Specifications */}
          <div className="bg-white rounded-lg shadow p-6">
            <div className="flex justify-between items-center mb-4">
              <h2 className="text-xl font-semibold">Specifications</h2>
              <button
                type="button"
                onClick={addSpecification}
                className="flex items-center gap-2 px-4 py-2 bg-primary text-white rounded-lg hover:bg-primary/90"
              >
                <Plus className="w-4 h-4" />
                Add Specification
              </button>
            </div>
            <div className="space-y-4">
              {specifications.map((spec, index) => (
                <div key={index} className="border p-4 rounded-lg">
                  <div className="flex justify-between items-start mb-3">
                    <span className="text-sm font-medium">Specification {index + 1}</span>
                    {specifications.length > 1 && (
                      <button
                        type="button"
                        onClick={() => removeSpecification(index)}
                        className="text-red-600 hover:text-red-800"
                      >
                        <Trash2 className="w-4 h-4" />
                      </button>
                    )}
                  </div>
                  <div className="grid grid-cols-2 gap-3">
                    <input
                      type="text"
                      value={spec.label_en}
                      onChange={(e) => updateSpecification(index, 'label_en', e.target.value)}
                      className="px-3 py-2 border rounded text-sm"
                      placeholder="Label (EN)"
                    />
                    <input
                      type="text"
                      value={spec.value_en}
                      onChange={(e) => updateSpecification(index, 'value_en', e.target.value)}
                      className="px-3 py-2 border rounded text-sm"
                      placeholder="Value (EN)"
                    />
                    <input
                      type="text"
                      value={spec.label_fr}
                      onChange={(e) => updateSpecification(index, 'label_fr', e.target.value)}
                      className="px-3 py-2 border rounded text-sm"
                      placeholder="Label (FR)"
                    />
                    <input
                      type="text"
                      value={spec.value_fr}
                      onChange={(e) => updateSpecification(index, 'value_fr', e.target.value)}
                      className="px-3 py-2 border rounded text-sm"
                      placeholder="Value (FR)"
                    />
                    <input
                      type="text"
                      value={spec.label_ar}
                      onChange={(e) => updateSpecification(index, 'label_ar', e.target.value)}
                      className="px-3 py-2 border rounded text-sm text-right"
                      placeholder="(AR) التسمية"
                      dir="rtl"
                    />
                    <input
                      type="text"
                      value={spec.value_ar}
                      onChange={(e) => updateSpecification(index, 'value_ar', e.target.value)}
                      className="px-3 py-2 border rounded text-sm text-right"
                      placeholder="(AR) القيمة"
                      dir="rtl"
                    />
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Packaging */}
          <div className="bg-white rounded-lg shadow p-6">
            <div className="flex justify-between items-center mb-4">
              <h2 className="text-xl font-semibold">Packaging Details</h2>
              <button
                type="button"
                onClick={addPackaging}
                className="flex items-center gap-2 px-4 py-2 bg-primary text-white rounded-lg hover:bg-primary/90"
              >
                <Plus className="w-4 h-4" />
                Add Packaging
              </button>
            </div>
            <div className="space-y-4">
              {packaging.map((pack, index) => (
                <div key={index} className="border p-4 rounded-lg">
                  <div className="flex justify-between items-start mb-3">
                    <span className="text-sm font-medium">Packaging {index + 1}</span>
                    {packaging.length > 1 && (
                      <button
                        type="button"
                        onClick={() => removePackaging(index)}
                        className="text-red-600 hover:text-red-800"
                      >
                        <Trash2 className="w-4 h-4" />
                      </button>
                    )}
                  </div>
                  <div className="grid grid-cols-2 gap-3">
                    <input
                      type="text"
                      value={pack.label_en}
                      onChange={(e) => updatePackaging(index, 'label_en', e.target.value)}
                      className="px-3 py-2 border rounded text-sm"
                      placeholder="Label (EN)"
                    />
                    <input
                      type="text"
                      value={pack.value_en}
                      onChange={(e) => updatePackaging(index, 'value_en', e.target.value)}
                      className="px-3 py-2 border rounded text-sm"
                      placeholder="Value (EN)"
                    />
                    <input
                      type="text"
                      value={pack.label_fr}
                      onChange={(e) => updatePackaging(index, 'label_fr', e.target.value)}
                      className="px-3 py-2 border rounded text-sm"
                      placeholder="Label (FR)"
                    />
                    <input
                      type="text"
                      value={pack.value_fr}
                      onChange={(e) => updatePackaging(index, 'value_fr', e.target.value)}
                      className="px-3 py-2 border rounded text-sm"
                      placeholder="Value (FR)"
                    />
                    <input
                      type="text"
                      value={pack.label_ar}
                      onChange={(e) => updatePackaging(index, 'label_ar', e.target.value)}
                      className="px-3 py-2 border rounded text-sm text-right"
                      placeholder="(AR) التسمية"
                      dir="rtl"
                    />
                    <input
                      type="text"
                      value={pack.value_ar}
                      onChange={(e) => updatePackaging(index, 'value_ar', e.target.value)}
                      className="px-3 py-2 border rounded text-sm text-right"
                      placeholder="(AR) القيمة"
                      dir="rtl"
                    />
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Certifications */}
          {certifications.length > 0 && (
            <div className="bg-white rounded-lg shadow p-6">
              <h2 className="text-xl font-semibold mb-4">Certifications</h2>
              <div className="space-y-2">
                {certifications.map((cert) => (
                  <label key={cert.id} className="flex items-center gap-2">
                    <input
                      type="checkbox"
                      checked={selectedCertifications.includes(cert.id)}
                      onChange={(e) => {
                        if (e.target.checked) {
                          setSelectedCertifications([...selectedCertifications, cert.id])
                        } else {
                          setSelectedCertifications(selectedCertifications.filter(id => id !== cert.id))
                        }
                      }}
                      className="w-4 h-4"
                    />
                    <span>{cert.name}</span>
                  </label>
                ))}
              </div>
            </div>
          )}

          {/* Submit Button */}
          <div className="flex justify-end gap-4">
            <Link
              href="/admin/dashboard"
              className="px-6 py-3 border border-gray-300 rounded-lg hover:bg-gray-50"
            >
              Cancel
            </Link>
            <button
              type="submit"
              disabled={loading}
              className="px-6 py-3 bg-primary text-white rounded-lg hover:bg-primary/90 disabled:opacity-50"
            >
              {loading ? 'Creating...' : 'Create Product'}
            </button>
          </div>
        </form>
      </main>
    </div>
  )
}
