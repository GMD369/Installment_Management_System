import React, { useEffect, useState } from "react";
import { getCustomerById, updateCustomer } from "../../api/customers";

export default function EditCustomer({ id, onCancel, onSaved }) {
  const [loading, setLoading] = useState(false);
  const [saving, setSaving] = useState(false);
  const [form, setForm] = useState({
    name: "",
    phone: "",
    cnic: "",
    address: "",
    reference_name: "",
    reference_phone: "",
  });
  const [documentFile, setDocumentFile] = useState(null);

  useEffect(() => {
    if (!id) return;
    setLoading(true);
    getCustomerById(id)
      .then((data) => {
        console.log("getCustomerById response:", data);
        const c = data?.customer || data || {};
        setForm({
          name: c.name || "",
          phone: c.phone || "",
          cnic: c.cnic || "",
          address: c.address || "",
          reference_name: c.reference_name || c.reference || "",
          reference_phone: c.reference_phone || "",
        });
      })
      .catch((err) => alert(err.message || "Failed to load customer"))
      .finally(() => setLoading(false));
  }, [id]);

  const handleChange = (e) => setForm({ ...form, [e.target.name]: e.target.value });

  const handleSubmit = async (e) => {
    e.preventDefault();
    setSaving(true);
    try {
      if (documentFile) {
        const fd = new FormData();
        Object.keys(form).forEach((k) => fd.append(k, form[k] ?? ""));
        fd.append("document", documentFile);
        console.log("Updating as FormData (with file)");
        await updateCustomer(id, fd);
      } else {
        const payload = { ...form };
        console.log("Updating as JSON payload", payload);
        await updateCustomer(id, payload);
      }
      onSaved();
    } catch (err) {
      alert(err.message || "Failed to update");
    } finally {
      setSaving(false);
    }
  };

  if (loading) return <div className="p-6 bg-white rounded shadow">Loading...</div>;

  return (
    <div className="bg-white rounded-xl shadow-[0_8px_30px_rgba(0,0,0,0.12)] p-6 border">
      <h2 className="text-2xl font-semibold text-gray-800 mb-4">Edit Customer</h2>
      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label className="block text-sm font-medium text-gray-600 mb-1">Name</label>
          <input
            name="name"
            value={form.name}
            onChange={handleChange}
            className="w-full px-3 py-2 rounded-lg border border-gray-300 focus:border-blue-500 focus:ring-2 focus:ring-blue-200"
            required
          />
        </div>

        <div className="grid grid-cols-2 gap-3">
          <div>
            <label className="block text-sm font-medium text-gray-600 mb-1">Phone</label>
            <input name="phone" value={form.phone} onChange={handleChange} className="w-full px-3 py-2 rounded-lg border border-gray-300" />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-600 mb-1">CNIC</label>
            <input name="cnic" value={form.cnic} onChange={handleChange} className="w-full px-3 py-2 rounded-lg border border-gray-300" />
          </div>
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-600 mb-1">Address</label>
          <input name="address" value={form.address} onChange={handleChange} className="w-full px-3 py-2 rounded-lg border border-gray-300" />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-600 mb-1">Reference Name</label>
          <input name="reference_name" value={form.reference_name} onChange={handleChange} className="w-full px-3 py-2 rounded-lg border border-gray-300" />

          <label className="block text-sm font-medium text-gray-600 mb-1 mt-3">Reference Phone (optional)</label>
          <input name="reference_phone" value={form.reference_phone} onChange={handleChange} className="w-full px-3 py-2 rounded-lg border border-gray-300" />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-600 mb-1">Replace Document (optional)</label>
          <input type="file" onChange={(e) => setDocumentFile(e.target.files[0])} className="w-full text-sm text-gray-700" />
        </div>

        <div className="flex justify-end gap-3 pt-3">
          <button type="button" onClick={onCancel} className="px-4 py-2 rounded-lg bg-gray-200 text-gray-700">Cancel</button>
          <button type="submit" disabled={saving} className="px-5 py-2 rounded-lg bg-blue-600 text-white">
            {saving ? "Saving..." : "Save Changes"}
          </button>
        </div>
      </form>
    </div>
  );
}
