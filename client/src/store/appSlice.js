import { createSlice } from "@reduxjs/toolkit";
import { collection, deleteDoc, doc, getDocs, limit, orderBy, query, startAfter, updateDoc, where } from "firebase/firestore";
import { db } from "../config/firebase";
import { toast } from "react-toastify";

export const appSlice = createSlice({
  name: "app",
  initialState: {
    value: 0,
    products: [],
    totalProducts: 0,
    carts: [],
  },
  reducers: {
    increment: (state) => {
      // Redux Toolkit allows us to write "mutating" logic in reducers. It
      // doesn't actually mutate the state because it uses the Immer library,
      // which detects changes to a "draft state" and produces a brand new
      // immutable state based off those changes.
      // Also, no return statement is required from these functions.
      state.value += 1;
    },
    decrement: (state) => {
      state.value -= 1;
    },
    incrementByAmount: (state, action) => {
      state.value += action.payload;
    },
    onFetchProductSuccess: (state, action) => {
      state.products = action.payload;
    },
    changeTotalProducts: (state, action) => {
      state.totalProducts = action.payload;
    },
    onFetchCartsSuccess: (state, action) => {
      state.carts = action.payload;
    },
    addToCartSuccess: (state, action) => {
      state.carts.push(action.payload);
    },
    removeFromCartSuccess: (state, action) => {
      state.carts = state.carts.filter(cart => cart.id !== action.payload);
    },
    updateCartQuantitySuccess: (state, action) => {
      const cartItem = state.carts.find(cart => cart.id === action.payload.id);
      if (cartItem) {
        cartItem.quantity = action.payload.quantity;
      }
    },
    resetCartSuccess: (state) => {
      state.carts = [];
    },
  },
});

// Action creators are generated for each case reducer function
export const {
  increment,
  decrement,
  incrementByAmount,
  onFetchProductSuccess,
  changeTotalProducts,
  onFetchCartsSuccess,
  addToCartSuccess,
  removeFromCartSuccess,
  updateCartQuantitySuccess,
  resetCartSuccess,
} = appSlice.actions;

export default appSlice.reducer;

export const getProductsThunk = (params = {}) => async (dispatch) => {
  try {
    let q = collection(db, "products");

    if (params?.filterCategory) {
      q = query(q, where("category", "==", params.filterCategory));
    }

    if (params?.sortPrice) {
      q = query(q, orderBy("price", params.sortPrice));
    }

    // check total diawal dan ketika di filter
    const querySnapshotSize = (await getDocs(q)).size;
    dispatch(changeTotalProducts(querySnapshotSize));

    q = query(q, limit(params.pageSize));

    if (params.pageNumber > 1) {
      const prevPageSnapshot = await getDocs(
        query(q, limit((params.pageNumber - 1) * params.pageSize))
      );

      const lastVisible =
        prevPageSnapshot.docs[prevPageSnapshot.docs.length - 1];

      q = query(q, startAfter(lastVisible), limit(params.pageSize));
    }


    const querySnapshot = await getDocs(q);
    let data = [];
    querySnapshot.forEach((doc) => {
      data.push({ id: doc.id, ...doc.data() });
    });

    dispatch(onFetchProductSuccess(data));
  } catch (error) {
    console.log(error);
  }
};

export const getCartsThunk = (userId) => async (dispatch) => {
  try {
    if (!userId) {
      console.log("User ID tidak tersedia");
      return;
    }

    const q = query(collection(db, "carts"), where("userId", "==", userId));
    const querySnapshot = await getDocs(q);
    
    let data = [];
    querySnapshot.forEach((doc) => {
      data.push({ id: doc.id, ...doc.data() });
    });

    console.log("Cart dari Firestore:", data); // Debugging, lihat hasilnya di console

    dispatch(onFetchCartsSuccess(data));
  } catch (error) {
    console.log("Error fetching carts:", error);
  }
};


export const addToCartThunk = (userId, product) => async (dispatch) => {
  try {
    if (!userId) {
      toast.error("User is not logged in.");
      return;
    }

    const cartRef = collection(db, "carts");
    
    // Cek apakah produk sudah ada di cart user
    const q = query(cartRef, where("userId", "==", userId), where("productId", "==", product.id));
    const querySnapshot = await getDocs(q);

    if (!querySnapshot.empty) {
      // Jika produk sudah ada di cart, update jumlahnya
      const cartItem = querySnapshot.docs[0];
      const cartItemRef = doc(db, "carts", cartItem.id);
      const newQuantity = cartItem.data().quantity + 1;

      await updateDoc(cartItemRef, { quantity: newQuantity });

      dispatch(updateCartQuantitySuccess({ id: cartItem.id, quantity: newQuantity }));
      toast.info("Product quantity updated in cart.");
    } else {
      // Jika produk belum ada di cart, tambahkan sebagai item baru
      const newCartItem = {
        userId,
        productId: product.id,
        name: product.name,
        price: product.price,
        imageUrl: product.imageUrl,
        quantity: 1,
      };

      const docRef = await addDoc(cartRef, newCartItem);

      dispatch(addToCartSuccess({ id: docRef.id, ...newCartItem }));
      toast.success("Product added to cart!");
    }
  } catch (error) {
    console.log("Error adding to cart:", error);
  }
};

// **REMOVE FROM CART**
export const removeFromCartThunk = (cartId) => async (dispatch) => {
  try {
    await deleteDoc(doc(db, "carts", cartId));
    dispatch(removeFromCartSuccess(cartId));
    toast.error("Product removed from cart!");
  } catch (error) {
    console.log("Error removing from cart:", error);
  }
};

// **UPDATE QUANTITY**
export const updateCartQuantityThunk = (cartId, newQuantity) => async (dispatch) => {
  try {
    const cartRef = doc(db, "carts", cartId);
    await updateDoc(cartRef, { quantity: newQuantity });

    dispatch(updateCartQuantitySuccess({ id: cartId, quantity: newQuantity }));
    toast.info("Cart updated.");
  } catch (error) {
    console.log("Error updating cart quantity:", error);
  }
};

export const getAllProductsThunk = () => async (dispatch) => {
  try {
    const q = collection(db, "products"); // Ambil semua produk tanpa pagination
    const querySnapshot = await getDocs(q);

    let data = [];
    querySnapshot.forEach((doc) => {
      data.push({ id: doc.id, ...doc.data() });
    });

    dispatch(onFetchProductSuccess(data)); // Simpan ke Redux
  } catch (error) {
    console.error("Error fetching all products:", error);
  }
};

