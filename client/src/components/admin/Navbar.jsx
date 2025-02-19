import { signOut } from "firebase/auth";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { auth } from "../../config/firebase";
import { AdminContext } from "../../pages/admin/AdminLayout";
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
    <nav className="relative w-full px-6 py-4 flex justify-between items-center bg-cover bg-center">
      {/* Background Image */}
      <div
        className="absolute inset-0 bg-cover bg-center"
        style={{
          backgroundImage: `url('https://cdn.mos.cms.futurecdn.net/yFVTwgKyQ3uuEf4DRx6imK-1200-80.jpg')`,
          backgroundSize: 'cover',
          backgroundPosition: 'center',
          filter: 'blur(8px)',
          zIndex: -1,
        }}
      />

      {/* Overlay */}
      <div
        className={`absolute inset-0 ${
          stateContext.theme ? 'bg-white/70' : 'bg-black/60'
        } backdrop-blur-lg z-0`}
      />

      {/* Navbar Content */}
      <div className="relative z-10 flex w-full justify-between items-center">
        {/* Logo */}
        <div
          className={`text-2xl font-bold cursor-pointer ${
            stateContext.theme ? 'text-navy-700' : 'text-white'
          }`}
          onClick={() => navigate('/admin')}
        >
          Fidel Phone
        </div>

        {/* Menu */}
        <div className="flex gap-5 items-center">
          {!stateContext.userLogin && (
            <>
              <button
                className={`px-4 py-2 cursor-pointer ${
                  stateContext.theme
                    ? 'text-navy-700 hover:underline'
                    : 'text-white hover:underline'
                }`}
                onClick={() => navigate('/admin/login')}
              >
                Sign In
              </button>
              <button
                className={`px-4 py-2 rounded-md cursor-pointer ${
                  stateContext.theme
                    ? 'bg-slate-700 text-white hover:bg-slate-800'
                    : 'bg-slate-700 text-white hover:bg-slate-600'
                }`}
                onClick={() => navigate('/admin/register')}
              >
                Sign Up
              </button>
            </>
          )}

          {stateContext.userLogin && (
            <>
              <p
                className={`pt-1 ${
                  stateContext.theme ? 'text-gray-800' : 'text-white'
                }`}
              >
                {stateContext.userLogin.email}
              </p>
              <button
                className="px-4 py-2 bg-slate-700 hover:bg-slate-600 text-white rounded-md cursor-pointer"
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
              className="cursor-pointer text-navy-700"
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
      </div>
    </nav>
  );
}
