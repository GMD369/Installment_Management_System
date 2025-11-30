import React, { useEffect, useState } from "react";
import AddProduct from "./AddProduct";
import EditProduct from "./EditProduct";
import ProductDetailsModal from "./ProductDetailsModal";
import {
  getAllProducts,
  deleteProduct
} from "../../api/product";

export default function ProductList() {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(false);

  const [showAdd, setShowAdd] = useState(false);
  const [editingId, setEditingId] = useState(null);
  const [detailsId, setDetailsId] = useState(null);

  const fetchProducts = async () => {
    setLoading(true);
    try {
      const data = await getAllProducts();
      console.log("getAllProducts response:", data);
      setProducts(data || []);
    } catch (err) {
      alert(err.message || "Failed to load products");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchProducts();
  }, []);

  const handleDelete = async (id) => {
    if (!confirm("Delete this product?")) return;

    try {
      await deleteProduct(id);
      setProducts((prev) => prev.filter((p) => p.id !== id));
    } catch (err) {
      alert(err.message || "Failed to delete product");
    }
  };

  const openDetails = (id) => setDetailsId(id);

  return (
    <div className="max-w-7xl mx-auto">

      <div className="flex items-center justify-between mb-6">
        <h1 className="text-2xl font-semibold text-gray-800">Products</h1>

        <button
          onClick={() => setShowAdd(true)}
          className="px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-md shadow"
        >
          Add Product
        </button>
      </div>

      <div className="bg-white rounded-lg shadow p-4 border">
        {loading ? (
          <div className="text-center py-12 text-gray-500">Loading...</div>
        ) : products?.length === 0 ? (
          <div className="text-center py-12 text-gray-500">
            No products found.
          </div>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full text-sm text-left">
              <thead className="text-xs text-gray-500 uppercase bg-gray-50">
                <tr>
                  <th className="px-4 py-3">Product Name</th>
                  <th className="px-4 py-3">Model</th>
                  <th className="px-4 py-3">Price</th>
                  <th className="px-4 py-3">Sale Price</th>
                  <th className="px-4 py-3">Installments</th>
                  <th className="px-4 py-3">Actions</th>
                </tr>
              </thead>

              <tbody>
                {products.map((p) => (
                  <tr
                    key={p.id}
                    className="border-b last:border-b-0 hover:bg-gray-100 cursor-pointer"
                    onClick={() => openDetails(p.id)}
                  >
                    <td className="px-4 py-3">{p.product_name}</td>
                    <td className="px-4 py-3">{p.model}</td>
                    <td className="px-4 py-3">{p.price}</td>
                    <td className="px-4 py-3">{p.sale_price}</td>
                    <td className="px-4 py-3">{p.installment_duration || "-"}</td>

                    <td className="px-4 py-3">
                      <div className="flex gap-2">

                        <button
                          onClick={(e) => {
                            e.stopPropagation();
                            setEditingId(p.id);
                          }}
                          className="px-3 py-1 bg-yellow-100 text-yellow-800 rounded-md hover:bg-yellow-200"
                        >
                          Edit
                        </button>

                        <button
                          onClick={(e) => {
                            e.stopPropagation();
                            handleDelete(p.id);
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

      {/* Add Product Modal */}
      {showAdd && (
        <div className="fixed inset-0 bg-black/40 flex items-start justify-center p-6 z-50">
          <div className="mt-12">
            <AddProduct
              onClose={() => setShowAdd(false)}
              onSuccess={() => {
                setShowAdd(false);
                fetchProducts();
              }}
            />
          </div>
        </div>
      )}

      {/* Edit Product Modal */}
      {editingId && (
        <div className="fixed inset-0 bg-black/40 flex items-start justify-center p-6 z-50">
          <div className="mt-12">
            <EditProduct
              id={editingId}
              onCancel={() => setEditingId(null)}
              onSaved={() => {
                setEditingId(null);
                fetchProducts();
              }}
            />
          </div>
        </div>
      )}

      {/* Product Details Modal */}
      {detailsId && (
        <div className="fixed inset-0 bg-black/40 flex items-center justify-center p-6 z-50">
          <ProductDetailsModal
            id={detailsId}
            onClose={() => setDetailsId(null)}
          />
        </div>
      )}
    </div>
  );
}
