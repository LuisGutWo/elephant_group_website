import React, { useState, useEffect } from "react";
import Image from "next/image";
// Modules
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Autoplay, Parallax, EffectFade } from "swiper/modules";
// Data
import data from "@/data/Main/clients.json";

const swiperOptions = {
  modules: [Navigation, Autoplay, Parallax, EffectFade],
  slidesPerView: 6,
  speed: 2000,
  autoplay: {
    delay: 2500,
    disableOnInteraction: false,
    pauseOnMouseEnter: true,
  },
  loop: true,
  parallax: true,
  spaceBetween: 30,
  grabCursor: true,
  centeredSlides: false,
  navigation: {
    nextEl: ".clients-next",
    prevEl: ".clients-prev",
  },
  breakpoints: {
    0: {
      slidesPerView: 2,
      spaceBetween: 15,
    },
    480: {
      slidesPerView: 3,
      spaceBetween: 20,
    },
    768: {
      slidesPerView: 4,
      spaceBetween: 25,
    },
    1024: {
      slidesPerView: 5,
      spaceBetween: 30,
    },
    1200: {
      slidesPerView: 6,
      spaceBetween: 30,
    },
  },
};

function Clients() {
  const [loadSwiper, setLoadSwiper] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [animateStats, setAnimateStats] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => {
      setLoadSwiper(true);
      setIsLoading(false);
    }, 300);

    // Intersection Observer para animar estadísticas
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setAnimateStats(true);
          }
        });
      },
      { threshold: 0.3 }
    );

    const section = document.querySelector(".modern-clients-section");
    if (section) observer.observe(section);

    return () => {
      clearTimeout(timer);
      if (section) observer.unobserve(section);
    };
  }, []);

  return (
    <section
      className="elegant-clients-section section-padding"
      aria-labelledby="clients-heading"
      itemScope
      itemType="https://schema.org/Organization"
    >
      <div className="container">
        {/* Header minimalista */}
        <div className="clients-header-minimal">
          <div className="text-center mb-5">
            <p className="clients-eyebrow">Confianza y Experiencia</p>
            <h2
              id="clients-heading"
              className="clients-title-minimal"
              itemProp="description"
            >
              Empresas que <span className="accent-color">Confían</span> en
              Nosotros
            </h2>
            <p className="clients-description">
              Desde 2018, más de{" "}
              <strong>100 empresas en Viña, Valparaíso y todo Chile</strong> han
              elegido nuestros{" "}
              <strong>implementos publicitarios de calidad</strong> para
              potenciar su marca.
            </p>
          </div>
        </div>

        {/* Carousel minimalista */}
        <div className="clients-carousel-minimal">
          {/* Loading skeleton */}
          {isLoading && (
            <div className="clients-loading-minimal">
              {[...Array(6)].map((_, index) => (
                <div key={index} className="client-skeleton-minimal" />
              ))}
            </div>
          )}

          {/* Swiper carousel minimalista */}
          {loadSwiper && data && data.length > 0 && (
            <div
              className="clients-swiper-minimal"
              itemScope
              itemType="https://schema.org/ItemList"
            >
              <meta itemProp="numberOfItems" content={data.length} />
              <Swiper
                {...swiperOptions}
                className="clients-swiper-elegant"
                role="region"
                aria-label="Portafolio de clientes - Empresas que confían en Elephant Group para implementos publicitarios"
              >
                {data.map((item, index) => (
                  <SwiperSlide
                    key={index}
                    itemScope
                    itemType="https://schema.org/Brand"
                    itemProp="itemListElement"
                  >
                    <meta itemProp="position" content={index + 1} />
                    <div className="client-card-minimal">
                      <Image
                        src={`/light${item}`}
                        alt={`Cliente ${
                          index + 1
                        } - Empresa que confía en Elephant Group para implementos publicitarios y señalética en Valparaíso`}
                        width={180}
                        height={120}
                        className="client-image-minimal"
                        loading={index < 6 ? "eager" : "lazy"}
                        quality={90}
                        sizes="(max-width: 480px) 140px, (max-width: 768px) 160px, 180px"
                        itemProp="logo"
                        title={`Logo cliente ${index + 1} Elephant Group`}
                      />
                    </div>
                  </SwiperSlide>
                ))}
              </Swiper>
            </div>
          )}
        </div>
      </div>
    </section>
  );
}

export default Clients;
