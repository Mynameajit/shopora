import React, { Suspense, lazy } from "react";
import Slider from "react-slick";
import AppLayout from "../layout/AppLayout";
import { slider1, slider2, slider3, slider4, slider5 } from "../utils/imageData";
import { FaShoppingCart } from "react-icons/fa";

// 💡 Lazy imports
const Products = lazy(() => import("./Products"));
const Footer = lazy(() => import("./Footer"));

// Slider Images
const sliderImages = [
  { img: slider1, caption: "Discover Premium Electronics at Unbeatable Prices" },
  { img: slider2, caption: "Upgrade Your Lifestyle with Smart Choices" },
  { img: slider3, caption: "Stay Stylish – Trendy Fashion Just a Click Away" },
  { img: slider4, caption: "Transform Your Home with Modern Essentials" },
  { img: slider5, caption: "Daily Deals, Delivered with Love" },
];

// Slider Settings
const sliderSettings = {
  dots: true,
  infinite: true,
  speed: 600,
  autoplay: true,
  autoplaySpeed: 3500,
  slidesToShow: 1,
  slidesToScroll: 1,
  arrows: false,
};


const Home = () => {
  const scrollToProducts = () => {
    document.getElementById("products-section")?.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <AppLayout>
      <div className="bg-gradient-to-r from-indigo-50 via-purple-50 to-pink-50 min-h-screen text-gray-800">
        {/* 🖼️ Hero Slider */}
        <section className="w-full overflow-hidden">
          <Slider {...sliderSettings}>
            {sliderImages.map((slide, index) => (
              <SliderImageCard
                key={index}
                img={slide.img}
                caption={slide.caption}
                onClick={scrollToProducts}
              />
            ))}
          </Slider>
        </section>

        {/* 🛒 Lazy Load Products Section */}
        <div className="max-w-7xl mx-auto px-4">
          <Suspense fallback={<p className="text-center py-10">Loading Products...</p>}>
            <Products isHome={true} id="products-section" />
          </Suspense>
        </div>

        {/* 📦 Lazy Load Footer */}
        <Suspense fallback={<div className="text-center py-8 text-sm text-gray-500">Loading footer...</div>}>
          <Footer />
        </Suspense>
      </div>
    </AppLayout>
  );
};




// 🧩 Slider Card Component
const SliderImageCard = ({ img, caption, onClick }) => (
  <div className="relative h-[50vh] sm:h-[60vh] rounded-xl">
    <img
      src={img}
      alt={caption}
      loading="lazy"
      className="w-full h-full object-cover rounded-xl"
    />
    <div className="absolute inset-0 bg-black/50 flex flex-col justify-center items-center text-white px-4 text-center">
      <h2 className="text-2xl sm:text-4xl md:text-5xl font-extrabold leading-tight drop-shadow-md">
        {caption}
      </h2>
      <button
        onClick={onClick}
        className="mt-6 inline-flex items-center gap-2 bg-gradient-to-r from-indigo-600 via-purple-600 to-pink-500 text-white px-6 py-3 rounded-full font-semibold shadow-md hover:opacity-90 transition-all duration-300"
      >
        <span>Shop Now</span>
        <FaShoppingCart className="text-lg" />
      </button>
    </div>
  </div>
);










export default Home;
