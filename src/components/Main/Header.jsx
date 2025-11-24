/* eslint-disable @next/next/no-img-element */
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
function Header() {
  const [loadSwiper, setLoadSwiper] = useState(false);

  useEffect(() => {
    if (!loadSwiper) {
      setLoadSwiper(true);
      loadBackgroudImages();
    }

    // Cleanup function
    return () => {
      // Si loadBackgroudImages configura event listeners, deberían limpiarse aquí
    };
  }, [loadSwiper]);

  return (
    <header
      className="slider arch-slider slider-prlx"
      itemScope
      itemType="https://schema.org/WPHeader"
      role="banner"
      aria-label="Banner principal - Elephant Group implementos publicitarios"
    >
      {loadSwiper && data && (
        <Swiper
          {...swiperOptions}
          className="swiper-container parallax-slider"
          role="region"
          aria-label="Carrusel de servicios destacados"
        >
          {data.map((item, index) => (
            <SwiperSlide key={item.id}>
              <div
                className="swiper-slide"
                itemScope
                itemType="https://schema.org/ImageObject"
              >
                {/* Imagen de fondo mejorada */}
                <div className="bg-img">
                  <img
                    src={item.background}
                    alt={`Elephant Group - ${item.title} - Implementos publicitarios y señalética en Valparaíso, V Región Chile`}
                    loading={index === 0 ? "eager" : "lazy"}
                    data-swiper-parallax="0.3"
                    itemProp="contentUrl"
                    title={`${item.title} - Elephant Group`}
                  />
                  <meta itemProp="description" content={item.subtitle} />
                </div>

                {/* Contenedor principal mejorado */}
                <div
                  className="container"
                  itemScope
                  itemType="https://schema.org/Service"
                >
                  <div className="row">
                    <div className="col-lg-10 col-xl-12">
                      {/* Glass effect container con forma original */}
                      <div className="caption-glass">
                        <div className="caption-content">
                          <p className="hero-subtitle" itemProp="description">
                            <StatementSplitter
                              statement={item.subtitle || ""}
                            />
                          </p>
                          <h1 className="hero-title" itemProp="name">
                            <StatementSplitter statement={item.title || ""} />
                          </h1>
                          <meta itemProp="provider" content="Elephant Group" />
                          <meta
                            itemProp="serviceType"
                            content="Implementos Publicitarios"
                          />
                          <meta
                            itemProp="areaServed"
                            content="Valparaíso, Chile"
                          />
                        </div>
                      </div>

                      {/* Botón separado del glass effect */}
                      <div
                        className="caption-button-container"
                        itemScope
                        itemType="https://schema.org/ContactPoint"
                      >
                        <Link
                          className="nav-link"
                          href="/contact"
                          aria-label="Contactar con asesor de Elephant Group para implementos publicitarios"
                          title="Habla con un asesor experto en publicidad"
                          itemProp="url"
                        >
                          <button
                            className="btn top__navbar-button"
                            type="button"
                          >
                            <span className="rolling-text">
                              HABLA CON UN ASESOR {arrowRightUpSvg}
                            </span>
                          </button>
                        </Link>
                        <meta
                          itemProp="contactType"
                          content="customer service"
                        />
                        <meta itemProp="availableLanguage" content="Spanish" />
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </SwiperSlide>
          ))}
        </Swiper>
      )}
      <div className="setting" role="group" aria-label="Controles del carrusel">
        <div className="controls">
          <button
            className="swiper-button-next swiper-nav-ctrl next-ctrl cursor-pointer"
            aria-label="Siguiente servicio"
            type="button"
          >
            <i className="ion-chevron-right" aria-hidden="true"></i>
          </button>
          <button
            className="swiper-button-prev swiper-nav-ctrl prev-ctrl cursor-pointer"
            aria-label="Servicio anterior"
            type="button"
          >
            <i className="ion-chevron-left" aria-hidden="true"></i>
          </button>
        </div>
      </div>
    </header>
  );
}

export default Header;
