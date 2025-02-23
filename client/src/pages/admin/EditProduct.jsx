import { useParams } from "react-router-dom";
import ProductForm from "../../components/admin/ProductForm";
import { doc, getDoc } from "firebase/firestore";
import { db } from "../../config/firebase";
import { useContext, useEffect, useState } from "react";
import { AdminContext } from "./AdminLayout";

export default function EditProduct() {
  const { id } = useParams();
  const stateContext = useContext(AdminContext);

  const [productById, setProductById] = useState(null);

  const getProductById = async () => {
    try {
      const docSnap = await getDoc(doc(db, "products", id));
      if (docSnap.exists()) {
        // console.log("Document data :", docSnap.data());
        setProductById(docSnap.data());
      }
      //   console.log(docSnap);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    if (id) {
      getProductById();
    }
  }, [id]);

  return (
    <>
      <div
        className={`p-6 min-h-screen transition-colors ${
          stateContext.theme
            ? "bg-white text-gray-800"
            : "bg-gray-900 text-gray-300"
        }`}
      >
        <h2 className="text-2xl font-semibold mb-4">Edit Product</h2>
        <ProductForm productById={productById} productId={id} />
      </div>
    </>
  );
}
