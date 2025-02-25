import { createContext, StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import AdminLayout from "./pages/admin/AdminLayout.jsx";
import AdminPage from "./pages/admin/AdminPage.jsx";
import LoginPage from "./pages/admin/LoginPage.jsx";
import RegisterPage from "./pages/admin/RegisterPage.jsx";
import AddProduct from "./pages/admin/AddProduct.jsx";
import EditProduct from "./pages/admin/EditProduct.jsx";
import { Provider } from "react-redux";
import store from "./store/index.js";
import HomePage from "./pages/user/HomePage.jsx";
import RootLayout from "./pages/user/RootLayout.jsx";
import Auth from "./pages/Auth.jsx";


const router = createBrowserRouter([
  {
    element: <Auth />,
    children: [
      {
        path: "/admin",
        element: <AdminLayout />,
        children: [
          { path: "", element: <AdminPage /> },
          { path: "login", element: <LoginPage /> },
          { path: "register", element: <RegisterPage /> },
          { path: "add-product", element: <AddProduct /> },
          { path: "edit-product/:id", element: <EditProduct /> },
        ],
      },
      {
        path: "/",
        element: <RootLayout />,
        children: [
          {
            path: "",
            element: <HomePage />,
          },
        ],
      },
    ],
  },
]);

createRoot(document.getElementById("root")).render(
    <Provider store={store}>
      <RouterProvider router={router} />
    </Provider>
);
