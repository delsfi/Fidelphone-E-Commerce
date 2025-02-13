import { signOut } from "firebase/auth";
import { Navigate, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { auth } from "../config/firebase";
import { AdminContext } from "../pages/AdminLayout";
import { useContext } from "react";

export default function Navbar() {
  const navigate = useNavigate();
  const stateContext = useContext(AdminContext);
  const handleLogout = async () => {
    try {
      await signOut(auth);
      navigate("/admin/login");
      toast.success("Logout Success");
    } catch (error) {
      console.log(error);
    }
  };
  return (
    <nav className="w-full bg-white shadow-md px-6 py-4 flex justify-between items-center">
      {/* Logo */}
      <div
        className="text-2xl font-bold text-blue-600 cursor-pointer"
        onClick={() => navigate("/admin")}
      >
        MyLogo
      </div>

      {/* Menu */}
      <div className="flex gap-4">
        {!stateContext.userLogin && (
          <>
            <button
              className="px-4 py-2 text-blue-600 cursor-pointer"
              onClick={() => navigate("/admin/login")}
            >
              Sign In
            </button>
            <button
              className="px-4 py-2 bg-blue-600 text-white rounded-md cursor-pointer"
              onClick={() => navigate("/admin/register")}
            >
              Sign Up
            </button>
          </>
        )}
        {stateContext.userLogin && (
          <>
            <p>Hi, {stateContext.userLogin.email}</p>
            <button
              className="px-4 py-2 bg-blue-600 text-white rounded-md cursor-pointer"
              onClick={handleLogout}
            >
              Logout
            </button>
          </>
        )}
      </div>
    </nav>
  );
}
