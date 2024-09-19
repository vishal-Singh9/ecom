import React, { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";

// Assuming your base URL or specific endpoints are stored in environment variables
const API_URL = import.meta.env.VITE_API_URL;

function Update() {
  const [name, setName] = useState("");
  const [price, setPrice] = useState("");
  const [category, setCategory] = useState("");
  const [company, setCompany] = useState("");

  const params = useParams();
  const navigate = useNavigate();

  // Function to fetch product data based on the params ID
  const getData = async () => {
    try {
      let result = await fetch(`${API_URL}/product/${params.id}`);
      result = await result.json();
      setName(result.name);
      setPrice(result.price);
      setCategory(result.category);
      setCompany(result.company);
    } catch (error) {
      console.error("Error fetching product:", error);
    }
  };

  // Function to update product details
  const handleUpdateProduct = async () => {
    console.log(name, price, category, company);

    try {
      let result = await fetch(`${API_URL}/product/${params.id}`, {
        method: "PUT",
        body: JSON.stringify({ name, price, category, company }),
        headers: {
          "Content-Type": "application/json",
        },
      });
      result = await result.json();
      navigate("/");
    } catch (error) {
      console.error("Error updating product:", error);
    }
  };

  // Fetch product data when the component mounts
  useEffect(() => {
    getData();
  }, []);

  return (
    <div className="add-product">
      <div className="add-product-container">
        <h1>Update Product</h1>
        <form className="add-product-form">
          <input
            type="text"
            value={name}
            placeholder="Enter your name"
            onChange={(e) => setName(e.target.value)}
          />
          <input
            type="text"
            value={price}
            placeholder="Enter your price"
            onChange={(e) => setPrice(e.target.value)}
          />

          <input
            type="text"
            value={category}
            placeholder="Enter your category"
            onChange={(e) => setCategory(e.target.value)}
          />

          <input
            type="text"
            value={company}
            placeholder="Enter your company"
            onChange={(e) => setCompany(e.target.value)}
          />

          <button type="button" onClick={handleUpdateProduct}>
            Update Product
          </button>
        </form>
      </div>
    </div>
  );
}

export default Update;
