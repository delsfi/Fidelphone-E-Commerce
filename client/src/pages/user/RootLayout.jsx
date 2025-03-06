import { useEffect, useContext } from "react";
import { AuthContext } from "../Auth";
import { Outlet, useNavigate } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import UserNavbar from "../../components/user/UserNavbar";
import Footer from "../../components/user/Footer";

export default function RootLayout() {
  const { loading } = useContext(AuthContext);

  useEffect(() => {
    // Tunggu Firebase selesai loading sebelum render layout
  }, [loading]);

  return (
    <>
      <UserNavbar />
      <Outlet />
      <Footer />
      <ToastContainer />
    </>
  );
}
