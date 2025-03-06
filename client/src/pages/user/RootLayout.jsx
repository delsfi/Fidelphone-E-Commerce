import { useEffect, useContext } from "react";
import { AuthContext } from "../Auth";
import { Outlet, useNavigate } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import UserNavbar from "../../components/user/UserNavbar";
import Footer from "../../components/user/Footer";

export default function RootLayout() {
  const { userLogin, role, loading } = useContext(AuthContext);
  const navigate = useNavigate();

  useEffect(() => {
    if (!loading) { // Tunggu Firebase selesai memuat user
      if (role === "admin" || role === "superadmin") {
        navigate("/admin");
      }
    }
  }, [role, loading, navigate]);

  return (
    <>
      <UserNavbar />
      <Outlet />
      <Footer />
      <ToastContainer />
    </>
  );
}
