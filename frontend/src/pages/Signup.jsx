import { useState } from "react";
import { NavLink, useNavigate } from "react-router-dom";

function Signup() {
  const [fullName, setFullName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [role, setRole] = useState("");
  const navigate = useNavigate();

  async function handleSignup(e) {
    e.preventDefault();

    if (!role) {
      alert("Please select your role");
      return;
    }

    

    navigate("/login");



    const formData = { fullName, email, password, role };
    // console.log("Form Submitted:", formData);
    try {
    const response = await fetch("http://localhost:5000/user/register", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(formData),
    });

    const data = await response.json();

    if (!response.ok) {
      alert(data.mess || "Signup failed");
      return;
    }

    console.log("Signup success:", data);
    alert("Account created successfully!");

    // Reset form
    setFullName("");
    setEmail("");
    setPassword("");
    setRole("");
  }catch (error) {
    console.error("Signup error:", error);
    alert("Something went wrong");
  }
}

  return (
    <>
      <div className="signup-wrapper">
        <div className="signup-content">
          <h1 className="signupintro">Create an Account</h1>
          <p className="sign-up-descr"> Sign up to get started with UniMap+</p>

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
                Already have an account?  <NavLink to="/login" className="signin">Sign in</NavLink>
              </p>
            </div>
          </form>
        </div>
      </div>
    </>
  );
}

export default Signup;
