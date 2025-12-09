import { useContext } from "react";
import { AuthContext } from "../context/AuthContext";
import { Link } from "react-router-dom";
import React from "react";

export default function Dashboard() {
  const { user } = useContext(AuthContext);

  return (
    <div className="max-w-4xl mx-auto mt-10">
      <h1 className="text-3xl font-bold mb-4">Hello, {user?.name} 👋</h1>

      <p className="text-gray-700 mb-8">
        You are logged in as: <span className="font-semibold">{user?.role}</span>
      </p>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        
        {/* ALL USERS CAN SEE PRODUCTS */}
        <Link
          to="/"
          className="block p-6 rounded-lg shadow bg-white hover:bg-blue-50 transition"
        >
          <h2 className="text-xl font-bold mb-2">View Products</h2>
          <p>Browse all available items added by shopkeepers.</p>
        </Link>

        {/* CUSTOMERS ONLY */}
        {user?.role === "customer" && (
          <Link
            to="/orders"
            className="block p-6 rounded-lg shadow bg-white hover:bg-blue-50 transition"
          >
            <h2 className="text-xl font-bold mb-2">My Orders</h2>
            <p>Track all your orders and their status.</p>
          </Link>
        )}

        {/* SHOPKEEPERS ONLY */}
        {user?.role === "shopkeeper" && (
          <>
            <Link
              to="/add-product"
              className="block p-6 rounded-lg shadow bg-white hover:bg-blue-50 transition"
            >
              <h2 className="text-xl font-bold mb-2">Add Product</h2>
              <p>Upload new products to your shop.</p>
            </Link>

            <Link
              to="/shop-products"
              className="block p-6 rounded-lg shadow bg-white hover:bg-blue-50 transition"
            >
              <h2 className="text-xl font-bold mb-2">My Shop Products</h2>
              <p>View and manage products uploaded by you.</p>
            </Link>
          </>
        )}

      </div>
    </div>
  );
}
