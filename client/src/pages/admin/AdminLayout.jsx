import { getAuth, onAuthStateChanged } from "firebase/auth";
import { createContext, useEffect, useState } from "react";
import { ToastContainer } from "react-toastify";
import Navbar from "../../components/admin/Navbar";
import { Outlet } from "react-router-dom";

export const AdminContext = createContext(null);

export default function AdminLayout() {
  const [theme, setTheme] = useState(true);
  const [userLogin, setUserLogin] = useState(null);
  const [loading, setLoading] = useState(true);

  const changeTheme = () => {
    setTheme(!theme);
  };

  // ambil user
  useEffect(() => {
    setLoading(true);
    const auth = getAuth();
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      if (user) {
        setUserLogin(user);
        setLoading(false);
      } else {
        setUserLogin(null);
        setLoading(false);
      }
    });

    return () => {
      unsubscribe();
    };
  }, []);

  return (
    <>
    <AdminContext.Provider value={{ theme, changeTheme, userLogin, loading }}>
    <Navbar />
      <Outlet />
      <ToastContainer />
      </AdminContext.Provider>
    </>
  );
}