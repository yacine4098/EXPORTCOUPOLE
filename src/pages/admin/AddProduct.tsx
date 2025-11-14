import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { adminProductsAPI } from "@/lib/api";
import { useToast } from "@/hooks/use-toast";
import { ArrowLeft, Plus, X, Loader2 } from "lucide-react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

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

const AddProduct = () => {
  const navigate = useNavigate();
  const { toast } = useToast();
  const [loading, setLoading] = useState(false);
  
  // Product basic info
  const [slug, setSlug] = useState("");
  const [titleEn, setTitleEn] = useState("");
  const [titleFr, setTitleFr] = useState("");
  const [titleAr, setTitleAr] = useState("");
  const [categoryEn, setCategoryEn] = useState("");
  const [categoryFr, setCategoryFr] = useState("");
  const [categoryAr, setCategoryAr] = useState("");
  const [descriptionEn, setDescriptionEn] = useState("");
  const [descriptionFr, setDescriptionFr] = useState("");
  const [descriptionAr, setDescriptionAr] = useState("");
  const [featured, setFeatured] = useState(false);
  const [active, setActive] = useState(true);
  
  // Specifications
  const [specifications, setSpecifications] = useState<Specification[]>([
    { label_en: "", label_fr: "", label_ar: "", value_en: "", value_fr: "", value_ar: "" }
  ]);
  
  // Packaging
  const [packaging, setPackaging] = useState<Packaging[]>([
    { label_en: "", label_fr: "", label_ar: "", value_en: "", value_fr: "", value_ar: "" }
  ]);
  
  // Certifications (comma-separated IDs)
  const [certifications, setCertifications] = useState<string>("");

  const addSpecification = () => {
    setSpecifications([...specifications, { label_en: "", label_fr: "", label_ar: "", value_en: "", value_fr: "", value_ar: "" }]);
  };

  const removeSpecification = (index: number) => {
    setSpecifications(specifications.filter((_, i) => i !== index));
  };

  const updateSpecification = (index: number, field: keyof Specification, value: string) => {
    const updated = [...specifications];
    updated[index][field] = value;
    setSpecifications(updated);
  };

  const addPackaging = () => {
    setPackaging([...packaging, { label_en: "", label_fr: "", label_ar: "", value_en: "", value_fr: "", value_ar: "" }]);
  };

  const removePackaging = (index: number) => {
    setPackaging(packaging.filter((_, i) => i !== index));
  };

  const updatePackaging = (index: number, field: keyof Packaging, value: string) => {
    const updated = [...packaging];
    updated[index][field] = value;
    setPackaging(updated);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    try {
      const productData = {
        slug,
        title_en: titleEn,
        title_fr: titleFr,
        title_ar: titleAr,
        category_en: categoryEn,
        category_fr: categoryFr,
        category_ar: categoryAr,
        description_en: descriptionEn,
        description_fr: descriptionFr,
        description_ar: descriptionAr,
        featured,
        active,
        specifications: specifications.filter(s => s.label_en && s.value_en),
        packaging: packaging.filter(p => p.label_en && p.value_en),
        certifications: certifications.split(',').map(c => parseInt(c.trim())).filter(c => !isNaN(c))
      };

      await adminProductsAPI.create(productData);
      
      toast({
        title: "Product created",
        description: "Product has been created successfully"
      });
      
      navigate('/admin/dashboard');
    } catch (error: any) {
      toast({
        title: "Error",
        description: error.response?.data?.message || "Failed to create product",
        variant: "destructive"
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-muted/30">
      {/* Header */}
      <div className="bg-white border-b">
        <div className="container mx-auto px-4 py-4">
          <Button variant="ghost" onClick={() => navigate('/admin/dashboard')}>
            <ArrowLeft className="h-4 w-4 mr-2" />
            Back to Dashboard
          </Button>
          <h1 className="text-2xl font-bold mt-2">Add New Product</h1>
        </div>
      </div>

      <div className="container mx-auto px-4 py-8">
        <form onSubmit={handleSubmit}>
          <Tabs defaultValue="basic" className="space-y-4">
            <TabsList>
              <TabsTrigger value="basic">Basic Info</TabsTrigger>
              <TabsTrigger value="specifications">Specifications</TabsTrigger>
              <TabsTrigger value="packaging">Packaging</TabsTrigger>
              <TabsTrigger value="certifications">Certifications</TabsTrigger>
            </TabsList>

            {/* Basic Information */}
            <TabsContent value="basic">
              <Card>
                <CardHeader>
                  <CardTitle>Basic Information</CardTitle>
                  <CardDescription>Enter product details in multiple languages</CardDescription>
                </CardHeader>
                <CardContent className="space-y-6">
                  <div className="grid grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label htmlFor="slug">Slug (URL) *</Label>
                      <Input
                        id="slug"
                        value={slug}
                        onChange={(e) => setSlug(e.target.value)}
                        placeholder="product-name"
                        required
                      />
                    </div>
                    <div className="flex items-end gap-4">
                      <div className="flex items-center space-x-2">
                        <input
                          type="checkbox"
                          id="featured"
                          checked={featured}
                          onChange={(e) => setFeatured(e.target.checked)}
                          className="w-4 h-4"
                        />
                        <Label htmlFor="featured">Featured</Label>
                      </div>
                      <div className="flex items-center space-x-2">
                        <input
                          type="checkbox"
                          id="active"
                          checked={active}
                          onChange={(e) => setActive(e.target.checked)}
                          className="w-4 h-4"
                        />
                        <Label htmlFor="active">Active</Label>
                      </div>
                    </div>
                  </div>

                  <div className="space-y-4">
                    <h3 className="font-semibold">Title</h3>
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                      <div className="space-y-2">
                        <Label htmlFor="title_en">English *</Label>
                        <Input
                          id="title_en"
                          value={titleEn}
                          onChange={(e) => setTitleEn(e.target.value)}
                          required
                        />
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="title_fr">French</Label>
                        <Input
                          id="title_fr"
                          value={titleFr}
                          onChange={(e) => setTitleFr(e.target.value)}
                        />
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="title_ar">Arabic</Label>
                        <Input
                          id="title_ar"
                          value={titleAr}
                          onChange={(e) => setTitleAr(e.target.value)}
                          dir="rtl"
                        />
                      </div>
                    </div>
                  </div>

                  <div className="space-y-4">
                    <h3 className="font-semibold">Category</h3>
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                      <div className="space-y-2">
                        <Label htmlFor="category_en">English *</Label>
                        <Input
                          id="category_en"
                          value={categoryEn}
                          onChange={(e) => setCategoryEn(e.target.value)}
                          required
                        />
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="category_fr">French</Label>
                        <Input
                          id="category_fr"
                          value={categoryFr}
                          onChange={(e) => setCategoryFr(e.target.value)}
                        />
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="category_ar">Arabic</Label>
                        <Input
                          id="category_ar"
                          value={categoryAr}
                          onChange={(e) => setCategoryAr(e.target.value)}
                          dir="rtl"
                        />
                      </div>
                    </div>
                  </div>

                  <div className="space-y-4">
                    <h3 className="font-semibold">Description</h3>
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                      <div className="space-y-2">
                        <Label htmlFor="description_en">English *</Label>
                        <Textarea
                          id="description_en"
                          value={descriptionEn}
                          onChange={(e) => setDescriptionEn(e.target.value)}
                          rows={4}
                          required
                        />
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="description_fr">French</Label>
                        <Textarea
                          id="description_fr"
                          value={descriptionFr}
                          onChange={(e) => setDescriptionFr(e.target.value)}
                          rows={4}
                        />
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="description_ar">Arabic</Label>
                        <Textarea
                          id="description_ar"
                          value={descriptionAr}
                          onChange={(e) => setDescriptionAr(e.target.value)}
                          rows={4}
                          dir="rtl"
                        />
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>

            {/* Specifications */}
            <TabsContent value="specifications">
              <Card>
                <CardHeader>
                  <div className="flex justify-between items-center">
                    <div>
                      <CardTitle>Product Specifications</CardTitle>
                      <CardDescription>Add product specifications (SKU, Grade, Origin, etc.)</CardDescription>
                    </div>
                    <Button type="button" onClick={addSpecification} size="sm">
                      <Plus className="h-4 w-4 mr-2" />
                      Add Specification
                    </Button>
                  </div>
                </CardHeader>
                <CardContent className="space-y-4">
                  {specifications.map((spec, index) => (
                    <div key={index} className="p-4 border rounded-lg space-y-4">
                      <div className="flex justify-between items-center">
                        <h4 className="font-medium">Specification {index + 1}</h4>
                        {specifications.length > 1 && (
                          <Button
                            type="button"
                            variant="ghost"
                            size="sm"
                            onClick={() => removeSpecification(index)}
                          >
                            <X className="h-4 w-4" />
                          </Button>
                        )}
                      </div>
                      
                      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                        <div className="space-y-2">
                          <Label>Label (EN)</Label>
                          <Input
                            value={spec.label_en}
                            onChange={(e) => updateSpecification(index, 'label_en', e.target.value)}
                            placeholder="e.g., SKU"
                          />
                        </div>
                        <div className="space-y-2">
                          <Label>Label (FR)</Label>
                          <Input
                            value={spec.label_fr}
                            onChange={(e) => updateSpecification(index, 'label_fr', e.target.value)}
                            placeholder="e.g., Référence"
                          />
                        </div>
                        <div className="space-y-2">
                          <Label>Label (AR)</Label>
                          <Input
                            value={spec.label_ar}
                            onChange={(e) => updateSpecification(index, 'label_ar', e.target.value)}
                            placeholder="e.g., رقم المنتج"
                            dir="rtl"
                          />
                        </div>
                      </div>

                      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                        <div className="space-y-2">
                          <Label>Value (EN)</Label>
                          <Input
                            value={spec.value_en}
                            onChange={(e) => updateSpecification(index, 'value_en', e.target.value)}
                            placeholder="e.g., DT-DN-P01"
                          />
                        </div>
                        <div className="space-y-2">
                          <Label>Value (FR)</Label>
                          <Input
                            value={spec.value_fr}
                            onChange={(e) => updateSpecification(index, 'value_fr', e.target.value)}
                            placeholder="e.g., DT-DN-P01"
                          />
                        </div>
                        <div className="space-y-2">
                          <Label>Value (AR)</Label>
                          <Input
                            value={spec.value_ar}
                            onChange={(e) => updateSpecification(index, 'value_ar', e.target.value)}
                            placeholder="e.g., DT-DN-P01"
                            dir="rtl"
                          />
                        </div>
                      </div>
                    </div>
                  ))}
                </CardContent>
              </Card>
            </TabsContent>

            {/* Packaging */}
            <TabsContent value="packaging">
              <Card>
                <CardHeader>
                  <div className="flex justify-between items-center">
                    <div>
                      <CardTitle>Packaging Information</CardTitle>
                      <CardDescription>Add packaging options and container details</CardDescription>
                    </div>
                    <Button type="button" onClick={addPackaging} size="sm">
                      <Plus className="h-4 w-4 mr-2" />
                      Add Packaging
                    </Button>
                  </div>
                </CardHeader>
                <CardContent className="space-y-4">
                  {packaging.map((pack, index) => (
                    <div key={index} className="p-4 border rounded-lg space-y-4">
                      <div className="flex justify-between items-center">
                        <h4 className="font-medium">Packaging {index + 1}</h4>
                        {packaging.length > 1 && (
                          <Button
                            type="button"
                            variant="ghost"
                            size="sm"
                            onClick={() => removePackaging(index)}
                          >
                            <X className="h-4 w-4" />
                          </Button>
                        )}
                      </div>
                      
                      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                        <div className="space-y-2">
                          <Label>Label (EN)</Label>
                          <Input
                            value={pack.label_en}
                            onChange={(e) => updatePackaging(index, 'label_en', e.target.value)}
                            placeholder="e.g., Consumer Packaging"
                          />
                        </div>
                        <div className="space-y-2">
                          <Label>Label (FR)</Label>
                          <Input
                            value={pack.label_fr}
                            onChange={(e) => updatePackaging(index, 'label_fr', e.target.value)}
                            placeholder="e.g., Emballage Consommateur"
                          />
                        </div>
                        <div className="space-y-2">
                          <Label>Label (AR)</Label>
                          <Input
                            value={pack.label_ar}
                            onChange={(e) => updatePackaging(index, 'label_ar', e.target.value)}
                            placeholder="e.g., التعبئة للمستهلك"
                            dir="rtl"
                          />
                        </div>
                      </div>

                      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                        <div className="space-y-2">
                          <Label>Value (EN)</Label>
                          <Input
                            value={pack.value_en}
                            onChange={(e) => updatePackaging(index, 'value_en', e.target.value)}
                            placeholder="e.g., 500g, 1kg boxes"
                          />
                        </div>
                        <div className="space-y-2">
                          <Label>Value (FR)</Label>
                          <Input
                            value={pack.value_fr}
                            onChange={(e) => updatePackaging(index, 'value_fr', e.target.value)}
                            placeholder="e.g., Boîtes de 500g, 1kg"
                          />
                        </div>
                        <div className="space-y-2">
                          <Label>Value (AR)</Label>
                          <Input
                            value={pack.value_ar}
                            onChange={(e) => updatePackaging(index, 'value_ar', e.target.value)}
                            placeholder="e.g., علب 500 جم، 1 كجم"
                            dir="rtl"
                          />
                        </div>
                      </div>
                    </div>
                  ))}
                </CardContent>
              </Card>
            </TabsContent>

            {/* Certifications */}
            <TabsContent value="certifications">
              <Card>
                <CardHeader>
                  <CardTitle>Certifications</CardTitle>
                  <CardDescription>Enter certification IDs (comma-separated)</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-2">
                    <Label htmlFor="certifications">Certification IDs</Label>
                    <Input
                      id="certifications"
                      value={certifications}
                      onChange={(e) => setCertifications(e.target.value)}
                      placeholder="e.g., 1, 2, 3"
                    />
                    <p className="text-sm text-muted-foreground">
                      Enter comma-separated certification IDs from the certifications table
                    </p>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>
          </Tabs>

          <div className="flex justify-end gap-4 mt-6">
            <Button
              type="button"
              variant="outline"
              onClick={() => navigate('/admin/dashboard')}
            >
              Cancel
            </Button>
            <Button type="submit" disabled={loading}>
              {loading ? (
                <>
                  <Loader2 className="h-4 w-4 mr-2 animate-spin" />
                  Creating...
                </>
              ) : (
                'Create Product'
              )}
            </Button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default AddProduct;
