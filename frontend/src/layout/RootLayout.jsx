import { Outlet } from "react-router-dom";
import Nav from "../component/Nav";

function RootLayout() {
  return (
    <>
      <div className="main-content">
        <Nav />
        <Outlet />
      </div>
    </>
  );
}

export default RootLayout;
