import React from "react";
import { useLocation } from "react-router-dom"; // 1. Import the hook
import UniMap from "./UniMap";
import Nav from "../component/Nav";

function MapPage() {
  const location = useLocation(); // 2. Get the current location object

  // 3. Define which paths should show the Nav
  const showNavPaths = ["/map", "/dashboard", "/profile"];
  
  // Check if the current pathname is in our allowed list
  const shouldShowNav = showNavPaths.includes(location.pathname);

  return (
    <div>
      {/* 4. Use conditional rendering */}
      {/* {shouldShowNav && <Nav />} */}
      
      <UniMap />
    </div>
  );
}

export default MapPage;