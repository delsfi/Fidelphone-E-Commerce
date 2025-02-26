import { getAuth, onAuthStateChanged } from "firebase/auth";
import { doc, getDoc } from "firebase/firestore";
import { createContext, useEffect, useState } from "react";
import { Outlet } from "react-router-dom";
import { db } from "../config/firebase";

export const AuthContext = createContext(null);

const AuthProvider = () => {
  const [theme, setTheme] = useState(true);
  const [userLogin, setUserLogin] = useState(null);
  const [loading, setLoading] = useState(true);
  const [sidebarOpen, setSidebarOpen] = useState(false);

  const [role, setRole] = useState(null);  

  const changeTheme = () => setTheme(!theme);



  // Ambil user dari Firebase Auth
  useEffect(() => {
    setLoading(true);
    const auth = getAuth();
    const unsubscribe = onAuthStateChanged(auth, async (user) => {
     if (user) {
      console.log(user);
      
      const docRef = doc(db, "users", user.uid);
      
      const docSnap = await getDoc(docRef);

      if (docSnap.exists()) {
        setRole(docSnap.data().role);

      } else {
        // docSnap.data() will be undefined in this case
        console.log("No such document!");
      }
     }
     
      // const docRef = doc(db, "users", user.uid);
      
      // const docSnap = await getDoc(docRef);

      // if (docSnap.exists()) {
      //   console.log("Document data:", docSnap.data());
      // } else {
      //   // docSnap.data() will be undefined in this case
      //   console.log("No such document!");
      // }

      setUserLogin(user);
      setLoading(false);
    });

    return () => unsubscribe();
  }, []);
  

  return (
    <AuthContext.Provider
      value={{
        theme,
        changeTheme,
        userLogin,
        loading,
        sidebarOpen,
        setSidebarOpen,
        role,
      }}
    >
      <Outlet />
    </AuthContext.Provider>
  );
};

export default AuthProvider;
