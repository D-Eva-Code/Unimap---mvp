import {
  createBrowserRouter,
  createRoutesFromElements,
  Route,
  RouterProvider,
} from "react-router-dom";

import Signup from "./pages/Signup";
import Login from "./pages/Login";
import RootLayout from "./layout/RootLayout";
import VendorDashboard from "./pages/VendorDashboard";
import RiderDashboard from "./pages/RiderDashboard";
import MapPage from "./pages/MapPage";

function App() {
  const router = createBrowserRouter(
    createRoutesFromElements(
      <Route path="/" element={<RootLayout />}>
        {/* Default page */}
        <Route index element={<Signup />} />

        {/* Auth */}
        <Route path="login" element={<Login />} />

        {/* Dashboards */}
        <Route path="vendor-dashboard" element={<VendorDashboard />} />
        <Route path="rider-dashboard" element={<RiderDashboard />} />

        {/* Map */}
        <Route path="map" element={<MapPage />} />
      </Route>
    )
  );

  return <RouterProvider router={router} />;
}

export default App;
