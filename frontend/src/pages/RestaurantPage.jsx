import React from "react";
import { useParams } from "react-router-dom";
import { restaurants, menuItems } from "../data/restaurantData";
import FeaturedFoodsCarousel from "../component/promoRestCarousel";
import useCartStore from "../store/useCartStore"; // Adjust path

export default function RestaurantPage() {
  const { id } = useParams();
  
  // Zustand: Get the add function
  const addToCart = useCartStore((state) => state.addToCart);

  const restaurant = restaurants.find((r) => r.id === parseInt(id));

  if (!restaurant) {
    return <div style={{ padding: "50px", textAlign: "center" }}>Restaurant not found.</div>;
  }

  return (
    <div style={styles.container}>
      <header style={styles.header}>
        <h2 style={styles.title}>{restaurant.name}</h2>
        <div style={{ display: 'flex', gap: '10px', alignItems: 'center' }}>
            <span style={styles.badge}>Open Now</span>
            <span style={{ fontSize: '14px', color: '#718096' }}>{restaurant.category} • {restaurant.time}</span>
        </div>
      </header>

      <h3 style={styles.sectionHeading}>Today's Specials</h3>
      <FeaturedFoodsCarousel />

      <h3 style={styles.sectionHeading}>Explore Menu</h3>
      <div style={styles.grid}>
        {menuItems.map((meal) => (
          <div key={meal.id} style={styles.mealCard}>
            <div style={{ ...styles.mealImage, backgroundImage: `url(${meal.image})` }} />
            <div style={styles.cardBody}>
              <h4 style={styles.mealName}>{meal.name}</h4>
              <p style={styles.mealPrice}>{meal.price}</p>
              
              {/* Updated Click Handler */}
              <button 
                style={styles.secondaryButton}
                onClick={() => addToCart(meal)}
              >
                +
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

const styles = {
  container: { maxWidth: "100%", padding: "50px", backgroundColor: "#F7FAFC", minHeight: "100vh" },
  header: { marginBottom: "32px" },
  title: { fontSize: "32px", fontWeight: "800", marginBottom: "8px" },
  badge: { backgroundColor: "#C6F6D5", color: "#22543D", padding: "4px 12px", borderRadius: "20px", fontSize: "14px", fontWeight: "600" },
  sectionHeading: { fontSize: "22px", margin: "40px 0 20px 0", fontWeight: "600" },
  grid: { display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(220px, 1fr))", gap: "24px" },
  mealCard: { backgroundColor: "#fff", borderRadius: "20px", overflow: "hidden", border: "1px solid #EDF2F7" },
  mealImage: { height: "160px", backgroundSize: "cover", backgroundPosition: "center" },
  cardBody: { padding: "16px", position: "relative" },
  mealName: { fontSize: "18px", fontWeight: "600", margin: "0 0 4px 0" },
  mealPrice: { color: "#718096", margin: 0 },
  secondaryButton: { 
    position: "absolute", right: "16px", bottom: "16px", width: "36px", height: "36px", 
    borderRadius: "50%", backgroundColor: "#06B5AF", color: "white", border: "none", cursor: "pointer",
    fontSize: "20px", fontWeight: "bold"
  }
};