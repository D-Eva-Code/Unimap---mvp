import React from "react";
import { useParams } from "react-router-dom";

const meals = [
  { id: 1, name: "Jollof Rice", price: "₦1,500", desc: "Smoky, party-style jollof with fried plantain." },
  { id: 2, name: "Fried Rice", price: "₦1,700", desc: "Liver-loaded fried rice with veggies." },
  { id: 3, name: "Egusi Soup", price: "₦2,000", desc: "Rich melon seed soup with assorted meat." },
  { id: 4, name: "Plantain & Eggs", price: "₦1,200", desc: "Sweet fried plantains with spicy scrambled eggs." },
];

export default function RestaurantPage() {
  const { id } = useParams();
  const featured = meals[0];

  return (
    <div style={styles.container}>
      <header style={styles.header}>
        <h2 style={styles.title}>Restaurant #{id}</h2>
        <span style={styles.badge}>Open Now</span>
      </header>

      {/* FEATURED MEAL SECTION */}
      <section style={styles.featuredSection}>
        <div style={styles.featuredImage}>
          <div style={styles.imageOverlay}>Featured</div>
        </div>
        <div style={styles.featuredContent}>
          <h3 style={styles.featuredName}>{featured.name}</h3>
          <p style={styles.featuredDesc}>{featured.desc}</p>
          <div style={styles.priceRow}>
            <span style={styles.featuredPrice}>{featured.price}</span>
            <button style={styles.primaryButton}>Add to Order</button>
          </div>
        </div>
      </section>

      <h3 style={styles.sectionHeading}>Explore Our Menu</h3>

      {/* MEALS GRID */}
      <div style={styles.grid}>
        {meals.slice(1).map((meal) => (
          <div key={meal.id} style={styles.mealCard}>
            <div style={styles.mealImage}></div>
            <div style={styles.cardBody}>
              <h4 style={styles.mealName}>{meal.name}</h4>
              <p style={styles.mealPrice}>{meal.price}</p>
              <button style={styles.secondaryButton}>+</button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

const styles = {
  container: {
    maxWidth: "1000px",
    margin: "0 auto",
    padding: "40px 20px",
    fontFamily: "'Inter', system-ui, sans-serif",
    color: "#2D3748",
  },
  header: {
    display: "flex",
    alignItems: "center",
    justifyContent: "space-between",
    marginBottom: "32px",
  },
  title: { fontSize: "28px", fontWeight: "700", margin: 0 },
  badge: {
    backgroundColor: "#C6F6D5",
    color: "#22543D",
    padding: "4px 12px",
    borderRadius: "20px",
    fontSize: "14px",
    fontWeight: "600",
  },
  featuredSection: {
    display: "flex",
    flexWrap: "wrap",
    gap: "30px",
    padding: "30px",
    backgroundColor: "#F0FDFA",
    border: "1px solid #CCFBF1",
    borderRadius: "24px",
    alignItems: "center",
    marginBottom: "40px",
  },
  featuredImage: {
    flex: "1 1 300px",
    height: "250px",
    backgroundColor: "#06B5AF",
    borderRadius: "16px",
    position: "relative",
    overflow: "hidden",
  },
  imageOverlay: {
    position: "absolute",
    top: "12px",
    left: "12px",
    backgroundColor: "rgba(255,255,255,0.9)",
    padding: "4px 12px",
    borderRadius: "8px",
    fontSize: "12px",
    fontWeight: "bold",
    textTransform: "uppercase",
  },
  featuredContent: { flex: "1 1 300px" },
  featuredName: { fontSize: "32px", margin: "0 0 10px 0", color: "#1A202C" },
  featuredDesc: { fontSize: "16px", color: "#4A5568", marginBottom: "20px", lineHeight: "1.5" },
  priceRow: { display: "flex", alignItems: "center", gap: "20px" },
  featuredPrice: { fontSize: "24px", fontWeight: "700", color: "#06B5AF" },
  primaryButton: {
    backgroundColor: "#06B5AF",
    color: "white",
    border: "none",
    padding: "12px 24px",
    borderRadius: "12px",
    fontWeight: "600",
    cursor: "pointer",
  },
  sectionHeading: { fontSize: "22px", marginBottom: "20px", fontWeight: "600" },
  grid: {
    display: "grid",
    gridTemplateColumns: "repeat(auto-fill, minmax(220px, 1fr))",
    gap: "24px",
  },
  mealCard: {
    backgroundColor: "#fff",
    borderRadius: "20px",
    overflow: "hidden",
    border: "1px solid #EDF2F7",
    transition: "transform 0.2s ease",
    cursor: "pointer",
  },
  mealImage: { height: "160px", backgroundColor: "#E2E8F0" },
  cardBody: { padding: "16px", position: "relative" },
  mealName: { fontSize: "18px", margin: "0 0 4px 0", fontWeight: "600" },
  mealPrice: { fontSize: "16px", color: "#718096", margin: 0 },
  secondaryButton: {
    position: "absolute",
    right: "16px",
    bottom: "16px",
    width: "36px",
    height: "36px",
    borderRadius: "50%",
    backgroundColor: "#06B5AF",
    color: "white",
    border: "none",
    fontSize: "20px",
    cursor: "pointer",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
  },
};