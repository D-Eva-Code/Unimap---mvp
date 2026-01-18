
import React, { useState, useEffect } from "react"; 
import { MapContainer, TileLayer, Marker, Popup, useMap } from "react-leaflet";
import "leaflet/dist/leaflet.css";
import L from "leaflet";
import "leaflet-routing-machine";
import "leaflet-routing-machine/dist/leaflet-routing-machine.css";
import { jwtDecode } from "jwt-decode";


delete L.Icon.Default.prototype._getIconUrl;
L.Icon.Default.mergeOptions({
  iconRetinaUrl: "https://unpkg.com/leaflet@1.9.4/dist/images/marker-icon-2x.png",
  iconUrl: "https://unpkg.com/leaflet@1.9.4/dist/images/marker-icon.png",
  shadowUrl: "https://unpkg.com/leaflet@1.9.4/dist/images/marker-shadow.png",
});

// Updates the map view
function MapUpdater({ center }) {
  const map = useMap();
  useEffect(() => {
    if (center) map.setView(center, map.getZoom());
  }, [center, map]);
  return null;
}

// Handles the Road-Following Logic (by foot)
function RoutingEngine({ start, end, setDistance, setEta }) {
  const map = useMap();

  useEffect(() => {
    if (!map || !start || !end) return;

   const routingControl = L.Routing.control({
  waypoints: [L.latLng(start[0], start[1]), L.latLng(end[0], end[1])],
  router: L.Routing.osrmv1({
   
    serviceUrl: "https://routing.openstreetmap.de/routed-foot/route/v1",
  }),
  lineOptions: {
    styles: [{ color: "#2196F3", weight: 6, opacity: 0.8 }]
  },
  addWaypoints: false,
  draggableWaypoints: false,
  show: false,
  pointMarkerStyle: { radius: 0 },
}).addTo(map);

    // Listen for when the route is calculated
    routingControl.on("routesfound", (e) => {
      const routes = e.routes[0];
      const distInKm = (routes.summary.totalDistance / 1000).toFixed(2);
      const timeInMin = Math.round(routes.summary.totalTime / 60);
      
      setDistance(distInKm);
      setEta(timeInMin);
    });

    return () => map.removeControl(routingControl);
  }, [map, start, end, setDistance, setEta]);

  return null;
}

function UniMap() {
  const [locations, setLocations] = useState([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [userPos, setUserPos] = useState(null);
  const [destination, setDestination] = useState(null);
  const [distance, setDistance] = useState(null);
  const [eta, setEta] = useState(null);
  const [mapCenter, setMapCenter] = useState([6.3996, 5.6145]);
  const [userName, setUserName] = useState("Guest User");

  useEffect(() => {
   
    const token = localStorage.getItem("token"); 

    if (token) {
      try {
        const decoded = jwtDecode(token);
        console.log(decoded);
        if (decoded.name) {
          setUserName(decoded.name);
        }
      } catch (error) {
        console.error("Invalid token:", error);
        setUserName("Guest User");
      }
    }
  }, []);

  const handleDestinationSelect = (loc) => {
    setDestination([loc.latitude, loc.longitude]);
    setMapCenter([loc.latitude, loc.longitude]);
  };

  const handleSearch = async () => {
    try {
      const query = searchQuery.trim();
      const url = query
        ? `http://localhost:5000/locations/search?q=${encodeURIComponent(query)}`
        : "http://localhost:5000/locations";
        
      const res = await fetch(url);
      const data = await res.json();

      if (data.success && data.data.length > 0) {
        setLocations(data.data);
        const first = data.data[0];
        setMapCenter([first.latitude, first.longitude]);
      } else if (data.success && data.data.length === 0) {
        alert("No locations found.");
      }
    } catch (err) {
      console.error("Search failed:", err);
    }
  };

  const getUserLocation = () => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (pos) => {
          const coords = [pos.coords.latitude, pos.coords.longitude];
          setUserPos(coords);
          setMapCenter(coords);
        },
        (err) => console.error("Location error:", err),
        { enableHighAccuracy: true }
      );
    }
  };

  useEffect(() => {
    getUserLocation();
    const fetchLocations = async () => {
      try {
        const res = await fetch("http://localhost:5000/locations");
        const data = await res.json();
        if (data.success) setLocations(data.data);
      } catch (err) { console.error("Fetch error:", err); }
    };
    fetchLocations();
  }, []);

return (
  <div style={{ backgroundColor: "#FFFFFF", minHeight: "100vh", fontFamily: "'Segoe UI', Roboto, sans-serif" }}>
    
    {/* TOP NAVIGATION BAR */}
    <nav style={{ 
      display: "flex", 
      justifyContent: "space-between", 
      alignItems: "center", 
      padding: "15px 40px", 
      backgroundColor: "#FFFFFF", 
      borderBottom: "1px solid #eee",
      boxShadow: "0 2px 4px rgba(0,0,0,0.05)"
    }}>
      <div style={{ display: "flex", alignItems: "center", gap: "10px" }}>
        <div style={{ width: "35px", height: "35px", backgroundColor: "#06B5AF", borderRadius: "8px" }}></div>
        <span style={{ fontSize: "22px", fontWeight: "bold", color: "#005850" }}>Unimap+</span>
      </div>
      <div style={{ display: "flex", gap: "30px", fontSize: "15px", fontWeight: "500", color: "#666" }}>
        <span style={{ color: "#06B5AF", borderBottom: "2px solid #06B5AF", cursor: "pointer", paddingBottom: "5px" }}>Map</span>
        <span style={{ cursor: "pointer" }}>Order Food</span>
        <span style={{ cursor: "pointer" }}>My Orders</span>
        <span style={{ cursor: "pointer" }}>Completed</span>
      </div>
      <div style={{ display: "flex", alignItems: "center", gap: "10px" }}>
        <span style={{ fontSize: "13px", textAlign: "right", color: "#333" }}>
          <strong>{userName}</strong><br/><small style={{ color: "#999" }}>Student Dashboard</small>
        </span>
        <div style={{ width: "40px", height: "40px", backgroundColor: "#eee", borderRadius: "50%" }}></div>
      </div>
    </nav>

    <div style={{ padding: "30px 40px" }}>
      
      {/* MAP & SEARCH SECTION */}
      <div style={{ 
        backgroundColor: "#FFFFFF", 
        borderRadius: "15px", 
        overflow: "hidden", 
        boxShadow: "0 4px 20px rgba(0,0,0,0.08)",
        border: "1px solid #DBEFEF",
        marginBottom: "40px"
      }}>
        <div style={{ padding: "20px", display: "flex", gap: "15px", backgroundColor: "#fcfcfc" }}>
          <input
            type="text"
            placeholder="Search for a building..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            style={{ flex: 1, padding: "12px 20px", borderRadius: "10px", border: "1px solid #DBEFEF", outline: "none" }}
          />
          <button onClick={handleSearch} style={{ padding: "0 25px", borderRadius: "10px", background: "#06B5AF", color: "white", border: "none", fontWeight: "bold", cursor: "pointer" }}>
            Search
          </button>
          <button onClick={getUserLocation} style={{ padding: "10px 20px", borderRadius: "10px", background: "#DBEFEF", color: "#005850", border: "none", fontWeight: "bold", cursor: "pointer" }}>
            My Location
          </button>
        </div>

        {distance && (
          <div style={{ padding: "12px", background: "#FD7B08", color: "white", textAlign: "center", fontWeight: "bold", fontSize: "14px" }}>
            Route: {distance} km | Estimated Walk: {eta} mins
          </div>
        )}

        <MapContainer center={mapCenter} zoom={16} style={{ width: "100%", height: "450px" }}>
          <TileLayer url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png" />
          {locations.map((loc) => (
            <Marker key={loc.id} position={[loc.latitude, loc.longitude]}>
              <Popup>
                <div style={{ textAlign: "center" }}>
                  <strong style={{ color: "#005850" }}>{loc.name}</strong><br/>
                  <button onClick={() => handleDestinationSelect(loc)} style={{ marginTop: "8px", background: "#06B5AF", color: "white", border: "none", padding: "5px 10px", borderRadius: "5px", cursor: "pointer" }}>Go</button>
                </div>
              </Popup>
            </Marker>
          ))}
          {userPos && <Marker position={userPos} />}
          {userPos && destination && <RoutingEngine start={userPos} end={destination} setDistance={setDistance} setEta={setEta} />}
          <MapUpdater center={mapCenter} />
        </MapContainer>
      </div>

      {/* EXPLORE CAMPUS GRID */}
      <h2 style={{ color: "#005850", fontSize: "24px", marginBottom: "20px" }}>Explore Campus</h2>
      <div style={{ 
        display: "grid", 
        gridTemplateColumns: "repeat(3, 1fr)", 
        gap: "25px" 
      }}>
        {locations.slice(0, 9).map((loc) => (
          <div 
            key={loc.id}
            onClick={() => { handleDestinationSelect(loc); window.scrollTo({ top: 0, behavior: 'smooth' }); }}
            style={{
              backgroundColor: "#DBEFEF", 
              padding: "25px",
              borderRadius: "16px",
              cursor: "pointer",
              transition: "transform 0.2s ease, box-shadow 0.2s ease",
              border: "1px solid transparent"
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.transform = "translateY(-5px)";
              e.currentTarget.style.boxShadow = "0 8px 15px rgba(6, 181, 175, 0.1)";
              e.currentTarget.style.borderColor = "#06B5AF";
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.transform = "translateY(0)";
              e.currentTarget.style.boxShadow = "none";
              e.currentTarget.style.borderColor = "transparent";
            }}
          >
            <div style={{ display: "flex", gap: "15px", marginBottom: "12px" }}>
              <div style={{ width: "45px", height: "45px", backgroundColor: "#FFFFFF", borderRadius: "10px", display: "flex", justifyContent: "center", alignItems: "center" }}>
                 📍
              </div>
              <div>
                <h3 style={{ margin: 0, fontSize: "17px", color: "#005850" }}>{loc.name}</h3>
                <span style={{ fontSize: "12px", color: "#06B5AF", fontWeight: "bold", textTransform: "uppercase" }}>{loc.category}</span>
              </div>
            </div>
            <p style={{ margin: "0 0 15px 0", fontSize: "14px", color: "#555", lineHeight: "1.5" }}>{loc.description}</p>
            <div style={{ display: "flex", justifyContent: "space-between", color: "#005850", fontSize: "13px", fontWeight: "bold" }}>
               <span>Quick Navigate →</span>
               <span style={{ color: "#FD7B08" }}>View Details</span>
            </div>
          </div>
        ))}
      </div>
    </div>
  </div>
);
}

export default UniMap;