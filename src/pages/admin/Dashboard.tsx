import { useState, useEffect } from "react";
import { useNavigate, Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { adminProductsAPI, adminInquiriesAPI } from "@/lib/api";
import { Package, Mail, LogOut, Plus, Upload, Trash2, Loader2, Edit } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

interface Product {
  id: number;
  slug: string;
  title: string;
  category: string;
  description: string;
  featured: boolean;
  image?: string;
  images?: Array<{ id: number; image_url: string; is_primary: boolean }>;
}

const AdminDashboard = () => {
  const [products, setProducts] = useState<Product[]>([]);
  const [inquiries, setInquiries] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [uploadingImage, setUploadingImage] = useState<number | null>(null);
  const navigate = useNavigate();
  const { toast } = useToast();

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    try {
      const token = localStorage.getItem('auth_token');
      console.log('Auth token:', token ? 'exists' : 'missing');
      
      const [productsRes, inquiriesRes] = await Promise.all([
        adminProductsAPI.getAll(),
        adminInquiriesAPI.getAll()
      ]);
      
      console.log('Products loaded:', productsRes.data.length);
      console.log('Inquiries loaded:', inquiriesRes.data.length);
      
      setProducts(productsRes.data);
      setInquiries(inquiriesRes.data);
    } catch (error: any) {
      console.error('Dashboard error:', error.response || error);
      if (error.response?.status === 401) {
        toast({
          title: "Session expired",
          description: "Please login again",
          variant: "destructive"
        });
        navigate('/admin/login');
      } else {
        toast({
          title: "Error loading data",
          description: error.response?.data?.message || "Could not fetch dashboard data",
          variant: "destructive"
        });
      }
    } finally {
      setLoading(false);
    }
  };

  const handleLogout = () => {
    localStorage.removeItem('auth_token');
    navigate('/admin/login');
  };

  const handleImageUpload = async (productId: number, file: File) => {
    setUploadingImage(productId);
    const formData = new FormData();
    formData.append('image', file);
    formData.append('is_primary', 'true'); // Set as primary image

    try {
      console.log('Uploading image for product:', productId);
      const response = await adminProductsAPI.uploadImage(productId, formData);
      console.log('Upload response:', response.data);
      
      toast({
        title: "Image uploaded",
        description: "Product image has been updated successfully"
      });
      
      fetchData(); // Refresh data
    } catch (error: any) {
      console.error('Upload error:', error.response || error);
      toast({
        title: "Upload failed",
        description: error.response?.data?.message || "Could not upload image",
        variant: "destructive"
      });
    } finally {
      setUploadingImage(null);
    }
  };

  const handleDeleteProduct = async (id: number) => {
    if (!confirm('Are you sure you want to delete this product?')) return;

    try {
      await adminProductsAPI.delete(id);
      toast({
        title: "Product deleted",
        description: "Product has been removed successfully"
      });
      fetchData();
    } catch (error) {
      toast({
        title: "Delete failed",
        description: "Could not delete product",
        variant: "destructive"
      });
    }
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
      {/* Header */}
      <div className="bg-white border-b">
        <div className="container mx-auto px-4 py-4 flex justify-between items-center">
          <h1 className="text-2xl font-bold">Admin Dashboard</h1>
          <div className="flex gap-2">
            <Link to="/">
              <Button variant="outline">View Site</Button>
            </Link>
            <Button variant="ghost" onClick={handleLogout}>
              <LogOut className="h-4 w-4 mr-2" />
              Logout
            </Button>
          </div>
        </div>
      </div>

      <div className="container mx-auto px-4 py-8">
        {/* Stats */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Total Products</CardTitle>
              <Package className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{products.length}</div>
            </CardContent>
          </Card>
          
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Total Inquiries</CardTitle>
              <Mail className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{inquiries.length}</div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">New Inquiries</CardTitle>
              <Mail className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">
                {inquiries.filter(i => i.status === 'new').length}
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Main Content */}
        <Tabs defaultValue="products" className="space-y-4">
          <TabsList>
            <TabsTrigger value="products">Products</TabsTrigger>
            <TabsTrigger value="inquiries">Inquiries</TabsTrigger>
          </TabsList>

          <TabsContent value="products" className="space-y-4">
            <Card>
              <CardHeader>
                <div className="flex justify-between items-center">
                  <div>
                    <CardTitle>Products</CardTitle>
                    <CardDescription>Manage your product catalog and upload images</CardDescription>
                  </div>
                  <Link to="/admin/products/add">
                    <Button>
                      <Plus className="h-4 w-4 mr-2" />
                      Add Product
                    </Button>
                  </Link>
                </div>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {products.map((product) => (
                    <div key={product.id} className="flex items-center gap-4 p-4 border rounded-lg">
                      {/* Product Image */}
                      <div className="w-20 h-20 flex-shrink-0">
                        {product.images && product.images.length > 0 ? (
                          <img
                            src={`http://localhost:5000${product.images.find(img => img.is_primary)?.image_url || product.images[0]?.image_url}`}
                            alt={product.title}
                            className="w-full h-full object-cover rounded border"
                          />
                        ) : (
                          <div className="w-full h-full bg-muted rounded border flex items-center justify-center">
                            <Package className="h-8 w-8 text-muted-foreground" />
                          </div>
                        )}
                      </div>

                      <div className="flex-1">
                        <h3 className="font-semibold">{product.title}</h3>
                        <p className="text-sm text-muted-foreground">{product.category}</p>
                        <p className="text-xs text-muted-foreground mt-1">Slug: {product.slug}</p>
                      </div>
                      
                      <div className="flex items-center gap-2">
                        <Link to={`/admin/products/edit/${product.id}`}>
                          <Button variant="outline" size="sm">
                            <Edit className="h-4 w-4 mr-2" />
                            Edit
                          </Button>
                        </Link>

                        <div className="relative">
                          <Input
                            type="file"
                            accept="image/*"
                            onChange={(e) => {
                              const file = e.target.files?.[0];
                              if (file) handleImageUpload(product.id, file);
                            }}
                            className="hidden"
                            id={`upload-${product.id}`}
                            disabled={uploadingImage === product.id}
                          />
                          <Label htmlFor={`upload-${product.id}`} className="cursor-pointer">
                            <Button asChild size="sm" disabled={uploadingImage === product.id}>
                              <span>
                                {uploadingImage === product.id ? (
                                  <Loader2 className="h-4 w-4 mr-2 animate-spin" />
                                ) : (
                                  <Upload className="h-4 w-4 mr-2" />
                                )}
                                Upload
                              </span>
                            </Button>
                          </Label>
                        </div>
                        
                        <Button 
                          variant="destructive" 
                          size="icon"
                          onClick={() => handleDeleteProduct(product.id)}
                        >
                          <Trash2 className="h-4 w-4" />
                        </Button>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="inquiries" className="space-y-4">
            <Card>
              <CardHeader>
                <CardTitle>Inquiries</CardTitle>
                <CardDescription>View and manage customer inquiries</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {inquiries.map((inquiry) => (
                    <div key={inquiry.id} className="p-4 border rounded-lg">
                      <div className="flex justify-between items-start mb-2">
                        <div>
                          <h3 className="font-semibold">{inquiry.name}</h3>
                          <p className="text-sm text-muted-foreground">{inquiry.company}</p>
                        </div>
                        <span className={`text-xs px-2 py-1 rounded-full ${
                          inquiry.status === 'new' ? 'bg-blue-100 text-blue-700' :
                          inquiry.status === 'in_progress' ? 'bg-yellow-100 text-yellow-700' :
                          'bg-green-100 text-green-700'
                        }`}>
                          {inquiry.status}
                        </span>
                      </div>
                      <p className="text-sm">{inquiry.email}</p>
                      <p className="text-sm mt-2">{inquiry.message}</p>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
};

export default AdminDashboard;
