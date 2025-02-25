import { useContext } from "react";
import { ToastContainer } from "react-toastify";
import { Outlet } from "react-router-dom";
import AdminNavbar from "../../components/admin/AdminNavbar";
import AdminSidebar from "../../components/admin/AdminSidebar";
import { AuthContext } from "../Auth";

export default function AdminLayout() {
  // Ambil data dari AuthContext
  const { theme, changeTheme, userLogin, loading, sidebarOpen, setSidebarOpen } = useContext(AuthContext);

  return (
    <>
      <AdminNavbar />

      <div className="h-screen flex flex-col md:flex-row relative">
        {/* Sidebar Responsif */}
        {!loading && userLogin && <AdminSidebar />}

        {/* Konten Utama */}
        <div className={`flex-grow transition-all ${userLogin ? "md:pl-[200px]" : ""}`}>
          <Outlet />
        </div>
      </div>

      <ToastContainer />
    </>
  );
}