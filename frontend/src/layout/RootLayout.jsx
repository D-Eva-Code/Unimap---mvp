import { Outlet } from "react-router-dom";

function RootLayout() {
  return (
    <>
      <div className="main-content">
        <Outlet />
      </div>
    </>
  );
}

export default RootLayout;
