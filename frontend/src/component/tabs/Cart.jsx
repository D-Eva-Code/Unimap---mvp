import React from "react";
import useCartStore from "../../store/useCartStore"; // Adjust path as needed
import { useNavigate } from "react-router-dom";
import OrderSummary from "../OrderSummary";
import { useState } from "react";

export default function Cart() {
  const { cartItems, clearCart } = useCartStore();
  const navigate = useNavigate();
  const [showPopup, setShowPopup] = useState(false);

  // Calculate Total Price
  const total = cartItems.reduce((acc, item) => {
    // Remove '$' or currency symbols if they exist in your string price
    const price = parseFloat(item.price.replace(/[^0-9.-]+/g, ""));
    return acc + price;
  }, 0);

  if (cartItems.length === 0) {
    return (
      <div style={styles.emptyContainer}>
        <div style={{ fontSize: "50px" }}>🛒</div>
        <h3>Your cart is empty</h3>
        <p>Looks like you haven't added any food yet.</p>
        <button style={styles.shopButton} onClick={() => navigate("/uni/food")}>
          Go to Menu
        </button>
      </div>
    );
  }

  return (
    <div style={styles.container}>
      <div style={styles.header}>
        <h2 style={styles.title}>📦 My Cart / Orders</h2>
        <button style={styles.clearBtn} onClick={clearCart}>Clear All</button>
      </div>

      <div style={styles.list}>
        {cartItems.map((item, index) => (
          <div key={index} style={styles.card}>
            <div 
              style={{ 
                ...styles.image, 
                backgroundImage: `url(${item.image})` 
              }} 
            />
            <div style={styles.details}>
              <h4 style={styles.itemName}>{item.name}</h4>
              <p style={styles.itemPrice}>{item.price}</p>
            </div>
            <div style={styles.statusBadge}>Pending</div>
          </div>
        ))}
      </div>

      <div style={styles.footer}>
        <div style={styles.totalSection}>
          <span>Total Amount:</span>
          <span style={styles.totalPrice}>${total.toFixed(2)}</span>
        </div>
        <button style={styles.checkoutBtn} onClick={() => setShowPopup(true)}>
  Place Order
</button>

      </div>
      {showPopup && (
  <OrderSummary 
    cart={cartItems} 
    onClose={() => setShowPopup(false)} 
  />
)}

    </div>
  );
}

const styles = {
  container: {
    maxWidth: "800px",
    margin: "0 auto",
    padding: "40px 20px",
    minHeight: "100vh",
  },
  header: {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: "30px",
  },
  title: { fontSize: "28px", fontWeight: "800", color: "#1A202C" },
  clearBtn: { background: "none", border: "none", color: "#E53E3E", cursor: "pointer", fontWeight: "600" },
  list: { display: "flex", flexDirection: "column", gap: "16px" },
  card: {
    display: "flex",
    alignItems: "center",
    backgroundColor: "#fff",
    padding: "16px",
    borderRadius: "16px",
    border: "1px solid #EDF2F7",
    gap: "20px",
  },
  image: {
    width: "80px",
    height: "80px",
    borderRadius: "12px",
    backgroundSize: "cover",
    backgroundPosition: "center",
    backgroundColor: "#f0f0f0",
  },
  details: { flex: 1 },
  itemName: { margin: "0 0 4px 0", fontSize: "18px", fontWeight: "600" },
  itemPrice: { margin: 0, color: "#718096", fontWeight: "500" },
  statusBadge: {
    backgroundColor: "#FEFCBF",
    color: "#744210",
    padding: "4px 12px",
    borderRadius: "20px",
    fontSize: "12px",
    fontWeight: "bold",
  },
  footer: {
    marginTop: "40px",
    paddingTop: "20px",
    borderTop: "2px solid #EDF2F7",
  },
  totalSection: {
    display: "flex",
    justifyContent: "space-between",
    fontSize: "20px",
    fontWeight: "700",
    marginBottom: "20px",
  },
  totalPrice: { color: "#06B5AF" },
  checkoutBtn: {
    width: "100%",
    padding: "16px",
    backgroundColor: "#06B5AF",
    color: "white",
    border: "none",
    borderRadius: "12px",
    fontSize: "16px",
    fontWeight: "700",
    cursor: "pointer",
  },
  emptyContainer: {
    textAlign: "center",
    padding: "100px 20px",
  },
  shopButton: {
    marginTop: "20px",
    padding: "12px 24px",
    backgroundColor: "#06B5AF",
    color: "white",
    border: "none",
    borderRadius: "8px",
    cursor: "pointer",
  }
};