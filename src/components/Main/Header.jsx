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
import { arrowRightUpSvg } from "@/data/icons";
import Link from "next/link";

const swiperOptions = {
  modules: [Navigation, Autoplay, Pagination, Parallax],
  //   autoplay: {
  //     delay: 5000,
  //     disableOnInteraction: false,
  //     pauseOnMouseEnter: false,
  //     waitForTransition: true,
  //   },
  effect: "fade",
  speed: 1500,
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
      {loadSwiper && data && (
        <Swiper {...swiperOptions} className="swiper-container parallax-slider">
          {data.map((item) => (
            <SwiperSlide key={item.id}>
              <div className="swiper-slide">
                {/* Imagen de fondo mejorada */}
                <div className="bg-img">
                  <img
                    src={item.background}
                    alt="Elephant Group - Design and Print Solutions"
                    loading="eager"
                    data-swiper-parallax="0.3"
                  />
                </div>

                {/* Contenedor principal mejorado */}
                <div className="container">
                  <div className="row">
                    <div className="col-lg-10 col-xl-12">
                      {/* Glass effect container con forma original */}
                      <div className="caption-glass">
                        <div className="caption-content">
                          <h2>
                            <StatementSplitter
                              statement={item.subtitle || ""}
                            />
                          </h2>
                          <h1>
                            <StatementSplitter statement={item.title || ""} />
                          </h1>
                        </div>
                      </div>

                      {/* Botón separado del glass effect */}
                      <div className="caption-button-container">
                        <Link
                          className="nav-link"
                          href={`/${
                            lightMode
                              ? "light/page-contact"
                              : "dark/page-contact"
                          }`}
                          aria-label="Contacto - Habla con un asesor"
                        >
                          <button className="btn top__navbar-button">
                            <span className="rolling-text">
                              HABLA CON UN ASESOR
                            </span>
                          </button>
                        </Link>
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
