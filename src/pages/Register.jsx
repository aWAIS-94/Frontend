import { useState } from "react";
import React from "react";

export default function Register() {
  const [userData, setUserData] = useState({
    name: "", email: "", password: "", role: "customer"
  });

  async function handleRegister(e) {
    e.preventDefault();

    const res = await fetch("http://localhost:5000/api/auth/register", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(userData),
    });

    const data = await res.json();
    alert(data.message);
  }

  return (
    <div className="max-w-md mx-auto bg-white p-6 mt-10 shadow rounded">
      <h2 className="text-2xl font-bold mb-6">Register</h2>

      <form onSubmit={handleRegister}>
        <input className="border p-2 w-full mb-3"
          placeholder="Name"
          onChange={(e)=>setUserData({...userData, name: e.target.value})}
        />

        <input className="border p-2 w-full mb-3"
          placeholder="Email"
          onChange={(e)=>setUserData({...userData, email: e.target.value})}
        />

        <input className="border p-2 w-full mb-3" type="password"
          placeholder="Password"
          onChange={(e)=>setUserData({...userData, password: e.target.value})}
        />

        <select className="border p-2 w-full mb-4"
          onChange={(e)=>setUserData({...userData, role: e.target.value})}
        >
          <option value="customer">Customer</option>
          <option value="shopkeeper">Shopkeeper</option>
        </select>

        <button className="bg-green-600 w-full text-white p-2 rounded">Register</button>
      </form>
    </div>
  );
}
