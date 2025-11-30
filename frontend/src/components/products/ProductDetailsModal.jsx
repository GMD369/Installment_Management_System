import React, { useEffect, useState } from "react";
import { getProductById } from "../../api/product";

export default function ProductDetailsModal({ id, onClose }) {
  const [loading, setLoading] = useState(true);
  const [p, setP] = useState(null);

  useEffect(() => {
    getProductById(id)
      .then((data) => setP(data || null))
      .catch(() => alert("Failed to load product details"))
      .finally(() => setLoading(false));
  }, [id]);

  return (
    <div className="bg-white w-[450px] p-6 rounded-lg shadow border">
      {loading ? (
        <div>Loading...</div>
      ) : (
        <>
          <h2 className="text-xl font-semibold mb-4">{p.product_name}</h2>

          <div className="space-y-1 text-sm">
            <p><strong>Model:</strong> {p.model}</p>
            <p><strong>Price:</strong> {p.price}</p>
            <p><strong>Sale Price:</strong> {p.sale_price}</p>
            <p><strong>Down Payment:</strong> {p.down_payment}</p>
            <p><strong>Installment Duration:</strong> {p.installment_duration}</p>
            <p><strong>Notes:</strong> {p.notes}</p>
          </div>

          <div className="flex justify-end mt-5">
            <button
              onClick={onClose}
              className="px-4 py-2 bg-blue-600 text-white rounded"
            >
              Close
            </button>
          </div>
        </>
      )}
    </div>
  );
}
