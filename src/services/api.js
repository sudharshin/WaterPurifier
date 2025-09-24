import axios from "axios";

// --- Helpers ---
// Convert object keys to camelCase
const toCamel = (s) => {
  return s
    .replace(/([-_][a-z])/gi, (group) =>
      group.toUpperCase().replace("-", "").replace("_", "")
    )
    .replace(/([a-z]+)(name|price|selling|friendly|fields|date|id)$/gi, (match, p1, p2) => {
      return p1 + p2.charAt(0).toUpperCase() + p2.slice(1);
    });
};

const keysToCamel = (obj) => {
  if (Array.isArray(obj)) return obj.map((v) => keysToCamel(v));
  if (obj !== null && obj.constructor === Object) {
    return Object.keys(obj).reduce((acc, key) => {
      acc[toCamel(key)] = keysToCamel(obj[key]);
      return acc;
    }, {});
  }
  return obj;
};

// Convert object keys to snake_case
const toSnake = (s) =>
  s.replace(/[A-Z]/g, (letter) => `_${letter.toLowerCase()}`);

const keysToSnake = (obj) => {
  if (Array.isArray(obj)) return obj.map((v) => keysToSnake(v));
  if (obj !== null && obj.constructor === Object) {
    return Object.keys(obj).reduce((acc, key) => {
      acc[toSnake(key)] = keysToSnake(obj[key]);
      return acc;
    }, {});
  }
  return obj;
};

// --- Axios instance ---
const API = axios.create({
  baseURL: import.meta.env.VITE_API_URL,
});

// Interceptor: response → camelCase
API.interceptors.response.use(
  (response) => {
    if (response.data) {
      response.data = keysToCamel(response.data);
    }
    return response;
  },
  (error) => Promise.reject(error)
);

// Interceptor: request → snake_case (skip FormData)
API.interceptors.request.use(
  (config) => {
    if (config.data && !(config.data instanceof FormData)) {
      config.data = keysToSnake(config.data);
    }
    return config;
  },
  (error) => Promise.reject(error)
);

// --- API Services ---
// Products
export const getProducts = (token) =>
  API.get("/products", {
    headers: { Authorization: `Bearer ${token}`, "Content-Type": "application/json" },
  });

export const getProductById = (id, token) =>
  API.get(`/products/${id}`, {
    headers: { Authorization: `Bearer ${token}`, "Content-Type": "application/json" },
  });

export const searchProducts = (params, token) =>
  API.get("/products/search", {
    params,
    headers: { Authorization: `Bearer ${token}`, "Content-Type": "application/json" },
  });

// ✅ Create product
export const createProduct = (data, token) => {
  const headers = {
    Authorization: `Bearer ${token}`,
    "Content-Type": "application/json"
  };

  return API.post("/products", data, {
    headers,
  });
};



// ✅ Update product
export const updateProduct = (id, data, token) => {
  const headers = {
    Authorization: `Bearer ${token}`,
    "Content-Type": "application/json"
  };

  return API.put(`/products/${id}`, data, {
    headers,
  });
};

export const deleteProduct = (id, token) =>
  API.delete(`/products/${id}`, {
    headers: { Authorization: `Bearer ${token}`, "Content-Type": "application/json" },
  });

// Auth
export const refreshToken = (token) => API.post("/auth/refresh", { token });

// --- Auth APIs ---
// Register
export const registerUser = (data) =>
  API.post("/auth/register", data, {
    headers: { "Content-Type": "application/json" },
  });

// Login
export const loginUser = (data) =>
  API.post("/auth/login", data, {
    headers: { "Content-Type": "application/json" },
  });

// Refresh Access Token
export const refreshAccessToken = (refreshToken) =>
  API.post(
    "/auth/refresh",
    { refreshToken }, // ✅ backend expects refreshToken
    {
      headers: { "Content-Type": "application/json" },
    }
  );

// Logout (optional)
export const logoutUser = (token) =>
  API.post(
    "/auth/logout",
    {},
    {
      headers: { Authorization: `Bearer ${token}`, "Content-Type": "application/json" },
    }
  );
