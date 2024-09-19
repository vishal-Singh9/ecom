import React from "react";
import "./App.css";
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  BrowserRouter,
} from "react-router-dom";

import SignUp from "./components/SignUp";
import Private from "./components/Private";
import Login from "./components/Login";
import AddProduct from "./components/AddProduct";
import ProductList from "./components/ProductList";
import Update from "./components/Update";
import Profile from "./components/Profile";

function App() {
  return (
    <>
      <h1 className="title">E Dashboard</h1>
      <BrowserRouter>
        <Navbar />
        <Routes>
          <Route element={<Private />} />
          <Route path="/" element={<ProductList/>} />
          <Route path="/add" element={<AddProduct/>} />
          <Route path="/update/:id" element={<Update/>} />
          <Route path="/logout" element={<h1>Logout</h1>} />
          <Route path="/profile" element={<Profile/>} />
          <Route path="/signup" element={<SignUp />} />
          <Route path="/login" element={<Login />} />

        </Routes>
      </BrowserRouter>
      <Footer />
    </>
  );
}

export default App;
