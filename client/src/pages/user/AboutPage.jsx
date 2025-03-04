import { ArrowLeftIcon } from "lucide-react";
import { useNavigate } from "react-router-dom";
import Footer from "../../components/user/Footer";

export default function AboutPage() {
  return (
    <>
    <div className="min-h-screen px-6 py-12 md:py-16 bg-gray-100 text-gray-900">
      <div className="max-w-4xl mx-auto text-center">
        {/* Logo Perusahaan */}
        <img
          src="/logo.PNG"
          alt="Fidel Phone Logo"
          className="h-50 mx-auto mb-6"
        />

        <p className="text-lg leading-relaxed">
          Fidel Phone adalah platform e-commerce yang menyediakan berbagai
          pilihan ponsel berkualitas tinggi dengan harga terbaik. Kami
          berkomitmen untuk menghadirkan produk original, layanan cepat, dan
          pengalaman belanja terbaik untuk pelanggan kami.
        </p>
      </div>

      {/* Informasi Fidel Phone */}
      <div className="max-w-5xl mx-auto mt-10 grid md:grid-cols-2 gap-8">
        {/* Visi & Misi */}
        <div className="bg-white p-6 rounded-lg shadow-md">
          <h2 className="text-2xl font-semibold mb-3">Visi & Misi</h2>
          <p className="text-gray-700">
            Kami ingin menjadi toko online ponsel terpercaya di Indonesia dengan
            menghadirkan produk berkualitas, harga kompetitif, dan layanan
            pelanggan yang luar biasa.
          </p>
        </div>

        {/* Layanan Fidel Phone */}
        <div className="bg-white p-6 rounded-lg shadow-md">
          <h2 className="text-2xl font-semibold mb-3">Layanan Kami</h2>
          <ul className="list-disc ml-6 text-gray-700">
            <li>Penjualan ponsel original & bergaransi resmi</li>
            <li>Pengiriman cepat & aman ke seluruh Indonesia</li>
            <li>Customer service responsif 24/7</li>
          </ul>
        </div>
      </div>

      {/* Profil Pendiri */}
      <div className="max-w-4xl mx-auto mt-12 text-center">
        <h2 className="text-2xl font-semibold mb-4">Founder Fidel Phone</h2>
        <div className="flex flex-col items-center">
          <img
            src="/founder.jpeg"
            alt="Founder Fidel Phone"
            className="w-48 h-50 rounded-full object-cover shadow-md mb-4"
          />
          <h3 className="text-xl font-medium">Aloisius Fidelis B.S, S.Kom</h3>
          <p className="text-gray-700 max-w-md mt-2">
            Aloisius Fidel mendirikan Fidel Phone dengan visi menciptakan
            pengalaman belanja ponsel yang mudah, aman, dan terpercaya bagi
            semua pelanggan di Indonesia.
          </p>
        </div>
      </div>
    </div>
    <Footer />
    </>
  );
}
