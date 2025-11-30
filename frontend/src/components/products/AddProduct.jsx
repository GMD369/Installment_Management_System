import React, { useState } from "react";
import { addProduct } from "../../api/product";

export default function AddProduct({ onClose, onSuccess }) {
  const [loading, setLoading] = useState(false);

  const [form, setForm] = useState({
    product_name: "",
    model: "",
    price: "",
    sale_price: "",
    down_payment: "",
    installment_duration: "",
    notes: "",
  });

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      await addProduct(form);
      onSuccess();
      onClose();
    } catch (err) {
      alert(err.message || "Failed to add product");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="bg-white w-[450px] p-6 rounded-lg shadow border">

      <h2 className="text-xl font-semibold mb-4">Add Product</h2>

      <form onSubmit={handleSubmit} className="space-y-4">

        <input
          name="product_name"
          placeholder="Product Name"
          value={form.product_name}
          onChange={handleChange}
          className="w-full p-2 border rounded"
          required
        />

        <input
          name="model"
          placeholder="Model"
          value={form.model}
          onChange={handleChange}
          className="w-full p-2 border rounded"
        />

        <input
          name="price"
          placeholder="Price"
          value={form.price}
          onChange={handleChange}
          type="number"
          className="w-full p-2 border rounded"
          required
        />

        <input
          name="sale_price"
          placeholder="Sale Price"
          value={form.sale_price}
          onChange={handleChange}
          type="number"
          className="w-full p-2 border rounded"
          required
        />

        <input
          name="down_payment"
          placeholder="Down Payment"
          value={form.down_payment}
          onChange={handleChange}
          type="number"
          className="w-full p-2 border rounded"
        />

        <input
          name="installment_duration"
          placeholder="Installment Duration (months)"
          value={form.installment_duration}
          onChange={handleChange}
          type="number"
          className="w-full p-2 border rounded"
        />

        <textarea
          name="notes"
          placeholder="Notes"
          value={form.notes}
          onChange={handleChange}
          className="w-full p-2 border rounded"
        ></textarea>

        <div className="flex justify-end gap-3">
          <button
            type="button"
            onClick={onClose}
            className="px-4 py-2 bg-gray-300 rounded"
          >
            Cancel
          </button>

          <button
            type="submit"
            disabled={loading}
            className="px-4 py-2 bg-blue-600 text-white rounded"
          >
            {loading ? "Saving..." : "Save Product"}
          </button>
        </div>

      </form>
    </div>
  );
}
