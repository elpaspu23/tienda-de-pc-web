// TechStore JSON Server API Service
const API_URL = 'http://localhost:3001';

// Get all products
export const getProducts = async () => {
  try {
    const response = await fetch(`${API_URL}/products`);
    if (!response.ok) throw new Error('Error fetching products');
    return await response.json();
  } catch (error) {
    console.error('Error:', error);
    return [];
  }
};

// Get products by category
export const getProductsByCategory = async (category) => {
  try {
    const response = await fetch(`${API_URL}/products?category=${category}`);
    if (!response.ok) throw new Error('Error fetching products');
    return await response.json();
  } catch (error) {
    console.error('Error:', error);
    return [];
  }
};

// Get single product
export const getProduct = async (id) => {
  try {
    const response = await fetch(`${API_URL}/products/${id}`);
    if (!response.ok) throw new Error('Error fetching product');
    return await response.json();
  } catch (error) {
    console.error('Error:', error);
    return null;
  }
};

// Search products
export const searchProducts = async (searchTerm) => {
  try {
    const response = await fetch(`${API_URL}/products?q=${searchTerm}`);
    if (!response.ok) throw new Error('Error searching products');
    return await response.json();
  } catch (error) {
    console.error('Error:', error);
    return [];
  }
};

// Add product (admin)
export const addProduct = async (product) => {
  try {
    const response = await fetch(`${API_URL}/products`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(product)
    });
    if (!response.ok) throw new Error('Error adding product');
    return await response.json();
  } catch (error) {
    console.error('Error:', error);
    return null;
  }
};

// Update product (admin)
export const updateProduct = async (id, product) => {
  try {
    const response = await fetch(`${API_URL}/products/${id}`, {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(product)
    });
    if (!response.ok) throw new Error('Error updating product');
    return await response.json();
  } catch (error) {
    console.error('Error:', error);
    return null;
  }
};

// Delete product (admin)
export const deleteProduct = async (id) => {
  try {
    const response = await fetch(`${API_URL}/products/${id}`, {
      method: 'DELETE'
    });
    return response.ok;
  } catch (error) {
    console.error('Error:', error);
    return false;
  }
};

// Create order
export const createOrder = async (order) => {
  try {
    const orderData = {
      ...order,
      createdAt: new Date().toISOString(),
      status: 'pending'
    };
    const response = await fetch(`${API_URL}/orders`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(orderData)
    });
    if (!response.ok) throw new Error('Error creating order');
    return await response.json();
  } catch (error) {
    console.error('Error:', error);
    return null;
  }
};

// Get all orders
export const getOrders = async () => {
  try {
    const response = await fetch(`${API_URL}/orders`);
    if (!response.ok) throw new Error('Error fetching orders');
    return await response.json();
  } catch (error) {
    console.error('Error:', error);
    return [];
  }
};

// Get categories
export const getCategories = async () => {
  try {
    const response = await fetch(`${API_URL}/categories`);
    if (!response.ok) throw new Error('Error fetching categories');
    return await response.json();
  } catch (error) {
    console.error('Error:', error);
    return [];
  }
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
