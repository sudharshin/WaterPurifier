// src/hooks/useProducts.js
import { useState, useEffect, useCallback } from "react";
import { getProducts, refreshToken } from "../../services/api";

// Convert base64 to blob URL
const base64ToBlobUrl = (base64Str) => {
  if (!base64Str || typeof base64Str !== "string") return "";

  if (base64Str.startsWith("blob:") || base64Str.startsWith("data:")) {
    return base64Str;
  }

  try {
    let mimeType = "image/png";
    let base64Data = base64Str;

    if (base64Str.includes(";base64,")) {
      const [header, data] = base64Str.split(";base64,");
      mimeType = header.split(":")[1] || mimeType;
      base64Data = data;
    }

    const byteCharacters = atob(base64Data);
    const byteArrays = [];

    for (let offset = 0; offset < byteCharacters.length; offset += 512) {
      const slice = byteCharacters.slice(offset, offset + 512);
      const byteNumbers = Array.from(slice).map((char) => char.charCodeAt(0));
      byteArrays.push(new Uint8Array(byteNumbers));
    }

    const blob = new Blob(byteArrays, { type: mimeType });
    return URL.createObjectURL(blob);
  } catch (err) {
    console.warn("Invalid base64 image data:", base64Str.slice(0, 30), "...", err);
    return "";
  }
};

// Parse a single product
const parseProduct = (product) => {
  let base64Images = [];

  try {
    if (Array.isArray(product.images)) {
      base64Images = product.images;
    } else if (typeof product.images === "string") {
      const trimmed = product.images.trim();
      if (trimmed.startsWith("[")) {
        base64Images = JSON.parse(trimmed);
      } else if (trimmed) {
        base64Images = [trimmed];
      }
    }
  } catch (e) {
    console.warn("Failed to parse images for product id", product.id, e);
  }

  const imageUrls = base64Images
    .map(base64ToBlobUrl)
    .filter((url) => typeof url === "string" && url.startsWith("blob:"));

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
      product.is_budget_friendly ??
      product.isbudgetFriendly ??
      product.isBudgetFriendly ??
      false,
  };
};

// Hook to use products
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

      // Attempt token refresh if needed
      if (!token && refresh) {
        const res = await refreshToken(refresh);
        token = res.data.accessToken;
        user.accessToken = token;
        localStorage.setItem("user", JSON.stringify(user));
      }

      // Get products from API
      const res = await getProducts(token);
      const rawProducts = Array.isArray(res.data) ? res.data : [];

      // Parse & normalize products
      const parsed = rawProducts.map(parseProduct);

      // Optional: cache to localStorage
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
