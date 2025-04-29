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
  onSwiper: function (swiper) {
    if (!swiper || !swiper.slides) return;
    for (var i = 0; i < swiper.slides.length; i++) {
      var bgImg = swiper.slides[i].querySelector(".bg-img");
      if (bgImg) {
        bgImg.setAttribute("data-swiper-parallax", 0.75 * swiper.width);
      }
    }
  },
  onResize: function (swiper) {
    if (!swiper) return;
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
function Header({ lightMode }) {
  const [loadSwiper, setLoadSwiper] = useState(false);

  useEffect(() => {
    setLoadSwiper(true);
  }, []);

  useEffect(() => {
    if (loadSwiper) loadBackgroudImages();
  }, [loadSwiper]);

  return (
    <header className="slider arch-slider slider-prlx">
      {loadSwiper && data && (
        <Swiper {...swiperOptions} className="swiper-container parallax-slider">
          {data.map((item) => (
            <SwiperSlide key={item.id}>
              <div
                className="bg-img valign"
                data-background={
                  typeof window !== "undefined" && window.innerWidth > 768
                    ? item.background || ""
                    : item?.backgroundMobile || ""
                }
              ></div>
              <Link
                className="btn btn-lg btn-warning slider-prlx-caption"
                href={
                  lightMode ? "/light/page-portfolio" : "/dark/page-portfolio"
                }
              >
                <div className="container h-100 d-flex align-items-end justify-content-start slider-prlx-caption">
                  <div className="row">
                    <div
                      className="col-lg-12 offset-lg-1 valign"
                      style={{ marginTop: "40%" }}
                    >
                      <div className="btn-wrapper slider text-center  slider-prlx-caption"></div>
                    </div>
                  </div>
                </div>
              </Link>
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
