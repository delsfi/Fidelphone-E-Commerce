import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { useLocation } from "react-router-dom";
import ProductCard from "../../components/user/ProductCard";


export default function SearchPage() {
  const { products } = useSelector((state) => state.app);
  const location = useLocation();
  const query = new URLSearchParams(location.search).get("q");
  const [filteredProducts, setFilteredProducts] = useState([]);

  useEffect(() => {
    if (query) {
      const results = products.filter((product) =>
        product.name.toLowerCase().includes(query.toLowerCase())
      );
      setFilteredProducts(results);
    }
  }, [query, products]);

  return (
    <div className="max-w-screen-xl mx-auto mb-3">
    <div className="container mx-auto p-4">
      <h2 className="text-xl font-bold mb-4">Search results for: "{query}"</h2>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
        {filteredProducts.length > 0 ? (
          filteredProducts.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))
        ) : (
          <p>No results found.</p>
        )}
      </div>
    </div>
    </div>
  );
}
