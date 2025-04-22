import React, { useState, useEffect } from "react";
import Link from "next/link";
//= Modules
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Autoplay, Pagination, Parallax } from "swiper/modules";
//= Scripts
import loadBackgroudImages from "@/common/loadBackgroudImages";
//= Data
import data from "@/data/Main/header.json";
import { Button } from "react-bootstrap";

const swiperOptions = {
  modules: [Navigation, Autoplay, Pagination, Parallax],
  speed: 1500,
  autoplay: {
    delay: 5000,
  },
  parallax: true,
  loop: true,
  onSwiper: function (swiper) {
    for (var i = 0; i < swiper.slides.length; i++) {
      swiper.slides[i]
        .querySelector(".bg-img")
        .setAttribute("data-swiper-parallax", 0.75 * swiper.width);
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
                style={{
                  backgroundImage: `url(${
                    window.innerWidth > 768
                      ? item?.backgroundMobile
                      : item?.background
                  })`,
                }}
              ></div>
              <div className="container">
                <div className="row">
                  <div
                    className="col-lg-12 offset-lg-1 valign"
                    style={{ marginTop: "40%" }}
                  >
                    <div className="mr-auto slider me-auto mt-100 top-50 caption text-center">
                      <Link
                        className="btn btn-lg"
                        href={
                          lightMode
                            ? "/light/page-portfolio"
                            : "/dark/page-portfolio"
                        }
                      >
                        <Button variant="warning" className="btn-warning">
                          Conoce mas
                        </Button>
                      </Link>
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
