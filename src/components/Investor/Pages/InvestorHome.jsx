import React, { useState } from "react"; // ✅ Don't forget this!
import NavBar from "./Navbar";
import Sidebar from "./Sidebar";
import InvestorHomeBody from "./HomeBody";

const InvestorHome = () => {
  const [sidebarOpen, setSidebarOpen] = useState(false); // ✅ Define the toggle state

  return (
    <div>
      {/* Pass toggle function to NavBar */}
      <NavBar firstName="Manish" onMenuClick={() => setSidebarOpen(true)} />

      {/* Sidebar controlled by state */}
      <Sidebar isOpen={sidebarOpen} onClose={() => setSidebarOpen(false)} />

      {/* Other body components */}
      <InvestorHomeBody/>
    </div>
  );
};

export default InvestorHome;
