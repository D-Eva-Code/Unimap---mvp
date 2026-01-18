
import React, { useState, useEffect } from "react"; 
import { MapContainer, TileLayer, Marker, Popup, useMap } from "react-leaflet";
import "leaflet/dist/leaflet.css";
import L from "leaflet";
import "leaflet-routing-machine";
import "leaflet-routing-machine/dist/leaflet-routing-machine.css";


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

// Helper Component: Handles the Road-Following Logic (by foot)
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

  const handleKeyDown = (e) => {
    if (e.key === "Enter") handleSearch();
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

  const handleDestinationSelect = (loc) => {
    setDestination([loc.latitude, loc.longitude]);
    setMapCenter([loc.latitude, loc.longitude]);
  };

  return (
    <div style={{ display: "flex", flexDirection: "column", alignItems: "center", marginTop: "20px", fontFamily: "Arial" }}>
      <div style={{ width: "80%", maxWidth: "900px", border: "1px solid #ccc", borderRadius: "10px", overflow: "hidden", boxShadow: "0 4px 6px rgba(0,0,0,0.1)" }}>
        
        
        <div style={{ padding: "15px", background: "#fff", display: "flex", gap: "10px", borderBottom: "1px solid #eee" }}>
          <input
            type="text"
            placeholder="Search for a building..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            onKeyDown={handleKeyDown}
            style={{ flex: 1, padding: "10px", borderRadius: "4px", border: "1px solid #ddd" }}
          />
          <button onClick={handleSearch} style={{ padding: "10px 15px", cursor: "pointer", background: "#2196F3", color: "white", border: "none", borderRadius: "4px" }}>
            Search
          </button>
          <button onClick={getUserLocation} style={{ padding: "10px", cursor: "pointer", background: "#f0f0f0", border: "1px solid #ccc", borderRadius: "4px" }}>
            {"\u{1F4CD}"} My Location
          </button>
        </div>

        {/* Dynamic Distance/ETA Banner */}
        {distance && (
          <div style={{ padding: "10px 20px", background: "#4CAF50", color: "white", fontWeight: "bold", textAlign: "center" }}>
            {"\u{1F4CF}"} Path Distance: {distance} km | {"\u{231B}"} Est. Time: {eta} mins
          </div>
        )}

        <MapContainer center={mapCenter} zoom={16} style={{ width: "100%", height: "500px" }}>
          <TileLayer url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png" attribution="&copy; OpenStreetMap" />

          {locations.map((loc) => (
            <Marker key={loc.id} position={[loc.latitude, loc.longitude]}>
              <Popup>
                <div style={{ minWidth: "150px" }}>
                  <h3 style={{ margin: "0 0 5px 0" }}>{loc.name}</h3>
                  <p style={{ margin: "0 0 5px 0", fontSize: "12px", color: "#666" }}><strong>{loc.category}</strong></p>
                  <p style={{ margin: "0 0 10px 0", fontSize: "13px" }}>{loc.description}</p>
                  <button 
                    onClick={() => handleDestinationSelect(loc)}
                    style={{ width: "100%", padding: "8px", background: "#4CAF50", color: "white", border: "none", borderRadius: "4px", cursor: "pointer" }}
                  >
                    Navigate Here
                  </button>
                </div>
              </Popup>
            </Marker>
          ))}

          {userPos && (
            <Marker position={userPos}>
              <Popup>You are here</Popup>
            </Marker>
          )}

          {/* Road Routing Component */}
          {userPos && destination && (
            <RoutingEngine 
              start={userPos} 
              end={destination} 
              setDistance={setDistance} 
              setEta={setEta} 
            />
          )}

          <MapUpdater center={mapCenter} />
        </MapContainer>
      </div>
    </div>
  );
}

export default UniMap;