import { getAuth, onAuthStateChanged } from "firebase/auth";
import { createContext, useEffect, useState } from "react";
import { ToastContainer } from "react-toastify";
import { Outlet } from "react-router-dom";
import AdminNavbar from "../../components/admin/AdminNavbar";
import AdminSidebar from "../../components/admin/AdminSidebar";

export const AdminContext = createContext(null);

export default function AdminLayout() {
  const [theme, setTheme] = useState(true);
  const [userLogin, setUserLogin] = useState(null);
  const [loading, setLoading] = useState(true);
  const [sidebarOpen, setSidebarOpen] = useState(false); // NEW: untuk toggle sidebar di mobile

  const changeTheme = () => setTheme(!theme);

  // ambil user
  useEffect(() => {
    setLoading(true);
    const auth = getAuth();
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      setUserLogin(user);
      setLoading(false);
    });

    return () => unsubscribe();
  }, []);

  return (
    <AdminContext.Provider
      value={{ theme, changeTheme, userLogin, loading, sidebarOpen, setSidebarOpen }}
    >
      <AdminNavbar />

      <div className="h-screen flex flex-col md:flex-row relative">
        {/* Sidebar Responsif */}
        {!loading && userLogin && (
          <AdminSidebar />
        )}

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
    </AdminContext.Provider>
  );
}
