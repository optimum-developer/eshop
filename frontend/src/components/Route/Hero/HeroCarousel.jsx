import React, { Component } from "react";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

export default function HeroCarousel() {
  const slides = [
    {
      url: "/homepage/herosection_2.webp",
    },
    {
      url: "/homepage/herosection_1.webp",
    },
    {
      url: "/homepage/herosection_3.webp",
    },
    {
      url: "/homepage/herosection_4.webp",
    },
    {
      url: "/homepage/herosection_5.webp",
    },
  ];
  console.log({ slides });
  const settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
    adaptiveHeight: true,
    arrows: true,
    autoplaySpeed:2200,
    autoplay:true,
    
  };
  return (
    <div className="py-6">
      {/* <img src="/homepage/herosection.webp" /> */}

      {/* <img src="/homepage/herosection_1.webp" /> */}
      <Slider {...settings}>
        {slides.map((slide) => (
          <div className="border bottom-1">
            <img src={slide.url} />
          </div>
        ))}
        {/* <div>
            <img src="/homepage/herosection_2.webp" />
          </div> */}
      </Slider>
    </div>
  );
};

