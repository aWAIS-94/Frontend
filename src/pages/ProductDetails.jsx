import { useEffect, useState, useContext } from "react";
import { useParams } from "react-router-dom";
import { AuthContext } from "../context/AuthContext";
import React from "react";
export default function ProductDetails() {
  const { id } = useParams();
  const { user, token } = useContext(AuthContext);

  const [product, setProduct] = useState(null);
  const [reviewText, setReviewText] = useState("");
  const [orderMessage, setOrderMessage] = useState("");

  // ---------------------------
  // 1️⃣ FETCH PRODUCT DETAILS
  // ---------------------------
  async function loadProduct() {
    const res = await fetch(`http://localhost:5000/api/products/${id}`);
    const data = await res.json();
    setProduct(data);
  }

  useEffect(() => {
    loadProduct();
  }, []);

  // ---------------------------
  // 2️⃣ PLACE ORDER (Customer)
  // ---------------------------
  async function placeOrder() {
    if (!token) return alert("Login required!");

    const res = await fetch("http://localhost:5000/api/orders", {
      method: "POST",
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ productId: id }),
    });

    const data = await res.json();
    setOrderMessage(data.message || "Order placed!");
  }

  // ---------------------------
  // 3️⃣ ADD REVIEW (Customer)
  // ---------------------------
  async function addReview() {
    if (!token) return alert("Login required!");

    const res = await fetch(`http://localhost:5000/api/reviews/${id}`, {
      method: "POST",
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ text: reviewText }),
    });

    const data = await res.json();

    if (data.message) {
      alert(data.message);
      setReviewText("");
      loadProduct(); // Reload product to update reviews
    }
  }

  if (!product) return <p className="text-center mt-10">Loading...</p>;

  return (
    <div className="max-w-3xl mx-auto mt-10">

      {/* --------------------------- */}
      {/* PRODUCT HEADER */}
      {/* --------------------------- */}
      <div className="bg-white p-6 rounded shadow">
        <img
          src={`http://localhost:5000${product.image}`}
          alt={product.name}
          className="w-full h-64 object-cover rounded mb-4"
        />

        <h1 className="text-3xl font-bold mb-2">{product.name}</h1>
        <p className="text-gray-700 mb-2">{product.description}</p>
        <p className="text-xl font-semibold mb-3">₹{product.price}</p>

        {/* Order button - only for customers */}
        {user?.role === "customer" && (
          <button
            onClick={placeOrder}
            className="bg-green-600 text-white px-4 py-2 rounded hover:bg-green-700"
          >
            Place Order
          </button>
        )}

        {orderMessage && (
          <p className="text-green-700 font-semibold mt-3">{orderMessage}</p>
        )}
      </div>

      {/* --------------------------- */}
      {/* ADD REVIEW SECTION */}
      {/* --------------------------- */}
      {user?.role === "customer" && (
        <div className="bg-white p-6 mt-6 rounded shadow">
          <h2 className="text-xl font-bold mb-3">Add Review</h2>

          <textarea
            className="w-full border p-2 rounded"
            rows="3"
            placeholder="Write your review..."
            value={reviewText}
            onChange={(e) => setReviewText(e.target.value)}
          ></textarea>

          <button
            onClick={addReview}
            className="mt-3 bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
          >
            Submit Review
          </button>
        </div>
      )}

      {/* --------------------------- */}
      {/* SHOW REVIEWS SECTION */}
      {/* --------------------------- */}
      <div className="bg-white p-6 mt-6 rounded shadow">
        <h2 className="text-xl font-bold mb-3">Reviews</h2>

        {product.reviews?.length === 0 && <p>No reviews yet.</p>}

        {product.reviews?.map((rev, index) => (
          <div key={index} className="border-b py-2">
            <p className="font-semibold">{rev.userName}</p>
            <p className="text-gray-700">{rev.text}</p>
          </div>
        ))}
      </div>

    </div>
  );
}
