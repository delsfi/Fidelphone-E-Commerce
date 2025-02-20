import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import './index.css';
import App from './App.jsx';
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import AdminLayout from './pages/admin/AdminLayout.jsx';
import AdminPage from './pages/admin/AdminPage.jsx';
import LoginPage from './pages/admin/LoginPage.jsx';
import RegisterPage from './pages/admin/RegisterPage.jsx';
import AddProduct from './pages/admin/AddProduct.jsx';



const router = createBrowserRouter([
  {
    path: "/",
    element: <AdminLayout />,
    children: [
      { path: "/admin", element: <AdminPage /> },
      { path: "/admin/login", element: <LoginPage /> },
      { path: "/admin/register", element: <RegisterPage /> },
      { path: "/admin/add-product", element: <AddProduct /> },

    ],
  },
  
]);

createRoot(document.getElementById('root')).render(
  
    <RouterProvider router={router} />
);
