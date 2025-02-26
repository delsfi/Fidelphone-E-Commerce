import { useDispatch, useSelector } from "react-redux";
import HeroSection from "../../components/user/HeroSection";
import ProductList from "../../components/user/ProductList";
import { useEffect } from "react";
import { getProductsThunk } from "../../store/appSlice";

export default function HomePage() {
  const dispatch = useDispatch();
  const { products } = useSelector((state) => state.app);

  useEffect(() => {
    dispatch(getProductsThunk());
  }, [dispatch]);

  return (
    <div className="min-h-screen bg-gray-100">
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
