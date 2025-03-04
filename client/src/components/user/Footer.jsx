export default function Footer() {
    return (
      <>  
        {/* Footer Content */}
        <div className="bg-slate-700 text-white pt-12 pb-3 px-8 md:px-16 lg:px-32">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            {/* About Fidel Phone */}
            <div>
            <img src="/logo.PNG" alt="Fidel Phone Logo" className="h-32" />
              <p className="text-sm leading-relaxed">
                Fidel Phone adalah toko online terpercaya untuk produk smartphone terbaru dengan harga terbaik.
              </p>
            </div>
  
            {/* Navigation Links */}
            <div>
              <h3 className="text-lg font-semibold mb-3">Produk</h3>
              <ul className="space-y-2 text-sm">
                <li><a href="/" className="hover:text-gray-400">iPhone</a></li>
                <li><a href="/" className="hover:text-gray-400">Samsung</a></li>
                <li><a href="/" className="hover:text-gray-400">Xiaomi</a></li>
                <li><a href="/" className="hover:text-gray-400">Vivo</a></li>
              </ul>
            </div>
  
            <div>
              <h3 className="text-lg font-semibold mb-3">Tentang Kami</h3>
              <ul className="space-y-2 text-sm">
                <li><a href="/" className="hover:text-gray-400">Tentang Fidel Phone</a></li>
                <li><a href="/" className="hover:text-gray-400">Hubungi Kami</a></li>
                <li><a href="/" className="hover:text-gray-400">Syarat & Ketentuan</a></li>
                <li><a href="/" className="hover:text-gray-400">Kebijakan Privasi</a></li>
              </ul>
            </div>
  
            {/* Payment Methods */}
            <div>
              <h3 className="text-lg font-semibold mb-3">Metode Pembayaran</h3>
              <img src="/image1.png" alt="Payment Methods" className="max-w-[380px]" />
            </div>
          </div>
  
          {/* Copyright */}
          <div className="mt-2 border-t border-gray-700 pt-6 text-center text-sm text-gray-400">
            © {new Date().getFullYear()} Fidel Phone. All Rights Reserved.
          </div>
        </div>
      </>
    );
  }
  