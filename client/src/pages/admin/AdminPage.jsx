import { useContext, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { AdminContext } from "./AdminLayout";
import ProductTable from "../../components/admin/ProductTable";
import { deleteDoc, doc } from "firebase/firestore";
import { db } from "../../config/firebase";
import { toast } from "react-toastify";
import { useDispatch, useSelector } from "react-redux";
import { getProductsThunk } from "../../store/appSlice";

export default function AdminPage() {
  const navigate = useNavigate();
  const stateContext = useContext(AdminContext);
  const { products } = useSelector((state) => state.app);
  const dispatch = useDispatch();

  const handleDelete = async (id) => {
    try {
      await deleteDoc(doc(db, "products", id));
      dispatch(getProductsThunk());
      toast.success("Product deleted successfully");
    } catch (error) {
      console.log(error);
    }
  };

  // Route protection
  useEffect(() => {
    if (!stateContext.userLogin) {
      navigate("/admin/login");
    } else {
      dispatch(getProductsThunk());
    }
  }, [navigate, stateContext.userLogin, dispatch]);

  return (
    <div
      className={`p-6 min-h-screen transition-colors ${
        stateContext.theme ? "bg-white text-gray-800" : "bg-gray-900 text-gray-300"
      }`}
    >
      <h1 className="text-xl font-bold mb-4">Dashboard</h1>
      <div
        className={`p-4 rounded-lg shadow-md ${
          stateContext.theme ? "bg-gray-100 border-gray-300" : "bg-gray-800 border-gray-700"
        }`}
      >
        <ProductTable products={products} handleDelete={handleDelete} />
      </div>
    </div>
  );
}
