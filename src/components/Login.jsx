import { useState } from "react";
import { useNavigate } from "react-router-dom";
import "../css/Login.css";

export default function Login() {
    const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError(null);

    try {
      const response = await fetch("http://localhost:3000/auth/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ username, password }),
      });

      if (!response.ok) {
        throw new Error("Invalid username or password");
      }

      const data = await response.json();
      localStorage.setItem("access_token", data.access_token);
      navigate("/");
    } catch (err) {
      setError(err.message);
    }
  };

  return (
    <div className="login-background-image">
      <div className="login-container">
        <h2>Login</h2>
        <form onSubmit={handleSubmit} className="login-form">
          {error && <p className="error">{error}</p>}
          <label>
            Username:
            <input
              type="text"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              required
            />
          </label>

          <label>
            Password:
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
          </label>

          <button type="submit">Login</button>
        </form>
      </div>
    </div>
  );
}