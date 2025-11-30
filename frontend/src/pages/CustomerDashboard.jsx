import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import {
  ArrowLeft,
  User,
  Phone,
  CreditCard,
  MapPin,
  UserCheck,
  Package,
  DollarSign,
  Calendar,
  CheckCircle,
  Clock,
  FileText
} from "lucide-react";
import { getCustomerDashboard } from "../api/dashboard";

export default function CustomerDashboard() {
  const { customerId } = useParams();
  const navigate = useNavigate();
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (customerId) {
      fetchCustomerData();
    }
  }, [customerId]);

  const fetchCustomerData = async () => {
    setLoading(true);
    try {
      const result = await getCustomerDashboard(customerId);
      setData(result);
    } catch (err) {
      alert(err.message || "Failed to load customer data");
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center h-screen">
        <div className="text-gray-500">Loading customer dashboard...</div>
      </div>
    );
  }

  if (!data) {
    return (
      <div className="flex items-center justify-center h-screen">
        <div className="text-red-500">Customer not found</div>
      </div>
    );
  }

  const { customer, products, installments, stats } = data;

  return (
    <div className="p-8 bg-gray-50 min-h-screen">
      {/* Back Button */}
      <button
        onClick={() => navigate("/customers")}
        className="flex items-center gap-2 text-gray-600 hover:text-gray-800 mb-6"
      >
        <ArrowLeft className="w-5 h-5" />
        Back to Customers
      </button>

      {/* Customer Info Card */}
      <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6 mb-6">
        <h2 className="text-2xl font-bold text-gray-800 mb-4">Customer Details</h2>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 bg-blue-100 rounded-lg flex items-center justify-center">
              <User className="w-5 h-5 text-blue-600" />
            </div>
            <div>
              <p className="text-sm text-gray-600">Name</p>
              <p className="font-semibold text-gray-800">{customer.name}</p>
            </div>
          </div>

          <div className="flex items-center gap-3">
            <div className="w-10 h-10 bg-green-100 rounded-lg flex items-center justify-center">
              <Phone className="w-5 h-5 text-green-600" />
            </div>
            <div>
              <p className="text-sm text-gray-600">Phone</p>
              <p className="font-semibold text-gray-800">{customer.phone}</p>
            </div>
          </div>

          <div className="flex items-center gap-3">
            <div className="w-10 h-10 bg-purple-100 rounded-lg flex items-center justify-center">
              <CreditCard className="w-5 h-5 text-purple-600" />
            </div>
            <div>
              <p className="text-sm text-gray-600">CNIC</p>
              <p className="font-semibold text-gray-800">{customer.cnic}</p>
            </div>
          </div>

          <div className="flex items-center gap-3">
            <div className="w-10 h-10 bg-orange-100 rounded-lg flex items-center justify-center">
              <MapPin className="w-5 h-5 text-orange-600" />
            </div>
            <div>
              <p className="text-sm text-gray-600">Address</p>
              <p className="font-semibold text-gray-800">{customer.address || "N/A"}</p>
            </div>
          </div>

          {customer.reference_name && (
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 bg-pink-100 rounded-lg flex items-center justify-center">
                <UserCheck className="w-5 h-5 text-pink-600" />
              </div>
              <div>
                <p className="text-sm text-gray-600">Reference</p>
                <p className="font-semibold text-gray-800">{customer.reference_name}</p>
                {customer.reference_phone && (
                  <p className="text-sm text-gray-600">{customer.reference_phone}</p>
                )}
              </div>
            </div>
          )}

          {customer.document_path && (
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 bg-indigo-100 rounded-lg flex items-center justify-center">
                <FileText className="w-5 h-5 text-indigo-600" />
              </div>
              <div>
                <p className="text-sm text-gray-600">Document</p>
                <a
                  href={`http://localhost:5000/${customer.document_path}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-blue-600 hover:underline text-sm"
                >
                  View Document
                </a>
              </div>
            </div>
          )}
        </div>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-6">
        <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6">
          <div className="flex items-center justify-between mb-2">
            <p className="text-sm text-gray-600">Total Paid</p>
            <DollarSign className="w-5 h-5 text-green-600" />
          </div>
          <h3 className="text-2xl font-bold text-gray-800">
            PKR {stats.total_paid?.toLocaleString() || 0}
          </h3>
        </div>

        <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6">
          <div className="flex items-center justify-between mb-2">
            <p className="text-sm text-gray-600">Remaining</p>
            <Clock className="w-5 h-5 text-orange-600" />
          </div>
          <h3 className="text-2xl font-bold text-gray-800">
            PKR {stats.total_remaining?.toLocaleString() || 0}
          </h3>
        </div>

        <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6">
          <div className="flex items-center justify-between mb-2">
            <p className="text-sm text-gray-600">Paid Count</p>
            <CheckCircle className="w-5 h-5 text-green-600" />
          </div>
          <h3 className="text-2xl font-bold text-gray-800">{stats.paid_count || 0}</h3>
        </div>

        <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6">
          <div className="flex items-center justify-between mb-2">
            <p className="text-sm text-gray-600">Pending Count</p>
            <Clock className="w-5 h-5 text-orange-600" />
          </div>
          <h3 className="text-2xl font-bold text-gray-800">{stats.pending_count || 0}</h3>
        </div>
      </div>

      {/* Products & Installments */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Products */}
        <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6">
          <h2 className="text-xl font-semibold text-gray-800 mb-4 flex items-center gap-2">
            <Package className="w-5 h-5" />
            Products Purchased
          </h2>

          {products?.length === 0 ? (
            <p className="text-gray-500 text-center py-8">No products purchased yet</p>
          ) : (
            <div className="space-y-3">
              {products.map((product) => (
                <div
                  key={product.id}
                  className="p-4 bg-gray-50 rounded-lg hover:bg-gray-100 transition"
                >
                  <h3 className="font-semibold text-gray-800">{product.product_name}</h3>
                  <p className="text-sm text-gray-600">Model: {product.model || "N/A"}</p>
                  <div className="flex justify-between mt-2 text-sm">
                    <span className="text-gray-600">Sale Price:</span>
                    <span className="font-semibold text-gray-800">
                      PKR {product.sale_price?.toLocaleString()}
                    </span>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Installments */}
        <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6">
          <h2 className="text-xl font-semibold text-gray-800 mb-4 flex items-center gap-2">
            <Calendar className="w-5 h-5" />
            Installment Schedule
          </h2>

          {installments?.length === 0 ? (
            <p className="text-gray-500 text-center py-8">No installments scheduled</p>
          ) : (
            <div className="space-y-3 max-h-96 overflow-y-auto">
              {installments.map((inst) => (
                <div
                  key={inst.id}
                  className={`p-4 rounded-lg border-l-4 ${
                    inst.status === "paid"
                      ? "bg-green-50 border-green-500"
                      : "bg-orange-50 border-orange-500"
                  }`}
                >
                  <div className="flex justify-between items-start">
                    <div>
                      <p className="font-semibold text-gray-800">
                        PKR {inst.amount?.toLocaleString()}
                      </p>
                      <p className="text-sm text-gray-600">Due: {inst.due_date}</p>
                      {inst.paid_date && (
                        <p className="text-xs text-green-600 mt-1">
                          Paid: {inst.paid_date}
                        </p>
                      )}
                    </div>
                    <span
                      className={`px-3 py-1 rounded-full text-xs font-semibold ${
                        inst.status === "paid"
                          ? "bg-green-100 text-green-700"
                          : "bg-orange-100 text-orange-700"
                      }`}
                    >
                      {inst.status}
                    </span>
                  </div>
                  {inst.notes && (
                    <p className="text-sm text-gray-600 mt-2">{inst.notes}</p>
                  )}
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
