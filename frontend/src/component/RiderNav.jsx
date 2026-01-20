function RiderNav({ rider }) {
  return (
    <>
      <nav style={styles.navContainer}>
        <div style={styles.navContent}>
          {/* Brand */}
          <div style={styles.brand} onClick={() => navigate("/uni/map")}>
            <div style={styles.logo}>U</div>
            <span style={styles.brandText}>
              Unimap<span style={{ color: "#06B5AF" }}>+</span>
            </span>
          </div>

          {/* User Profile */}
          <div style={styles.userProfile}>
            <div style={styles.userInfo}>
              <span style={styles.userName}>{rider.name}</span>
              <span style={styles.userRole}>Rider</span>
            </div>
            <div style={styles.avatar}>{rider.name.charAt(0)}</div>
          </div>
        </div>
      </nav>
    </>
  );
}

export default RiderNav;

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
    height: "72px", // Fixed height for a cleaner look
  },
  brand: {
    display: "flex",
    gap: "12px",
    alignItems: "center",
    cursor: "pointer",
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
    fontSize: "18px",
  },
  brandText: {
    fontSize: "20px",
    fontWeight: "800",
    color: "#1A202C",
    letterSpacing: "-0.5px",
  },

  userProfile: {
    display: "flex",
    alignItems: "center",
    gap: "12px",
    paddingLeft: "20px",
    borderLeft: "1px solid #EDF2F7",
  },
  userInfo: {
    display: "flex",
    flexDirection: "column",
    textAlign: "right",
  },
  userName: {
    fontSize: "14px",
    fontWeight: "600",
    color: "#2D3748",
  },
  userRole: {
    fontSize: "12px",
    color: "#A0AEC0",
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
    color: "#4A5568",
  },
};
