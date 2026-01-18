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
import MapPage from "./pages/MapPage";

function App() {
  const router = createBrowserRouter(
    createRoutesFromElements(
      <>
        <Route path="/" element={<RootLayout />}>
          <Route path="/" element={<Signup />} />
          <Route path="login" element={<Login />} />
          <Route path="dashboard" element={<VendorDashboard />} />
          <Route path="map" element={<MapPage />} /> 
        </Route>
      </>
    )
  );

  return <RouterProvider router={router} />;
}

export default App;
