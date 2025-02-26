import { useEffect, useContext } from "react";
import { AuthContext } from "../Auth";
import { Outlet, useNavigate } from "react-router-dom";
import AdminNavbar from "../../components/admin/AdminNavbar";
import { ToastContainer } from "react-toastify";
import AdminSidebar from "../../components/admin/AdminSidebar";
import UserNavbar from "../../components/user/UserNavbar";

export default function RootLayout() {
  const { userLogin } = useContext(AuthContext);
  const navigate = useNavigate();
  const {
    theme,
    changeTheme,
    loading,
    sidebarOpen,
    setSidebarOpen,
    role,
  } = useContext(AuthContext);

  useEffect(() => {
    if (!userLogin) {
      navigate("/admin/login");
    }
  }, [userLogin]); // Akan dijalankan saat `userLogin` berubah

  return (
    <>
      <UserNavbar />

      <div className="max-w-screen-xl mx-auto px-4 py-6">
        <Outlet />
      </div>

      <ToastContainer />
    </>
  );
}
