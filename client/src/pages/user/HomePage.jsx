import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getProductsThunk } from "../../store/appSlice"; 
import HeroSection from "../../components/user/HeroSection";
import ProductList from "../../components/user/ProductList";

export default function HomePage() {
  const dispatch = useDispatch();
  const { products } = useSelector((state) => state.app);

  useEffect(() => {
    dispatch(getProductsThunk());
  }, [dispatch]);

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Hero Section */}
      <HeroSection />

      {/* Product List */}
      <div className="container mx-auto px-4 py-10">
        <h2 className="text-3xl font-bold text-center mb-6 text-gray-800">Our Products</h2>
        <ProductList products={products} />
      </div>
    </div>
  );
}
