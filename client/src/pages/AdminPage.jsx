import { useContext, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { AdminContext } from "./AdminLayout";
import { Edit, Trash2 } from "lucide-react";

export default function AdminPage() {
  const navigate = useNavigate();
  const stateContext = useContext(AdminContext);

  // Route protection
  useEffect(() => {
    if (!stateContext.userLogin) {
      navigate("/admin/login");
    }
  }, [navigate, stateContext.userLogin]);

  // Sample data
  const [products, setProducts] = useState([
    {
      id: 1,
      name: "Product A",
      price: "Rp. 18.000.000",
      image: "https://cdnpro.eraspace.com/media/catalog/product/a/p/apple_iphone_15_pro_max_natural_titanium_1_1_2.jpg",
      description: "This is product A",
    },
    {
      id: 2,
      name: "Product B",
      price: "Rp. 8.000.000",
      image: "https://cdn.alloallo.media/catalog/product/apple/iphone/iphone-11/iphone-11-white.jpg",
      description: "This is product B",
    },
  ]);

  const handleEdit = (id) => {
    console.log("Edit product", id);
  };

  const handleDelete = (id) => {
    setProducts(products.filter((product) => product.id !== id));
  };

  return (
    <div className="p-6">
      <h1 className="text-xl font-bold mb-4">Dashboard</h1>
      <h2 className="text-lg font-bold mb-4">Add Product</h2>
      <table className="w-full border-collapse border border-gray-300">
        <thead>
          <tr className="bg-gray-200">
            <th className="border border-gray-300 px-4 py-2">No</th>
            <th className="border border-gray-300 px-4 py-2">Product Name</th>
            <th className="border border-gray-300 px-4 py-2">Price</th>
            <th className="border border-gray-300 px-4 py-2">Product Image</th>
            <th className="border border-gray-300 px-4 py-2">Description</th>
            <th className="border border-gray-300 px-4 py-2">Action</th>
          </tr>
        </thead>
        <tbody>
          {products.map((product, index) => (
            <tr key={product.id} className="text-center">
              <td className="border border-gray-300 px-4 py-2">{index + 1}</td>
              <td className="border border-gray-300 px-4 py-2">{product.name}</td>
              <td className="border border-gray-300 px-4 py-2">{product.price}</td>
              <td className="border border-gray-300 px-4 py-2">
                <img src={product.image} alt={product.name} className="w-12 h-12 object-cover mx-auto" />
              </td>
              <td className="border border-gray-300 px-4 py-2">{product.description}</td>
              <td className="border border-gray-300 px-4 py-2">
                <button
                  onClick={() => handleEdit(product.id)}
                  className="bg-blue-500 text-white px-3 py-1 rounded mr-2"
                >
                  <Edit size={16} />
                </button>
                <button
                  onClick={() => handleDelete(product.id)}
                  className="bg-red-500 text-white px-3 py-1 rounded"
                >
                  <Trash2 size={16} />
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
