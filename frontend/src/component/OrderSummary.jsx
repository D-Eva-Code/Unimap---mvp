import React from "react";
import { useNavigate } from "react-router-dom";

export default function OrderSummary({ cart, onClose }) {
  const navigate = useNavigate();

  const subtotal = cart.reduce((acc, item) => {
    const price = parseFloat(item.price.replace(/[^0-9.-]+/g, ""));
    return acc + price * (item.quantity || 1);
  }, 0);

  const deliveryFee = 300;
  const serviceFee = subtotal * 0.07;
  const total = subtotal + deliveryFee + serviceFee;

  const handleCheckout = () => {
    localStorage.setItem("cart", JSON.stringify(cart));
    navigate("/payment", { state: { total } });
    onClose();
  };

  return (
    <div style={styles.overlay}>
      <div style={styles.card}>
        <h3 style={styles.title}>🧾 Order Summary</h3>

        {/* Items */}
        <div style={styles.items}>
          {cart.map((item, i) => (
            <div key={i} style={styles.itemRow}>
              <span style={styles.itemName}>
                {item.name} × {item.quantity || 1}
              </span>
              <span style={styles.itemPrice}>{item.price}</span>
            </div>
          ))}
        </div>

        <div style={styles.divider} />

        {/* Fees */}
        <div style={styles.fees}>
          <div style={styles.feeRow}>
            <span>Subtotal</span>
            <span>₦{subtotal.toLocaleString()}</span>
          </div>
          <div style={styles.feeRow}>
            <span>Delivery Fee</span>
            <span>₦{deliveryFee.toLocaleString()}</span>
          </div>
          <div style={styles.feeRow}>
            <span>Service Fee (7%)</span>
            <span>₦{serviceFee.toLocaleString()}</span>
          </div>
        </div>

        <div style={styles.divider} />

        {/* Total */}
        <div style={styles.totalRow}>
          <span>Total</span>
          <span>₦{total.toLocaleString()}</span>
        </div>

        {/* Actions */}
        <button style={styles.checkoutBtn} onClick={handleCheckout}>
          Proceed to Payment
        </button>
        <button style={styles.cancelBtn} onClick={onClose}>
          Cancel
        </button>
      </div>
    </div>
  );
}
const styles = {
  overlay: {
    position: "fixed",
    inset: 0,
    backgroundColor: "rgba(0,0,0,0.55)",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    zIndex: 1000,
    padding: "20px",
  },
  card: {
    backgroundColor: "#fff",
    borderRadius: "20px",
    width: "100%",
    maxWidth: "420px",
    padding: "24px",
    boxShadow: "0 20px 40px rgba(0,0,0,0.15)",
  },
  title: {
    textAlign: "center",
    fontSize: "22px",
    fontWeight: "800",
    marginBottom: "20px",
  },
  items: {
    display: "flex",
    flexDirection: "column",
    gap: "12px",
  },
  itemRow: {
    display: "flex",
    justifyContent: "space-between",
    fontSize: "15px",
  },
  itemName: {
    color: "#2D3748",
    fontWeight: "600",
  },
  itemPrice: {
    color: "#4A5568",
    fontWeight: "600",
  },
  divider: {
    height: "1px",
    backgroundColor: "#EDF2F7",
    margin: "16px 0",
  },
  fees: {
    display: "flex",
    flexDirection: "column",
    gap: "10px",
    fontSize: "14px",
    color: "#4A5568",
  },
  feeRow: {
    display: "flex",
    justifyContent: "space-between",
  },
  totalRow: {
    display: "flex",
    justifyContent: "space-between",
    fontSize: "18px",
    fontWeight: "800",
    color: "#06B5AF",
    marginBottom: "20px",
  },
  checkoutBtn: {
    width: "100%",
    padding: "14px",
    backgroundColor: "#06B5AF",
    color: "#fff",
    border: "none",
    borderRadius: "14px",
    fontSize: "16px",
    fontWeight: "700",
    cursor: "pointer",
    marginBottom: "10px",
  },
  cancelBtn: {
    width: "100%",
    padding: "12px",
    backgroundColor: "#EDF2F7",
    color: "#4A5568",
    border: "none",
    borderRadius: "14px",
    fontSize: "14px",
    fontWeight: "700",
    cursor: "pointer",
  },
};
