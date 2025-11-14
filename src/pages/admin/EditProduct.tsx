import { useState, useEffect } from "react";
import { useNavigate, useParams, Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { adminProductsAPI } from "@/lib/api";
import { useToast } from "@/hooks/use-toast";
import { ArrowLeft, Loader2, Upload, X, Plus, Trash2 } from "lucide-react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

interface ProductImage {
  id: number;
  image_url: string;
  is_primary: boolean;
}

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

const EditProduct = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { toast } = useToast();
  const [loading, setLoading] = useState(true);
  const [submitting, setSubmitting] = useState(false);
  const [uploadingImage, setUploadingImage] = useState(false);
  const [currentImages, setCurrentImages] = useState<ProductImage[]>([]);
  const [specifications, setSpecifications] = useState<Specification[]>([]);
  const [packaging, setPackaging] = useState<Packaging[]>([]);

  const [formData, setFormData] = useState({
    title_en: '',
    title_fr: '',
    title_ar: '',
    slug: '',
    category_en: '',
    category_fr: '',
    category_ar: '',
    description_en: '',
    description_fr: '',
    description_ar: '',
    featured: false,
    active: true
  });

  useEffect(() => {
    if (id) {
      fetchProduct();
    }
  }, [id]);

  const fetchProduct = async () => {
    try {
      const response = await adminProductsAPI.getById(Number(id));
      const product = response.data;
      
      setFormData({
        title_en: product.title_en || '',
        title_fr: product.title_fr || '',
        title_ar: product.title_ar || '',
        slug: product.slug || '',
        category_en: product.category_en || '',
        category_fr: product.category_fr || '',
        category_ar: product.category_ar || '',
        description_en: product.description_en || '',
        description_fr: product.description_fr || '',
        description_ar: product.description_ar || '',
        featured: product.featured || false,
        active: product.active !== false
      });

      // Set current images
      if (product.images && product.images.length > 0) {
        setCurrentImages(product.images);
      }
      
      // Set specifications
      if (product.specifications && product.specifications.length > 0) {
        setSpecifications(product.specifications);
      }
      
      // Set packaging
      if (product.packaging && product.packaging.length > 0) {
        setPackaging(product.packaging);
      }
    } catch (error: any) {
      toast({
        title: "Error",
        description: error.response?.data?.message || "Could not load product",
        variant: "destructive"
      });
      navigate('/admin/dashboard');
    } finally {
      setLoading(false);
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value, type } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: type === 'checkbox' ? (e.target as HTMLInputElement).checked : value
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitting(true);

    try {
      await adminProductsAPI.update(Number(id), {
        ...formData,
        specifications,
        packaging
      });
      toast({
        title: "Success",
        description: "Product updated successfully"
      });
      navigate('/admin/dashboard');
    } catch (error: any) {
      toast({
        title: "Error",
        description: error.response?.data?.message || "Could not update product",
        variant: "destructive"
      });
    } finally {
      setSubmitting(false);
    }
  };

  const handleImageUpload = async (file: File) => {
    setUploadingImage(true);
    const formData = new FormData();
    formData.append('image', file);
    formData.append('is_primary', currentImages.length === 0 ? 'true' : 'false');

    try {
      const response = await adminProductsAPI.uploadImage(Number(id), formData);
      toast({
        title: "Success",
        description: "Image uploaded successfully"
      });
      
      // Refresh product data to get updated images
      fetchProduct();
    } catch (error: any) {
      toast({
        title: "Upload failed",
        description: error.response?.data?.message || "Could not upload image",
        variant: "destructive"
      });
    } finally {
      setUploadingImage(false);
    }
  };

  const handleDeleteImage = async (imageId: number) => {
    if (!confirm('Are you sure you want to delete this image?')) return;

    try {
      await adminProductsAPI.deleteImage(Number(id), imageId);
      toast({
        title: "Success",
        description: "Image deleted successfully"
      });
      fetchProduct();
    } catch (error: any) {
      toast({
        title: "Error",
        description: error.response?.data?.message || "Could not delete image",
        variant: "destructive"
      });
    }
  };

  // Specification handlers
  const addSpecification = () => {
    setSpecifications([...specifications, {
      label_en: '',
      label_fr: '',
      label_ar: '',
      value_en: '',
      value_fr: '',
      value_ar: ''
    }]);
  };

  const removeSpecification = (index: number) => {
    setSpecifications(specifications.filter((_, i) => i !== index));
  };

  const updateSpecification = (index: number, field: string, value: string) => {
    const updated = [...specifications];
    updated[index] = { ...updated[index], [field]: value };
    setSpecifications(updated);
  };

  // Packaging handlers
  const addPackaging = () => {
    setPackaging([...packaging, {
      label_en: '',
      label_fr: '',
      label_ar: '',
      value_en: '',
      value_fr: '',
      value_ar: ''
    }]);
  };

  const removePackaging = (index: number) => {
    setPackaging(packaging.filter((_, i) => i !== index));
  };

  const updatePackaging = (index: number, field: string, value: string) => {
    const updated = [...packaging];
    updated[index] = { ...updated[index], [field]: value };
    setPackaging(updated);
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <Loader2 className="h-8 w-8 animate-spin text-primary" />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-muted/30">
      <div className="bg-white border-b">
        <div className="container mx-auto px-4 py-4">
          <Link to="/admin/dashboard">
            <Button variant="ghost" className="gap-2">
              <ArrowLeft className="h-4 w-4" />
              Back to Dashboard
            </Button>
          </Link>
        </div>
      </div>

      <div className="container mx-auto px-4 py-8 max-w-4xl">
        <Card>
          <CardHeader>
            <CardTitle>Edit Product</CardTitle>
            <CardDescription>Update product information and manage images</CardDescription>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleSubmit} className="space-y-6">
              {/* Product Images Section */}
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <Label className="text-lg font-semibold">Product Images</Label>
                  <div className="relative">
                    <Input
                      type="file"
                      accept="image/*"
                      onChange={(e) => {
                        const file = e.target.files?.[0];
                        if (file) handleImageUpload(file);
                      }}
                      className="hidden"
                      id="upload-new-image"
                      disabled={uploadingImage}
                    />
                    <Label htmlFor="upload-new-image" className="cursor-pointer">
                      <Button type="button" asChild disabled={uploadingImage}>
                        <span>
                          {uploadingImage ? (
                            <Loader2 className="h-4 w-4 mr-2 animate-spin" />
                          ) : (
                            <Upload className="h-4 w-4 mr-2" />
                          )}
                          Upload New Image
                        </span>
                      </Button>
                    </Label>
                  </div>
                </div>

                {currentImages.length > 0 ? (
                  <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
                    {currentImages.map((image) => (
                      <div key={image.id} className="relative group">
                        <img
                          src={`http://localhost:5000${image.image_url}`}
                          alt="Product"
                          className="w-full h-48 object-cover rounded-lg border-2 border-gray-200"
                        />
                        {image.is_primary && (
                          <span className="absolute top-2 left-2 bg-primary text-white text-xs px-2 py-1 rounded">
                            Primary
                          </span>
                        )}
                        <Button
                          type="button"
                          variant="destructive"
                          size="icon"
                          className="absolute top-2 right-2 opacity-0 group-hover:opacity-100 transition-opacity"
                          onClick={() => handleDeleteImage(image.id)}
                        >
                          <X className="h-4 w-4" />
                        </Button>
                      </div>
                    ))}
                  </div>
                ) : (
                  <div className="text-center py-12 border-2 border-dashed border-gray-300 rounded-lg">
                    <Upload className="h-12 w-12 mx-auto text-gray-400 mb-4" />
                    <p className="text-muted-foreground">No images uploaded yet</p>
                  </div>
                )}
              </div>

              <div className="border-t pt-6">
                <Tabs defaultValue="en" className="w-full">
                  <TabsList className="grid w-full grid-cols-3">
                    <TabsTrigger value="en">English</TabsTrigger>
                    <TabsTrigger value="fr">Français</TabsTrigger>
                    <TabsTrigger value="ar">العربية</TabsTrigger>
                  </TabsList>

                  <TabsContent value="en" className="space-y-4">
                    <div className="space-y-2">
                      <Label htmlFor="title_en">Title (English)</Label>
                      <Input
                        id="title_en"
                        name="title_en"
                        value={formData.title_en}
                        onChange={handleChange}
                        required
                      />
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="category_en">Category (English)</Label>
                      <Input
                        id="category_en"
                        name="category_en"
                        value={formData.category_en}
                        onChange={handleChange}
                        required
                      />
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="description_en">Description (English)</Label>
                      <Textarea
                        id="description_en"
                        name="description_en"
                        value={formData.description_en}
                        onChange={handleChange}
                        rows={4}
                        required
                      />
                    </div>
                  </TabsContent>

                  <TabsContent value="fr" className="space-y-4">
                    <div className="space-y-2">
                      <Label htmlFor="title_fr">Title (Français)</Label>
                      <Input
                        id="title_fr"
                        name="title_fr"
                        value={formData.title_fr}
                        onChange={handleChange}
                        required
                      />
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="category_fr">Category (Français)</Label>
                      <Input
                        id="category_fr"
                        name="category_fr"
                        value={formData.category_fr}
                        onChange={handleChange}
                        required
                      />
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="description_fr">Description (Français)</Label>
                      <Textarea
                        id="description_fr"
                        name="description_fr"
                        value={formData.description_fr}
                        onChange={handleChange}
                        rows={4}
                        required
                      />
                    </div>
                  </TabsContent>

                  <TabsContent value="ar" className="space-y-4" dir="rtl">
                    <div className="space-y-2">
                      <Label htmlFor="title_ar">العنوان (العربية)</Label>
                      <Input
                        id="title_ar"
                        name="title_ar"
                        value={formData.title_ar}
                        onChange={handleChange}
                        required
                      />
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="category_ar">الفئة (العربية)</Label>
                      <Input
                        id="category_ar"
                        name="category_ar"
                        value={formData.category_ar}
                        onChange={handleChange}
                        required
                      />
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="description_ar">الوصف (العربية)</Label>
                      <Textarea
                        id="description_ar"
                        name="description_ar"
                        value={formData.description_ar}
                        onChange={handleChange}
                        rows={4}
                        required
                      />
                    </div>
                  </TabsContent>
                </Tabs>
              </div>

              <div className="space-y-2">
                <Label htmlFor="slug">Slug (URL)</Label>
                <Input
                  id="slug"
                  name="slug"
                  value={formData.slug}
                  onChange={handleChange}
                  placeholder="product-url-slug"
                  required
                />
              </div>

              {/* Specifications Section */}
              <div className="border-t pt-6 space-y-4">
                <div className="flex items-center justify-between">
                  <Label className="text-lg font-semibold">Product Specifications</Label>
                  <Button type="button" variant="outline" size="sm" onClick={addSpecification}>
                    <Plus className="h-4 w-4 mr-2" />
                    Add Specification
                  </Button>
                </div>

                {specifications.map((spec, index) => (
                  <Card key={index} className="p-4">
                    <div className="flex justify-between items-start mb-4">
                      <span className="text-sm font-semibold">Specification {index + 1}</span>
                      <Button
                        type="button"
                        variant="destructive"
                        size="icon"
                        onClick={() => removeSpecification(index)}
                      >
                        <Trash2 className="h-4 w-4" />
                      </Button>
                    </div>

                    <Tabs defaultValue="en" className="w-full">
                      <TabsList className="grid w-full grid-cols-3">
                        <TabsTrigger value="en">EN</TabsTrigger>
                        <TabsTrigger value="fr">FR</TabsTrigger>
                        <TabsTrigger value="ar">AR</TabsTrigger>
                      </TabsList>

                      <TabsContent value="en" className="space-y-3">
                        <div className="grid grid-cols-2 gap-3">
                          <div>
                            <Label className="text-xs">Label (EN)</Label>
                            <Input
                              value={spec.label_en}
                              onChange={(e) => updateSpecification(index, 'label_en', e.target.value)}
                              placeholder="e.g., Origin"
                            />
                          </div>
                          <div>
                            <Label className="text-xs">Value (EN)</Label>
                            <Input
                              value={spec.value_en}
                              onChange={(e) => updateSpecification(index, 'value_en', e.target.value)}
                              placeholder="e.g., Algeria"
                            />
                          </div>
                        </div>
                      </TabsContent>

                      <TabsContent value="fr" className="space-y-3">
                        <div className="grid grid-cols-2 gap-3">
                          <div>
                            <Label className="text-xs">Label (FR)</Label>
                            <Input
                              value={spec.label_fr}
                              onChange={(e) => updateSpecification(index, 'label_fr', e.target.value)}
                              placeholder="e.g., Origine"
                            />
                          </div>
                          <div>
                            <Label className="text-xs">Value (FR)</Label>
                            <Input
                              value={spec.value_fr}
                              onChange={(e) => updateSpecification(index, 'value_fr', e.target.value)}
                              placeholder="e.g., Algérie"
                            />
                          </div>
                        </div>
                      </TabsContent>

                      <TabsContent value="ar" className="space-y-3" dir="rtl">
                        <div className="grid grid-cols-2 gap-3">
                          <div>
                            <Label className="text-xs">التسمية (AR)</Label>
                            <Input
                              value={spec.label_ar}
                              onChange={(e) => updateSpecification(index, 'label_ar', e.target.value)}
                              placeholder="مثال: الأصل"
                            />
                          </div>
                          <div>
                            <Label className="text-xs">القيمة (AR)</Label>
                            <Input
                              value={spec.value_ar}
                              onChange={(e) => updateSpecification(index, 'value_ar', e.target.value)}
                              placeholder="مثال: الجزائر"
                            />
                          </div>
                        </div>
                      </TabsContent>
                    </Tabs>
                  </Card>
                ))}

                {specifications.length === 0 && (
                  <div className="text-center py-8 border-2 border-dashed rounded-lg">
                    <p className="text-muted-foreground">No specifications added</p>
                  </div>
                )}
              </div>

              {/* Packaging Section */}
              <div className="border-t pt-6 space-y-4">
                <div className="flex items-center justify-between">
                  <Label className="text-lg font-semibold">Packaging Details</Label>
                  <Button type="button" variant="outline" size="sm" onClick={addPackaging}>
                    <Plus className="h-4 w-4 mr-2" />
                    Add Packaging
                  </Button>
                </div>

                {packaging.map((pack, index) => (
                  <Card key={index} className="p-4">
                    <div className="flex justify-between items-start mb-4">
                      <span className="text-sm font-semibold">Packaging {index + 1}</span>
                      <Button
                        type="button"
                        variant="destructive"
                        size="icon"
                        onClick={() => removePackaging(index)}
                      >
                        <Trash2 className="h-4 w-4" />
                      </Button>
                    </div>

                    <Tabs defaultValue="en" className="w-full">
                      <TabsList className="grid w-full grid-cols-3">
                        <TabsTrigger value="en">EN</TabsTrigger>
                        <TabsTrigger value="fr">FR</TabsTrigger>
                        <TabsTrigger value="ar">AR</TabsTrigger>
                      </TabsList>

                      <TabsContent value="en" className="space-y-3">
                        <div className="grid grid-cols-2 gap-3">
                          <div>
                            <Label className="text-xs">Label (EN)</Label>
                            <Input
                              value={pack.label_en}
                              onChange={(e) => updatePackaging(index, 'label_en', e.target.value)}
                              placeholder="e.g., Weight"
                            />
                          </div>
                          <div>
                            <Label className="text-xs">Value (EN)</Label>
                            <Input
                              value={pack.value_en}
                              onChange={(e) => updatePackaging(index, 'value_en', e.target.value)}
                              placeholder="e.g., 500g"
                            />
                          </div>
                        </div>
                      </TabsContent>

                      <TabsContent value="fr" className="space-y-3">
                        <div className="grid grid-cols-2 gap-3">
                          <div>
                            <Label className="text-xs">Label (FR)</Label>
                            <Input
                              value={pack.label_fr}
                              onChange={(e) => updatePackaging(index, 'label_fr', e.target.value)}
                              placeholder="e.g., Poids"
                            />
                          </div>
                          <div>
                            <Label className="text-xs">Value (FR)</Label>
                            <Input
                              value={pack.value_fr}
                              onChange={(e) => updatePackaging(index, 'value_fr', e.target.value)}
                              placeholder="e.g., 500g"
                            />
                          </div>
                        </div>
                      </TabsContent>

                      <TabsContent value="ar" className="space-y-3" dir="rtl">
                        <div className="grid grid-cols-2 gap-3">
                          <div>
                            <Label className="text-xs">التسمية (AR)</Label>
                            <Input
                              value={pack.label_ar}
                              onChange={(e) => updatePackaging(index, 'label_ar', e.target.value)}
                              placeholder="مثال: الوزن"
                            />
                          </div>
                          <div>
                            <Label className="text-xs">القيمة (AR)</Label>
                            <Input
                              value={pack.value_ar}
                              onChange={(e) => updatePackaging(index, 'value_ar', e.target.value)}
                              placeholder="مثال: 500 جرام"
                            />
                          </div>
                        </div>
                      </TabsContent>
                    </Tabs>
                  </Card>
                ))}

                {packaging.length === 0 && (
                  <div className="text-center py-8 border-2 border-dashed rounded-lg">
                    <p className="text-muted-foreground">No packaging details added</p>
                  </div>
                )}
              </div>

              <div className="flex items-center gap-6">
                <div className="flex items-center gap-2">
                  <input
                    type="checkbox"
                    id="featured"
                    name="featured"
                    checked={formData.featured}
                    onChange={handleChange}
                    className="w-4 h-4"
                  />
                  <Label htmlFor="featured" className="cursor-pointer">Featured Product</Label>
                </div>

                <div className="flex items-center gap-2">
                  <input
                    type="checkbox"
                    id="active"
                    name="active"
                    checked={formData.active}
                    onChange={handleChange}
                    className="w-4 h-4"
                  />
                  <Label htmlFor="active" className="cursor-pointer">Active</Label>
                </div>
              </div>

              <div className="flex gap-4 pt-4">
                <Button type="submit" disabled={submitting} className="flex-1">
                  {submitting ? (
                    <>
                      <Loader2 className="h-4 w-4 mr-2 animate-spin" />
                      Updating...
                    </>
                  ) : (
                    'Update Product'
                  )}
                </Button>
                <Button type="button" variant="outline" onClick={() => navigate('/admin/dashboard')}>
                  Cancel
                </Button>
              </div>
            </form>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default EditProduct;
