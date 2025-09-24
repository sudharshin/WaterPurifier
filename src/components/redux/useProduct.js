// src/hooks/useProducts.js
import { useState, useEffect, useCallback } from "react";
import { getProducts, refreshToken } from "../../services/api";

// Parse a single product, assuming images are Cloudinary URLs (array of strings)
const parseProduct = (product) => {
  // Use images array as is, or empty array if undefined
  const imageUrls = Array.isArray(product.images) ? product.images : [];

  let customFields = [];
  try {
    if (product.custom_fields) {
      customFields =
        typeof product.custom_fields === "string"
          ? JSON.parse(product.custom_fields)
          : product.custom_fields;
    }
  } catch (e) {
    console.warn("Failed to parse custom fields for product id", product.id, e);
  }

  return {
    ...product,
    images: imageUrls,
    customFields,
    isTopSelling:
      product.is_top_selling ?? product.istopSelling ?? product.isTopSelling ?? false,
    isFeatured:
      product.is_featured ?? product.isfeatured ?? product.isFeatured ?? false,
    isBudgetFriendly:
      product.is_budget_friendly ?? product.isbudgetFriendly ?? product.isBudgetFriendly ?? false,
  };
};

// Hook to fetch products
export const useProducts = () => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const fetchProducts = useCallback(async () => {
    setLoading(true);
    setError(null);

    try {
      const user = JSON.parse(localStorage.getItem("user") || "{}");
      let token = user.accessToken;
      const refresh = user.refreshToken;

      // Refresh token if missing and refresh token available
      if (!token && refresh) {
        const res = await refreshToken(refresh);
        token = res.data.accessToken;
        user.accessToken = token;
        localStorage.setItem("user", JSON.stringify(user));
      }

      // Fetch products with valid token
      const res = await getProducts(token);
      const rawProducts = Array.isArray(res.data) ? res.data : [];

      // Parse products (normalize fields)
      const parsed = rawProducts.map(parseProduct);

      // Cache products locally (optional)
      try {
        localStorage.setItem("products", JSON.stringify(parsed));
      } catch (e) {
        console.warn("Failed to cache products list", e);
      }

      setProducts(parsed);
    } catch (err) {
      setError(err);
      console.error("Failed to fetch products:", err);
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchProducts();
  }, [fetchProducts]);

  return {
    products,
    loading,
    error,
    refresh: fetchProducts,
  };
};
