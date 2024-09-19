import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

// Use Vite's environment variables
const API_URL = import.meta.env.VITE_API_URL;
const REGISTER_URL = import.meta.env.VITE_REGISTER_URL;

function SignUp() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  useEffect(() => {
    const auth = localStorage.getItem("user");
    if (auth) {
      navigate("/");
    }
  }, [navigate]);

  const collectData = async () => {
    console.log(name, email, password);

    try {
      let result = await fetch(`${API_URL}${REGISTER_URL}`, {
        method: "POST",
        body: JSON.stringify({ name, email, password }),
        headers: { "Content-Type": "application/json" },
      });

      result = await result.json();
      console.log(result);

      localStorage.setItem("user", JSON.stringify(result));
      navigate("/");
    } catch (error) {
      console.error("An error occurred during registration:", error);
    }
  };

  return (
    <div className="signup-container">
      <div className="signup-page">
        <h1>Sign Up Page</h1>
        <form>
          <label>
            Username:
            <input
              name="name"
              type="text"
              value={name}
              onChange={(event) => setName(event.target.value)}
              required
            />
          </label>
          <br />
          <label>
            Email:
            <input
              name="email"
              type="email"
              value={email}
              onChange={(event) => setEmail(event.target.value)}
              required
            />
          </label>
          <br />
          <label>
            Password:
            <input
              type="password"
              value={password}
              onChange={(event) => setPassword(event.target.value)}
              required
            />
          </label>
          <br />

          <button className="signup-button" type="button" onClick={collectData}>
            Sign Up
          </button>
        </form>
      </div>
    </div>
  );
}

export default SignUp;
