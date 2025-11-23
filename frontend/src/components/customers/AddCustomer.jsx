import React, { useState } from "react";
import { addCustomer } from "../../api/customers";

export default function AddCustomer({ onClose, onSuccess }) {
  const [loading, setLoading] = useState(false);

  const [form, setForm] = useState({
    name: "",
    phone: "",
    cnic: "",
    address: "",
    reference_name: "",
    reference_phone: "",
  });

  const [documentFile, setDocumentFile] = useState(null);

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      if (documentFile) {
        const fd = new FormData();
        fd.append("name", form.name);
        fd.append("phone", form.phone);
        fd.append("cnic", form.cnic);
        fd.append("address", form.address);
        fd.append("reference_name", form.reference_name);
        fd.append("reference_phone", form.reference_phone);
        fd.append("document", documentFile);

        try {
          for (const pair of fd.entries()) console.log("FormData:", pair[0], pair[1]);
        } catch (err) {
          console.warn("FormData log error", err);
        }

        console.log("Sending as FormData (with file)");
        await addCustomer(fd);
      } else {
        const payload = {
          name: form.name,
          phone: form.phone,
          cnic: form.cnic,
          address: form.address,
          reference_name: form.reference_name,
          reference_phone: form.reference_phone,
        };

        console.log("Sending as JSON payload", payload);
        await addCustomer(payload);
      }

      onSuccess();
      onClose();
    } catch (err) {
      alert(err.message || "Failed to add customer.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="w-[450px] bg-white rounded-xl shadow-[0_8px_30px_rgba(0,0,0,0.12)] p-6 border border-gray-100">

      <h2 className="text-2xl font-semibold text-gray-800 mb-5 pb-2 border-b">Add New Customer</h2>

      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label className="block text-sm font-medium text-gray-600 mb-1">Customer Name</label>
          <input
            name="name"
            value={form.name}
            onChange={handleChange}
            placeholder="Enter customer name"
            className="w-full px-3 py-2 rounded-lg border border-gray-300 focus:border-blue-500 focus:ring-2 focus:ring-blue-200 outline-none transition"
            required
          />
        </div>

        <div className="grid grid-cols-2 gap-3">
          <div>
            <label className="block text-sm font-medium text-gray-600 mb-1">Phone</label>
            <input
              name="phone"
              value={form.phone}
              onChange={handleChange}
              placeholder="03xx-xxxxxxx"
              className="w-full px-3 py-2 rounded-lg border border-gray-300 focus:border-blue-500 focus:ring-2 focus:ring-blue-200 transition"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-600 mb-1">CNIC</label>
            <input
              name="cnic"
              value={form.cnic}
              onChange={handleChange}
              placeholder="xxxxx-xxxxxxx-x"
              className="w-full px-3 py-2 rounded-lg border border-gray-300 focus:border-blue-500 focus:ring-2 focus:ring-blue-200 transition"
            />
          </div>
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-600 mb-1">Address</label>
          <input
            name="address"
            value={form.address}
            onChange={handleChange}
            placeholder="Enter customer address"
            className="w-full px-3 py-2 rounded-lg border border-gray-300 focus:border-blue-500 focus:ring-2 focus:ring-blue-200 transition"
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-600 mb-1">Reference Name</label>
          <input
            name="reference_name"
            value={form.reference_name}
            onChange={handleChange}
            placeholder="Reference Name"
            className="w-full px-3 py-2 rounded-lg border border-gray-300 focus:border-blue-500 focus:ring-2 focus:ring-blue-200 transition"
          />

          <label className="block text-sm font-medium text-gray-600 mb-1 mt-3">Reference Phone (optional)</label>
          <input
            name="reference_phone"
            value={form.reference_phone}
            onChange={handleChange}
            placeholder="Reference phone e.g. 03xx-xxxxxxx"
            className="w-full px-3 py-2 rounded-lg border border-gray-300 focus:border-blue-500 focus:ring-2 focus:ring-blue-200 transition"
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-600 mb-1">Document (optional)</label>
          <input
            type="file"
            onChange={(e) => setDocumentFile(e.target.files[0])}
            className="w-full text-sm text-gray-700 border border-gray-300 rounded-lg p-2 file:mr-4 file:py-1 file:px-3 file:rounded-lg file:border-0 file:bg-blue-50 file:text-blue-700 hover:file:bg-blue-100"
          />
        </div>

        <div className="flex justify-end gap-3 pt-3">
          <button
            type="button"
            onClick={onClose}
            className="px-4 py-2 rounded-lg bg-gray-200 hover:bg-gray-300 text-gray-700 transition"
          >
            Cancel
          </button>

          <button
            type="submit"
            disabled={loading}
            className="px-5 py-2 rounded-lg bg-blue-600 hover:bg-blue-700 text-white shadow transition disabled:opacity-50"
          >
            {loading ? "Saving..." : "Save Customer"}
          </button>
        </div>
      </form>
    </div>
  );
}
