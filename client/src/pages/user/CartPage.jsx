import { useEffect, useContext } from "react";
import { useDispatch, useSelector } from "react-redux";
import { toast } from "react-toastify";
import {
  getCartsThunk,
  removeFromCartThunk,
  updateCartQuantityThunk,
} from "../../store/appSlice";
import { AuthContext } from "../Auth";
import { MinusCircle, PlusCircle, ShoppingCart, Trash2 } from "lucide-react";
import Footer from "../../components/user/Footer";

export default function CartPage() {
  const dispatch = useDispatch();
  const { carts } = useSelector((state) => state.app);
  const { userLogin } = useContext(AuthContext);

  useEffect(() => {
    if (userLogin) {
      dispatch(getCartsThunk(userLogin.uid));
    }
  }, [dispatch, userLogin]);

  const handleIncreaseQuantity = (cart) => {
    dispatch(updateCartQuantityThunk(cart.id, cart.quantity + 1));
  };

  const handleDecreaseQuantity = (cart) => {
    if (cart.quantity > 1) {
      dispatch(updateCartQuantityThunk(cart.id, cart.quantity - 1));
    } else {
      toast.warn("Jumlah minimum adalah 1");
    }
  };

  const totalPrice = carts.reduce(
    (total, cart) => total + cart.price * cart.quantity,
    0
  );

  const handleCheckout = () => {
    const phoneNumber = "6288233986132";
  
    // Ambil email customer dari userLogin
    const customerName = userLogin?.email || "Customer";
    
  
    // Format pesanan
    let message = `Hallo Fidel Phone, Saya ${customerName} ingin memesan:\n`;
    carts.forEach((cart, index) => {
      message += `${index + 1}. ${cart.name} - ${
        cart.quantity
      } produk x Rp ${cart.price.toLocaleString("id-ID")} = Rp ${(
        cart.price * cart.quantity
      ).toLocaleString("id-ID")}\n`;
    });
  
    message += `\nTotal: Rp ${totalPrice.toLocaleString("id-ID")}`;
    
    // Encode pesan agar sesuai format URL
    const encodedMessage = encodeURIComponent(message);
    
    // Buat URL WhatsApp
    const waUrl = `https://wa.me/${phoneNumber}?text=${encodedMessage}`;
  
    // Redirect ke WhatsApp
    window.open(waUrl, "_blank");
  };
  

  return (
    <>
      <div className="max-w-screen-xl mx-auto mb-3">
        <h2 className="text-2xl font-bold mb-6 mt-3"> Cart Shooping</h2>

        {carts.length === 0 ? (
          <p className="text-gray-500 text-center">Keranjang Anda kosong.</p>
        ) : (
          <div className="flex flex-col lg:flex-row gap-8">
            {/* Daftar Produk */}
            <div className="flex-1 space-y-4">
              {carts.map((cart) => (
                <div
                  key={cart.id}
                  className="flex flex-col md:flex-row items-center justify-between p-4  rounded-lg shadow-md bg-white"
                >
                  {/* Gambar & Detail Produk */}
                  <div className="flex items-center gap-4 w-full md:w-1/2">
                    <img
                      src={cart.imageUrl}
                      alt={cart.name}
                      className="w-24 h-24 object-cover rounded-lg"
                    />
                    <div>
                      <h3 className="text-lg font-semibold">{cart.name}</h3>
                      <p className="text-gray-600">
                        Rp {cart.price.toLocaleString("id-ID")}
                      </p>
                    </div>
                  </div>

                  {/* Kontrol Jumlah */}
                  <div className="flex items-center gap-3 mt-4 md:mt-0">
                    <button onClick={() => handleDecreaseQuantity(cart)}>
                      <MinusCircle color="gray" />
                    </button>
                    <span className="font-semibold">{cart.quantity}</span>
                    <button onClick={() => handleIncreaseQuantity(cart)}>
                      <PlusCircle color="gray" />
                    </button>
                  </div>

                  {/* Harga Total & Tombol Hapus */}
                  <div className="flex items-center gap-6 mt-4 md:mt-0">
                    <p className="text-lg font-bold">
                      Rp {(cart.price * cart.quantity).toLocaleString("id-ID")}
                    </p>
                    <button
                      onClick={() => dispatch(removeFromCartThunk(cart.id))}
                    >
                      <div className="bg-red-500 p-2 rounded-full">
                        <Trash2 size={20} color="white" />
                      </div>
                    </button>
                  </div>
                </div>
              ))}
            </div>

            {/* Ringkasan Pesanan */}
            <div className="w-full lg:w-1/3 p-6  rounded-lg shadow-md bg-white">
              <h3 className="text-xl font-bold mb-4">Ringkasan Pesanan</h3>
              <div className="flex justify-between mb-2">
                <span>Total Harga</span>
                <span>Rp {totalPrice.toLocaleString("id-ID")}</span>
              </div>
              <div className="flex justify-between mb-2">
                <span>Biaya Pengiriman</span>
                <span>Gratis</span>
              </div>
              <br />
              <div className="flex justify-between font-bold text-lg">
                <span>Total Keseluruhan</span>
                <span>Rp {totalPrice.toLocaleString("id-ID")}</span>
              </div>
              <button
                onClick={handleCheckout}
                className="mt-6 w-full px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition"
              >
                Lanjutkan ke Pembayaran
              </button>
            </div>
          </div>
        )}
      </div>
    </>
  );
}
