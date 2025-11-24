import api from "./axiosClient";

// Add product
export function addProduct(data) {
  return api.post("/products/add", data);
}

// Get all products
export function getAllProducts() {
  return api.get("/products/all");
}

// Get product by ID
export function getProductById(id) {
  return api.get(`/products/${id}`);
}

// Update product
export function updateProduct(id, data) {
  return api.put(`/products/update/${id}`, data);
}

// Delete product
export function deleteProduct(id) {
  return api.delete(`/products/delete/${id}`);
}
