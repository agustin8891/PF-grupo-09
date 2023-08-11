import React from "react";
import OwlCarousel from "react-owl-carousel";
import "owl.carousel/dist/assets/owl.carousel.css";
import "owl.carousel/dist/assets/owl.theme.default.css";
import "./carousel.css"; // Importa tus estilos personalizados
import { useSelector } from "react-redux";
import { format } from "date-fns"; // Importa la función de formateo

const MyCarousel = () => {
  const packages = useSelector((state) => state.rootReducer.packages);
  const currentDate = new Date();
  let arrayCarousel = packages.filter(
    (el) => new Date(el.start_date) > currentDate
  );
  arrayCarousel = arrayCarousel.slice(0, 5);

  const formatDateToDdMm = (isoDate) => {
    const date = new Date(isoDate);
    return format(date, "dd/MM");
  };

  return (
    <OwlCarousel
      className="owl-theme custom-carousel"
      items={1}
      loop={true}
      autoplay={true}
      autoplayTimeout={3000}
      autoplayHoverPause={true}
    >
      {arrayCarousel.map((el, index) => {
        const formattedDate = formatDateToDdMm(el.start_date);
        return (
          <div key={index} className="containerImgCarousel">
            <div className="image-overlay">
              <h2 className="overlay-text">{el.name}</h2>
              {/*               <h2 className="text-date">{el.name}</h2>
              <h2 className="text-hotel">{el.hotel?.name}</h2> */}
              <div className="container-texts d-flex flex-column">
                <h2 className="text-date ms-5 mb-5">
                  <strong>Fecha de salida: {formattedDate}</strong>
                </h2>
                <h2 className="text-date ms-5">
                  <strong>Hotel: {el.hotel?.name}</strong>
                </h2>
              </div>
            </div>
            <img
              className="imgCarousel"
              src={el.city?.image}
              alt={`Slide ${index + 1}`}
            />
          </div>
        );
      })}
    </OwlCarousel>
  );
};

export default MyCarousel;
