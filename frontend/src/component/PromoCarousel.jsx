import React from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Autoplay, Pagination } from 'swiper/modules';


import 'swiper/css';
import 'swiper/css/pagination';
import promo1Image from "../assets/food1.jpg";
import promo2Image from "../assets/food2.jpg";

const PromoCarousel = () => {
  const promos = [
    { id: 1, title: "50% OFF Wednesdays", shop: "Home and Away", image: promo1Image },
    { id: 2, title: "Free Delivery", shop: "Campus Bites", image: promo2Image },
  ];

  return (
    <div style={carouselStyles.wrapper}>
      <Swiper
        modules={[Autoplay, Pagination]}
        spaceBetween={20}
        slidesPerView={1}
        autoplay={{ delay: 3000 }}
        pagination={{ clickable: true }}
        style={carouselStyles.swiper}
      >
        {promos.map((promo) => (
          <SwiperSlide key={promo.id} style={{ height: '100%' }}>
            <div
              style={{
                ...carouselStyles.slide,
                backgroundImage: `url(${promo.image})`,
                backgroundSize: 'cover',
                backgroundPosition: 'center',
                position: 'relative', 
              }}
            >
              
              <div style={carouselStyles.overlay} />

              
              <div style={carouselStyles.textContainer}>
                <h2 style={carouselStyles.promoTitle}>{promo.title}</h2>
                <p style={carouselStyles.promoSub}>{promo.shop}</p>
                <button style={carouselStyles.button}>Claim Offer</button>
              </div>
            </div>
          </SwiperSlide>
        ))}
      </Swiper>
    </div>
  );
};

const carouselStyles = {
  wrapper: {
    width: "100%",
    marginBottom: "40px",
    display: "block",
    minHeight: "250px",
  },
  swiper: {
    borderRadius: "20px",
    height: "250px",
    width: "100%",
    boxShadow: "0 4px 12px rgba(0,0,0,0.1)",
  },
  slide: {
    width: "100%",
    height: "100%",
    display: "flex",
    flexDirection: "column",
    justifyContent: "center",
    padding: "0 40px",
    color: "white",
    boxSizing: "border-box",
  },
  overlay: {
    position: "absolute",
    top: 0,
    left: 0,
    width: "100%",
    height: "100%",
    backgroundColor: "rgba(0,0,0,0.4)", 
    borderRadius: "20px",
  },
  textContainer: {
    position: "relative", 
    zIndex: 2,
    textAlign: "left",
  },
  promoTitle: {
    fontSize: "28px",
    fontWeight: "800",
    margin: "0 0 5px 0",
    color: "#fff",
  },
  promoSub: {
    fontSize: "18px",
    margin: 0,
    color: "#fff",
    opacity: 0.9,
  },
  button: {
    marginTop: "15px",
    padding: "10px 24px",
    borderRadius: "12px",
    border: "none",
    backgroundColor: "#fff",
    color: "#000",
    fontWeight: "bold",
    cursor: "pointer",
  },
};

export default PromoCarousel;
