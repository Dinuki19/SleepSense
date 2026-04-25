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

      {/* OVERLAY — closes sidebar when clicking outside */}
      {sidebarOpen && (
        <div
          className="sidebar-overlay"
          onClick={() => setSidebarOpen(false)}
        />
      )}

      {/* LEFT SIDEBAR */}
      <AdminSidebar isOpen={sidebarOpen} onClose={() => setSidebarOpen(false)} />

      {/* MAIN CONTENT AREA */}
      <div className="admin-content">
        {children}
      </div>

    </div>
  );
}

export default AdminLayout;