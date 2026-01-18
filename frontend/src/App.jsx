import { createBrowserRouter, createRoutesFromElements, Route, RouterProvider } from "react-router-dom"
import Signup from "./pages/Signup"

function App() {
const router = createBrowserRouter(
  createRoutesFromElements(
    <Route path="/" element={<Signup/>}/>
  )
)

  return (
  <RouterProvider router={router}/>
  )
}

export default App
