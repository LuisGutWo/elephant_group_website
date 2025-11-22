import React, { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import data from "@/data/Main/products.json";

function Intro({ lightMode }) {
  const [hoveredCard, setHoveredCard] = useState(null);

  if (!data || !Array.isArray(data) || data.length === 0) {
    throw new Error("data is not defined or is empty");
  }

  try {
    return (
      <section className="modern-products-section section-padding main-bg">
        <div className="container ontop">
          {/* Header con animación */}
          <div className="row d-flex justify-content-center">
            <div className="col-lg-8 text-center">
              <div className="modern-section-head mb-80">
                <h2 className="modern-title">
                  PRODUCTOS <span className="accent-text">DESTACADOS</span>
                </h2>
                <p className="modern-subtitle">
                  Descubre nuestra selección de productos más innovadores,
                  diseñados para potenciar tu marca y destacar en el mercado.
                </p>
              </div>
            </div>
          </div>

          {/* Grid de productos moderno */}
          <div className="modern-products-grid">
            {data.map((item, idx) => (
              <div
                key={item.id}
                className={`modern-product-card ${
                  hoveredCard === idx ? "hovered" : ""
                }`}
                onMouseEnter={() => setHoveredCard(idx)}
                onMouseLeave={() => setHoveredCard(null)}
              >
                {/* Badge con número */}
                <div className="product-badge">{item.number}</div>

                {/* Imagen con overlay */}
                <div className="product-image-container">
                  <Image
                    src={item.image}
                    alt={item.title}
                    width={400}
                    height={300}
                    className="product-image"
                    style={{
                      objectFit: "cover",
                      width: "100%",
                      height: "100%",
                    }}
                  />
                  <div className="image-overlay"></div>
                </div>

                {/* Contenido */}
                <div className="product-content">
                  <div className="product-info">
                    <h3 className="product-title">{item.title}</h3>
                    {item.subtitle && (
                      <p className="product-subtitle">{item.subtitle}</p>
                    )}
                  </div>

                  {/* Botones de acción */}
                  <div className="product-actions">
                    <Link
                      href={`/${lightMode ? "light" : "dark"}/page-contact`}
                      className="btn-primary-modern"
                    >
                      <span>COMPRAR</span>
                      <svg
                        className="btn-icon"
                        width="16"
                        height="16"
                        viewBox="0 0 24 24"
                        fill="none"
                      >
                        <path
                          d="M5 12h14m-7-7l7 7-7 7"
                          stroke="currentColor"
                          strokeWidth="2"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                        />
                      </svg>
                    </Link>

                    <Link
                      href={`/${lightMode ? "light" : "dark"}/page-services`}
                      className="btn-secondary-modern"
                    >
                      <span>MÁS INFO</span>
                    </Link>
                  </div>
                </div>

                {/* Efecto de brillo */}
                <div className="shine-effect"></div>
              </div>
            ))}
          </div>

          {/* Call to action */}
          <div className="row mt-80">
            <div className="col-12 text-center">
              <div className="modern-cta">
                <p className="cta-text">¿No encuentras lo que buscas?</p>
                <Link href={"/light/page-contact"} className="btn-cta-modern">
                  <span>Solicitar Cotización Personalizada</span>
                  <div className="btn-glow"></div>
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>
    );
  } catch (error) {
    console.error(error);
    return (
      <div className="error-container">
        <h3>Error al cargar productos</h3>
        <p>Por favor, inténtalo nuevamente.</p>
      </div>
    );
  }
}

export default Intro;
