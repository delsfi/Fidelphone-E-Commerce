import { House, PackagePlusIcon, X, LogOut } from "lucide-react";
import { Link } from "react-router-dom";
import { AdminContext } from "../../pages/admin/AdminLayout";
import { useContext } from "react";
import { signOut } from "firebase/auth";
import { auth } from "../../config/firebase";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";

const sidebarLink = [
  {
    name: "Dashboard",
    href: "/admin",
    icon: <House size={18} />,
  },
  {
    name: "Add Product",
    href: "/admin/add-product",
    icon: <PackagePlusIcon size={18} />,
  },
];

export default function AdminSidebar() {
  const stateContext = useContext(AdminContext);
  const navigate = useNavigate();

  const handleLogout = async () => {
    try {
      await signOut(auth);
      navigate("/admin/login");
      toast.success("Logout Success");
      stateContext.setSidebarOpen(false); // Tutup sidebar setelah logout
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <>
      {/* Sidebar untuk Desktop */}
      <div className="hidden md:flex w-[200px] h-full border-r border-gray-300 fixed bg-white z-20">
        <nav className="flex-1 px-2 py-4 space-y-1 overflow-y-auto">
          {sidebarLink.map((el, i) => (
            <Link
              key={i}
              to={el.href}
              className="flex items-center gap-3 px-4 py-2 text-sm font-medium rounded-md text-gray-600 hover:bg-gray-50 hover:text-gray-900"
            >
              {el.icon}
              {el.name}
            </Link>
          ))}
        </nav>
      </div>

      {/* Overlay untuk Mobile */}
      <div
        className={`fixed inset-0 bg-black/50 z-30 transition-opacity ${
          stateContext.sidebarOpen
            ? "opacity-100 visible"
            : "opacity-0 invisible"
        } md:hidden`}
        onClick={() => stateContext.setSidebarOpen(false)}
      />

      {/* Sidebar untuk Mobile */}
      <div
        className={`fixed left-0 top-0 h-full w-[200px] bg-white border-r border-gray-300 z-40 transform transition-transform ${
          stateContext.sidebarOpen ? "translate-x-0" : "-translate-x-full"
        } md:hidden`}
      >
        <div className="flex justify-between items-center px-4 py-3 border-b">
          <span className="text-lg font-semibold">Menu</span>
          <button onClick={() => stateContext.setSidebarOpen(false)}>
            <X size={24} />
          </button>
        </div>

        <nav className="flex-1 px-2 py-4 space-y-1 overflow-y-auto">
          {sidebarLink.map((el, i) => (
            <Link
              key={i}
              to={el.href}
              className="flex items-center gap-3 px-4 py-2 text-sm font-medium rounded-md text-gray-600 hover:bg-gray-50 hover:text-gray-900"
              onClick={() => stateContext.setSidebarOpen(false)}
            >
              {el.icon}
              {el.name}
            </Link>
          ))}
        </nav>

        {/* Logout hanya di Mobile */}
        <div className="border-t px-4 py-3">
          <p
            className={`text-sm sm:text-base ${
              stateContext.theme ? "text-gray-800" : "text-white"
            }`}
          >
            {stateContext.userLogin.email}
          </p>
          <button
            onClick={handleLogout}
            className="flex items-center gap-3 text-sm font-medium text-red-600 hover:bg-red-50 rounded-md w-full px-3 py-2"
          >
            <LogOut size={18} />
            Logout
          </button>
        </div>
      </div>
    </>
  );
}
