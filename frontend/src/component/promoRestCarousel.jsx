import React from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay, Pagination } from "swiper/modules";
import "swiper/css";
import "swiper/css/pagination";

import jollofImage from "../assets/jollof.jpg";
import friedRiceImage from "../assets/fried.jpg";
import swallowImage from "../assets/swallow.jpg";

const featuredMeals = [
  { id: 1, name: "Fried Rice", price: "₦1,700", image: friedRiceImage },
  { id: 2, name: "Jollof Rice", price: "₦1,500", image: jollofImage },
  { id: 3, name: "Swallow & Soup", price: "₦2,200", image: swallowImage },
];

export default function FeaturedFoodsCarousel() {
  return (
    <div style={{ width: "100%", marginBottom: "40px" }}>
      <Swiper
        modules={[Autoplay, Pagination]}
        slidesPerView={1}
        spaceBetween={20}
        autoplay={{ delay: 3000 }}
        pagination={{ clickable: true }}
        style={{ borderRadius: "20px", height: "300px" }}
      >
        {featuredMeals.map((meal) => (
          <SwiperSlide key={meal.id}>
            <div
              style={{
                height: "100%",
                width: "100%",
                borderRadius: "20px",
                overflow: "hidden",
                position: "relative",
                backgroundImage: `url(${meal.image})`,
                backgroundSize: "cover",
                backgroundPosition: "center",
              }}
            >
              {/* Dark overlay for readability */}
              <div
                style={{
                  position: "absolute",
                  top: 0,
                  left: 0,
                  width: "100%",
                  height: "100%",
                  backgroundColor: "rgba(0,0,0,0.4)",
                }}
              />
              {/* Text on top */}
              <div
                style={{
                  position: "absolute",
                  bottom: "20px",
                  left: "20px",
                  zIndex: 2,
                  color: "white",
                }}
              >
                <h2 style={{ fontSize: "28px", margin: "0 0 8px 0" }}>
                  {meal.name}
                </h2>
                <p style={{ fontSize: "18px", margin: "0 0 12px 0" }}>
                  {meal.price}
                </p>
                <button
                  style={{
                    padding: "10px 24px",
                    borderRadius: "12px",
                    border: "none",
                    backgroundColor: "#06B5AF",
                    color: "white",
                    fontWeight: "600",
                    cursor: "pointer",
                  }}
                >
                  Order Now
                </button>
              </div>
            </div>
          </SwiperSlide>
        ))}
      </Swiper>
    </div>
  );
}
