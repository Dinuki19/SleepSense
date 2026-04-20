import { useEffect, useState } from "react";
import { getUsers, deleteUser } from "../services/adminApi";
import AdminLayout from "../components/AdminLayout";
import "../../styles/admin/Users.css";

function getInitials(name) {
  if (!name) return "?";
  return name.split(" ").map(n => n[0]).join("").toUpperCase().slice(0, 2);
}

function Users() {
  const [users, setUsers] = useState([]);

  const loadUsers = async () => {
    const res = await getUsers();
    setUsers(res.data);
  };

  useEffect(() => {
    loadUsers();
  }, []);

  const handleDelete = async (id) => {
    await deleteUser(id);
    loadUsers();
  };

  return (
    <AdminLayout>
      <div className="users-page-header">
        <div>
          <h2 className="users-title">Users</h2>
          <p className="users-subtitle">Manage all registered accounts</p>
        </div>
        <span className="users-count-badge">{users.length} Users</span>
      </div>

      <div className="users-table-wrap">
        <table className="users-table">
          <thead>
            <tr>
              <th>User</th>
              <th>Role</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {users.map((u) => (
              <tr key={u._id}>
                <td>
                  <div className="user-name-cell">
                    <div className="user-avatar">{getInitials(u.name)}</div>
                    <div>
                      <div className="user-fullname">{u.name}</div>
                      <div className="user-email">{u.email}</div>
                    </div>
                  </div>
                </td>
                <td>
                  <span className={`role-pill ${u.role === "admin" ? "role-admin" : "role-user"}`}>
                    {u.role}
                  </span>
                </td>
                <td>
                  <button className="delete-btn" onClick={() => handleDelete(u._id)}>
                    <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                      <polyline points="3 6 5 6 21 6"/>
                      <path d="M19 6l-1 14H6L5 6"/>
                      <path d="M10 11v6M14 11v6"/>
                      <path d="M9 6V4h6v2"/>
                    </svg>
                    Delete
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </AdminLayout>
  );
}

export default Users;