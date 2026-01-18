import { useState } from "react";
import { NavLink, useNavigate } from "react-router-dom";

function Signup() {
  const [fullName, setFullName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [role, setRole] = useState("");
  const navigate = useNavigate();

  function handleSignup(e) {
    e.preventDefault();

    if (!role) {
      alert("Please select your role");
      return;
    }
    navigate("/login");

    // for backen API
    const formData = { fullName, email, password, role };
    console.log("Form Submitted:", formData);

    // Reset form
    setFullName("");
    setEmail("");
    setPassword("");
    setRole("");
  }

  return (
    <>
      <div className="signup-wrapper">
        <div className="signup-content">
          <h1>Create an Account</h1>
          <p>Sign up to get started with UniMap+</p>

          <form onSubmit={handleSignup}>
            <div className="form-container">
              <label
                htmlFor="fullname"
                className="signup-label
              "
              >
                Full Name
              </label>
              <input
                type="text"
                value={fullName}
                placeholder="Enter your full name"
                onChange={(e) => {
                  setFullName(e.target.value);
                }}
                required
              />

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

              <button className="signup-btn">Sign Up</button>
              <p className="redirect">
                Already have an account? <NavLink to="/login">Sign in</NavLink>
              </p>
            </div>
          </form>
        </div>
      </div>
    </>
  );
}

export default Signup;
