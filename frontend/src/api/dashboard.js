import api from "./axiosClient";

// Get customer dashboard data
export function getCustomerDashboard(customerId) {
  return api.get(`/dashboard/${customerId}`);
}

// Get overall dashboard statistics
export async function getDashboardStats() {
  try {
    const [customers, products, installments] = await Promise.all([
      api.get("/customers/all"),
      api.get("/products/all"),
      // We'll need to aggregate installments data on frontend
      // Since backend doesn't have a global stats endpoint
    ]);

    return {
      totalCustomers: customers?.length || 0,
      totalProducts: products?.length || 0,
      customers: customers || [],
      products: products || []
    };
  } catch (error) {
    console.error("Error fetching dashboard stats:", error);
    throw error;
  }
}
