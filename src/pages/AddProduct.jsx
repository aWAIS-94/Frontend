import { useState, useContext } from "react";
import { AuthContext } from "../context/AuthContext";
import React from "react";
export default function AddProduct() {
  const { token } = useContext(AuthContext);
  const [form, setForm] = useState({ name:"", price:"", description:"", category:"" });
  const [image, setImage] = useState(null);

  async function handleSubmit(e) {
    e.preventDefault();
    const fd = new FormData();
    Object.keys(form).forEach(k => fd.append(k, form[k]));
    fd.append("image", image);

    const res = await fetch("http://localhost:5000/api/products", {
      method: "POST",
      headers: { Authorization: `Bearer ${token}` },
      body: fd,
    });

    const data = await res.json();
    alert("Product Added");
  }

  return (
    <div className="max-w-lg mx-auto mt-10 bg-white p-6 rounded shadow">
      <h2 className="text-2xl font-bold mb-4">Add Product</h2>

      <form onSubmit={handleSubmit}>
        <input className="border p-2 w-full mb-3"
          placeholder="Name"
          onChange={(e)=>setForm({...form, name:e.target.value})}
        />

        <input className="border p-2 w-full mb-3"
          placeholder="Price"
          type="number"
          onChange={(e)=>setForm({...form, price:e.target.value})}
        />

        <textarea className="border p-2 w-full mb-3"
          placeholder="Description"
          onChange={(e)=>setForm({...form, description:e.target.value})}
        />

        <input className="border p-2 w-full mb-3"
          placeholder="Category"
          onChange={(e)=>setForm({...form, category:e.target.value})}
        />

        <input type="file" className="mb-3"
          onChange={(e)=>setImage(e.target.files[0])}
        />

        <button className="bg-blue-600 text-white p-2 w-full rounded">
          Add Product
        </button>
      </form>
    </div>
  );
}
