import { useState } from "react";
import { NavLink, useNavigate } from "react-router-dom";

function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [role, setRole] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const navigate = useNavigate();

  async function handleSignin(e) {
    e.preventDefault();

    if (!role) {
      setError("Please select your role");
      return;
    }

    setError("");
    setLoading(true);

    try {
      const response = await fetch("http://localhost:5000/user/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, password, role }),
      });

      const data = await response.json();

      if (!response.ok) throw new Error(data.mess || "Login failed");
      console.log("Login success:", data);
      localStorage.setItem("token", data.token);

      // Reset form
      setEmail("");
      setPassword("");
      setRole("");

      // alert("Login successful!");

      // role based
      if (role === "vendor") {
        navigate("/vendor-dashboard"); // vendor dashboard
      } else if (role === "driver") {
        navigate("/rider-dashboard"); // rider dashboard
      }
        else if (role === "student") {
        navigate("/uni/map"); // student map page
  
      } else {
        navigate("/login");
      }
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  }

  return (
    // Inside your Login.jsx return statement
<div className="signin-wrapper">
  <div className="signin-content">
    <h1 style={{ color: "#005850" }}>Welcome Back</h1>
    <p style={{ color: "#666" }}>Sign in to continue to UniMap+</p>

    <form onSubmit={handleSignin}>
      <div className="form-container">
        <label className="signin-label">Email</label>
        <input
          type="email"
          value={email}
          placeholder="Enter your email"
          onChange={(e) => setEmail(e.target.value)}
          required
        />

        <label className="signin-label">Password</label>
        <input
          type="password"
          value={password}
          placeholder="Enter your password"
          onChange={(e) => setPassword(e.target.value)}
          required
        />

        <label className="signin-label">I am a</label>
        <select value={role} onChange={(e) => setRole(e.target.value)} required>
          <option value="">Select your role</option>
          <option value="student">Student</option>
          <option value="vendor">Vendor</option>
          <option value="driver">Driver</option>
        </select>

        {error && <p style={{ color: "red", fontSize: "12px", textAlign: "center" }}>{error}</p>}

        <button type="submit" className="signin-btn" disabled={loading}>
          {loading ? "Signing In..." : "Sign In"}
        </button>

        <p className="redirect" style={{ textAlign: "center", marginTop: "15px" }}>
          Don't have an account? <NavLink to="/signup" style={{ color: "#06b5af" }}>Sign Up</NavLink>
        </p>
      </div>
    </form>
  </div>
</div>
  );
}

export default Login;
