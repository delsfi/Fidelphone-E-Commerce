import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import { ChevronLeft, ChevronRight } from "lucide-react"; // Ikon panah modern

const heroSlides = [
  {
    id: 1,
    image: "https://images.samsung.com/id/smartphones/galaxy-s24-ultra/images/galaxy-s24-ultra-highlights-color-titanium-yellow-back-mo.jpg?imbypass=true",
    title: "Samsung Galaxy S24 Ultra",
    description: "Get the latest Samsung flagship with unbeatable price!",
  },
  {
    id: 2,
    image: "https://hotelier.id/wp-content/uploads/2022/10/iPhone-15.jpg",
    title: "iPhone 15 Pro Max",
    description: "Experience the future with the most powerful iPhone ever!",
  },
  {
    id: 3,
    image: "https://asset.kompas.com/crops/k3Iwfbg2RH5aA4-WjyOIVSIW9S4=/179x0:2339x1440/1200x800/data/photo/2023/09/08/64fa76af26434.png",
    title: "Vivo V29",
    description: "Stunning design and powerful camera, grab yours today!",
  },
];

// Custom Next Arrow
function NextArrow(props) {
  const { onClick } = props;
  return (
    <button
      onClick={onClick}
      className="absolute top-1/2 right-4 transform -translate-y-1/2 bg-white text-gray-600 p-3 rounded-full opacity-0 group-hover:opacity-100 transition duration-300 z-10"
    >
      <ChevronRight size={18} />
    </button>
  );
}

// Custom Prev Arrow
function PrevArrow(props) {
  const { onClick } = props;
  return (
    <button
      onClick={onClick}
      className="absolute top-1/2 left-4 transform -translate-y-1/2 bg-white text-gray-600 p-3 rounded-full  opacity-0 group-hover:opacity-100 transition duration-300 z-10"
    >
      <ChevronLeft size={18} />
    </button>
  );
}

export default function HeroSection() {
  const settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 3000,
    nextArrow: <NextArrow />, // Pastikan ini menggunakan komponen custom arrow
    prevArrow: <PrevArrow />, // Pastikan ini menggunakan komponen custom arrow
  };

  return (
    <div className="relative w-full h-[450px] overflow-hidden group">
      <Slider {...settings}>
        {heroSlides.map((slide) => (
          <div key={slide.id} className="relative w-full h-[450px]">
            <img
              src={slide.image}
              alt={slide.title}
              className="w-full h-full object-cover"
            />
            <div className="absolute inset-0 bg-black/10 bg-opacity-40 flex flex-col justify-center items-center text-white px-6 text-center">
              <h2 className="text-4xl font-bold">{slide.title}</h2>
              <p className="mt-2 text-lg">{slide.description}</p>
              <button className="mt-4 px-6 py-2 bg-blue-600 text-white text-lg font-semibold rounded-md hover:bg-blue-700 transition">
                Shop Now
              </button>
            </div>
          </div>
        ))}
      </Slider>
    </div>
  );
}
