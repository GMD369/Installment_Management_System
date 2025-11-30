import React, { useEffect, useState } from "react";
import { updateInstallment, getInstallmentsByCustomer } from "../../api/installments";

export default function EditInstallment({ id, customerId, onClose }) {
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [form, setForm] = useState({
    due_date: "",
    amount: "",
    notes: "",
  });

  useEffect(() => {
    if (customerId && id) {
      fetchInstallment();
    }
  }, [id, customerId]);

  const fetchInstallment = async () => {
    setLoading(true);
    try {
      const list = await getInstallmentsByCustomer(customerId);
      const installment = list.find((x) => x.id === id);
      if (installment) {
        setForm({
          due_date: installment.due_date,
          amount: installment.amount || "",
          notes: installment.notes || "",
        });
      }
    } catch (err) {
      alert("Failed to load installment details");
    } finally {
      setLoading(false);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setSaving(true);
    try {
      await updateInstallment(id, form);
      alert("Installment updated successfully!");
      onClose();
    } catch (err) {
      alert(err.message || "Failed to update installment");
    } finally {
      setSaving(false);
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm({ ...form, [name]: value });
  };

  if (loading) {
    return (
      <div className="bg-white p-6 w-[450px] rounded-xl shadow-lg border">
        <div className="text-center py-8 text-gray-500">Loading...</div>
      </div>
    );
  }

  return (
    <div className="bg-white p-6 w-[450px] rounded-xl shadow-lg border">
      <h2 className="text-xl font-semibold mb-4 text-gray-800">Edit Installment</h2>

      <form onSubmit={handleSubmit} className="space-y-4">
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
            disabled={saving}
            className="px-5 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-lg font-medium transition disabled:opacity-50"
          >
            {saving ? "Saving..." : "Save Changes"}
          </button>
        </div>
      </form>
    </div>
  );
}
