import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { restaurants } from "../data/restaurantData";
import PromoCarousel from '../component/PromoCarousel';

export default function OrderFood() {
  const [search, setSearch] = useState("");
  const navigate = useNavigate();

  const filteredRestaurants = restaurants.filter((r) =>
    r.name.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div style={styles.container}>
      <header style={styles.header}>
        <h2 style={styles.heading}>Restaurants</h2>
        <p style={styles.subheading}>Discover the best meals around campus</p>
      </header>

      <div style={styles.searchWrapper}>
        <input
          type="text"
          placeholder="Search for a restaurant..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          style={styles.search}
        />
      </div>

      <PromoCarousel />

      {filteredRestaurants.length > 0 ? (
        <div style={styles.grid}>
          {filteredRestaurants.map((res) => (
            <div
              key={res.id}
              style={styles.card}
              onClick={() => navigate(`/uni/food/restaurant/${res.id}`)}
            >
              <div style={{ ...styles.imagePlaceholder, backgroundImage: `url(${res.image})` }}>
                <div style={styles.timeTag}>{res.time}</div>
              </div>
              <div style={styles.info}>
                <div style={styles.topRow}>
                  <h3 style={styles.name}>{res.name}</h3>
                  <span style={styles.rating}>⭐ {res.rating}</span>
                </div>
                <span style={styles.category}>{res.category}</span>
              </div>
            </div>
          ))}
        </div>
      ) : (
        <div style={styles.emptyState}>No restaurants found matching "{search}"</div>
      )}
    </div>
  );
}

const styles = {
  container: { maxWidth: "1100px", margin: "0 auto", padding: "40px 20px", fontFamily: "'Inter', sans-serif" },
  header: { marginBottom: "30px" },
  heading: { fontSize: "32px", fontWeight: "800", color: "#005850" },
  subheading: { color: "#718096" },
  searchWrapper: { marginBottom: "40px" },
  search: { width: "100%", maxWidth: "500px", padding: "14px 20px", borderRadius: "14px", border: "2px solid #158ad8", backgroundColor: "#F7FAFC" },
  grid: { display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(280px, 1fr))", gap: "32px" },
  card: { borderRadius: "20px", cursor: "pointer", overflow: "hidden", border: "1px solid #F0F0F0", boxShadow: "0 4px 6px rgba(0,0,0,0.05)" },
  imagePlaceholder: { height: "200px", backgroundSize: "cover", backgroundPosition: "center", position: "relative" },
  timeTag: { position: "absolute", bottom: "12px", right: "12px", backgroundColor: "#fff", padding: "4px 10px", borderRadius: "8px", fontSize: "12px", fontWeight: "700" },
  info: { padding: "18px" },
  topRow: { display: "flex", justifyContent: "space-between", alignItems: "center" },
  name: { fontSize: "18px", fontWeight: "700", margin: 0 },
  category: { fontSize: "14px", color: "#718096" },
  emptyState: { textAlign: "center", padding: "60px", color: "#A0AEC0" }
};