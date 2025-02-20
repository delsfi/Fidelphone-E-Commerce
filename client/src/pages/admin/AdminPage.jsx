import { useContext, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { AdminContext } from "./AdminLayout";
import ProductTable from "../../components/admin/ProductTable";
import { collection, getDocs } from "firebase/firestore";
import { db } from "../../config/firebase";

export default function AdminPage() {
  const navigate = useNavigate();
  const stateContext = useContext(AdminContext);
  const [products, setProducts] = useState([]);
  const getProducts = async () => {
    try {
      const querySnapshot = await getDocs(collection(db, "products"));
      
      querySnapshot.forEach((doc) => {
        // doc.data() is never undefined for query doc snapshots
        setProducts((prev) => [...prev, { id: doc.id, ...doc.data() }]);
      });
    } catch (error) {
      console.log(error);
    }
  };

  // Route protection
  useEffect(() => {
    if (!stateContext.userLogin) {
      navigate("/admin/login");
    } else {
      getProducts();
    }
  }, [navigate, stateContext.userLogin]);

  return (
    <div className="p-6">
      <h1 className="text-xl font-bold mb-4">Dashboard</h1>
      <ProductTable products = {products}  />
    </div>
  );
}
