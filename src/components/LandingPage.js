import React from "react";
import Home from "./Home";
import { Carousel } from "react-responsive-carousel";
import "react-responsive-carousel/lib/styles/carousel.min.css";
import c1 from "./Images/image1.jpg";
import c2 from "./Images/image2.jpg";
import c3 from "./Images/image3.jpg";
import c4 from "./Images/image4.jpg";
import c5 from "./Images/image5.jpg";
import "./LandingPage.css";

const LandingPage = () => {
  const images = [c1, c2, c3, c4, c5];

  return (
    <div>
      <Home />
      <div className="carousel-container" style={{paddingTop: "63px"}}>
        <Carousel
          showArrows={true}
          showThumbs={false}
          useKeyboardArrows={true}
          autoPlay={true}
          infiniteLoop={true}
          interval={5000}
          stopOnHover={false}
        >
          {images.map((URL, index) => (
            <div className="slide" key={index}>
              <img alt={`slide ${index}`} src={URL} />
            </div>
          ))}
        </Carousel>
      </div>
    </div>
  );
};

export default LandingPage;
