import React, { useState, useEffect } from "react";
import Link from "next/link";
//= Modules
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Autoplay, Pagination, Parallax } from "swiper/modules";
//= Scripts
import loadBackgroudImages from "@/common/loadBackgroudImages";
//= Data
import data from "@/data/Main/header.json";

const swiperOptions = {
  modules: [Navigation, Autoplay, Pagination, Parallax],
  speed: 1500,
  autoplay: {
    delay: 5000,
  },
  parallax: true,
  loop: true,
  onBeforeInit: function (swiper) {
    if (!swiper || !swiper.slides) return;
    swiper.slides.forEach((slide) => {
      const bgImg = slide.querySelector(".bg-img");
      if (bgImg) {
        bgImg.setAttribute("data-swiper-parallax", 0.75 * swiper.width);
      }
    });
  },
  onResize(swiper) {
    swiper?.update();
  },
  pagination: {
    el: ".slider-prlx .swiper-pagination",
    type: "fraction",
    clickable: true,
  },
  navigation: {
    nextEl: ".slider-prlx .next-ctrl",
    prevEl: ".slider-prlx .prev-ctrl",
  },
};
function Header({ lightMode }) {
  const [loadSwiper, setLoadSwiper] = useState(false);

  useEffect(() => {
    if (!loadSwiper) {
      setLoadSwiper(true);
      loadBackgroudImages();
    }
  }, [loadSwiper]);

  return (
    <header className="slider arch-slider slider-prlx">
      {data && loadSwiper && (
        <Swiper {...swiperOptions} className="swiper-container parallax-slider">
          {data.map(({ id, background, backgroundMobile }) => (
            <SwiperSlide key={id}>
              <div
                className="bg-img valign"
                style={{
                  backgroundImage: `url(${
                    window.innerWidth <= 768 ? backgroundMobile : background
                  })`,
                }}
                data-background={background}
                data-background-mobile={backgroundMobile}
                data-swiper-parallax="0.75"
              ></div>
            </SwiperSlide>
          ))}
        </Swiper>
      )}
      <div className="setting">
        <div className="controls">
          <div className="swiper-button-next swiper-nav-ctrl next-ctrl cursor-pointer">
            <i className="ion-chevron-right" />
          </div>
          <div className="swiper-button-prev swiper-nav-ctrl prev-ctrl cursor-pointer">
            <i className="ion-chevron-left" />
          </div>
        </div>
      </div>
    </header>
  );
}

export default Header;
