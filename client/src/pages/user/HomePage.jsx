
import HeroSection from "../../components/user/HeroSection";
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
