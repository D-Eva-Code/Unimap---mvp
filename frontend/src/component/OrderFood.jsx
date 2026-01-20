import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import HomeandawayImage from "../assets/haaw.png";
import campusBitesImage from "../assets/cb.jpg";
import spicyKitchenImage from "../assets/sk.jpeg";
import zzImage from "../assets/zz.jpg";
import parfaitImage from "../assets/parf.jpg";
import buka2Image from "../assets/buka2new.jpg";
import PromoCarousel from '../component/PromoCarousel';

const restaurantsData = [
  { id: 1, name: "Home and Away", category: "Local Dishes", rating: "4.5", time: "20-30 min",image:HomeandawayImage},
  { id: 2, name: "Campus Bites", category: "Fast Food", rating: "4.2", time: "10-15 min",image:campusBitesImage },
  { id: 3, name: "Spicy Kitchen", category: "African & Continental", rating: "4.8", time: "35-45 min",image:spicyKitchenImage },
  { id: 4, name: "Snack Hub", category: "Snacks & Drinks", rating: "4.0", time: "5-10 min",image:parfaitImage },
  { id: 5, name: "Breakfast Corner By Zzone", category: "Breakfast", rating: "3.8", time: "15-25 min",image:zzImage },
  { id: 6, name: "Buka 2", category: "Local Dishes", rating: "4.0", time: "20-30 min",image:buka2Image },
];

export default function OrderFood() {
  const [search, setSearch] = useState("");
  const navigate = useNavigate();

  const filteredRestaurants = restaurantsData.filter((r) =>
    r.name.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div style={styles.container}>
      <div style={styles.header}>
        <h2 style={styles.heading}>Restaurants</h2>
        <p style={styles.subheading}>Discover the best meals around campus</p>
      </div>

      {/* Search Bar */}
      <div style={styles.searchWrapper}>
        <input
          type="text"
          placeholder="Search for a restaurant or dish..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          style={styles.search}
        />
      </div>
      <PromoCarousel />

      {/* Restaurant Grid */}
      {filteredRestaurants.length > 0 ? (
        <div style={styles.grid}>
          {filteredRestaurants.map((restaurant) => (
            <div
              key={restaurant.id}
              style={styles.card}
              onClick={() => navigate(`/uni/food/restaurant/${restaurant.id}`)}
            >
              <div
  style={{
    ...styles.imagePlaceholder,
    backgroundImage: `url(${restaurant.image})`,
    backgroundSize: "cover",
    backgroundPosition: "center",
  }}
>
  <div style={styles.timeTag}>{restaurant.time}</div>
</div>

              <div style={styles.info}>
                <div style={styles.topRow}>
                  <h3 style={styles.name}>{restaurant.name}</h3>
                  <span style={styles.rating}>⭐ {restaurant.rating}</span>
                </div>
                <span style={styles.category}>{restaurant.category}</span>
              </div>
            </div>
          ))}
        </div>
      ) : (
        <div style={styles.emptyState}>
          <p>No restaurants found matching "{search}"</p>
        </div>
      )}
    </div>
  );
}

const styles = {
  container: {
    maxWidth: "1100px",
    margin: "0 auto",
    padding: "40px 20px",
    fontFamily: "'Inter', sans-serif",
  },
  header: {
    marginBottom: "30px",
  },
  heading: {
    fontSize: "32px",
    fontWeight: "800",
    margin: "0 0 8px 0",
    color: "#005850",
  },
  subheading: {
    color: "#718096",
    fontSize: "16px",
    margin: 0,
  },
  searchWrapper: {
    marginBottom: "40px",
  },
  search: {
    width: "100%",
    maxWidth: "500px",
    padding: "14px 20px",
    borderRadius: "14px",
    border: "2px solid #EDF2F7",
    fontSize: "16px",
    outline: "none",
    transition: "border-color 0.2s",
    backgroundColor: "#F7FAFC",
    borderColor: "#158ad8",
  },
  grid: {
    display: "grid",
    gridTemplateColumns: "repeat(auto-fill, minmax(280px, 1fr))",
    gap: "32px",
  },
  card: {
    backgroundColor: "#fff",
    borderRadius: "20px",
    cursor: "pointer",
    overflow: "hidden",
    transition: "transform 0.2s, box-shadow 0.2s",
    border: "1px solid #F0F0F0",
    boxShadow: "0 4px 6px -1px rgba(0,0,0,0.05)",
  },
  imagePlaceholder: {
    height: "200px",
    position: "relative",
    borderTopLeftRadius: "20px",
    borderTopRightRadius: "20px",
  },
  timeTag: {
    position: "absolute",
    bottom: "12px",
    right: "12px",
    backgroundColor: "#fff",
    padding: "4px 10px",
    borderRadius: "8px",
    fontSize: "12px",
    fontWeight: "700",
    color: "#2D3748",
  },
  info: {
    padding: "18px",
  },
  topRow: {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: "4px",
  },
  name: {
    fontSize: "18px",
    fontWeight: "700",
    margin: 0,
    color: "#2D3748",
  },
  rating: {
    fontSize: "14px",
    fontWeight: "600",
    color: "#2D3748",
  },
  category: {
    fontSize: "14px",
    color: "#718096",
  },
  emptyState: {
    textAlign: "center",
    padding: "60px",
    color: "#A0AEC0",
    fontSize: "18px",
  },
};