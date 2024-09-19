import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";

const API_URL = import.meta.env.VITE_API_URL;
const LOGIN_URL = import.meta.env.VITE_LOGIN_URL;

function Login() {
  const [email, setEmail] = React.useState("");
  const [password, setPassword] = React.useState("");
  const navigate = useNavigate();

  useEffect(() => {
    const auth = localStorage.getItem("user");
    if (auth) {
      navigate("/");
    }
  }, [navigate]);

  const handleLogin = async () => {
    console.log("Email:", email, "Password:", password);

    try {
      let result = await fetch(`${API_URL}${LOGIN_URL}`, {
        method: "POST",
        body: JSON.stringify({ email, password }),
        headers: { "Content-Type": "application/json" },
      });

      if (!result.ok) {
        throw new Error(`HTTP error! status: ${result.status}`);
      }

      result = await result.json();
      console.log(result);

      if (result.name) {
        localStorage.setItem("user", JSON.stringify(result));
        navigate("/");
      } else {
        alert("Please enter valid credentials");
      }
    } catch (error) {
      console.error(error);
      alert("An error occurred. Please try again.");
    }
  };

  return (
    <div className="login-container">
      <div className="login">
        <h1>Login</h1>
        <form>
          <label htmlFor="email">Email</label>
          <input
            type="email"
            name="email"
            id="email"
            value={email}
            placeholder="Enter your email"
            onChange={(e) => setEmail(e.target.value)}
            required
          />
          <label htmlFor="password">Password</label>
          <input
            type="password"
            name="password"
            id="password"
            value={password}
            placeholder="Enter your password"
            onChange={(e) => setPassword(e.target.value)}
            required
          />
          <button onClick={handleLogin} type="button">
            Login
          </button>
          <p>
            Don't have an account? <a href="/signup">Signup</a>
          </p>
        </form>
      </div>
    </div>
  );
}

export default Login;
