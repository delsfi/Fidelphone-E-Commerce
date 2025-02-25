import { getAuth, onAuthStateChanged } from "firebase/auth";
import { createContext, useEffect, useState } from "react";
import { Outlet } from "react-router-dom";

export const AuthContext = createContext(null);

const AuthProvider = () => {
  const [theme, setTheme] = useState(true);
  const [userLogin, setUserLogin] = useState(null);
  const [loading, setLoading] = useState(true);
  const [sidebarOpen, setSidebarOpen] = useState(false);

  const changeTheme = () => setTheme(!theme);

  // Ambil user dari Firebase Auth
  useEffect(() => {
    setLoading(true);
    const auth = getAuth();
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      setUserLogin(user);
      setLoading(false);
    });

    return () => unsubscribe();
  }, []);

  return (
    <AuthContext.Provider value={{ theme, changeTheme, userLogin, loading, sidebarOpen, setSidebarOpen }}>
      <Outlet />
    </AuthContext.Provider>
  );
};

export default AuthProvider;
