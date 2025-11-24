/* eslint-disable @next/next/no-img-element */
import React from "react";
import Link from "next/link";

// Datos de productos optimizados para SEO
const portfolioData = [
  {
    id: 1,
    title: "LETREROS",
    subtitle: "publicitarios y corporativos",
    description:
      "Fabricación de letreros publicitarios en Valparaíso. Diseños personalizados en trovicel, acrílico y aluminio compuesto. Instalación profesional para locales comerciales y oficinas.",
    image: "/light/assets/imgs/works/corte_el_brioche.webp",
    category: "Letreros",
    keywords:
      "letreros publicitarios, letreros corporativos, señalización comercial Valparaíso",
    priceRange: "Desde $25.000",
    brand: "Elephant Group",
  },
  {
    id: 2,
    title: "SEÑALÉTICAS",
    subtitle: "industriales y corporativas",
    description:
      "Señalética industrial y corporativa en Valparaíso. Soluciones de seguridad y orientación para interiores y exteriores. Materiales resistentes a la intemperie.",
    image: "/light/assets/imgs/works/letrero_covisa.webp",
    category: "Señaléticas",
    keywords:
      "señalética industrial, señalización de seguridad, letreros corporativos Valparaíso",
    priceRange: "Desde $18.000",
    brand: "Elephant Group",
  },
  {
    id: 3,
    title: "ADHESIVOS",
    subtitle: "personalizados para empresas",
    description:
      "Adhesivos y vinilos personalizados en Valparaíso. Desde etiquetas corporativas hasta gráficos para vidrieras y vehículos. Impresión de alta calidad para tu marca.",
    image: "/light/assets/imgs/works/Adhesivos-Personalizarme.webp",
    category: "Adhesivos",
    keywords:
      "adhesivos personalizados, vinilos publicitarios, etiquetas corporativas Valparaíso",
    priceRange: "Desde $8.000",
    brand: "Elephant Group",
  },
];

function Portfolio() {
  const handleImageClick = (imageUrl) => {
    window.open(imageUrl, "_blank");
  };

  return (
    <section
      className="eg-portfolio section-padding sub-bg"
      itemScope
      itemType="https://schema.org/ItemList"
      aria-label="Catálogo de implementos publicitarios"
    >
      {/* Schema.org Organization Data */}
      <div
        itemScope
        itemType="https://schema.org/Organization"
        style={{ display: "none" }}
      >
        <span itemProp="name">Elephant Group</span>
        <span itemProp="description">
          Fabricación de implementos publicitarios en Valparaíso
        </span>
        <span itemProp="telephone">+56951631370</span>
        <span itemProp="areaServed">
          Valparaíso, Viña del Mar, Región de Valparaíso
        </span>
        <div
          itemProp="address"
          itemScope
          itemType="https://schema.org/PostalAddress"
        >
          <span itemProp="addressLocality">Valparaíso</span>
          <span itemProp="addressRegion">Valparaíso</span>
          <span itemProp="addressCountry">CL</span>
        </div>
      </div>

      <div className="container">
        {/* Header Section */}
        <div className="eg-portfolio-header">
          <div className="row justify-content-center">
            <div className="col-lg-8 text-center">
              <p className="portfolio-eyebrow">Catálogo de Productos 2025</p>
              <h1 className="eg-portfolio-title" itemProp="name">
                Implementos{" "}
                <span style={{ color: "#fca311" }}>Publicitarios</span> en
                Valparaíso
              </h1>
              <p className="eg-portfolio-description" itemProp="description">
                Fabricación y venta de <strong>señalética industrial</strong>,{" "}
                <strong>letreros corporativos</strong>,{" "}
                <strong>material POP</strong>,{" "}
                <strong>adhesivos personalizados</strong> y{" "}
                <strong>merchandising</strong> en Valparaíso y Viña del Mar.
                Diseño, impresión e instalación profesional para empresas y
                negocios.
              </p>
              <meta
                itemProp="numberOfItems"
                content={String(portfolioData.length)}
              />
            </div>
          </div>
        </div>

        {/* Portfolio Grid */}
        <div className="eg-portfolio-grid">
          <div className="row justify-content-center g-4">
            {portfolioData.map((item, index) => (
              <div
                key={item.id}
                className="col-lg-4 col-md-6"
                itemProp="itemListElement"
                itemScope
                itemType="https://schema.org/Product"
              >
                <div className="eg-portfolio-card">
                  <div className="eg-portfolio-image">
                    <img
                      src={item.image}
                      alt={`${item.title} - ${item.subtitle} | Elephant Group Valparaíso`}
                      loading="lazy"
                      onClick={() => handleImageClick(item.image)}
                      itemProp="image"
                      role="button"
                      tabIndex="0"
                      onKeyDown={(e) => {
                        if (e.key === "Enter" || e.key === " ") {
                          handleImageClick(item.image);
                        }
                      }}
                      aria-label={`Ver imagen ampliada de ${item.title}`}
                    />
                    <div className="eg-portfolio-overlay">
                      <div
                        className="eg-portfolio-category"
                        itemProp="category"
                      >
                        {item.category}
                      </div>
                    </div>
                  </div>

                  <div className="eg-portfolio-content">
                    <div className="eg-portfolio-header-badge">
                      <h3 className="eg-portfolio-card-title" itemProp="name">
                        {item.title}
                      </h3>
                      <span className="eg-portfolio-card-subtitle">
                        {item.subtitle}
                      </span>
                    </div>

                    <p
                      className="eg-portfolio-card-description"
                      itemProp="description"
                    >
                      {item.description}
                    </p>

                    {/* Schema.org adicional */}
                    <div style={{ display: "none" }}>
                      <span
                        itemProp="brand"
                        itemScope
                        itemType="https://schema.org/Brand"
                      >
                        <span itemProp="name">{item.brand}</span>
                      </span>
                      <div
                        itemProp="offers"
                        itemScope
                        itemType="https://schema.org/AggregateOffer"
                      >
                        <span itemProp="priceCurrency" content="CLP">
                          CLP
                        </span>
                        <span
                          itemProp="lowPrice"
                          content={item.priceRange.match(/\d+/)?.[0]}
                        >
                          {item.priceRange}
                        </span>
                        <span
                          itemProp="availability"
                          content="https://schema.org/InStock"
                        >
                          En Stock
                        </span>
                        <span itemProp="priceValidUntil" content="2025-12-31">
                          2025
                        </span>
                      </div>
                      <div
                        itemProp="aggregateRating"
                        itemScope
                        itemType="https://schema.org/AggregateRating"
                      >
                        <span itemProp="ratingValue">4.8</span>
                        <span itemProp="bestRating">5</span>
                        <span itemProp="ratingCount">127</span>
                      </div>
                      <meta
                        itemProp="sku"
                        content={`EG-${item.category.toUpperCase()}-${item.id}`}
                      />
                      <meta itemProp="keywords" content={item.keywords} />
                    </div>

                    <div className="eg-portfolio-actions">
                      <Link
                        href="/portfolio"
                        className="eg-portfolio-btn"
                        aria-label={`Ver catálogo completo de ${item.title.toLowerCase()} en Valparaíso`}
                        title={`${item.priceRange} - ${item.title} ${item.subtitle}`}
                      >
                        Ver Catálogo
                        <svg
                          width="16"
                          height="16"
                          viewBox="0 0 24 24"
                          fill="none"
                          aria-hidden="true"
                        >
                          <path
                            d="M7 17L17 7M17 7H7M17 7V17"
                            stroke="currentColor"
                            strokeWidth="2"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                          />
                        </svg>
                      </Link>
                    </div>
                  </div>
                  <meta itemProp="position" content={String(index + 1)} />
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Call to Action */}
        <div className="eg-portfolio-cta">
          <div className="row justify-content-center">
            <div className="col-lg-8 text-center">
              <p className="portfolio-cta-text">
                ¿Necesitas <strong>gigantografías</strong>,{" "}
                <strong>pendones</strong> o <strong>material POP</strong>?
                Explora nuestro <strong>catálogo completo</strong> con más de{" "}
                <strong>50 productos publicitarios</strong> para empresas en
                Valparaíso.
              </p>
              <Link
                href="/portfolio"
                className="eg-portfolio-view-all"
                aria-label="Ver catálogo completo de implementos publicitarios en Valparaíso"
                title="Catálogo completo de productos publicitarios - Elephant Group Valparaíso"
              >
                Explorar Catálogo Completo
                <svg
                  width="20"
                  height="20"
                  viewBox="0 0 24 24"
                  fill="none"
                  aria-hidden="true"
                >
                  <path
                    d="M7 17L17 7M17 7H7M17 7V17"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                </svg>
              </Link>
            </div>
          </div>
        </div>

        {/* Breadcrumb Schema.org */}
        <div
          itemScope
          itemType="https://schema.org/BreadcrumbList"
          style={{ display: "none" }}
        >
          <div
            itemProp="itemListElement"
            itemScope
            itemType="https://schema.org/ListItem"
          >
            <Link itemProp="item" href="/">
              <span itemProp="name">Inicio</span>
            </Link>
            <meta itemProp="position" content="1" />
          </div>
          <div
            itemProp="itemListElement"
            itemScope
            itemType="https://schema.org/ListItem"
          >
            <Link itemProp="item" href="/portfolio">
              <span itemProp="name">Portafolio</span>
            </Link>
            <meta itemProp="position" content="2" />
          </div>
        </div>
      </div>
    </section>
  );
}

export default Portfolio;
