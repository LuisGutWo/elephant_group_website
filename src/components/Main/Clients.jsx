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

function Clients({ lightMode }) {
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

  const stats = [
    { number: "100+", label: "Empresas Confiadas", icon: "🏢" },
    { number: "500+", label: "Proyectos Exitosos", icon: "🚀" },
    { number: "98%", label: "Satisfacción Cliente", icon: "⭐" },
  ];

  return (
    <section className="modern-clients-section section-padding">
      <div className="container">
        {/* Header con estadísticas animadas */}
        <div className="clients-header">
          <div className="row align-items-center">
            <div className="col-lg-6">
              <div className="clients-intro">
                <h2 className="clients-title">
                  Empresas que
                  <span className="highlight-text"> Confían </span>
                  en Nosotros
                </h2>
                <p className="clients-subtitle">
                  Más de 100 empresas en todo Chile han elegido nuestra
                  experiencia, innovación y compromiso para hacer crecer sus
                  negocios.
                </p>
              </div>
            </div>
            <div className="col-lg-6">
              <div className="clients-stats">
                {stats.map((stat, index) => (
                  <div
                    key={index}
                    className={`stat-card ${animateStats ? "animate" : ""}`}
                    style={{ animationDelay: `${index * 0.2}s` }}
                  >
                    <div className="stat-icon">{stat.icon}</div>
                    <div className="stat-content">
                      <div className="stat-number">{stat.number}</div>
                      <div className="stat-label">{stat.label}</div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* Carousel con loading state */}
        <div className="clients-carousel-container">
          {/* Navigation buttons */}
          <div className="clients-navigation">
            <button className="clients-prev" aria-label="Cliente anterior">
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor">
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M15 19l-7-7 7-7"
                />
              </svg>
            </button>
            <button className="clients-next" aria-label="Cliente siguiente">
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor">
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M9 5l7 7-7 7"
                />
              </svg>
            </button>
          </div>

          {/* Loading skeleton */}
          {isLoading && (
            <div className="clients-loading">
              {[...Array(6)].map((_, index) => (
                <div key={index} className="client-skeleton" />
              ))}
            </div>
          )}

          {/* Swiper carousel */}
          {loadSwiper && data && data.length > 0 && (
            <div className="clients-swiper-wrapper">
              <Swiper
                {...swiperOptions}
                className="clients-swiper"
                role="region"
                aria-label="Logos de clientes"
              >
                {data.map((item, index) => (
                  <SwiperSlide key={index}>
                    <div className="client-card">
                      <div className="client-image-container">
                        <Image
                          src={`/${lightMode ? "light" : "dark"}${item}`}
                          alt={`Logo del cliente ${
                            index + 1
                          } de Elephant Group`}
                          width={160}
                          height={120}
                          className="client-image"
                          loading={index < 6 ? "eager" : "lazy"}
                          quality={85}
                          sizes="(max-width: 480px) 150px, (max-width: 768px) 140px, (max-width: 1024px) 150px, 160px"
                        />
                        <div className="client-overlay">
                          <div className="client-shine" />
                        </div>
                      </div>
                    </div>
                  </SwiperSlide>
                ))}
              </Swiper>

              {/* Progress indicator */}
              <div className="swiper-progress">
                <div className="swiper-progress-fill" />
              </div>
            </div>
          )}
        </div>
      </div>
    </section>
  );
}

export default Clients;
