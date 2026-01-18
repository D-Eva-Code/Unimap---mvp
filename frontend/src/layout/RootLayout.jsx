import { Outlet } from "react-router-dom";
import Nav from "../component/Nav";

function RootLayout() {
  return (
    <>
      <Nav />
      <div className="main-content">
        <Outlet />
      </div>
    </>
  );
}

export default RootLayout;
