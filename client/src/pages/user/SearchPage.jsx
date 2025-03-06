import { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useLocation } from "react-router-dom";
import ProductCard from "../../components/user/ProductCard";
import Footer from "../../components/user/Footer";
import { getAllProductsThunk } from "../../store/appSlice";

export default function SearchPage() {
  const dispatch = useDispatch();
  const { products, loading } = useSelector((state) => state.app);
  const location = useLocation();
  const query = new URLSearchParams(location.search).get("q");
  const [filteredProducts, setFilteredProducts] = useState([]);

  useEffect(() => {
    dispatch(getAllProductsThunk()); // Fetch semua produk
  }, [dispatch]);

  // Filter produk berdasarkan pencarian
  useEffect(() => {
    if (query && products.length > 0) {
      const results = products.filter((product) =>
        product.name.toLowerCase().includes(query.toLowerCase())
      );
      setFilteredProducts(results);
    }
  }, [query, products]);

  return (
    <>
      <div className="max-w-screen-xl mx-auto mb-3">
        <div className="container mx-auto p-4">
          <h2 className="text-xl font-bold mb-4">
            Search results for: "{query}"
          </h2>

          {loading ? (
            <p className="text-center text-blue-500">Loading products...</p>
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
              {filteredProducts.length > 0 ? (
                filteredProducts.map((product) => (
                  <ProductCard key={product.id} product={product} />
                ))
              ) : (
                <p className="text-gray-500">No results found.</p>
              )}
            </div>
          )}
        </div>
      </div>
    </>
  );
}
