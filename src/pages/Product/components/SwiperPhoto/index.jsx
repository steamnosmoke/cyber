import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import Slider from "react-slick";
import { useEffect, useRef } from "react";

import "./swiper.scss";
import MyLoader from "./Loader";

export default function ProductGallery({ images }) {
  const sliderRef = useRef(null);

  const settings = {
    customPaging: function (i) {
      return (
        <button className='img_item'>
          <img
            src={images[i]}
            alt={`thumb-${i}`}
            style={{ width: "100px", height: "100px", objectFit: "contain" }}
          />
        </button>
      );
    },
    dots: true,
    dotsClass: "slick-dots ",
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
    arrows: false,
    fade: true,
  };

  useEffect(() => {
    if (sliderRef.current) {
      sliderRef.current.slickGoTo(0);
    }
  }, [images]);

  return (<>
    {images ? <Slider {...settings} ref={sliderRef} className='popop'>
      {images.map((src, index) => (
        <div key={index}>
          <img
            src={src}
            alt={`slide-${index}`}
            style={{ width: "400px", height: "480px", objectFit: "contain" }}
          />
        </div>
      ))}
    </Slider> : <MyLoader/>}</>
  );
}
