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

      alert("Login successful!");
    // if (role === 'student') navigate("/student/dashboard");
    // else if (role === 'vendor') navigate("/vendor/dashboard");
    // else navigate("/driver/dashboard");
    
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="signing-wrapper">
      <div className="signing-content">
        <h1 className="login-header">Welcome Back</h1>
        <p className="login-descrip">Sign in to continue to UniMap+</p>

        <form onSubmit={handleSignin}>
          <div className="form-container">
            <label htmlFor="email" className="signin-label">
              Email
            </label>
            <input
              type="email"
              value={email}
              placeholder="Enter your email"
              onChange={(e) => setEmail(e.target.value)}
              required
            />

            <label htmlFor="password" className="signin-label">
              Password
            </label>
            <input
              type="password"
              value={password}
              placeholder="Enter your password"
              onChange={(e) => setPassword(e.target.value)}
              required
            />

            <label htmlFor="role" className="signin-label">
              I am a
            </label>
            <select
              value={role}
              onChange={(e) => setRole(e.target.value)}
              required
            >
              <option value="">Select your role</option>
              <option value="student">Student</option>
              <option value="vendor">Vendor</option>
              <option value="driver">Driver</option>
            </select>

            {error && <p className="error-message">{error}</p>}

            <button type="submit" className="signin-btn" disabled={loading}>
              {loading ? "Signing In..." : "Sign In"}
            </button>

            <p className="redirect">
              Need help? <NavLink to="/support" className="contactSupport">Contact support</NavLink>
            </p>
          </div>
        </form>
      </div>
    </div>
  );
}

export default Login;
