import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { getCustomerById } from "../../api/customers";
import { User, Phone, CreditCard, MapPin, UserCheck, ArrowRight } from "lucide-react";

export default function CustomerDetailsModal({ id, onClose }) {
  const navigate = useNavigate();
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

  const handleViewDashboard = () => {
    onClose();
    navigate(`/customers/${id}`);
  };

  return (
    <div className="bg-white rounded-xl shadow-xl p-6 w-[600px] max-w-full">
      {loading ? (
        <div className="text-center py-8 text-gray-500">Loading...</div>
      ) : !customer ? (
        <div className="text-center py-8 text-gray-500">No details found.</div>
      ) : (
        <>
          <div className="flex items-center justify-between mb-6 pb-4 border-b">
            <h2 className="text-2xl font-bold text-gray-800">{customer.name}</h2>
            <button
              onClick={onClose}
              className="text-gray-500 hover:text-gray-700 text-2xl leading-none"
            >
              ×
            </button>
          </div>

          <div className="space-y-4 mb-6">
            <div className="flex items-center gap-3 p-3 bg-blue-50 rounded-lg">
              <div className="w-10 h-10 bg-blue-100 rounded-full flex items-center justify-center">
                <User className="w-5 h-5 text-blue-600" />
              </div>
              <div>
                <p className="text-xs text-gray-600">Full Name</p>
                <p className="font-semibold text-gray-800">{customer.name}</p>
              </div>
            </div>

            <div className="flex items-center gap-3 p-3 bg-green-50 rounded-lg">
              <div className="w-10 h-10 bg-green-100 rounded-full flex items-center justify-center">
                <Phone className="w-5 h-5 text-green-600" />
              </div>
              <div>
                <p className="text-xs text-gray-600">Phone Number</p>
                <p className="font-semibold text-gray-800">{customer.phone}</p>
              </div>
            </div>

            <div className="flex items-center gap-3 p-3 bg-purple-50 rounded-lg">
              <div className="w-10 h-10 bg-purple-100 rounded-full flex items-center justify-center">
                <CreditCard className="w-5 h-5 text-purple-600" />
              </div>
              <div>
                <p className="text-xs text-gray-600">CNIC</p>
                <p className="font-semibold text-gray-800">{customer.cnic}</p>
              </div>
            </div>

            {customer.address && (
              <div className="flex items-center gap-3 p-3 bg-orange-50 rounded-lg">
                <div className="w-10 h-10 bg-orange-100 rounded-full flex items-center justify-center">
                  <MapPin className="w-5 h-5 text-orange-600" />
                </div>
                <div>
                  <p className="text-xs text-gray-600">Address</p>
                  <p className="font-semibold text-gray-800">{customer.address}</p>
                </div>
              </div>
            )}

            {customer.reference_name && (
              <div className="flex items-center gap-3 p-3 bg-pink-50 rounded-lg">
                <div className="w-10 h-10 bg-pink-100 rounded-full flex items-center justify-center">
                  <UserCheck className="w-5 h-5 text-pink-600" />
                </div>
                <div>
                  <p className="text-xs text-gray-600">Reference</p>
                  <p className="font-semibold text-gray-800">{customer.reference_name}</p>
                  {customer.reference_phone && (
                    <p className="text-sm text-gray-600">{customer.reference_phone}</p>
                  )}
                </div>
              </div>
            )}
          </div>

          <div className="flex gap-3">
            <button
              onClick={onClose}
              className="flex-1 px-4 py-3 bg-gray-200 hover:bg-gray-300 text-gray-700 rounded-lg font-medium transition"
            >
              Close
            </button>
            <button
              onClick={handleViewDashboard}
              className="flex-1 px-4 py-3 bg-blue-600 hover:bg-blue-700 text-white rounded-lg font-medium transition flex items-center justify-center gap-2"
            >
              View Full Dashboard
              <ArrowRight className="w-4 h-4" />
            </button>
          </div>
        </>
      )}
    </div>
  );
}
