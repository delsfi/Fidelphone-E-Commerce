import { Link } from "react-router-dom";

export default function ProductCard({ product }) {
  return (
    <Link to={`/product/${product.id}`} className="block">
      <div className="bg-white shadow-lg rounded-lg overflow-hidden hover:shadow-2xl transition-shadow duration-300 cursor-pointer">
        <img
          src={product.imageUrl}
          alt={product.name}
          className="w-full h-56 object-contain p-4"
        />
        <div className="p-4">
          <h3 className="text-lg font-semibold text-gray-800">{product.name}</h3>

          {/* Deskripsi hanya 2 baris */}
          <p className="text-gray-600 text-sm mt-1 line-clamp-2 overflow-hidden text-ellipsis">
            {product.description}
          </p>

          <div className="flex justify-between items-center mt-4">
            <span className="text-lg font-bold text-gray-900">
              Rp {product.price.toLocaleString("id-ID")}
            </span>
            <button className="bg-blue-600 text-white px-4 py-2 rounded-md text-sm hover:bg-blue-700 transition">
              Buy Now
            </button>
          </div>
        </div>
      </div>
    </Link>
  );
}
