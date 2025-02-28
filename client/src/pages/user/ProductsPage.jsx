import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getProductsThunk } from "../../store/appSlice";
import ProductCard from "../../components/user/ProductCard";
import { ChevronLeft, ChevronRight, ArrowUpDown, Filter } from "lucide-react";
import ProductList from "../../components/user/ProductList";

export default function Products() {
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
      dispatch(getProductsThunk(queries));
    }, [queries, dispatch]);
  
    const totalPages = Math.ceil(totalProducts / queries.pageSize);

  return (
    <div className="max-w-screen-xl mx-auto mb-3">

        {/* Filter & Sort Section */}
        <div className="flex flex-wrap justify-between items-center bg-gray-100 p-4 shadow-md mt-3 mb-2 rounded-md">
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

        {/* Pagination */}
        <div className="flex justify-center items-center gap-2 mt-8">
          {/* Tombol Previous */}
          <button
            onClick={() =>
              setQueries({ ...queries, pageNumber: queries.pageNumber - 1 })
            }
            disabled={queries.pageNumber === 1}
            className={`px-4 py-2 rounded-md transition flex items-center justify-center gap-2
      ${
        queries.pageNumber === 1
          ? "bg-gray-300 text-gray-500 cursor-not-allowed"
          : "bg-blue-500 text-white hover:bg-blue-600"
      }`}
          >
            <ChevronLeft size={18} />
          </button>

          {/* Info Halaman */}
          <p className="text-gray-700 px-3 text-sm font-semibold">
            Page {queries.pageNumber} of {totalPages}
          </p>

          {/* Tombol Next */}
          <button
            onClick={() =>
              setQueries({ ...queries, pageNumber: queries.pageNumber + 1 })
            }
            disabled={queries.pageNumber >= totalPages}
            className={`px-4 py-2 rounded-md transition flex items-end justify-center gap-1
      ${
        queries.pageNumber >= totalPages
          ? "bg-gray-300 text-gray-500 cursor-not-allowed"
          : "bg-blue-500 text-white hover:bg-blue-600"
      }`}
          >
            
            <ChevronRight size={20} />
          </button>
        </div>
      </div>
  );
}
