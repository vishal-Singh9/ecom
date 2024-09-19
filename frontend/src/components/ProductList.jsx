import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";

const API_URL = import.meta.env.VITE_API_URL;

function ProductList() {
  const [products, setProducts] = useState([]);

  const deleteProduct = async (id) => {
    const deleteUrl = `${API_URL}${import.meta.env.VITE_DELETE_PRODUCT_URL.replace(":id", id)}`;
    
    let result = await fetch(deleteUrl, {
      method: "DELETE",
    });
    result = await result.json();
    if (result) {
      getProducts();
    }
  };

  useEffect(() => {
    getProducts();
  }, []);

  const getProducts = async () => {
    const productsUrl = `${API_URL}${import.meta.env.VITE_GET_PRODUCTS_URL}`;
    
    let result = await fetch(productsUrl);
    result = await result.json();
    setProducts(result);
  };

  const searchHandle = async (e) => {
    let key = e.target.value;
    if (key) {
      const searchUrl = `${API_URL}${import.meta.env.VITE_SEARCH_PRODUCTS_URL.replace(":key", key)}`;
      
      let result = await fetch(searchUrl);
      result = await result.json();
      if (result) {
        setProducts(result);
      }
    } else {
      getProducts();
    }
  };

  return (
    <div className="prod">
      <div className="product-list">
        <h1>Product List</h1>
        <input
          className="search"
          type="text"
          placeholder="Search Product"
          onChange={searchHandle}
        />
        <ul>
          <li>S No.</li>
          <li>Name</li>
          <li>Price</li>
          <li>Category</li>
          <li>Company</li>
          <li>Operation</li>
        </ul>
        {products.length > 0 ? (
          products.map((item, index) => (
            <ul key={item._id}>
              <li>{index + 1}</li>
              <li>{item.name}</li>
              <li>{item.price}</li>
              <li>{item.category}</li>
              <li>{item.company}</li>
              <li>
                <button className="btn" onClick={() => deleteProduct(item._id)}>Delete</button>
                <Link to={"/update/" + item._id}>Update</Link>
              </li>
            </ul>
          ))
        ) : (
          <p>
            <b>No products found.</b>
          </p>
        )}
      </div>
    </div>
  );
}

export default ProductList;
