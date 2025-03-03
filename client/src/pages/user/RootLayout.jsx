import { useEffect, useContext } from "react";
import { AuthContext } from "../Auth";
import { Outlet, useNavigate } from "react-router-dom";
import AdminNavbar from "../../components/admin/AdminNavbar";
import { ToastContainer } from "react-toastify";
import AdminSidebar from "../../components/admin/AdminSidebar";
import UserNavbar from "../../components/user/UserNavbar";

export default function RootLayout() {
  const { userLogin, role } = useContext(AuthContext);
  const navigate = useNavigate();


  useEffect(() => {
    if (role === "admin" || role === "superadmin") {
      navigate("/admin");
    } else if (role) {
      navigate("/");
    }
  }, [role]);

  // useEffect(() => {
  //   if (!userLogin) {
  //     navigate("/login");
  //   }
  // }, [userLogin]); // Akan dijalankan saat `userLogin` berubah

  return (
    <>
      <UserNavbar />


        <Outlet />


      <ToastContainer />
    </>
  );
}
