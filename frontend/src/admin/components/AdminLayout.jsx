import AdminSidebar from "./AdminSidebar";
import "../../styles/admin/AdminLayout.css";

function AdminLayout({ children }) {
  return (
    <div className="admin-container">

      {/* LEFT SIDEBAR */}
      <AdminSidebar />

      {/* MAIN CONTENT AREA */}
      <div className="admin-content">
        {children}
      </div>

    </div>
  );
}

export default AdminLayout;