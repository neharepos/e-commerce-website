"use client";
import { useEffect, useState } from "react";

export default function AdminDashboard() {
  const [orders, setOrders] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  async function fetchAllOrders() {
    setLoading(true);
    try {
      const res = await fetch("/api/orders?admin=true");
      const data = await res.json();
      setOrders(data);
    } catch (err) {
      console.error("Failed to fetch orders", err);
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    fetchAllOrders();
  }, []);

  const orderList = Array.isArray(orders) ? orders : [];

  const stats = {
    total: orderList.length,
    new: orderList.filter((o) => o.status === "pending").length,
    processing: orderList.filter((o) => o.status === "processing").length,
    delivered: orderList.filter((o) => o.status === "delivered").length,
  };

  // Helper function for Tailwind Status Badges
  const getStatusClass = (status: string) => {
    switch (status) {
      case "pending":
        return "bg-amber-100 text-amber-700 border-amber-200";
      case "delivered":
        return "bg-emerald-100 text-emerald-700 border-emerald-200";
      case "processing":
        return "bg-blue-100 text-blue-700 border-blue-200";
      default:
        return "bg-gray-100 text-gray-700 border-gray-200";
    }
  };

  return (
    <div className="min-h-screen bg-[#0a0a0a] p-8 text-white">
      <h1 className="text-3xl font-bold mb-8">Admin Order Management</h1>

      {/* --- Order Status Summary Cards --- */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-10 text-black">
        <div className="bg-white p-6 rounded-xl shadow-md border-l-4 border-gray-400">
          <p className="text-sm font-medium text-gray-500 uppercase">Total Orders</p>
          <p className="text-2xl font-bold">{stats.total}</p>
        </div>
        <div className="bg-white p-6 rounded-xl shadow-md border-l-4 border-orange-500">
          <p className="text-sm font-medium text-gray-500 uppercase">New Orders</p>
          <p className="text-2xl font-bold">{stats.new}</p>
        </div>
        <div className="bg-white p-6 rounded-xl shadow-md border-l-4 border-blue-500">
          <p className="text-sm font-medium text-gray-500 uppercase">Processing</p>
          <p className="text-2xl font-bold">{stats.processing}</p>
        </div>
        <div className="bg-white p-6 rounded-xl shadow-md border-l-4 border-green-500">
          <p className="text-sm font-medium text-gray-500 uppercase">Delivered</p>
          <p className="text-2xl font-bold">{stats.delivered}</p>
        </div>
      </div>

      {/* --- Order List Table --- */}
      <div className="bg-white text-black rounded-xl shadow-lg overflow-hidden border border-gray-200">
        <div className="px-6 py-4 border-bottom border-gray-100 bg-gray-50">
          <h2 className="text-xl font-semibold text-gray-800">Recent Orders</h2>
        </div>
        
        <div className="overflow-x-auto">
          {loading ? (
            <div className="p-10 text-center text-gray-500 italic">Loading orders...</div>
          ) : (
            <table className="w-full text-left border-collapse">
              <thead>
                <tr className="bg-gray-100 text-gray-600 uppercase text-xs font-bold tracking-wider">
                  <th className="px-6 py-4">Order ID</th>
                  <th className="px-6 py-4">Customer</th>
                  <th className="px-6 py-4">Total</th>
                  <th className="px-6 py-4">Status</th>
                  <th className="px-6 py-4">Action</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-100">
                {orderList.map((order) => (
                  <tr key={order.id} className="hover:bg-gray-50 transition-colors">
                    <td className="px-6 py-4 font-mono text-sm text-gray-600">#{order.id}</td>
                    <td className="px-6 py-4 font-medium">{order.userName}</td>
                    <td className="px-6 py-4 font-bold text-gray-900">₹{order.totalAmount}</td>
                    <td className="px-6 py-4">
                      <span className={`px-3 py-1 rounded-full text-[10px] font-bold uppercase border ${getStatusClass(order.status)}`}>
                        {order.status}
                      </span>
                    </td>
                    <td className="px-6 py-4">
                      <button 
                        onClick={() => alert(`Viewing details for #${order.id}`)}
                        className="bg-gray-900 text-white px-4 py-1.5 rounded-lg text-sm hover:bg-gray-700 transition-all active:scale-95"
                      >
                        View
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          )}
        </div>
      </div>
    </div>
  );
}