import { Outlet, useLocation } from "react-router-dom";
import Nav from "../component/Nav";

function RootLayout() {
  const location = useLocation();

  const hideNavOnPaths = ["/", "/login", "/fullscreen-map", "/rider-dashboard", "/vendor-dashboard"];

  const shouldShowNav = !hideNavOnPaths.includes(location.pathname);

  return (
    <>
      <div className="main-content">
        {/* Only render Nav if the current path isn't in the hidden list */}
        {shouldShowNav && <Nav />}
        
        <main>
          <Outlet />
        </main>
      </div>
    </>
  );
}

export default RootLayout;