import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getProductsThunk } from "../../store/appSlice";
import HeroSection from "../../components/user/HeroSection";
import ProductList from "../../components/user/ProductList";

export default function HomePage() {
  const dispatch = useDispatch();
  const { products } = useSelector((state) => state.app);

  const [category, setCategory] = useState("");

  useEffect(() => {
    if (category) {
      dispatch(getProductsThunk({ category }));
    } else {
      dispatch(getProductsThunk());
    }
  }, [category]);

  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <HeroSection />
      <div className="flex pt-3 items-center gap-2">
        {category}
        <select
          name="filterCategory"
          id="filterCategory"
          defaultValue={""}
          className="px-4 py-2 rounded-md border text-sm"
          onChange={(e) => {
            setCategory(e.target.value);
          }}
        >
          <option value="">Select Category</option>
          <option value="iphone">iPhone</option>
          <option value="samsung">Samsung</option>
          <option value="xioami">Xiaomi</option>
          <option value="vivo">Vivo</option>
        </select>
        <select
          name="sortPrice"
          id="sortPrice"
          defaultValue={""}
          className="px-4 py-2 rounded-md border text-sm"
          // onChange={handleChangeQuery}
        >
          <option value="">Sort Price</option>
          <option value="asc">Harga terendah</option>
          <option value="desc">Harga tertinggi</option>
        </select>
      </div>

      {/* Product List */}
      <div className="container mx-auto px-2 py-3">
        <h2 className="text-3xl font-bold text-center mb-6 text-gray-800">
          Our Products
        </h2>
        <ProductList products={products} />
      </div>
    </div>
  );
}
