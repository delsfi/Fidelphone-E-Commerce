export default function HeroSection() {
    return (
      <div className="relative w-full h-[500px] bg-cover bg-center flex items-center justify-center text-white"
        style={{ backgroundImage: "url('/images/hero-image.jpg')" }}>
  
        <div className="bg-black bg-opacity-50 p-10 rounded-xl text-center">
          <h1 className="text-5xl font-bold">Welcome to Fidel Phone</h1>
          <p className="mt-4 text-lg">Discover the best smartphones with exclusive deals!</p>
          <button className="mt-6 px-6 py-3 bg-blue-600 hover:bg-blue-700 text-white rounded-lg">
            Shop Now
          </button>
        </div>
      </div>
    );
  }
  