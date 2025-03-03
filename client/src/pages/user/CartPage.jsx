import { useEffect, useContext } from "react";
import { useDispatch, useSelector } from "react-redux";
import { toast } from "react-toastify";
import { getCartsThunk, removeFromCartThunk, updateCartQuantityThunk } from "../../store/appSlice";
import { AuthContext } from "../Auth"; // Pastikan ini benar

export default function CartPage() {
  const dispatch = useDispatch();
  const { carts } = useSelector(state => state.app);
  const { userLogin } = useContext(AuthContext); // Ambil user login dari AuthContext

  useEffect(() => {
    if (userLogin) {
      dispatch(getCartsThunk(userLogin.uid)); // Fetch cart data setelah login
    }
  }, [dispatch, userLogin]); // Panggil ulang jika userLogin berubah

  const handleIncreaseQuantity = (cart) => {
    dispatch(updateCartQuantityThunk(cart.id, cart.quantity + 1));
  };

  const handleDecreaseQuantity = (cart) => {
    if (cart.quantity > 1) {
      dispatch(updateCartQuantityThunk(cart.id, cart.quantity - 1));
    } else {
      toast.warn("Minimum quantity is 1");
    }
  };

  return (
    <div className="container mx-auto p-4">
      <h2 className="text-2xl font-bold mb-4">Shopping Cart</h2>

      {carts.length === 0 ? (
        <p className="text-gray-500">Your cart is empty.</p>
      ) : (
        <div className="space-y-4">
          {carts.map(cart => (
            <div key={cart.id} className="flex items-center justify-between p-4 border rounded-lg shadow-sm">
              <div className="flex items-center gap-4">
                <img src={cart.imageUrl} alt={cart.name} className="w-20 h-20 object-cover" />
                <div>
                  <h3 className="text-lg font-semibold">{cart.name}</h3>
                  <p className="text-gray-600">Rp {cart.price.toLocaleString("id-ID")}</p>
                </div>
              </div>

              {/* Quantity Controls */}
              <div className="flex items-center gap-2">
                <button
                  onClick={() => handleDecreaseQuantity(cart)}
                  className="px-2 py-1 border rounded-md"
                >
                  -
                </button>
                <span>{cart.quantity}</span>
                <button
                  onClick={() => handleIncreaseQuantity(cart)}
                  className="px-2 py-1 border rounded-md"
                >
                  +
                </button>
              </div>

              {/* Remove Button */}
              <button
                onClick={() => dispatch(removeFromCartThunk(cart.id))}
                className="text-red-600 hover:text-red-800"
              >
                Remove
              </button>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
