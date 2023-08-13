import React, { useEffect, useState } from "react";
import Navbar from "../../components/Navbar";
import Footer from "../../components/Footer";
import "./homeView.css";
import HomeBody from "../../components/HomeBody";
import Carousel from "../../components/Carousel";
import { useSelector } from "react-redux";

function HomeView({ userlog }) {
  const packagesSelector = useSelector((state) => state.rootReducer.packages);
  const currentDate = new Date();
  const packagesToShow = packagesSelector.filter(
    (el) => new Date(el.start_date) > currentDate
  );

  return (
    <>
      <div>
        <Navbar userlog={userlog} />
      </div>
      <div className="containerCarousel">
        <Carousel packages={packagesToShow.slice(0, 5)} />
        <HomeBody />
      </div>
      <div className="footerDiv">
        <Footer />
      </div>
    </>
  );
}

export default HomeView;
