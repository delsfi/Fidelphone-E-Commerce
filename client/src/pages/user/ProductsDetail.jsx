import { useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { getProductsThunk, getCartsThunk } from "../../store/appSlice";
import { ArrowLeftIcon, ShoppingCart } from "lucide-react";
import { collection, addDoc, query, where, getDocs, updateDoc, doc } from "firebase/firestore";
import { db } from "../../config/firebase";
import { toast } from "react-toastify";
import { useContext } from "react";
import { AuthContext } from "../../pages/Auth";
import ProductCard from "../../components/user/ProductCard";
import Footer from "../../components/user/Footer";


export default function ProductDetail() {
  const { id } = useParams();
  const dispatch = useDispatch();
  const { products, loading } = useSelector((state) => state.app);
  const { userLogin } = useContext(AuthContext);
  const navigate = useNavigate();

  useEffect(() => {
    if (products.length === 0) {
      dispatch(getProductsThunk());
    }
  }, [dispatch, products]);

  if (loading) {
    return <p className="text-center text-blue-500 mt-10">Loading product...</p>;
  }

  const product = products.find((p) => p.id.toString() === id);

  if (!product) {
    return <p className="text-center text-red-500 mt-10">Product not found.</p>;
  }

  const handleBack = () => {
    navigate("/");
  };

  const handleAddToCart = async () => {
    if (!userLogin) {
      toast.error("Silakan login terlebih dahulu!");
      return;
    }

    try {
      const cartRef = collection(db, "carts");
      const q = query(cartRef, where("userId", "==", userLogin.uid), where("productId", "==", product.id));
      const querySnapshot = await getDocs(q);

      if (!querySnapshot.empty) {
        const cartDoc = querySnapshot.docs[0];
        const cartData = cartDoc.data();
        const newQuantity = cartData.quantity + 1;

        await updateDoc(doc(db, "carts", cartDoc.id), { quantity: newQuantity });
        toast.success("Quantity produk ditambahkan!");
      } else {
        await addDoc(cartRef, {
          userId: userLogin.uid,
          productId: product.id,
          name: product.name,
          imageUrl: product.imageUrl,
          price: product.price,
          quantity: 1,
        });

        toast.success("Produk berhasil ditambahkan ke keranjang!");
      }

      dispatch(getCartsThunk(userLogin.uid));
    } catch (error) {
      console.error("Gagal menambahkan ke cart:", error);
      toast.error("Gagal menambahkan ke keranjang!");
    }
  };

  // Ambil rekomendasi produk, kecuali produk yang sedang dibuka
  const recommendedProducts = products
    .filter((p) => p.id !== product.id) // Hindari produk yang sama
    .slice(0, 4); // Ambil maksimal 4 produk untuk rekomendasi

  return (
    <>
    <div className="max-w-6xl mx-auto p-6">
      <button onClick={handleBack} className="flex items-center text-blue-600 hover:underline">
        <ArrowLeftIcon size={20} className="mr-2" />
        Kembali
      </button>

      <div className="grid md:grid-cols-2 gap-8 mt-6">
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
          <h2 className="text-lg font-semibold text-gray-600">{product.description.split("\n")[0]}</h2>

          <ul className="list-none list-inside text-gray-700 mt-2">
            {product.description
              .split("\n")
              .slice(1)
              .map((feature, index) => (
                <li key={index}>{feature.trim()}</li>
              ))}
          </ul>

          <span className="text-2xl font-semibold text-blue-600">
            Rp {product.price.toLocaleString("id-ID")}
          </span>

          <button
            onClick={handleAddToCart}
            className="flex items-center justify-center gap-2 bg-blue-600 text-white text-lg font-semibold px-6 py-3 rounded-lg hover:bg-blue-700 transition"
          >
            <ShoppingCart size={20} />
            Add to Cart
          </button>
        </div>
      </div>

      {/* Rekomendasi Produk */}
      {recommendedProducts.length > 0 && (
        <div className="mt-12">
          <h2 className="text-2xl font-semibold text-gray-900 mb-4">Rekomendasi Produk</h2>
          <div className="grid md:grid-cols-4 sm:grid-cols-2 gap-6">
            {recommendedProducts.map((recProduct) => (
              <ProductCard key={recProduct.id} product={recProduct} />
            ))}
          </div>
        </div>
      )}
    </div>
    <Footer />
    </>
  );
}
