import { Outlet } from "react-router-dom";

import Sidebar from "../components/Sidebar";
import Footer from "../components/Footer";

const DashboardLayout = () => {
  return (
    <div
      className="d-flex"
      style={{
        minHeight: "100vh",
        backgroundColor: "#faf7ff",
      }}
    >

      <Sidebar />


      <div
        className="d-flex flex-column flex-grow-1"
        style={{
          minHeight: "100vh",
        }}
      >

        <main
          style={{
            flex: 1,
            padding: "24px",
          }}
        >
          <Outlet />
        </main>

        <Footer />
      </div>
    </div>
  );
};

export default DashboardLayout;