import {
  createBrowserRouter,
  createRoutesFromElements,
  Route,
  RouterProvider,
} from "react-router-dom";
import Signup from "./pages/Signup";
import Login from "./pages/Login";

function App() {
  const router = createBrowserRouter(
    createRoutesFromElements(
      <>
        <Route path="/" element={<Signup />} />
        <Route path="login" element={<Login />} />
      </>,
    ),
  );

  return <RouterProvider router={router} />;
}

export default App;
