import React from "react";
import useCartStore from "../store/useCartStore";
import { useNavigate } from "react-router-dom";

export default function GroupedCart() {
  const { cartItems } = useCartStore();
  const navigate = useNavigate();

  // Group items by restaurant
  const grouped = cartItems.reduce((acc, item) => {
    if (!acc[item.restaurantId]) {
      acc[item.restaurantId] = {
        restaurantName: item.restaurantName,
        items: [],
      };
    }
    acc[item.restaurantId].items.push(item);
    return acc;
  }, {});

  if (cartItems.length === 0) {
    return <h3 style={{ textAlign: "center" }}>Your cart is empty</h3>;
  }

  return (
    <div style={{ maxWidth: 700, margin: "40px auto" }}>
      <h2 style={{ marginBottom: 20 }}>🍽️ Your Orders</h2>

      {Object.entries(grouped).map(([restaurantId, data]) => {
        const total = data.items.reduce((acc, item) => {
          const price = parseFloat(item.price.replace(/[^0-9.-]+/g, ""));
          return acc + price;
        }, 0);

        return (
          <div
            key={restaurantId}
            style={styles.restaurantCard}
            onClick={() => navigate(`/uni/orders/${restaurantId}`)}
          >
            <div>
              <h3>{data.restaurantName}</h3>
              <p>{data.items.length} item(s)</p>
            </div>
            <strong>₦{total.toLocaleString()}</strong>
          </div>
        );
      })}
    </div>
  );
}

const styles = {
  restaurantCard: {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    padding: "20px",
    borderRadius: "14px",
    background: "#fff",
    marginBottom: "16px",
    cursor: "pointer",
    border: "1px solid #EDF2F7",
  },
};
