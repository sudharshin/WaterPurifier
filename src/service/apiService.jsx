// src/services/apiService.js
const API_BASE_URL = "http://localhost:5000/api";

// Generic request helper
const request = async (method, endpoint, data = null) => {
  try {
    const config = {
      method,
      headers: { "Content-Type": "application/json" },
    };
    if (data) config.body = JSON.stringify(data);

    const response = await fetch(`${API_BASE_URL}${endpoint}`, config);

    if (!response.ok) {
      throw new Error(`Error ${response.status}: ${response.statusText}`);
    }

    // Handle cases where no JSON is returned (e.g., DELETE success)
    try {
      return await response.json();
    } catch {
      return { success: true };
    }
  } catch (error) {
    console.error(`API ${method} Error:`, error);
    throw error;
  }
};

// CRUD Functions

// READ (GET)
export const getHeroSlides = () => request("GET", "/hero-slides");
export const getTopProducts = () => request("GET", "/top-products");
export const getWhyChooseUs = () => request("GET", "/why-choose-us");
export const getProductsGrid = () => request("GET", "/products-grid");
export const getClients = () => request("GET", "/clients");
export const getFaqs = () => request("GET", "/faqs");

// CREATE (POST)
export const createItem = (endpoint, newItem) =>
  request("POST", endpoint, newItem);

// UPDATE (PUT)
export const updateItem = (endpoint, id, updatedItem) =>
  request("PUT", `${endpoint}/${id}`, updatedItem);

// DELETE (DELETE)
export const deleteItem = (endpoint, id) =>
  request("DELETE", `${endpoint}/${id}`);
