import React, { useEffect, useState } from "react";
import AddCustomer from "./AddCustomer";
import EditCustomer from "./EditCustomer";
import CustomerDetailsModal from "./CustomerDetailsModal";
import { getCustomers, deleteCustomer } from "../../api/customers";

export default function CustomerList() {
  const [customers, setCustomers] = useState([]);
  const [loading, setLoading] = useState(false);

  const [showAdd, setShowAdd] = useState(false);
  const [editingId, setEditingId] = useState(null);

  const [showDetailsId, setShowDetailsId] = useState(null); // NEW STATE

  const fetchCustomers = async () => {
    setLoading(true);
    try {
      const data = await getCustomers();
      console.log("getCustomers response:", data);
      setCustomers(data?.customers || data || []);
    } catch (err) {
      alert(err.message || "Failed to load customers");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchCustomers();
  }, []);

  const handleDelete = async (id) => {
    if (!confirm("Delete this customer?")) return;
    try {
      await deleteCustomer(id);
      setCustomers((prev) =>
        prev.filter((c) => (c.id || c._id) !== id)
      );
    } catch (err) {
      alert(err.message || "Failed to delete");
    }
  };

  const openDetails = (id) => {
    setShowDetailsId(id);
  };

  return (
    <div className="max-w-6xl mx-auto p-6">

      {/* Header */}
      <div className="flex items-center justify-between mb-6">
        <h1 className="text-2xl font-semibold text-gray-800">Customers</h1>

        <button
          onClick={() => setShowAdd(true)}
          className="px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-md shadow"
        >
          Add Customer
        </button>
      </div>

      {/* Table */}
      <div className="bg-white rounded-lg shadow p-4 border">
        {loading ? (
          <div className="text-center py-12 text-gray-500">Loading...</div>
        ) : customers?.length === 0 ? (
          <div className="text-center py-12 text-gray-500">No customers yet.</div>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full text-sm text-left">
              <thead className="text-xs text-gray-500 uppercase bg-gray-50">
                <tr>
                  <th className="px-4 py-3">Name</th>
                  <th className="px-4 py-3">Phone</th>
                  <th className="px-4 py-3">CNIC</th>
                  <th className="px-4 py-3">Address</th>
                  <th className="px-4 py-3">Reference</th>
                  <th className="px-4 py-3">Actions</th>
                </tr>
              </thead>

              <tbody>
                {customers.map((c) => (
                  <tr
                    key={c._id || c.id}
                    className="border-b last:border-b-0 hover:bg-gray-100 cursor-pointer"
                    onClick={() => openDetails(c._id || c.id)} // OPEN DETAILS ON ROW CLICK
                  >
                    <td className="px-4 py-3">{c.name}</td>
                    <td className="px-4 py-3">{c.phone}</td>
                    <td className="px-4 py-3">{c.cnic}</td>
                    <td className="px-4 py-3 truncate max-w-[240px]">{c.address}</td>
                    <td className="px-4 py-3">
                      {c.reference_name || c.reference || ""}
                      {c.reference_phone ? (
                        <div className="text-xs text-gray-500">
                          {c.reference_phone}
                        </div>
                      ) : null}
                    </td>

                    <td className="px-4 py-3">
                      <div className="flex gap-2">
                        <button
                          onClick={(e) => {
                            e.stopPropagation(); // Prevent row click
                            setEditingId(c._id || c.id);
                          }}
                          className="px-3 py-1 bg-yellow-100 text-yellow-800 rounded-md hover:bg-yellow-200"
                        >
                          Edit
                        </button>

                        <button
                          onClick={(e) => {
                            e.stopPropagation(); // Prevent row click
                            handleDelete(c._id || c.id);
                          }}
                          className="px-3 py-1 bg-red-100 text-red-800 rounded-md hover:bg-red-200"
                        >
                          Delete
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

      {/* Add Customer Modal */}
      {showAdd && (
        <div className="fixed inset-0 bg-black/40 flex items-start justify-center p-6 z-50">
          <div className="mt-12">
            <AddCustomer
              onClose={() => setShowAdd(false)}
              onSuccess={() => {
                setShowAdd(false);
                fetchCustomers();
              }}
            />
          </div>
        </div>
      )}

      {/* Edit Customer Modal */}
      {editingId && (
        <div className="fixed inset-0 bg-black/40 flex items-start justify-center p-6 z-50">
          <div className="mt-12 w-[720px]">
            <EditCustomer
              id={editingId}
              onCancel={() => setEditingId(null)}
              onSaved={() => {
                setEditingId(null);
                fetchCustomers();
              }}
            />
          </div>
        </div>
      )}

      {/* Customer Details Modal */}
      {showDetailsId && (
        <div className="fixed inset-0 bg-black/40 flex items-center justify-center p-6 z-50">
          <CustomerDetailsModal
            id={showDetailsId}
            onClose={() => setShowDetailsId(null)}
          />
        </div>
      )}
    </div>
  );
}
