import React, { useEffect, useRef, useState } from "react";
import { MapContainer, TileLayer, Marker, Popup, useMap } from "react-leaflet";
import L from "leaflet";
import "leaflet/dist/leaflet.css";
import "leaflet-routing-machine";
import "leaflet-routing-machine/dist/leaflet-routing-machine.css";

/* ---------- Icons ---------- */
const userIcon = new L.Icon({
  iconUrl: "https://cdn-icons-png.flaticon.com/512/711/711769.png",
  iconSize: [35, 35],
  iconAnchor: [17, 17],
});

const buildingIcon = new L.Icon({
  iconUrl: "https://cdn-icons-png.flaticon.com/512/8059/8059086.png",
  iconSize: [40, 40],
  iconAnchor: [20, 40],
});

/* ---------- Internal Helpers ---------- */
function MapViewHandler({ center }) {
  const map = useMap();
  const hasCentered = useRef(false);

  useEffect(() => {
    if (!center || !map) return;
    if (!hasCentered.current) {
      map.setView(center, 17);
      hasCentered.current = true;
    } else {
      const current = map.getCenter();
      if (current.lat !== center[0] || current.lng !== center[1]) {
        map.flyTo(center, 17, { duration: 1.2 });
      }
    }
    setTimeout(() => map.invalidateSize(), 500);
  }, [center, map]);

  return null;
}


function RoutingEngine({ start, end, setDistance, setEta }) {
  const map = useMap();
  const routingControlRef = useRef(null);

  useEffect(() => {
    if (!map || !start || !end) return;

    // 1. Clear existing route before drawing a new one
    if (routingControlRef.current) {
      map.removeControl(routingControlRef.current);
    }

    //the routing control
    routingControlRef.current = L.Routing.control({
      waypoints: [L.latLng(start[0], start[1]), L.latLng(end[0], end[1])],
      router: L.Routing.osrmv1({
       
        serviceUrl: "https://routing.openstreetmap.de/routed-foot/route/v1",
      }),
      lineOptions: { 
        styles: [{ color: "#06B5AF", weight: 7, opacity: 0.9 }],
        extendToWaypoints: true,
        missingRouteTolerance: 0
      },
      addWaypoints: false,
      draggableWaypoints: false,
      show: false, 
    }).addTo(map);

    routingControlRef.current.on("routesfound", (e) => {
      const r = e.routes[0];
      if (r?.summary) {
        setDistance((r.summary.totalDistance / 1000).toFixed(1));
        setEta(Math.round(r.summary.totalTime / 60));
      }
    });

    return () => {
      if (routingControlRef.current) {
        map.removeControl(routingControlRef.current);
      }
    };
  }, [map, start, end]); 

  return null;
}

/* ---------- Main Component ---------- */
export default function MapTab({
  locations,
  searchQuery,
  setSearchQuery,
  handleSearch,
  userPos,
  destination,
  setDestination,
  mapCenter,
  setMapCenter,
  distance,
  eta,
  setDistance,
  setEta,
}) {
  const mapSectionRef = useRef(null);
  const [activeId, setActiveId] = useState(null);

  const handleDestinationSelect = (loc) => {
    setActiveId(loc.id);
    setDestination([loc.latitude, loc.longitude]);
    setMapCenter([loc.latitude, loc.longitude]);

    mapSectionRef.current?.scrollIntoView({ behavior: "smooth", block: "start" });
  };

  return (
    <div style={styles.container}>
      {/* MAP SECTION */}
      <div ref={mapSectionRef} style={styles.mapWrapper}>
        <div style={styles.searchOverlay}>
          <input
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            onKeyPress={(e) => e.key === "Enter" && handleSearch()}
            placeholder="Where to?"
            style={styles.searchInput}
          />
          <button onClick={handleSearch} style={styles.searchButton}>Search</button>
        </div>

        {destination && (
          <div style={styles.navCard}>
            <div style={styles.navInfo}>
              <span style={styles.etaText}>{eta || '--'} min</span>
              <span style={styles.distanceText}>{distance || '--'} km • Walking</span>
            </div>
            <button
              onClick={() => { setDestination(null); setActiveId(null); setDistance(null); setEta(null); }}
              style={styles.closeButton}
            >
              Cancel
            </button>
          </div>
        )}

        <div style={styles.mapContainer}>
          <MapContainer
              center={userPos || mapCenter} //to use userPos first if available
              zoom={16}
              style={{ height: "100%", width: "100%" }}
              zoomControl={false}
            >
            <TileLayer url="https://{s}.basemaps.cartocdn.com/light_all/{z}/{x}/{y}{r}.png" />

            {locations.map((loc) => (
              <Marker key={loc.id} position={[loc.latitude, loc.longitude]} icon={buildingIcon}>
                <Popup>
                  <strong>{loc.name}</strong>
                  <button onClick={() => handleDestinationSelect(loc)} style={styles.goButton}>Go</button>
                </Popup>
              </Marker>
            ))}

            {userPos && <Marker position={userPos} icon={userIcon} />}
            
            {userPos && destination && (
              <RoutingEngine start={userPos} end={destination} setDistance={setDistance} setEta={setEta} />
            )}

            <MapViewHandler center={mapCenter} />
          </MapContainer>
        </div>
      </div>

      {/* LOCATIONS LIST */}
      <div style={styles.listSection}>
        <h3 style={styles.listHeading}>Nearby Locations</h3>
        <div style={styles.grid}>
          {locations.slice(0, 9).map((loc) => {
            const isSelected = activeId === loc.id;
            return (
              <div
                key={loc.id}
                style={{
                  ...styles.locationCard,
                  borderColor: isSelected ? "#06B5AF" : "#EDF2F7",
                  ...(isSelected ? styles.activeCard : {}),
                }}
                onClick={() => handleDestinationSelect(loc)}
              >
                <div style={styles.cardIcon}>&#x1F4CD;</div>
        <div style={styles.cardDetails}>
          <h4 style={styles.cardName}>{loc.name}</h4>
          {loc.category && <p style={styles.cardSubtext}>{loc.category}</p>}
          {loc.description && <p style={styles.cardSubtext}>{loc.description}</p>}
        </div>
        <div style={{ ...styles.chevron, color: isSelected ? "#06B5AF" : "#CBD5E0" }}>›</div>
      </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}

const styles = {
  container: { display: "flex", flexDirection: "column", gap: "20px" },
  mapWrapper: {
    position: "relative",
    height: "500px",
    borderRadius: "24px",
    overflow: "hidden",
    boxShadow: "0 10px 25px rgba(0,0,0,0.1)",
  },
  searchOverlay: {
    position: "absolute", top: "20px", left: "50%", transform: "translateX(-50%)",
    zIndex: 1000, display: "flex", width: "90%", maxWidth: "400px",
    backgroundColor: "white", padding: "6px", borderRadius: "14px", boxShadow: "0 4px 15px rgba(0,0,0,0.15)"
  },
  searchInput: { flex: 1, border: "none", padding: "10px", outline: "none" },
  searchButton: { backgroundColor: "#06B5AF", color: "white", border: "none", padding: "10px 18px", borderRadius: "10px", fontWeight: "600", cursor: "pointer" },
  navCard: {
    position: "absolute", bottom: "20px", left: "20px", right: "20px", zIndex: 1000,
    backgroundColor: "white", padding: "16px 20px", borderRadius: "18px", display: "flex", justifyContent: "space-between", alignItems: "center", boxShadow: "0 -4px 15px rgba(0,0,0,0.1)"
  },
  etaText: { fontSize: "22px", fontWeight: "800", color: "#06B5AF" },
  distanceText: { fontSize: "13px", color: "#718096" },
  closeButton: { backgroundColor: "#FEE2E2", color: "#EF4444", border: "none", padding: "8px 14px", borderRadius: "10px", fontWeight: "bold", cursor: "pointer" },
  mapContainer: { height: "100%", width: "100%" },
  goButton: { marginTop: "5px", backgroundColor: "#06B5AF", color: "white", border: "none", padding: "5px", borderRadius: "5px", width: "100%" },
  
  listSection: { padding: "0 10px 40px" },
  listHeading: { fontSize: "20px", fontWeight: "700", marginBottom: "15px" },
  grid: { display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(280px, 1fr))", gap: "16px" },
  
  locationCard: {
    display: "flex",
    alignItems: "center",
    padding: "16px",
    backgroundColor: "white",
    borderRadius: "16px",
    border: "1px solid #EDF2F7",
    cursor: "pointer",
    transition: "all 0.2s",
    outline: "none",
    userSelect: "none",
  },
  
  activeCard: {
    backgroundColor: "#F0FDFA",
    transform: "translateY(-2px)",
    boxShadow: "0 4px 12px rgba(6, 181, 175, 0.2)",
  },
  
  cardIcon: { fontSize: "20px", marginRight: "12px" },
  cardDetails: { flex: 1 },
  cardName: { fontSize: "16px", margin: 0, fontWeight: "600" },
  cardSubtext: { fontSize: "12px", color: "#718096", margin: "2px 0 0 0" },
  chevron: { fontSize: "24px" },
};
