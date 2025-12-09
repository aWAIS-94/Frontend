import { useEffect, useState, useContext } from "react";
import { AuthContext } from "../context/AuthContext";
import React from "react";
export default function MyOrders() {
  const [orders, setOrders] = useState([]);
  const { token } = useContext(AuthContext);

  useEffect(() => {
    fetch("http://localhost:5000/api/orders/my-orders", {
      headers: { Authorization: `Bearer ${token}` }
    })
    .then(res => res.json())
    .then(data => setOrders(data));
  }, []);

  return (
    <div>
      <h2 className="text-3xl font-bold mb-6">My Orders</h2>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">

        {orders.map(o => (
          <div key={o._id} className="p-4 bg-white shadow rounded">
            <h3 className="font-bold text-xl">{o.productId?.name}</h3>
            <p>Price: ₹{o.productId?.price}</p>
            <p>Status: <b>{o.status}</b></p>
          </div>
        ))}

      </div>
    </div>
  );
}
