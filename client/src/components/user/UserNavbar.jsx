import { signOut } from "firebase/auth";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { auth } from "../../config/firebase";
import { useContext } from "react";
import { Moon, Sun, Menu, LogOut, ShoppingCart, Search } from "lucide-react";
import { AuthContext } from "../../pages/Auth";
import { useDispatch, useSelector } from "react-redux";
import { resetCartSuccess } from "../../store/appSlice";

export default function UserNavbar() {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const stateContext = useContext(AuthContext);
  const { carts } = useSelector((state) => state.app); // Ambil cart dari Redux
  const totalCartItems = carts.reduce(
    (total, item) => total + item.quantity,
    0
  ); // Hitung total item

  const handleLogout = async () => {
    try {
      await signOut(auth);
      dispatch(resetCartSuccess());
      navigate("/login");
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
        {/* Logo & Navigation Links */}
        <div className="flex items-center gap-6 flex-1">
          {/* Burger Menu (Mobile) */}
          {stateContext.userLogin && (
            <button
              className="md:hidden cursor-pointer"
              onClick={() => stateContext.setSidebarOpen?.((prev) => !prev)}
            >
              <Menu
                size={28}
                className={stateContext.theme ? "text-slate-700" : "text-white"}
              />
            </button>
          )}

          {/* Logo */}
          <div
            className="cursor-pointer flex items-center gap-2"
            onClick={() => navigate("/")}
          >
            <img src="/logo.PNG" alt="Fidel Phone Logo" className="h-10" />
          </div>

          {/* Products & About (di samping logo) */}
          <ul className="hidden md:flex items-center gap-6">
            {/* Products */}
            <li>
              <button
                className="text-sm font-medium hover:text-blue-600 transition"
                onClick={() => navigate("/products")}
              >
                Products
              </button>
            </li>

            {/* About */}
            <li>
              <button
                className="text-sm font-medium hover:text-blue-600 transition"
                onClick={() => navigate("/about")}
              >
                About
              </button>
            </li>
          </ul>
        </div>

        {/* Search Bar & Cart */}
        <div className="flex items-center gap-4">
          {/* Search */}
          <div className="relative">
            <input
              type="text"
              placeholder="Search..."
              className="px-3 py-1.5 text-sm border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
            <Search
              size={18}
              className="absolute right-2 top-1/2 transform -translate-y-1/2 text-gray-500"
            />
          </div>

          {/* Cart */}
          <button className="relative" onClick={() => navigate("/cart")}>
            <ShoppingCart
              size={28}
              className={stateContext.theme ? "text-slate-700" : "text-white"}
            />
            {totalCartItems > 0 && ( // Tampilkan hanya jika ada item di cart
              <span className="absolute -top-2 -right-2 bg-red-600 text-white text-xs font-bold px-2 py-0.5 rounded-full">
                {totalCartItems}
              </span>
            )}
          </button>

          {/* Auth Buttons */}
          {!stateContext.userLogin ? (
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
