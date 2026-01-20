import React, { useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import useCartStore from "../store/useCartStore";        


const Payment = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const { total } = location.state || { total: 0 };

  const [showSuccess, setShowSuccess] = useState(false);
    const { clearCart } = useCartStore();
  const handlePay = () => {
  setShowSuccess(true);

  const cart = JSON.parse(localStorage.getItem("cart") || "[]");
  if (cart.length > 0) {
    const existingOrders = JSON.parse(localStorage.getItem("orders") || "[]");
    localStorage.setItem("orders", JSON.stringify([...existingOrders, ...cart]));
  }

  setTimeout(() => {
    clearCart(); //clears Zustand state
    localStorage.removeItem("cart"); 
    navigate("/uni/myorders");
  }, 1500);
};


  return (
    <div style={styles.container}>
      <div style={styles.card}>
        <h2 style={styles.title}>💳 Simulated Payment</h2>
        <p style={styles.totalLabel}>Total to pay:</p>
        <p style={styles.totalAmount}>₦{total.toLocaleString()}</p>
        <button style={styles.payButton} onClick={handlePay}>
          Pay Now
        </button>
      </div>

      {showSuccess && (
        <div style={styles.overlay}>
          <div style={styles.popup}>
            <h3>🎉 Payment Successful!</h3>
            <p>Your order is being processed.</p>
          </div>
        </div>
      )}
    </div>
  );
};

const styles = {
  container: {
    minHeight: "100vh",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    background: "linear-gradient(to bottom, #06B5AF, #38B2AC)",
    padding: "20px",
  },
  card: {
    backgroundColor: "#fff",
    padding: "40px 30px",
    borderRadius: "20px",
    boxShadow: "0 10px 30px rgba(0,0,0,0.1)",
    textAlign: "center",
    width: "100%",
    maxWidth: "400px",
  },
  title: {
    fontSize: "28px",
    fontWeight: "700",
    marginBottom: "20px",
    color: "#1A202C",
  },
  totalLabel: {
    fontSize: "16px",
    color: "#718096",
    marginBottom: "5px",
  },
  totalAmount: {
    fontSize: "32px",
    fontWeight: "700",
    marginBottom: "30px",
    color: "#06B5AF",
  },
  payButton: {
    padding: "15px 30px",
    backgroundColor: "#06B5AF",
    color: "#fff",
    border: "none",
    borderRadius: "12px",
    fontSize: "16px",
    fontWeight: "700",
    cursor: "pointer",
    transition: "all 0.2s",
  },
  overlay: {
    position: "fixed",
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    backgroundColor: "rgba(0,0,0,0.5)",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    zIndex: 1000,
  },
  popup: {
    backgroundColor: "#fff",
    padding: "30px 20px",
    borderRadius: "16px",
    textAlign: "center",
    boxShadow: "0 10px 20px rgba(0,0,0,0.2)",
    animation: "fadeIn 0.3s ease",
  },
};

export default Payment;
