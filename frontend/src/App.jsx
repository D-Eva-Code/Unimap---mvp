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
import ProtectedRoute from "./component/ProtectedRoute";

function App() {
  const router = createBrowserRouter(
    createRoutesFromElements(
      <Route path="/" element={<RootLayout />}>
        {/* Public */}
        <Route index element={<Signup />} />
        <Route path="login" element={<Login />} />

        {/* Protected */}
        <Route element={<ProtectedRoute />}>
          <Route path="vendor-dashboard" element={<VendorDashboard />} />
          <Route path="rider-dashboard" element={<RiderDashboard />} />
          <Route path="map" element={<MapPage />} />
        </Route>
      </Route>
    )
  );

  return <RouterProvider router={router} />;
}

export default App;
