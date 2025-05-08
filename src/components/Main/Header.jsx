import React, { useState, useEffect } from "react";
//= Modules
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Autoplay, Pagination, Parallax } from "swiper/modules";
//= Components
import StatementSplitter from "../Common/StatementSplitter";
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
  onSwiper: function (swiper) {
    if (swiper && swiper.slides) {
      for (var i = 0; i < swiper.slides.length; i++) {
        const slide = swiper.slides[i];
        const bgImg = slide.querySelector(".bg-img");
        if (bgImg) {
          bgImg.setAttribute("data-swiper-parallax", 0.75 * swiper.width);
        }
      }
    }
  },
  onResize: function (swiper) {
    swiper.update();
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
function Header() {
  const [loadSwiper, setLoadSwiper] = useState(false);

  useEffect(() => {
    if (!loadSwiper) {
      setLoadSwiper(true);
      loadBackgroudImages();
    }
  }, [loadSwiper]);

  return (
    <header className="slider arch-slider slider-prlx">
      {loadSwiper && data && (
        <Swiper {...swiperOptions} className="swiper-container parallax-slider">
          {data.map((item) => (
            <SwiperSlide key={item.id}>
              <div
                className="swiper-slide bg-img valign"
                style={{
                  backgroundImage: window.matchMedia("(max-width: 768px)")
                    .matches
                    ? `url(${item?.backgroundMobile})`
                    : `url(${item?.background})`,
                }}
                data-swiper-parallax-opacity="0.5"
                data-swiper-parallax-scale="1.2"
                data-swiper-parallax-duration="1000"
              >
                <div className="container">
                  <div className="row">
                    <div className="col-lg-7">
                      <div className="caption mt-0">
                        <img
                          src="/light/assets/imgs/logo-light.webp"
                          alt="Elephant Group Logo"
                          className="logo-webp img-responsive w-25"
                          data-swiper-parallax="0.5"
                        />
                        <h1 className="text-light">
                          <StatementSplitter statement={item.title || ""} />
                        </h1>
                        <h4 className="text-light">
                          <StatementSplitter statement={item.subtitle || ""} />
                        </h4>
                        <p>{item.text || ""}</p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </SwiperSlide>
          ))}
        </Swiper>
      )}
      <div className="setting">
        <div className="controls">
          <div className="swiper-button-next swiper-nav-ctrl next-ctrl cursor-pointer">
            <i className="ion-chevron-right"></i>
          </div>
          <div className="swiper-button-prev swiper-nav-ctrl prev-ctrl cursor-pointer">
            <i className="ion-chevron-left"></i>
          </div>
        </div>
      </div>
    </header>
  );
}

export default Header;
