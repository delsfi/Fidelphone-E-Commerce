import { signOut } from "firebase/auth";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { auth } from "../config/firebase";
import { AdminContext } from "../pages/AdminLayout";
import { useContext } from "react";
import { Moon, Sun } from "lucide-react";

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
    <nav
      className={`w-full px-6 py-4 flex justify-between items-center shadow-md ${
        stateContext.theme ? "bg-white text-black" : "bg-gray-800 text-white"
      }`}
    >
      {/* Logo */}
      <div
        className={`text-2xl font-bold cursor-pointer ${
          stateContext.theme ? "text-red-600" : "text-white"
        }`}
        onClick={() => navigate("/admin")}
      >
        Fidel Phone
      </div>

      {/* Menu */}
      <div className="flex gap-5 items-center">
        {!stateContext.userLogin && (
          <>
            <button
              className={`px-4 py-2 ${
                stateContext.theme
                  ? "text-red-600 hover:underline"
                  : "text-white hover:underline"
              }`}
              onClick={() => navigate("/admin/login")}
            >
              Sign In
            </button>
            <button
              className={`px-4 py-2 rounded-md ${
                stateContext.theme
                  ? "bg-red-600 text-white hover:bg-red-700"
                  : "bg-red-500 text-white hover:bg-red-600"
              }`}
              onClick={() => navigate("/admin/register")}
            >
              Sign Up
            </button>
          </>
        )}

        {stateContext.userLogin && (
          <>
            <p className="pt-1">{stateContext.userLogin.email}</p>
            <button
              className="px-4 py-2 bg-red-600 hover:bg-red-700 text-white rounded-md"
              onClick={handleLogout}
            >
              Logout
            </button>
          </>
        )}

        {/* Theme Switch */}
        {stateContext.theme ? (
          <Sun
            size={30}
            className="cursor-pointer"
            onClick={stateContext.changeTheme}
          />
        ) : (
          <Moon
            size={30}
            className="cursor-pointer text-white"
            onClick={stateContext.changeTheme}
          />
        )}
      </div>
    </nav>
  );
}
