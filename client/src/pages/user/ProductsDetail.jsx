import { useEffect } from "react";
import { useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { getProductsThunk } from "../../store/appSlice";
import { ShoppingCart } from "lucide-react";

export default function ProductDetail() {
  const { id } = useParams();
  const dispatch = useDispatch();
  const { products, loading } = useSelector((state) => state.app); // Tambahkan loading state

  useEffect(() => {
    if (products.length === 0) {
      dispatch(getProductsThunk()); // Hanya fetch jika data belum ada
    }
  }, [dispatch, products]);

  // Jika data masih loading
  if (loading) {
    return <p className="text-center text-blue-500 mt-10">Loading product...</p>;
  }

  // Cari produk berdasarkan ID setelah data tersedia
  const product = products.find((p) => p.id.toString() === id);

  if (!product) {
    return <p className="text-center text-red-500 mt-10">Product not found.</p>;
  }

  return (
    <div className="max-w-6xl mx-auto p-6">
      <div className="grid md:grid-cols-2 gap-8">
        {/* Gambar Produk */}
        <div className="bg-white shadow-lg p-4 rounded-lg">
          <img
            src={product.imageUrl}
            alt={product.name}
            className="w-full h-auto object-contain"
          />
        </div>

        {/* Detail Produk */}
        <div className="flex flex-col gap-4">
          <h1 className="text-3xl font-bold text-gray-900">{product.name}</h1>
          <p className="text-gray-700 text-lg">{product.description}</p>
          <span className="text-2xl font-semibold text-blue-600">
            Rp {product.price.toLocaleString()}
          </span>

          <button className="flex items-center justify-center gap-2 bg-blue-600 text-white text-lg font-semibold px-6 py-3 rounded-lg hover:bg-blue-700 transition">
            <ShoppingCart size={20} />
            Add to Cart
          </button>
        </div>
      </div>
    </div>
  );
}
