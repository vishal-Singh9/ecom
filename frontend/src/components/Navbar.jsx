import React from "react";
import { Link, useNavigate } from "react-router-dom";

function Navbar() {
  const auth = localStorage.getItem("user");

  const navigate = useNavigate();

  const Logout = () => {
    localStorage.clear();
    navigate("/signup");
  };

  return (
    <div>
      <img className="logo" src="ecom.png" alt="" />
      {auth ? (
        <ul className="nav">
          <li>
            <Link to="/">Product</Link>
          </li>
          <li>
            <Link to="/add">Add Products</Link>
          </li>

          <li>
            <Link to="/update">Update Product</Link>
          </li>

          <li>
            <Link to="/profile">Profile</Link>
          </li>
          
          <li>
            <Link onClick={Logout} to="/signup">
              Logout
            </Link>
          </li>
        </ul>
      ) : (
        <ul className="nav nav-right">
          <li>
            <Link to="/signup">SignUp</Link>
          </li>
          <li>
            <Link to="/login">Login</Link>
          </li>
        </ul>
      )}
    </div>
  );
}

export default Navbar;
