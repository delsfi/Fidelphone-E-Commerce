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
    <div className={`relative flex h-screen justify-center items-center bg-cover bg-center ${stateContext.theme ? "bg-gray-100" : "bg-gray-900 text-white"}`}
    style={{
      backgroundImage: `url('https://cdn.mos.cms.futurecdn.net/yFVTwgKyQ3uuEf4DRx6imK-1200-80.jpg')`,
      backgroundSize: 'cover',
      backgroundPosition: 'center',
      backgroundAttachment: 'fixed',
    }}>
    <div className="flex flex-col items-center justify-center h-screen">
      <h1 className="text-4xl font-bold text-white">Dashboard</h1>
    </div>
    </div>
  );
}
