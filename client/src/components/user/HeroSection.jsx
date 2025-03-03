import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { getProductsThunk } from "../../store/appSlice";

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
      className="absolute top-1/2 left-4 transform -translate-y-1/2 bg-white text-gray-600 p-3 rounded-full opacity-0 group-hover:opacity-100 transition duration-300 z-10"
    >
      <ChevronLeft size={18} />
    </button>
  );
}

export default function HeroSection() {
  const dispatch = useDispatch();
  const navigate = useNavigate(); 
  const { products } = useSelector((state) => state.app);

  useEffect(() => {
    dispatch(getProductsThunk({ pageSize: 8, pageNumber: 1 }));
  }, [dispatch]);

  const settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 3000,
    nextArrow: <NextArrow />,
    prevArrow: <PrevArrow />,
  };

  return (
    <div className="relative w-full h-[450px] overflow-hidden group">
      <Slider {...settings}>
        {products.map((product) => (
          <div key={product.id} className="relative w-full h-[450px]">
            <img
              src={product.image_bg}
              alt={product.name}
              className="w-full h-full object-cover"
            />
            <div className="absolute inset-0 bg-black/10 bg-opacity-40 flex flex-col justify-center items-center text-white px-6 text-center">
              <h2 className="text-4xl font-bold">{product.name}</h2>
              <p className="mx-8 my-2 text-lg">{product.description.split(/\s*[-–—]\s*/)[0]}</p>
              <button
                onClick={() => navigate(`/product/${product.id}`)} // Navigasi ke halaman detail produk
                className="mt-4 px-6 py-2 bg-blue-600 text-white text-lg font-semibold rounded-md hover:bg-blue-700 transition"
              >
                Read Now
              </button>
            </div>
          </div>
        ))}
      </Slider>
    </div>
  );
}
