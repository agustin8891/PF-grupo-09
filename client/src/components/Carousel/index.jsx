import React, { useEffect, useState } from "react";
import OwlCarousel from "react-owl-carousel";
import "owl.carousel/dist/assets/owl.carousel.css";
import "owl.carousel/dist/assets/owl.theme.default.css";
import "./carousel.css"; // Importa tus estilos personalizados

const MyCarousel = ({ packages }) => {
  return (
    <div className="carousel-container">
      <OwlCarousel
        className="owl-theme custom-carousel"
        items={1}
        loop={true}
        autoplay={true}
        autoplayTimeout={3000}
        autoplayHoverPause={true}
      >
        {packages.map((el, index) => (
          <div key={index} className="containerImgCarousel">
            <img
              className="imgCarousel"
              src={el.city?.image}
              alt={`Slide ${index + 1}`}
            />
          </div>
        ))}
      </OwlCarousel>
    </div>
  );
};

export default MyCarousel;
