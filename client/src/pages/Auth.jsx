import { getAuth, onAuthStateChanged } from "firebase/auth";
import { doc, getDoc } from "firebase/firestore";
import { createContext, useEffect, useState } from "react";
import { Outlet } from "react-router-dom";
import { db } from "../config/firebase";
import { useDispatch } from "react-redux";
import { getCartsThunk } from "../store/appSlice";

export const AuthContext = createContext(null);

const AuthProvider = () => {
  const [theme, setTheme] = useState(true);
  const [userLogin, setUserLogin] = useState(null);
  const [loading, setLoading] = useState(true);
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [role, setRole] = useState(null);
  
  const dispatch = useDispatch();

  const changeTheme = () => setTheme(!theme);

  useEffect(() => {
    setLoading(true);
    const auth = getAuth();
    const unsubscribe = onAuthStateChanged(auth, async (user) => {
      if (user) {
        const docRef = doc(db, "users", user.uid);
        const docSnap = await getDoc(docRef);
        if (docSnap.exists()) {
          setRole(docSnap.data().role);
        }
  
        setUserLogin(user);
  
        //Ambil data cart setelah login
        dispatch(getCartsThunk(user.uid));
      } else {
        setUserLogin(null);
        setRole(null); //Reset role agar tidak ada data lama tersisa
        dispatch(getCartsThunk(null)); //Reset cart di Redux saat logout
      }
      setLoading(false);
    });
  
    return () => unsubscribe();
  }, [dispatch]);
  

  return (
    <AuthContext.Provider
      value={{
        theme,
        changeTheme,
        userLogin,
        setUserLogin,
        loading,
        sidebarOpen,
        setSidebarOpen,
        role,
        setRole,
      }}
    >
      <Outlet />
    </AuthContext.Provider>
  );
};

export default AuthProvider;
