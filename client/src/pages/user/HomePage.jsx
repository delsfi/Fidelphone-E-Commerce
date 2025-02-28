import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getProductsThunk } from "../../store/appSlice";
import HeroSection from "../../components/user/HeroSection";
import ProductList from "../../components/user/ProductList";
import { Filter, ArrowUpDown, ChevronLeft, ChevronRight } from "lucide-react";
import Products from "./ProductsPage";
import Footer from "../../components/user/Footer";

export default function HomePage() {
  return (
    <>
    <div className="max-w-screen-xl mx-auto px-4 py-6">

        {/* Hero Section */}
        <HeroSection />
        <Products />
        
      </div>
    <Footer />
    </>
  );
}
