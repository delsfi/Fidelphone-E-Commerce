import { useContext, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Edit, Trash2 } from "lucide-react";
import { AuthContext } from "../../pages/Auth";

export default function ProductTable({ products, handleDelete }) {
  const navigate = useNavigate();
  const stateContext = useContext(AuthContext);

  // Route protection
  useEffect(() => {
    if (!stateContext.userLogin) {
      navigate("/admin/login");
    }
  }, [navigate, stateContext.userLogin]);

  return (
    <div className="pt-4 overflow-x-auto">
      <table
        className={`w-full border min-w-[600px] ${
          stateContext.theme
            ? "bg-white border-gray-200"
            : "bg-gray-900 border-gray-700"
        }`}
      >
        <thead>
          <tr
            className={`text-left font-semibold border-b ${
              stateContext.theme
                ? "bg-gray-100 text-gray-800 border-gray-300"
                : "bg-gray-800 text-white border-gray-600"
            }`}
          >
            <th className="px-4 py-3">No</th>
            <th className="px-4 py-3">Product Name</th>
            <th className="px-4 py-3">Category</th>
            <th className="px-4 py-3">Price</th>
            <th className="px-4 py-3 text-center sm:table-cell">
              Product Image
            </th>
            <th className="px-4 py-3 sm:table-cell text-center">Description</th>
            <th className="px-4 py-3 text-center">Action</th>
          </tr>
        </thead>
        <tbody>
          {products.map((product, index) => (
            <tr
              key={product.id}
              className={`border-b transition ${
                stateContext.theme
                  ? "border-gray-200 hover:bg-gray-50"
                  : "border-gray-700 hover:bg-gray-800"
              }`}
            >
              <td className="px-4 py-3 text-center">{index + 1}</td>
              <td className="px-4 py-3">{product.name}</td>
              <td className="px-4 py-3">{product.category}</td>
              <td className="px-4 py-3">Rp.{product.price}</td>

              {/* Image - Hidden on Mobile */}
              <td className="px-4 py-3 sm:table-cell place-items-center">
                <img
                  src={product.imageUrl}
                  alt={product.name}
                  className="w-14 h-14 object-cover"
                />
              </td>

              {/* Description - Hidden on Mobile */}
              <td className="px-4 py-3 sm:table-cell">
                {product.description}
              </td>

              {/* Action Buttons */}
              <td className="px-4 py-3">
                <div className="flex flex-col sm:flex-row gap-2 justify-center">
                  <button
                    onClick={() =>
                      navigate(`/admin/edit-product/${product.id}`)
                    }
                    className={`flex items-center gap-2 px-3 py-2 rounded-md shadow-md transition cursor-pointer ${
                      stateContext.theme
                        ? "bg-blue-500 text-white hover:bg-blue-600"
                        : "bg-blue-600 text-white hover:bg-blue-700"
                    }`}
                  >
                    <Edit size={18} />
                    <span className="sm:inline ">Edit</span>
                  </button>
                  <button
                    onClick={() => handleDelete(product.id)}
                    className={`flex items-center gap-2 px-3 py-2 rounded-md shadow-md transition cursor-pointer  ${
                      stateContext.theme
                        ? "bg-red-500 text-white hover:bg-red-600"
                        : "bg-red-600 text-white hover:bg-red-700"
                    }`}
                  >
                    <Trash2 size={18} />
                    <span className="sm:inline ">Delete</span>
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
