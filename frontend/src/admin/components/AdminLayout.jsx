import { useState } from "react";
import AdminSidebar from "./AdminSidebar";
import "../../styles/admin/AdminLayout.css";

function AdminLayout({ children }) {
  const [sidebarOpen, setSidebarOpen] = useState(false);

  return (
    <div className="admin-container">

      {/* HAMBURGER BUTTON — mobile only */}
      <button
        className="sidebar-toggle"
        onClick={() => setSidebarOpen(!sidebarOpen)}
      >
        ☰
      </button>

      {sidebarOpen && (
        <div
          className="sidebar-overlay"
          onClick={() => setSidebarOpen(false)}
        />
      )}

     
      <AdminSidebar isOpen={sidebarOpen} onClose={() => setSidebarOpen(false)} />

      <div className="admin-content">
        {children}
      </div>

    </div>
  );
}

export default AdminLayout;