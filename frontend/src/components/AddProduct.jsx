import React, { useState } from "react";

const API_URL = import.meta.env.VITE_API_URL;
const ADD_PRODUCT_URL = import.meta.env.VITE_ADD_PRODUCT_URL;

function AddProduct() {
  const [name, setName] = useState("");
  const [price, setPrice] = useState("");
  const [category, setCategory] = useState("");
  const [company, setCompany] = useState("");

  const [error, setError] = useState(false);

  const handleAddProduct = async () => {
    if (!name || !price || !category || !company) {
      setError(true);
      return;
    }

    setError(false);

    const user = JSON.parse(localStorage.getItem("user") || "{}");
    const UserId = user._id || "";

    try {
      const result = await fetch(`${API_URL}${ADD_PRODUCT_URL}`, {
        method: "POST",
        body: JSON.stringify({ name, price, category, company, UserId }),
        headers: { "Content-Type": "application/json" },
      });
      const data = await result.json();
      console.log(data);
      alert("Product Added");
    } catch (error) {
      console.error("Error adding product:", error);
      alert("Failed to add product. Please try again.");
    }
  };

  return (
    <div className="add-product">
      <div className="add-product-container">
        <h1>Add Product</h1>
        <form className="add-product-form">
          <input
            type="text"
            value={name}
            placeholder="Enter product name"
            onChange={(e) => setName(e.target.value)}
          />
          {error && !name && <span className="invalid">Enter a valid name</span>}
          
          <input
            type="number"
            value={price}
            placeholder="Enter product price"
            onChange={(e) => setPrice(e.target.value)}
          />
          {error && !price && <span className="invalid">Enter a valid price</span>}
          
          <input
            type="text"
            value={category}
            placeholder="Enter product category"
            onChange={(e) => setCategory(e.target.value)}
          />
          {error && !category && <span className="invalid">Enter a valid category</span>}
          
          <input
            type="text"
            value={company}
            placeholder="Enter product company"
            onChange={(e) => setCompany(e.target.value)}
          />
          {error && !company && <span className="invalid">Enter a valid company</span>}
          
          <button type="button" onClick={handleAddProduct}>
            Add Product
          </button>
        </form>
      </div>
    </div>
  );
}

export default AddProduct;
