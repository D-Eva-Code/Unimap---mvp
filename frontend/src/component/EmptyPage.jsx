// EmptyOrders.js
import React from "react";

export default function EmptyPage() {
  return (
    <div style={{ 
      padding: "100px 20px", 
      textAlign: "center", 
      color: "#A0AEC0" 
    }}>
      <div style={{ fontSize: "60px", marginBottom: "20px" }}>📦</div>
      <h2 style={{ fontWeight: "600" }}>No Active Orders</h2>
      <p>Your order history will appear here once you've checked out.</p>
    </div>
  );
}