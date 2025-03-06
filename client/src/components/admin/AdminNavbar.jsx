import { signOut } from "firebase/auth";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { auth } from "../../config/firebase";
import { useContext } from "react";
import { Moon, Sun, Menu, LogOut } from "lucide-react";
import { AuthContext } from "../../pages/Auth";
import { useDispatch } from "react-redux";
import { getCartsThunk } from "../../store/appSlice";

export default function AdminNavbar() {
  const navigate = useNavigate();
  const stateContext = useContext(AuthContext);
  const dispatch = useDispatch();

  const handleLogout = async () => {
    try {
      await signOut(auth);
  
      stateContext.setUserLogin(null);
      stateContext.setRole(null); 
  
      dispatch(getCartsThunk(null)); //Reset cart di Redux
  
      navigate("/login");
      toast.success("Logout Success");
    } catch (error) {
      console.log(error);
      toast.error("Logout Failed!");
    }
  };
  
  
  

  return (
    <nav
      className={`sticky top-0 z-50 w-full px-4 sm:px-6 py-3 flex justify-between items-center 
  ${
    stateContext.theme
      ? "bg-white border-b border-gray-200 shadow-sm"
      : "bg-gray-800 border-b border-gray-700 shadow-md"
  }`}
    >
      {/* Navbar Content */}
      <div className="relative z-10 flex w-full justify-between items-center">
        <div className="flex items-center gap-3">
          {/* Burger Menu untuk Mobile */}
          {stateContext.userLogin && (
            <button
              className="md:hidden cursor-pointer"
              onClick={() =>
                stateContext.setSidebarOpen(!stateContext.sidebarOpen)
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
            Fidel Phone
          </div>
        </div>

        {/* Menu */}
        <div className="flex gap-4 items-center">
          {!stateContext.userLogin && (
            <>
              <button
                className={`text-sm sm:text-base cursor-pointer ${
                  stateContext.theme
                    ? "text-navy-700 hover:underline"
                    : "text-white hover:underline"
                }`}
                onClick={() => navigate("/login")}
              >
                Sign In
              </button>
              <button
                className={`text-sm sm:text-base px-3 py-1 sm:px-4 sm:py-2 rounded-md cursor-pointer ${
                  stateContext.theme
                    ? "bg-slate-700 text-white hover:bg-slate-800"
                    : "bg-slate-700 text-white hover:bg-slate-600"
                }`}
                onClick={() => navigate("/register")}
              >
                Sign Up
              </button>
            </>
          )}

          {stateContext.userLogin && (
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
          {stateContext.theme ? (
            <Sun
              size={28}
              className="cursor-pointer text-slate-700"
              onClick={stateContext.changeTheme}
            />
          ) : (
            <Moon
              size={28}
              className="cursor-pointer text-white"
              onClick={stateContext.changeTheme}
            />
          )}
        </div>
      </div>
    </nav>
  );
}
