import React, { useState, useEffect } from "react";
import { addInstallment } from "../../api/installments";
import { getCustomers } from "../../api/customers";
import { getAllProducts } from "../../api/product";

export default function AddInstallment({ customerId, onClose }) {
  const [customers, setCustomers] = useState([]);
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(false);
  const [form, setForm] = useState({
    customer_id: customerId || "",
    product_id: "",
    due_date: "",
    amount: "",
    notes: "",
  });

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    try {
      const [customerData, productData] = await Promise.all([
        getCustomers(),
        getAllProducts()
      ]);
      setCustomers(customerData || []);
      setProducts(productData || []);
    } catch (err) {
      console.error("Failed to load data:", err);
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm({ ...form, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      await addInstallment({
        customer_id: form.customer_id,
        product_id: form.product_id,
        due_date: form.due_date,
        amount: form.amount,
        notes: form.notes,
      });
      alert("Installment added successfully!");
      onClose();
    } catch (err) {
      alert(err.message || "Failed to add installment");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="bg-white p-6 w-[500px] rounded-xl shadow-lg border">
      <h2 className="text-xl font-semibold mb-4 text-gray-800">Add Installment</h2>

      <form onSubmit={handleSubmit} className="space-y-4">
        {/* Customer Selection - Only show if not pre-selected */}
        {!customerId && (
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Select Customer *
            </label>
            <select
              name="customer_id"
              value={form.customer_id}
              onChange={handleChange}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
              required
            >
              <option value="">-- Select Customer --</option>
              {customers.map((customer) => (
                <option key={customer.id} value={customer.id}>
                  {customer.name} - {customer.phone}
                </option>
              ))}
            </select>
          </div>
        )}

        {/* Product Selection */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Select Product *
          </label>
          <select
            name="product_id"
            value={form.product_id}
            onChange={handleChange}
            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
            required
          >
            <option value="">-- Select Product --</option>
            {products.map((product) => (
              <option key={product.id} value={product.id}>
                {product.product_name} - PKR {product.sale_price?.toLocaleString()}
              </option>
            ))}
          </select>
        </div>

        {/* Due Date */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Due Date *
          </label>
          <input
            name="due_date"
            type="date"
            value={form.due_date}
            onChange={handleChange}
            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
            required
          />
        </div>

        {/* Amount */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Amount (PKR) *
          </label>
          <input
            name="amount"
            type="number"
            value={form.amount}
            onChange={handleChange}
            placeholder="Enter amount"
            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
            required
            min="0"
            step="0.01"
          />
        </div>

        {/* Notes */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Notes (Optional)
          </label>
          <textarea
            name="notes"
            value={form.notes}
            onChange={handleChange}
            placeholder="Add any notes or comments"
            rows="3"
            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
          />
        </div>

        {/* Action Buttons */}
        <div className="flex justify-end gap-3 pt-2">
          <button
            type="button"
            onClick={onClose}
            className="px-5 py-2 bg-gray-200 hover:bg-gray-300 text-gray-700 rounded-lg font-medium transition"
          >
            Cancel
          </button>

          <button
            type="submit"
            disabled={loading}
            className="px-5 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-lg font-medium transition disabled:opacity-50"
          >
            {loading ? "Saving..." : "Add Installment"}
          </button>
        </div>
      </form>
    </div>
  );
}
