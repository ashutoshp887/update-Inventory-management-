import React, { useEffect, useState } from "react";
import axios from "axios";
import Cookies from "js-cookie";

function UpdateQuantityPage() {
  const [items, setItems] = useState([]);
  const [selectedItemId, setSelectedItemId] = useState("");
  const [newQuantity, setNewQuantity] = useState("");

  // ✅ Get JWT token from localStorage or cookies
  const token = localStorage.getItem("token") || Cookies.get("token");
  console.log("Using token:", token);
  // 1️⃣ Fetch all items
  useEffect(() => {
    if (!token) return;

    const fetchItems = async () => {
      try {
        const res = await axios.get("https://update-inventory-management-1.onrender.com/api/getallitems", {
          headers: {
            Authorization: `Bearer ${token}`, // ✅ send token in header
          },
          withCredentials: true, // ✅ needed if backend uses cookies
        });
        setItems(res.data);
      } catch (err) {
        if (err.response?.status === 401) {
          alert("⚠️ Session expired. Please login again.");
          window.location.href = "/login";
        } else {
          console.error("Error fetching items:", err.response || err.message);
        }
      }
    };

    fetchItems();
  }, [token]);

  const handleUpdate = async () => {
    if (!selectedItemId || !newQuantity) {
      alert("⚠️ Please select an item and enter quantity");
      return;
    }

    try {
      const res = await axios.patch(
        `https://update-inventory-management-1.onrender.com/api/updatequantity/${selectedItemId}`,
        { Quantity: Number(newQuantity) },
        {
          headers: {
            Authorization: `Bearer ${token}`, // ✅ send token
          },
          withCredentials: true,
        }
      );

      alert(`✅ Quantity updated: ${res.data.Name} → ${res.data.Quantity}`);

      setItems(
        items.map((i) =>
          i._id === selectedItemId ? { ...i, Quantity: res.data.Quantity } : i
        )
      );

      setNewQuantity("");
      setSelectedItemId("");
    } catch (err) {
      console.error(
        "Error updating quantity:",
        err.response?.data || err.message
      );
      if (err.response?.status === 401) {
        alert("⚠️ Session expired. Please login again.");
        window.location.href = "/login";
      } else {
        alert("❌ Error updating quantity");
      }
    }
  };

  return (
    <div className="max-w-3xl mx-auto mt-8 p-6 bg-white shadow-lg rounded-lg font-sans">
      <h2 className="text-2xl font-bold mb-6 text-gray-800">
        📦 Update Item Quantity
      </h2>

      <div className="flex flex-wrap items-center mb-6 gap-4">
        <select
          value={selectedItemId}
          onChange={(e) => setSelectedItemId(e.target.value)}
          className="border border-gray-300 rounded px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-400"
        >
          <option value="">-- Select Item --</option>
          {items.map((item) => (
            <option key={item._id} value={item._id}>
              {item.Name}
            </option>
          ))}
        </select>

        <input
          type="number"
          placeholder="Enter new quantity"
          value={newQuantity}
          onChange={(e) => setNewQuantity(e.target.value)}
          className="border border-gray-300 rounded px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-400"
        />

        <button
          onClick={handleUpdate}
          className="bg-green-500 text-white px-5 py-2 rounded hover:bg-green-600 transition duration-300"
        >
          Update
        </button>
      </div>

      <h3 className="text-xl font-semibold mb-4 text-gray-700">
        📋 Items in Database
      </h3>
      <ul className="space-y-2">
        {items.map((item) => (
          <li
            key={item._id}
            className="p-3 bg-gray-50 rounded shadow-sm flex justify-between"
          >
            <span className="font-medium">{item.Name}</span>
            <span className="text-gray-600">Quantity: {item.Quantity}</span>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default UpdateQuantityPage;
