// TechStore API Service (Firebase Adapter)
import { getProducts as fbGetProducts, getProductById, getProductsByCategory as fbGetProductsByCategory } from '../firebase/products';
import { createOrder as fbCreateOrder } from '../firebase/orders';

// Mantenemos la estructura de la API para no romper el frontend
// Aunque internamente usa Firebase

// Get all products
export const getProducts = async () => {
  return await fbGetProducts();
};

// Get products by category
export const getProductsByCategory = async (category) => {
  return await fbGetProductsByCategory(category);
};

// Get single product
export const getProduct = async (id) => {
  return await getProductById(id);
};

// Search products (Client-side filtering mainly for Firestore without Algolia)
export const searchProducts = async (searchTerm) => {
  const allProducts = await fbGetProducts();
  const term = searchTerm.toLowerCase();
  return allProducts.filter(p =>
    p.name?.toLowerCase().includes(term) ||
    p.description?.toLowerCase().includes(term)
  );
};

// Add product (Simulation or requires Auth)
export const addProduct = async (product) => {
  console.warn("addProduct not fully implemented in Firebase migration yet");
  return null;
};

// Update product
export const updateProduct = async (id, product) => {
  console.warn("updateProduct not fully implemented");
  return null;
};

// Delete product
export const deleteProduct = async (id) => {
  console.warn("deleteProduct not fully implemented");
  return false;
};

// Create order
export const createOrder = async (order) => {
  const result = await fbCreateOrder(order);
  if (result.success) {
    // Enviar correo (Funciona en Vercel, en local requiere 'vercel dev')
    try {
      fetch('/api/send-invoice', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ ...order, id: result.id })
      }).catch(err => console.warn("Email trigger warning:", err));
    } catch (e) {
      console.warn("Email trigger failed:", e);
    }

    return { ...order, id: result.id };
  }
  return null;
};

// Get all orders (Simulation)
export const getOrders = async () => {
  console.warn("getOrders not implemented for public client");
  return [];
};

// Get categories (Derived from products for now)
export const getCategories = async () => {
  const products = await fbGetProducts();
  const categories = [...new Set(products.map(p => p.category))];
  return categories;
};

export default {
  getProducts,
  getProductsByCategory,
  getProduct,
  searchProducts,
  addProduct,
  updateProduct,
  deleteProduct,
  createOrder,
  getOrders,
  getCategories
};
