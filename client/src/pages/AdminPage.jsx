import { getAuth, onAuthStateChanged } from "firebase/auth";
import { useNavigate } from "react-router-dom";
import { auth } from "../config/firebase";
import { useEffect } from "react";

export default function AdminPage() {
  const navigate = useNavigate();
  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
        if (user) {
            // User is signed in, see docs for a list of available properties
            // https://firebase.google.com/docs/reference/js/auth.user
            const uid = user.uid;

            console.log(uid, "< uid");
            // ...
        } else {
            // User is signed out
            // ...

            navigate("/login");
        }
    });
    return () => {
        unsubscribe();
    };
}, []);
  return (
    <div className="flex flex-col items-center justify-center h-screen">
      <h1 className="text-4xl font-bold">Welcome to MyLogo</h1>
      <p className="text-xl mt-4">The best place to find your logo</p>
    </div>
  );
}
