import React, { useState, useEffect } from "react";

export default function Orders() {
  const [orders, setOrders] = useState([]);

  useEffect(() => {
    const storedOrders = JSON.parse(localStorage.getItem("orders") || "[]");
    setOrders(storedOrders);
  }, []);

  if (orders.length === 0) {
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

  return (
    <div style={{ maxWidth: "800px", margin: "0 auto", padding: "40px 20px" }}>
      <h2 style={{ fontSize: "28px", fontWeight: "700", marginBottom: "30px" }}>My Orders</h2>
      {orders.map((item, index) => (
        <div 
          key={index} 
          style={{
            display: "flex",
            alignItems: "center",
            backgroundColor: "#fff",
            padding: "16px",
            borderRadius: "12px",
            marginBottom: "16px",
            border: "1px solid #EDF2F7",
          }}
        >
          <div 
            style={{ 
              width: "80px", 
              height: "80px", 
              borderRadius: "12px", 
              backgroundSize: "cover", 
              backgroundPosition: "center", 
              backgroundImage: `url(${item.image})`,
              marginRight: "20px"
            }}
          />
          <div style={{ flex: 1 }}>
            <h4 style={{ margin: "0 0 4px 0", fontSize: "18px", fontWeight: "600" }}>{item.name}</h4>
            <p style={{ margin: 0, color: "#718096", fontWeight: "500" }}>{item.price}</p>
            <p style={{ margin: "4px 0 0 0", color: "#4A5568", fontSize: "14px" }}>
              Quantity: {item.quantity || 1}
            </p>
          </div>
          <div style={{
            backgroundColor: "#FEFCBF",
            color: "#744210",
            padding: "4px 12px",
            borderRadius: "20px",
            fontSize: "12px",
            fontWeight: "bold",
          }}>
            Processing...
          </div>
        </div>
      ))}
    </div>
  );
}
