import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  getInstallmentsByCustomer,
  markInstallmentPaid,
  deleteInstallment,
} from "../../api/installments";
import { getCustomers } from "../../api/customers";
import { getAllProducts } from "../../api/product";
import EditInstallment from "./EditInstallment";
import AddInstallment from "./AddInstallment";
import { CheckCircle, Clock, Search, Filter } from "lucide-react";

export default function InstallmentList({ customerId }) {
  const navigate = useNavigate();
  const [installments, setInstallments] = useState([]);
  const [customers, setCustomers] = useState([]);
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(false);
  const [editingId, setEditingId] = useState(null);
  const [showAdd, setShowAdd] = useState(false);
  const [filterStatus, setFilterStatus] = useState("all");
  const [searchTerm, setSearchTerm] = useState("");

  const fetchData = async () => {
    setLoading(true);
    try {
      if (customerId) {
        // For customer-specific view
        const res = await getInstallmentsByCustomer(customerId);
        setInstallments(res || []);
      } else {
        // For global view - fetch all customers' installments
        const customersData = await getCustomers();
        setCustomers(customersData || []);
        
        const productsData = await getAllProducts();
        setProducts(productsData || []);
        
        // Fetch installments for all customers
        const allInstallments = [];
        for (const customer of customersData || []) {
          try {
            const custInstallments = await getInstallmentsByCustomer(customer.id);
            if (custInstallments && custInstallments.length > 0) {
              allInstallments.push(...custInstallments.map(inst => ({
                ...inst,
                customer_name: customer.name,
                customer_phone: customer.phone
              })));
            }
          } catch (err) {
            console.error(`Error fetching installments for customer ${customer.id}:`, err);
          }
        }
        setInstallments(allInstallments);
      }
    } catch (err) {
      console.error("Failed to load installments:", err);
      alert("Failed to load installments");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchData();
  }, [customerId]);

  const handleMarkPaid = async (id) => {
    try {
      await markInstallmentPaid(id);
      fetchData();
    } catch (err) {
      alert("Failed to mark as paid");
    }
  };

  const handleDelete = async (id) => {
    if (!confirm("Delete installment?")) return;
    try {
      await deleteInstallment(id);
      fetchData();
    } catch (err) {
      alert("Failed to delete installment");
    }
  };

  const getProductName = (productId) => {
    const product = products.find(p => p.id === productId);
    return product ? product.product_name : `Product #${productId}`;
  };

  // Filter and search installments
  const filteredInstallments = installments.filter(inst => {
    const statusMatch = filterStatus === "all" || inst.status === filterStatus;
    const searchMatch = !searchTerm || 
      inst.customer_name?.toLowerCase().includes(searchTerm.toLowerCase()) ||
      inst.customer_phone?.includes(searchTerm);
    return statusMatch && searchMatch;
  });

  // For customer-specific view (simple layout)
  if (customerId) {
    return (
      <div className="bg-white p-4 rounded-lg shadow border mt-4">
        <div className="flex justify-between items-center mb-3">
          <h2 className="text-lg font-semibold">Installments</h2>

          <button
            onClick={() => setShowAdd(true)}
            className="px-3 py-1 bg-blue-600 text-white rounded hover:bg-blue-700"
          >
            Add Installment
          </button>
        </div>

        {loading ? (
          <div className="text-center py-8 text-gray-500">Loading...</div>
        ) : installments.length === 0 ? (
          <div className="text-center py-8 text-gray-500">No installments found.</div>
        ) : (
          <table className="w-full text-sm">
            <thead>
              <tr className="text-left bg-gray-100">
                <th className="p-2">Due Date</th>
                <th className="p-2">Amount</th>
                <th className="p-2">Status</th>
                <th className="p-2">Paid Date</th>
                <th className="p-2">Actions</th>
              </tr>
            </thead>

            <tbody>
              {installments.map((i) => (
                <tr key={i.id} className="border-b hover:bg-gray-50">
                  <td className="p-2">{i.due_date}</td>
                  <td className="p-2">PKR {i.amount?.toLocaleString()}</td>
                  <td className="p-2">
                    {i.status === "paid" ? (
                      <span className="px-2 py-1 bg-green-100 text-green-700 rounded-full text-xs font-semibold">Paid</span>
                    ) : (
                      <span className="px-2 py-1 bg-orange-100 text-orange-700 rounded-full text-xs font-semibold">Pending</span>
                    )}
                  </td>
                  <td className="p-2">{i.paid_date || "-"}</td>

                  <td className="p-2">
                    <div className="flex gap-2">
                      {i.status !== "paid" && (
                        <button
                          onClick={() => handleMarkPaid(i.id)}
                          className="px-2 py-1 bg-green-100 text-green-700 rounded hover:bg-green-200"
                        >
                          Mark Paid
                        </button>
                      )}

                      <button
                        onClick={() => setEditingId(i.id)}
                        className="px-2 py-1 bg-yellow-100 text-yellow-800 rounded hover:bg-yellow-200"
                      >
                        Edit
                      </button>

                      <button
                        onClick={() => handleDelete(i.id)}
                        className="px-2 py-1 bg-red-100 text-red-800 rounded hover:bg-red-200"
                      >
                        Delete
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        )}

        {editingId && (
          <div className="fixed inset-0 bg-black/40 flex justify-center items-center p-6 z-50">
            <EditInstallment
              id={editingId}
              customerId={customerId}
              onClose={() => {
                setEditingId(null);
                fetchData();
              }}
            />
          </div>
        )}

        {showAdd && (
          <div className="fixed inset-0 bg-black/40 flex justify-center items-center p-6 z-50">
            <AddInstallment
              customerId={customerId}
              onClose={() => {
                setShowAdd(false);
                fetchData();
              }}
            />
          </div>
        )}
      </div>
    );
  }

  // For global view (professional layout)
  return (
    <div className="max-w-7xl mx-auto">
      {/* Header */}
      <div className="flex items-center justify-between mb-6">
        <div>
          <h1 className="text-2xl font-semibold text-gray-800">All Installments</h1>
          <p className="text-sm text-gray-600 mt-1">View and manage all customer installments</p>
        </div>
        <button
          onClick={() => setShowAdd(true)}
          className="px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-lg shadow font-medium transition"
        >
          + Add Installment
        </button>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-6">
        <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-600 mb-1">Total Installments</p>
              <h3 className="text-2xl font-bold text-gray-800">{installments.length}</h3>
            </div>
            <div className="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center">
              <Clock className="w-6 h-6 text-blue-600" />
            </div>
          </div>
        </div>

        <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-600 mb-1">Paid Installments</p>
              <h3 className="text-2xl font-bold text-gray-800">
                {installments.filter(i => i.status === "paid").length}
              </h3>
            </div>
            <div className="w-12 h-12 bg-green-100 rounded-full flex items-center justify-center">
              <CheckCircle className="w-6 h-6 text-green-600" />
            </div>
          </div>
        </div>

        <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-600 mb-1">Pending Payments</p>
              <h3 className="text-2xl font-bold text-gray-800">
                {installments.filter(i => i.status === "pending").length}
              </h3>
            </div>
            <div className="w-12 h-12 bg-orange-100 rounded-full flex items-center justify-center">
              <Clock className="w-6 h-6 text-orange-600" />
            </div>
          </div>
        </div>
      </div>

      {/* Filters */}
      <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-4 mb-6">
        <div className="flex flex-wrap gap-4 items-center">
          <div className="flex items-center gap-2">
            <Filter className="w-5 h-5 text-gray-600" />
            <select
              value={filterStatus}
              onChange={(e) => setFilterStatus(e.target.value)}
              className="px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
            >
              <option value="all">All Status</option>
              <option value="paid">Paid</option>
              <option value="pending">Pending</option>
            </select>
          </div>

          <div className="flex-1 min-w-[200px]">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
              <input
                type="text"
                placeholder="Search by customer name or phone..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
              />
            </div>
          </div>
        </div>
      </div>

      {/* Table */}
      <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-4">
        {loading ? (
          <div className="text-center py-12 text-gray-500">Loading installments...</div>
        ) : filteredInstallments.length === 0 ? (
          <div className="text-center py-12 text-gray-500">No installments found.</div>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead className="text-xs text-gray-500 uppercase bg-gray-50">
                <tr>
                  <th className="px-4 py-3 text-left">Customer</th>
                  <th className="px-4 py-3 text-left">Product</th>
                  <th className="px-4 py-3 text-left">Due Date</th>
                  <th className="px-4 py-3 text-right">Amount</th>
                  <th className="px-4 py-3 text-center">Status</th>
                  <th className="px-4 py-3 text-left">Paid Date</th>
                  <th className="px-4 py-3 text-center">Actions</th>
                </tr>
              </thead>

              <tbody>
                {filteredInstallments.map((inst) => (
                  <tr key={inst.id} className="border-b last:border-b-0 hover:bg-gray-50">
                    <td className="px-4 py-3">
                      <div>
                        <p className="font-medium text-gray-800">{inst.customer_name || `Customer #${inst.customer_id}`}</p>
                        <p className="text-xs text-gray-600">{inst.customer_phone}</p>
                      </div>
                    </td>
                    <td className="px-4 py-3">{getProductName(inst.product_id)}</td>
                    <td className="px-4 py-3">{inst.due_date}</td>
                    <td className="px-4 py-3 text-right font-semibold">PKR {inst.amount?.toLocaleString()}</td>
                    <td className="px-4 py-3 text-center">
                      <span
                        className={`px-3 py-1 rounded-full text-xs font-semibold ${
                          inst.status === "paid"
                            ? "bg-green-100 text-green-700"
                            : "bg-orange-100 text-orange-700"
                        }`}
                      >
                        {inst.status}
                      </span>
                    </td>
                    <td className="px-4 py-3">{inst.paid_date || "-"}</td>
                    <td className="px-4 py-3">
                      <div className="flex gap-2 justify-center">
                        {inst.status !== "paid" && (
                          <button
                            onClick={() => handleMarkPaid(inst.id)}
                            className="px-3 py-1 bg-green-100 text-green-700 rounded-md hover:bg-green-200 text-xs font-medium"
                          >
                            Mark Paid
                          </button>
                        )}
                        <button
                          onClick={() => navigate(`/customers/${inst.customer_id}`)}
                          className="px-3 py-1 bg-blue-100 text-blue-700 rounded-md hover:bg-blue-200 text-xs font-medium"
                        >
                          View
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>

      {editingId && (
        <div className="fixed inset-0 bg-black/40 flex justify-center items-center p-6 z-50">
          <EditInstallment
            id={editingId}
            customerId={customerId}
            onClose={() => {
              setEditingId(null);
              fetchData();
            }}
          />
        </div>
      )}

      {showAdd && (
        <div className="fixed inset-0 bg-black/40 flex justify-center items-center p-6 z-50">
          <AddInstallment
            customerId={customerId}
            onClose={() => {
              setShowAdd(false);
              fetchData();
            }}
          />
        </div>
      )}
    </div>
  );
}
