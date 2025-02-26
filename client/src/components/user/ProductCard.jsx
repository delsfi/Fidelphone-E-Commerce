export default function ProductCard({ product }) {
    return (
      <div className="bg-white shadow-lg rounded-xl overflow-hidden transition transform hover:scale-105">
        <img src={product.imageUrl} alt={product.name} className="w-full h-48 object-cover" />
        <div className="p-4">
          <h3 className="text-lg font-semibold">{product.name}</h3>
          <p className="text-gray-600 text-sm">{product.description}</p>
          <div className="flex justify-between items-center mt-4">
            <span className="text-xl font-bold text-blue-600">Rp {product.price}</span>
            <button className="px-4 py-2 bg-blue-500 hover:bg-blue-600 text-white rounded-lg">
              Buy Now
            </button>
          </div>
        </div>
      </div>
    );
  }
  