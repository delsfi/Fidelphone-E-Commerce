import { useEffect, useState, useMemo } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getProductsThunk } from "../../store/appSlice";
import HeroSection from "../../components/user/HeroSection";
import ProductList from "../../components/user/ProductList";
import { Filter, ArrowDownAZ, ArrowUpAZ, ArrowUpDown } from "lucide-react";

export default function HomePage() {
  const { products, totalProducts } = useSelector((state) => state.app);
  const dispatch = useDispatch();

  const [queries, setQueries] = useState({
    filterCategory: "",
    sortPrice: "",
    pageSize: 8,
    pageNumber: 1,
  });

  const handleChangeQuery = (e) => {
    const { name, value } = e.target;
    setQueries({ ...queries, [name]: value });
  };

  useEffect(() => {
    if (queries) {
      dispatch(getProductsThunk(queries));
    } else {
      dispatch(getProductsThunk());
    }
  }, [queries]);

  return (
    <div className="max-w-screen-xl mx-auto px-4 py-6">
    <div className="min-h-screen">
      {/* Hero Section */}
      <HeroSection />

      {/* Filter & Sort Section */}
      <div className="flex flex-wrap justify-between items-center bg-gray-100 p-4 shadow-md mt-4 mb-2">
        {/* Filter Kategori */}
        <div className="flex items-center gap-2">
          <Filter className="text-gray-600 w-5 h-5" />
          <select
            name="filterCategory"
            className="px-4 py-2 rounded-md text-sm bg-white shadow-sm hover:bg-gray-50 focus:outline-none transition"
            onChange={handleChangeQuery}
          >
            <option value="">Semua Kategori</option>
            <option value="iphone">iPhone</option>
            <option value="samsung">Samsung</option>
            <option value="xiaomi">Xiaomi</option>
            <option value="vivo">Vivo</option>
          </select>
        </div>

        {/* Sort Harga */}
        <div className="flex items-center gap-2">
          <ArrowUpDown className="text-gray-600 w-5 h-5" />
          <select
            name="sortPrice"
            className="px-4 py-2 rounded-md text-sm bg-white shadow-sm hover:bg-gray-50 focus:outline-none transition"
            onChange={handleChangeQuery}
          >
            <option value="">Urutkan Harga</option>
            <option value="asc">Harga Terendah</option>
            <option value="desc">Harga Tertinggi</option>
          </select>
        </div>
      </div>

      {/* Product List */}
      <div className="container mx-auto">
        <ProductList products={products} />
      </div>
      <button
              onClick={() => {
                if (queries.pageNumber > 1) {
                  setQueries({
                    ...queries,
                    pageNumber: queries.pageNumber - 1,
                  });
                }
              }}
              className="px-4 py-2 text-sm rounded-md border"
            >
              &lt;
            </button>
            <p className="text-gray-400 text-sm italic">
              Page: {queries.pageNumber} of{" "}
              {Math.ceil(totalProducts / queries.pageSize)}
            </p>
            <button
              onClick={() => {
                if (
                  queries.pageNumber <
                  Math.ceil(totalProducts / queries.pageSize)
                ) {
                  setQueries({
                    ...queries,
                    pageNumber: queries.pageNumber + 1,
                  });
                }
              }}
              className="px-4 py-2 text-sm rounded-md border"
            >
              &gt;
            </button>
    </div>
    </div>
  );
}
