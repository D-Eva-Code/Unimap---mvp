import React, { useEffect, useState, useCallback } from "react";
import { Routes, Route, Navigate } from "react-router-dom";
import { jwtDecode } from "jwt-decode";

// Components
import Nav from "../component/Nav"; // Using the cleaned up Nav from earlier
import MapTab from "../component/tabs/MapTab";
import OrderFood from "../component/OrderFood";
import MyOrders from "../component/tabs/MyOrders";
import CompletedOrders from "../component/tabs/CompletedOrders";

// Constants
const API_BASE_URL = "http://localhost:5000";

export default function UniMap() {
  // --- User & Auth State ---
  const [userName, setUserName] = useState("Guest User");

  // --- Map & Location State ---
  const [locations, setLocations] = useState([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [userPos, setUserPos] = useState(null);
  const [destination, setDestination] = useState(null);
  const [mapCenter, setMapCenter] = useState([6.3996, 5.6145]);
  
  // Navigation Metrics
  const [navigationData, setNavigationData] = useState({
    distance: null,
    eta: null
  });

  // --- Auth Logic ---
  useEffect(() => {
    const token = localStorage.getItem("token");
    if (!token) return;
    try {
      const decoded = jwtDecode(token);
      if (decoded?.name) setUserName(decoded.name);
    } catch (err) {
      console.error("Auth Error:", err);
    }
  }, []);

  // --- Data Fetching Logic ---
  const fetchLocations = useCallback(async (query = "") => {
    const endpoint = query 
      ? `${API_BASE_URL}/locations/search?q=${encodeURIComponent(query)}`
      : `${API_BASE_URL}/locations`;

    try {
      const res = await fetch(endpoint);
      const data = await res.json();
      if (data.success) setLocations(data.data);
    } catch (err) {
      console.error("Fetch error:", err);
    }
  }, []);

  useEffect(() => {
  const defaultCenter = [6.3996, 5.6145]; // Campus center fallback

  if (!navigator.geolocation) {
    console.warn("Geolocation not available, using default center.");
    setUserPos(null);
    setMapCenter(defaultCenter);
    return;
  }

   navigator.geolocation.getCurrentPosition(
        (pos) => {
          const coords = [pos.coords.latitude, pos.coords.longitude];
          setUserPos(coords);
          setMapCenter(coords);
        },
        (err) => console.error("Location error:", err),
        { enableHighAccuracy: true }
      );
    }, []);

  useEffect(() => {

    // 2. Initial Locations Fetch
    fetchLocations();
  }, [fetchLocations]);

  // --- Event Handlers ---
  const handleSearch = () => fetchLocations(searchQuery.trim());

  return (
    <div style={styles.appWrapper}>

      {/* Main Content Area */}
      <main style={styles.contentArea}>
        <div style={styles.container}>
          <Routes>
            <Route index element={<Navigate to="map" replace />} />
            
            <Route
              path="map"
              element={
                <MapTab
                  locations={locations}
                  searchQuery={searchQuery}
                  setSearchQuery={setSearchQuery}
                  handleSearch={handleSearch}
                  userPos={userPos}
                  destination={destination}
                  setDestination={setDestination}
                  mapCenter={mapCenter}
                  setMapCenter={setMapCenter}
                  distance={navigationData.distance}
                  eta={navigationData.eta}
                  setDistance={(d) => setNavigationData(prev => ({ ...prev, distance: d }))}
                  setEta={(e) => setNavigationData(prev => ({ ...prev, eta: e }))}
                />
              }
            />
            
            <Route path="food/*" element={<OrderFood />} />
            <Route path="orders" element={<MyOrders />} />
            <Route path="completed" element={<CompletedOrders />} />
          </Routes>
        </div>
      </main>
    </div>
  );
}

const styles = {
  appWrapper: {
    display: "flex",
    flexDirection: "column",
    minHeight: "100vh",
    backgroundColor: "#F7FAFC", // Light grey background to make white cards pop
    fontFamily: "'Inter', sans-serif",
  },
  contentArea: {
    flex: 1,
    display: "flex",
    flexDirection: "column",
  },
  container: {
    width: "100%",
    maxWidth: "1200px",
    margin: "0 auto",
    padding: "24px",
    boxSizing: "border-box",
  },
};