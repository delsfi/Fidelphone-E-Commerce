import { createSlice } from "@reduxjs/toolkit";
import { collection, getDocs, orderBy, query, where } from "firebase/firestore";
import { db } from "../config/firebase";

export const appSlice = createSlice({
  name: "app",
  initialState: {
    value: 0,
    products: [],
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
  },
});

// Action creators are generated for each case reducer function
export const {
  increment,
  decrement,
  incrementByAmount,
  onFetchProductSuccess,
} = appSlice.actions;

export default appSlice.reducer;

export const getProductsThunk = (params) => async (dispatch) => {
  try {
    let q = collection(db, "products");

    if (params?.filterCategory) {
      q = query(q, where("category", "==", params.filterCategory));
    }

    if (params?.sortPrice) {
      q = query(q, orderBy("price", params.sortPrice));
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
