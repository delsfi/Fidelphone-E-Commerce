import { useContext } from "react";
import ProductForm from "../../components/admin/ProductForm";
import { AuthContext } from "../Auth";

export default function AddProduct() {
  const stateContext = useContext(AuthContext);
  return (
    <>
      <div
        className={`p-6 min-h-screen transition-colors ${
          stateContext.theme
            ? "bg-white text-gray-800"
            : "bg-gray-900 text-gray-300"
        }`}
      >
        <h2 className="text-xl font-bold">Add Product</h2>
        <ProductForm />
      </div>
    </>
  );
}
