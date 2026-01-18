import { useState } from "react";
import { NavLink } from "react-router-dom";

function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [role, setRole] = useState("");

  function handleSignup(e) {
    e.preventDefault();

    if (!role) {
      alert("Please select your role");
      return;
    }

    // Reset form

    setEmail("");
    setPassword("");
    setRole("");
  }

  return (
    <>
      <div className="signup-wrapper">
        <div className="signup-content">
          <h1>Welcome Back</h1>
          <p>Sign in to continue to UniMap+</p>

          <form onSubmit={handleSignup}>
            <div className="form-container">
              <label
                htmlFor="email"
                className="signup-label
              "
              >
                Email
              </label>
              <input
                type="email"
                value={email}
                placeholder="Enter your email"
                onChange={(e) => {
                  setEmail(e.target.value);
                }}
                required
              />

              <label
                htmlFor="password"
                className="signup-label
              "
              >
                Password
              </label>
              <input
                type="password"
                value={password}
                placeholder="Enter your password"
                onChange={(e) => {
                  setPassword(e.target.value);
                }}
                required
              />

              <label
                htmlFor="role"
                className="signup-label
              "
              >
                I am a
              </label>
              <select
                value={role}
                onChange={(e) => {
                  setRole(e.target.value);
                }}
                required
              >
                <option value="">Select your role</option>
                <option value="student">Student</option>
                <option value="vendor">Vendor</option>
                <option value="driver">Driver</option>
              </select>

              <button className="signup-btn">Sign In</button>
              <p className="redirect">
                Need help? <NavLink to="/support">Contact support</NavLink>
              </p>
            </div>
          </form>
        </div>
      </div>
    </>
  );
}

export default Login;
