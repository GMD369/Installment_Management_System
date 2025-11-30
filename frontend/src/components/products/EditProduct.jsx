import React, { useEffect, useState } from "react";
import { getProductById, updateProduct } from "../../api/product";

export default function EditProduct({ id, onCancel, onSaved }) {
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);

  const [form, setForm] = useState({
    product_name: "",
    model: "",
    price: "",
    sale_price: "",
    down_payment: "",
    installment_duration: "",
    notes: "",
  });

  useEffect(() => {
    getProductById(id)
      .then((data) => {
        const p = data || {};
        setForm({
          product_name: p.product_name || "",
          model: p.model || "",
          price: p.price || "",
          sale_price: p.sale_price || "",
          down_payment: p.down_payment || "",
          installment_duration: p.installment_duration || "",
          notes: p.notes || "",
        });
      })
      .catch(() => alert("Failed to load product"))
      .finally(() => setLoading(false));
  }, [id]);

  const handleChange = (e) =>
    setForm({ ...form, [e.target.name]: e.target.value });

  const handleSubmit = async (e) => {
    e.preventDefault();
    setSaving(true);

    try {
      await updateProduct(id, form);
      onSaved();
    } catch (err) {
      alert(err.message || "Failed to update");
    } finally {
      setSaving(false);
    }
  };

  if (loading) return <div className="bg-white p-6 rounded">Loading...</div>;

  return (
    <div className="bg-white w-[500px] p-6 rounded-lg shadow border">
      <h2 className="text-xl font-semibold mb-4">Edit Product</h2>

      <form onSubmit={handleSubmit} className="space-y-4">

        <input
          name="product_name"
          value={form.product_name}
          onChange={handleChange}
          placeholder="Product Name"
          className="w-full p-2 border rounded"
        />

        <input
          name="model"
          value={form.model}
          onChange={handleChange}
          placeholder="Model"
          className="w-full p-2 border rounded"
        />

        <input
          name="price"
          value={form.price}
          onChange={handleChange}
          placeholder="Price"
          type="number"
          className="w-full p-2 border rounded"
        />

        <input
          name="sale_price"
          value={form.sale_price}
          onChange={handleChange}
          placeholder="Sale Price"
          type="number"
          className="w-full p-2 border rounded"
        />

        <input
          name="down_payment"
          value={form.down_payment}
          onChange={handleChange}
          placeholder="Down Payment"
          type="number"
          className="w-full p-2 border rounded"
        />

        <input
          name="installment_duration"
          value={form.installment_duration}
          onChange={handleChange}
          placeholder="Installment Duration"
          type="number"
          className="w-full p-2 border rounded"
        />

        <textarea
          name="notes"
          value={form.notes}
          onChange={handleChange}
          placeholder="Notes"
          className="w-full p-2 border rounded"
        ></textarea>

        <div className="flex justify-end gap-3">
          <button
            type="button"
            onClick={onCancel}
            className="px-4 py-2 bg-gray-300 rounded"
          >
            Cancel
          </button>

          <button
            type="submit"
            disabled={saving}
            className="px-4 py-2 bg-blue-600 text-white rounded"
          >
            {saving ? "Saving..." : "Save Changes"}
          </button>
        </div>

      </form>
    </div>
  );
}
