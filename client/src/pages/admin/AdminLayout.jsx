import { use, useContext, useEffect } from "react";
import { ToastContainer } from "react-toastify";
import { Outlet, useNavigate } from "react-router-dom";
import AdminNavbar from "../../components/admin/AdminNavbar";
import AdminSidebar from "../../components/admin/AdminSidebar";
import { AuthContext } from "../Auth";

export default function AdminLayout() {
  const navigate = useNavigate();
  // Ambil data dari AuthContext
  const {
    theme,
    changeTheme,
    userLogin,
    loading,
    sidebarOpen,
    setSidebarOpen,
    role,
  } = useContext(AuthContext);

  useEffect(() => {
    if (role === "admin" || role === "superadmin") {
      navigate("/admin");
    } else if (role) {
      navigate("/");
    }
  }, [role]);

  return (
    <>
      <AdminNavbar />

      <div className="h-screen flex flex-col md:flex-row relative">
        {/* Sidebar Responsif */}
        {!loading && userLogin && <AdminSidebar />}

        {/* Konten Utama */}
        <div
          className={`flex-grow transition-all ${
            userLogin ? "md:pl-[200px]" : ""
          }`}
        >
          <Outlet />
        </div>
      </div>

      <ToastContainer />
    </>
  );
}
