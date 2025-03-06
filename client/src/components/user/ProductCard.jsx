import { Link } from "react-router-dom";
import { collection, addDoc, query, where, getDocs, updateDoc, doc } from "firebase/firestore";
import { useContext } from "react";
import { toast } from "react-toastify";
import { db } from "../../config/firebase";
import { AuthContext } from "../../pages/Auth";
import { useDispatch } from "react-redux";
import { getCartsThunk } from "../../store/appSlice";

export default function ProductCard({ product }) {
  const { userLogin } = useContext(AuthContext); // Ambil user login dari context

  // Fungsi untuk menambahkan produk ke cart
  const dispatch = useDispatch();


const handleAddToCart = async (e) => {
  e.preventDefault(); // Mencegah Link berpindah halaman saat tombol diklik

  if (!userLogin) {
    toast.error("Silakan login terlebih dahulu!");
    return;
  }

  try {
    const cartRef = collection(db, "carts");

    // Cek apakah produk sudah ada di cart user
    const q = query(cartRef, where("userId", "==", userLogin.uid), where("productId", "==", product.id));
    const querySnapshot = await getDocs(q);

    if (!querySnapshot.empty) {
      // Jika produk sudah ada, update quantity
      const cartDoc = querySnapshot.docs[0]; // Ambil dokumen pertama
      const cartData = cartDoc.data();
      const newQuantity = cartData.quantity + 1; // Tambah quantity

      await updateDoc(doc(db, "carts", cartDoc.id), { quantity: newQuantity });
      toast.success("Quantity produk ditambahkan!");
    } else {
      // Jika produk belum ada, tambahkan produk baru ke cart
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

    // Panggil Redux action untuk memperbarui Redux state
    dispatch(getCartsThunk(userLogin.uid)); 
  } catch (error) {
    console.error("Gagal menambahkan ke cart:", error);
    toast.error("Gagal menambahkan ke keranjang!");
  }
};


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
            <button
              onClick={handleAddToCart}
              className="bg-blue-600 text-white px-4 py-2 rounded-md text-sm hover:bg-blue-700 transition cursor-pointer"
            >
              Add to Cart
            </button>
          </div>
        </div>
      </div>
    </Link>
  );
}
