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
        <Route path="driver-dashboard" element={<RiderDashboard />} />
      </Route>,
    ),
  );

  return <RouterProvider router={router} />;
}

export default App;
