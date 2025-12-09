import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import React from "react";

export default function ProductList() {
  const [products, setProducts] = useState([]);

  useEffect(() => {
    fetch("http://localhost:5000/api/products")
      .then(res => res.json())
      .then(data => setProducts(data));
  }, []);

  return (
    <div>
      <h2 className="text-3xl font-bold mb-6">Products</h2>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {products.map(p => (
          <div key={p._id} className="bg-white p-4 shadow rounded">
            <img src={`http://localhost:5000${p.image}`} className="h-40 w-full object-cover rounded mb-3" />

            <h3 className="font-bold text-xl">{p.name}</h3>
            <p>{p.description}</p>
            <p className="font-semibold mt-2">₹{p.price}</p>

            <Link to={`/product/${p._id}`}
              className="block bg-blue-600 text-white mt-3 px-4 py-2 rounded text-center">
              View
            </Link>
          </div>
        ))}
      </div>
    </div>
  );
}
