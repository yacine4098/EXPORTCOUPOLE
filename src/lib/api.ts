import axios from 'axios';

const API_URL = '/api';

const api = axios.create({
  baseURL: API_URL,
  headers: {
    'Content-Type': 'application/json'
  }
});

// Request interceptor for adding auth token
api.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem('auth_token');
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => Promise.reject(error)
);

// Response interceptor for handling errors
api.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response?.status === 401) {
      localStorage.removeItem('auth_token');
      window.location.href = '/admin/login';
    }
    return Promise.reject(error);
  }
);

// Products API
export const productsAPI = {
  getAll: (params?: { category?: string; featured?: boolean; lang?: string }) =>
    api.get('/products', { params }),
  
  getBySlug: (slug: string, lang?: string) =>
    api.get(`/products/${slug}`, { params: { lang } }),
  
  getCategories: (lang?: string) =>
    api.get('/products/meta/categories', { params: { lang } })
};

// Inquiries API
export const inquiriesAPI = {
  create: (data: {
    name: string;
    company: string;
    email: string;
    phone?: string;
    country: string;
    message: string;
    products_interested?: string;
  }) => api.post('/inquiries', data)
};

// Auth API
export const authAPI = {
  login: (email: string, password: string) =>
    api.post('/auth/login', { email, password }),
  
  verify: () => api.get('/auth/verify')
};

// Admin Products API
export const adminProductsAPI = {
  getAll: () => api.get('/admin/products'),
  
  getById: (id: number) => api.get(`/admin/products/${id}`),
  
  create: (data: any) => api.post('/admin/products', data),
  
  update: (id: number, data: any) => api.put(`/admin/products/${id}`, data),
  
  delete: (id: number) => api.delete(`/admin/products/${id}`),
  
  uploadImage: (id: number, formData: FormData) =>
    api.post(`/admin/products/${id}/images`, formData, {
      headers: { 'Content-Type': 'multipart/form-data' }
    }),
  
  deleteImage: (productId: number, imageId: number) =>
    api.delete(`/admin/products/${productId}/images/${imageId}`)
};

// Admin Inquiries API
export const adminInquiriesAPI = {
  getAll: (params?: { status?: string }) =>
    api.get('/admin/inquiries', { params }),
  
  getById: (id: number) => api.get(`/admin/inquiries/${id}`),
  
  update: (id: number, data: { status?: string; notes?: string }) =>
    api.patch(`/admin/inquiries/${id}`, data),
  
  delete: (id: number) => api.delete(`/admin/inquiries/${id}`)
};

// Admin Certifications API
export const adminCertificationsAPI = {
  getAll: () => api.get('/admin/certifications'),
  
  create: (data: any) => api.post('/admin/certifications', data),
  
  update: (id: number, data: any) => api.put(`/admin/certifications/${id}`, data),
  
  delete: (id: number) => api.delete(`/admin/certifications/${id}`)
};

export default api;
