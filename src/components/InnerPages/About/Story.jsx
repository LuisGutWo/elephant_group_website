import React, { useEffect, useState } from "react";
//= Scripts
import loadBackgroudImages from "@/common/loadBackgroudImages";

//= Modules
import { Swiper, SwiperSlide } from "swiper/react";
import {
  Navigation,
  Autoplay,
  Pagination,
  Parallax,
  EffectFade,
} from "swiper/modules";
//= Data
import data from "@/data/Main/portfolioGalleryPage.json";

const swiperOptions = {
  modules: [Navigation, Autoplay, Pagination, Parallax, EffectFade],
  effect: "fade",
  speed: 1500,
  autoplay: {
    delay: 3000,
  },
  parallax: true,
  loop: true,
  onSwiper: function (swiper) {
    for (var i = 0; i < swiper.slides.length; i++) {
      swiper.slides[i]
        .querySelector(".bg-img")
        .setAttribute("data-swiper-parallax", 0 * swiper.width);
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

function Story() {
  const [loadSwiper, setLoadSwiper] = useState(false);

  useEffect(() => {
    setLoadSwiper(true);
    loadBackgroudImages();
  }, []);

  useEffect(() => {
    if (loadSwiper) loadBackgroudImages();
  }, [loadSwiper]);

  return (
    <section className="pg-about section-padding sub-bg">
      <div className="container">
        <div className="row">
          <div className="col-lg-4">
            {loadSwiper && (
              <Swiper
                {...swiperOptions}
                className="swiper-container parallax-slider"
              >
                {data.gallery.map((_item, index) => {
                  const randomIndex = Math.floor(
                    Math.random() * data.gallery.length
                  );
                  const randomImage = data.gallery[randomIndex].image;
                  return (
                    <SwiperSlide key={index}>
                      <div
                        className="bg-img radius-10 md-mb50"
                        data-background={randomImage}
                        data-swiper-parallax-opacity="0.5"
                      ></div>
                    </SwiperSlide>
                  );
                })}
              </Swiper>
            )}
          </div>
          <div className="col-lg-8">
            {loadSwiper && (
              <Swiper
                {...swiperOptions}
                className="swiper-container parallax-slider"
              >
                {data.gallery.map((_item, index) => {
                  const randomIndex = Math.floor(
                    Math.random() * data.gallery.length
                  );
                  const randomImage = data.gallery[randomIndex].image;

                  return (
                    <SwiperSlide key={index}>
                      <div
                        className="bg-img radius-10"
                        data-background={randomImage}
                        data-swiper-parallax-opacity="0.5"
                      ></div>
                    </SwiperSlide>
                  );
                })}
              </Swiper>
            )}
          </div>
          <div className="col-lg-4">
            <div className="sec-head mt-80">
              <h6 className="sub-title">Nuestra Historia</h6>
            </div>
          </div>
          <div className="col-lg-8">
            <div className="cont mt-80">
              <h5>
                Iniciamos en 2018 en una pequeña oficina en la ciudad jardín.
                Con grandes sueños, emprendimos este proyecto que ha sido una
                gran aventura. Hoy, esos sueños han crecido, y nuestra
                creatividad es más fuerte. Gracias a esto, hemos ayudado a
                cientos de clientes con soluciones de PUBLICIDAD, apoyándolos a
                integrarse exitosamente en el mercado.
              </h5>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

export default Story;
