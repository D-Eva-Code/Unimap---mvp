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
import UniMap from "./pages/UniMap"; // your route-driven tab component
import ProtectedRoute from "./component/ProtectedRoute";
import OrderFood from "./component/OrderFood";
import RestaurantPage from "./pages/RestaurantPage";

function App() {
  const router = createBrowserRouter(
    createRoutesFromElements(
      <Route path="/" element={<RootLayout />}>
        {/* Public Routes */}
        <Route index element={<Signup />} />
        <Route path="login" element={<Login />} />
        

        {/* Protected Routes */}
        <Route element={<ProtectedRoute />}>
          <Route path="vendor-dashboard" element={<VendorDashboard />} />
          <Route path="rider-dashboard" element={<RiderDashboard />} />
          <Route path="uni/*" element={<UniMap />} />  
          <Route path="uni/food/restaurant/:id" element={<RestaurantPage />} />  


          {/* Map + Tabs Section */}
         
          {/* Other standalone pages */}
          <Route path="order" element={<OrderFood />} />
        </Route>
      </Route>
    )
  );

  return <RouterProvider router={router} />;
}

export default App;
