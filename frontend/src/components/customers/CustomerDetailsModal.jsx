import React, { useEffect, useState } from "react";
import { getCustomerById } from "../../api/customers";

export default function CustomerDetailsModal({ id, onClose }) {
  const [loading, setLoading] = useState(true);
  const [customer, setCustomer] = useState(null);

  useEffect(() => {
    if (!id) return;
    getCustomerById(id)
      .then((data) => {
        setCustomer(data?.customer || data || null);
      })
      .catch(() => alert("Failed to load customer info"))
      .finally(() => setLoading(false));
  }, [id]);

  return (
    <div className="bg-white rounded-xl shadow p-6 w-[500px]">
      {loading ? (
        <div className="text-center py-6">Loading...</div>
      ) : !customer ? (
        <div className="text-center py-6 text-gray-500">No details found.</div>
      ) : (
        <>
          <h2 className="text-xl font-semibold mb-4">{customer.name}</h2>

          <div className="space-y-2 text-sm">
            <p><strong>Phone:</strong> {customer.phone}</p>
            <p><strong>CNIC:</strong> {customer.cnic}</p>
            <p><strong>Address:</strong> {customer.address}</p>
            <p><strong>Reference Name:</strong> {customer.reference_name}</p>
            <p><strong>Reference Phone:</strong> {customer.reference_phone}</p>
          </div>

          <div className="flex justify-end mt-6">
            <button
              onClick={onClose}
              className="px-4 py-2 bg-blue-600 text-white rounded-md"
            >
              Close
            </button>
          </div>
        </>
      )}
    </div>
  );
}
