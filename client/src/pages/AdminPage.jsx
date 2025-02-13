import { getAuth, onAuthStateChanged } from "firebase/auth";
import { useNavigate } from "react-router-dom";
import { useContext, useEffect } from "react";
import { AdminContext } from "./AdminLayout";

export default function AdminPage() {
  const navigate = useNavigate();
  const stateContext = useContext(AdminContext);

  // route protection
  useEffect(() => {
    if (!stateContext.userLogin) {
      navigate("/admin/login");
    }
  }, [navigate]);

  return (
    <div className="flex flex-col items-center justify-center h-screen">
      <h1 className="text-4xl font-bold">Welcome to MyLogo</h1>
      <p className="text-xl mt-4">The best place to find your logo</p>
    </div>
  );
}
