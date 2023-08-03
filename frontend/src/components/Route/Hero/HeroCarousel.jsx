import React from "react";
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
  const settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
    adaptiveHeight: true,
    arrows: true,
    autoplaySpeed: 2200,
    autoplay: true,
  };
  return (
    <div className="py-6 px-2">
      <Slider {...settings}>
        {slides.map((slide) => (
          <div className="border bottom-1" key={slide.url}>
            <img src={slide.url} alt="setting-icon" />
          </div>
        ))}
      </Slider>
    </div>
  );
}
