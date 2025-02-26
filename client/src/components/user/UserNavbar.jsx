import { signOut } from "firebase/auth";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { auth } from "../../config/firebase";
import { useContext } from "react";
import { Moon, Sun, Menu, LogOut, Apple } from "lucide-react";
import { AuthContext } from "../../pages/Auth";

export default function UserNavbar() {
  const navigate = useNavigate();
  const stateContext = useContext(AuthContext);

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
      className={`sticky top-0 z-50 w-full border-b ${
        stateContext.theme
          ? "bg-white border-gray-200 shadow-sm"
          : "bg-gray-800 border-gray-700 shadow-md"
      }`}
    >
      <div className="max-w-screen-xl mx-auto px-4 sm:px-6 lg:px-8 flex justify-between items-center py-3">
        {/* Logo & Burger Menu */}
        <div className="flex items-center gap-3 flex-1">
          {stateContext.userLogin && (
            <button
              className="md:hidden cursor-pointer"
              onClick={() =>
                stateContext.setSidebarOpen?.((prev) => !prev)
              } // Toggle sidebar
            >
              <Menu
                size={28}
                className={stateContext.theme ? "text-slate-700" : "text-white"}
              />
            </button>
          )}

          {/* Logo */}
          <div
            className={`text-xl sm:text-2xl font-bold cursor-pointer ${
              stateContext.theme ? "text-navy-700" : "text-white"
            }`}
            onClick={() => navigate("/admin")}
          >
            <Apple /> Fidel Phone
          </div>
        </div>

        {/* Menu & Theme Switch */}
        <div className="flex gap-4 items-center">
          {!stateContext.userLogin ? (
            <>
              <button
                className={`text-sm sm:text-base cursor-pointer ${
                  stateContext.theme
                    ? "text-navy-700 hover:underline"
                    : "text-white hover:underline"
                }`}
                onClick={() => navigate("/admin/login")}
              >
                Sign In
              </button>
              <button
                className={`text-sm sm:text-base px-3 py-1 sm:px-4 sm:py-2 rounded-md cursor-pointer ${
                  stateContext.theme
                    ? "bg-slate-700 text-white hover:bg-slate-800"
                    : "bg-slate-700 text-white hover:bg-slate-600"
                }`}
                onClick={() => navigate("/admin/register")}
              >
                Sign Up
              </button>
            </>
          ) : (
            <div className="hidden sm:flex items-center gap-3">
              <p
                className={`text-sm sm:text-base ${
                  stateContext.theme ? "text-gray-800" : "text-white"
                }`}
              >
                {stateContext.userLogin.email}
              </p>
              <button
                className="flex items-center cursor-pointer gap-2 px-3 py-1 sm:px-4 sm:py-2 bg-slate-700 hover:bg-slate-600 text-white rounded-md text-sm sm:text-base"
                onClick={handleLogout}
              >
                <LogOut size={20} className="flex-shrink-0" />
                <span>Logout</span>
              </button>
            </div>
          )}

          {/* Theme Switch */}
          <button onClick={stateContext.changeTheme} className="p-1">
            {stateContext.theme ? (
              <Sun size={28} className="text-slate-700" />
            ) : (
              <Moon size={28} className="text-white" />
            )}
          </button>
        </div>
      </div>
    </nav>
  );
}
