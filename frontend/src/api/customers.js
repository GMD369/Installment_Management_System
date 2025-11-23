import api from "./axiosClient";

// GET All Customers
export async function getCustomers() {
  return api.get("/customers/all");
}

// GET Single Customer by ID
export async function getCustomerById(id) {
  return api.get(`/customers/${id}`);
}

// ADD Customer (with optional document upload)
export async function addCustomer(customerData) {
  // Let the browser set the Content-Type (including boundary) for FormData
  return api.post("/customers/add", customerData);
}

// UPDATE Customer
export async function updateCustomer(id, customerData) {
  // Let the browser set the Content-Type (including boundary) for FormData
  return api.put(`/customers/update/${id}`, customerData);
}

// DELETE Customer
export async function deleteCustomer(id) {
  return api.delete(`/customers/delete/${id}`);
}
