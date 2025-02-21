import { useContext, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { AdminContext } from "../../pages/admin/AdminLayout";
import { Edit, Trash2 } from "lucide-react";

export default function ProductTable({ products, handleDelete }) {
  const navigate = useNavigate();
  const stateContext = useContext(AdminContext);

  // Route protection
  useEffect(() => {
    if (!stateContext.userLogin) {
      navigate("/admin/login");
    }
  }, [navigate, stateContext.userLogin]);

  return (
    <div className="pt-2 overflow-x-auto">
      <table
        className={`min-w-full border-collapse border ${
          stateContext.theme
            ? "border-gray-300 bg-white text-gray-700"
            : "border-gray-600 bg-gray-800 text-gray-300"
        }`}
      >
        <thead>
          <tr
            className={
              stateContext.theme
                ? "bg-gray-200 text-black"
                : "bg-gray-700 text-white"
            }
          >
            <th className="border px-4 py-2">No</th>
            <th className="border px-4 py-2">Product Name</th>
            <th className="border px-4 py-2">Price</th>
            <th className="border px-4 py-2">Product Image</th>
            <th className="border px-4 py-2">Description</th>
            <th className="border px-4 py-2">Action</th>
          </tr>
        </thead>
        <tbody>
          {products.map((product, index) => (
            <tr key={product.id} className="text-center">
              <td className="border px-4 py-2">{index + 1}</td>
              <td className="border px-4 py-2">{product.name}</td>
              <td className="border px-4 py-2">Rp. {product.price}</td>
              <td className="border px-4 py-2">
                <img
                  src={product.imageUrl}
                  alt={product.name}
                  className="w-12 h-12 object-cover mx-auto"
                />
              </td>
              <td className="border px-4 py-2">{product.description}</td>
              <td className="border px-4 py-2">
                <div className="flex justify-center gap-2">
                  <button
                    onClick={() =>
                      navigate(`/admin/edit-product/${product.id}`)
                    }
                    className={`px-3 py-1 rounded cursor-pointer ${
                      stateContext.theme
                        ? "bg-blue-500 hover:bg-blue-700"
                        : "bg-blue-600 hover:bg-blue-800"
                    } text-white`}
                  >
                    <Edit size={16} />
                  </button>
                  <button
                    onClick={() => handleDelete(product.id)}
                    className={`px-3 py-1 rounded cursor-pointer ${
                      stateContext.theme
                        ? "bg-red-500 hover:bg-red-700"
                        : "bg-red-600 hover:bg-red-800"
                    } text-white`}
                  >
                    <Trash2 size={16} />
                  </button>
                </div>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
