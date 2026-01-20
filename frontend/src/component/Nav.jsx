import React, { useEffect, useState } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { jwtDecode } from "jwt-decode";

function Nav() {
  const navigate = useNavigate();
  const location = useLocation();

  const [userName, setUserName] = useState("Guest User");

  useEffect(() => {
    const token = localStorage.getItem("token");

    if (token) {
      try {
        const decoded = jwtDecode(token);

        const name =
          decoded?.name ||
          decoded?.fullName ||
          decoded?.user?.name;

        if (name) {
          setUserName(name);
        }
      } catch (error) {
        console.error("Invalid token:", error);
        setUserName("Guest User");
      }
    }
  }, []);

  const tabs = [
    { key: "map", label: "Map", path: "/uni/map" },
    { key: "food", label: "Order Food", path: "/uni/food" },
    { key: "orders", label: "My Orders", path: "/uni/orders" },
    { key: "completed", label: "Completed", path: "/uni/completed" },
  ];

  return (
    <nav style={styles.navContainer}>
      <div style={styles.navContent}>
        {/* Brand */}
        <div style={styles.brand} onClick={() => navigate("/uni/map")}>
          <div style={styles.logo}>U</div>
          <span style={styles.brandText}>
            Unimap<span style={{ color: "#06B5AF" }}>+</span>
          </span>
        </div>

        {/* Tabs */}
        <div style={styles.tabs}>
          {tabs.map((tab) => {
            const isActive = location.pathname.startsWith(tab.path);

            return (
              <div
                key={tab.key}
                onClick={() => navigate(tab.path)}
                style={{
                  ...styles.tab,
                  ...(isActive ? styles.activeTab : {}),
                }}
              >
                {tab.label}
              </div>
            );
          })}
        </div>

        {/* User Profile */}
        <div style={styles.userProfile}>
          <div style={styles.userInfo}>
            <span style={styles.userName}>{userName}</span>
            <span style={styles.userRole}>Student</span>
          </div>
          <div style={styles.avatar}>
            {userName.charAt(0).toUpperCase()}
          </div>
        </div>
      </div>
    </nav>
  );
}

export default Nav;


const styles = {
  navContainer: {
    backgroundColor: "#ffffff",
    borderBottom: "1px solid #F0F0F0",
    position: "sticky",
    top: 0,
    zIndex: 1000,
    width: "100%",
  },
  navContent: {
    maxWidth: "1200px",
    margin: "0 auto",
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    padding: "0 24px",
    height: "72px", 
  },
  brand: { 
    display: "flex", 
    gap: "12px", 
    alignItems: "center", 
    cursor: "pointer" 
  },
  logo: { 
    width: 32, 
    height: 32, 
    background: "linear-gradient(135deg, #06B5AF 0%, #048C87 100%)", 
    borderRadius: "10px",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    color: "#fff",
    fontWeight: "bold",
    fontSize: "18px"
  },
  brandText: { 
    fontSize: "20px", 
    fontWeight: "800", 
    color: "#1A202C", 
    letterSpacing: "-0.5px" 
  },
  tabs: { 
    display: "flex", 
    gap: "8px",
    height: "100%",
    alignItems: "center"
  },
  tab: { 
    cursor: "pointer", 
    color: "#718096", 
    padding: "8px 16px",
    borderRadius: "8px",
    fontSize: "15px",
    fontWeight: "500",
    transition: "all 0.2s ease",
  },
  activeTab: { 
    color: "#06B5AF", 
    backgroundColor: "#F0FDFA", 
    fontWeight: "600"
  },
  userProfile: { 
    display: "flex", 
    alignItems: "center", 
    gap: "12px",
    paddingLeft: "20px",
    borderLeft: "1px solid #EDF2F7"
  },
  userInfo: { 
    display: "flex", 
    flexDirection: "column", 
    textAlign: "right" 
  },
  userName: { 
    fontSize: "14px", 
    fontWeight: "600", 
    color: "#2D3748" 
  },
  userRole: { 
    fontSize: "12px", 
    color: "#A0AEC0" 
  },
  avatar: {
    width: "36px",
    height: "36px",
    borderRadius: "50%",
    backgroundColor: "#E2E8F0",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    fontSize: "14px",
    fontWeight: "bold",
    color: "#4A5568"
  }
};