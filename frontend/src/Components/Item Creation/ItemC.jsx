import React, { useState } from "react";
import axios from "axios";

const ItemForm = () => {
  const [Name, setName] = useState("");
  const [Unit, setUnit] = useState("");
  const [Rate, setRate] = useState("");
  const [Quantity, setQuantity] = useState("");
  const handleSubmit = async (e) => {
    e.preventDefault(); // page reload rokega

    try {
      const response = await axios.post("http://localhost:8000/api/additem", {
        Name,
        Unit,
        Rate,
        Quantity,
      },{ withCredentials: true });

      if (response.status === 200 || response.status === 201) {
        alert("Item has been created!");
        // Reset form
        setName("");
        setUnit("");
        setRate("");
        setQuantity("");
      }
    } catch (error) {
      console.error(error);
      alert("Error creating item!");
    }
  };

  return (
    <div className="flex flex-col items-center justify-start min-h-screen p-5 bg-gray-100">
      <h1 className="text-3xl font-bold mb-10">Item Creation</h1>
      <div className="flex items-center justify-center w-full">
        <div className="flex flex-col border-2 rounded-lg p-8 bg-white shadow-md w-full max-w-md">
          <form className="flex flex-col gap-4" onSubmit={handleSubmit}>
            <input
              type="text"
              placeholder="Item Name"
              value={Name}
              onChange={(e) => setName(e.target.value)}
              className="border p-3 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
            <input
              type="text"
              placeholder="Unit"
              value={Unit}
              onChange={(e) => setUnit(e.target.value)}
              className="border p-3 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
            <input
              type="number"
              placeholder="Quantity"
              value={Quantity}
              onChange={(e) => setQuantity(e.target.value)}
              className="border p-3 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
            <input
              type="number"
              placeholder="Rate"
              value={Rate}
              onChange={(e) => setRate(e.target.value)}
              className="border p-3 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
            />

            <button
              type="submit"
              className="bg-blue-500 text-white p-3 rounded hover:bg-blue-600 transition-colors"
            >
              Submit
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default ItemForm;
