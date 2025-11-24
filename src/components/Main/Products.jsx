import React, { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import data from "@/data/Main/products.json";

function Products() {
  const [hoveredCard, setHoveredCard] = useState(null);

  if (!data || !Array.isArray(data) || data.length === 0) {
    throw new Error("data is not defined or is empty");
  }

  // Datos enriquecidos con keywords SEO
  const enrichedData = data.map((item) => ({
    ...item,
    keywords: `${item.title.toLowerCase()}, implementos publicitarios valparaíso`,
    brand: "Elephant Group",
    availability: "https://schema.org/InStock",
    priceRange: item.id <= 3 ? "$15.000 - $45.000" : "$5.000 - $25.000",
  }));

  try {
    return (
      <section
        className="modern-products-section section-padding main-bg"
        itemScope
        itemType="https://schema.org/ItemList"
        aria-label="Productos publicitarios destacados"
      >
        <div className="container ontop">
          {/* Header optimizado SEO */}
          <div className="row d-flex justify-content-center">
            <div className="col-lg-8 text-center">
              <div className="modern-section-head mb-80">
                <p className="products-eyebrow">Bestsellers 2025</p>
                <h2 className="modern-title" itemProp="name">
                  Productos <span className="accent-text">Publicitarios</span>{" "}
                  Más Vendidos
                </h2>
                <p className="modern-subtitle" itemProp="description">
                  <strong>Tótems</strong>, <strong>pendones roller</strong>,{" "}
                  <strong>señalética personalizada</strong> y{" "}
                  <strong>stickers</strong> en Valparaíso. Los productos más
                  solicitados por empresas para promoción y branding efectivo.
                </p>
                <meta
                  itemProp="numberOfItems"
                  content={String(enrichedData.length)}
                />
              </div>
            </div>
          </div>

          {/* Grid de productos optimizado */}
          <div className="modern-products-grid">
            {enrichedData.map((item, idx) => (
              <div
                key={item.id}
                className={`modern-product-card ${
                  hoveredCard === idx ? "hovered" : ""
                }`}
                onMouseEnter={() => setHoveredCard(idx)}
                onMouseLeave={() => setHoveredCard(null)}
                itemProp="itemListElement"
                itemScope
                itemType="https://schema.org/Product"
              >
                {/* Badge con número */}
                <div
                  className="product-badge"
                  aria-label={`Producto número ${item.number}`}
                >
                  {item.number}
                </div>

                {/* Imagen con overlay */}
                <div className="product-image-container">
                  <Image
                    src={item.image}
                    alt={`${item.title} ${
                      item.subtitle ? "- " + item.subtitle : ""
                    } | Elephant Group Valparaíso`}
                    width={400}
                    height={300}
                    className="product-image"
                    itemProp="image"
                    style={{
                      objectFit: "cover",
                      width: "100%",
                      height: "100%",
                    }}
                  />
                  <div className="image-overlay"></div>
                </div>

                {/* Contenido con Schema.org */}
                <div className="product-content">
                  <div className="product-info">
                    <h3 className="product-title" itemProp="name">
                      {item.title}
                    </h3>
                    {item.subtitle && (
                      <p className="product-subtitle" itemProp="description">
                        {item.subtitle}
                      </p>
                    )}
                  </div>

                  {/* Meta datos SEO ocultos */}
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
                      itemType="https://schema.org/Offer"
                    >
                      <span itemProp="priceCurrency" content="CLP">
                        CLP
                      </span>
                      <span
                        itemProp="price"
                        content={item.priceRange.match(/\d+/)?.[0]}
                      >
                        {item.priceRange}
                      </span>
                      <link itemProp="availability" href={item.availability} />
                    </div>
                    <meta itemProp="sku" content={`EG-PROD-${item.id}`} />
                    <meta
                      itemProp="category"
                      content="Implementos Publicitarios"
                    />
                    <meta itemProp="keywords" content={item.keywords} />
                  </div>

                  {/* Botones de acción optimizados */}
                  <div className="product-actions">
                    <Link
                      href="/quote"
                      className="btn-primary-modern"
                      aria-label={`Solicitar cotización de ${item.title}`}
                      title={`Cotizar ${item.title} - ${item.priceRange}`}
                    >
                      <span>COTIZAR</span>
                      <svg
                        className="btn-icon"
                        width="16"
                        height="16"
                        viewBox="0 0 24 24"
                        fill="none"
                        aria-hidden="true"
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
                      href="/portfolio"
                      className="btn-secondary-modern"
                      aria-label={`Ver más productos similares a ${item.title}`}
                      title="Ver catálogo completo de productos"
                    >
                      <span>VER MÁS</span>
                    </Link>
                  </div>
                </div>

                {/* Efecto de brillo */}
                <div className="shine-effect"></div>
              </div>
            ))}
          </div>

          {/* Call to action optimizado */}
          <div className="row mt-80">
            <div className="col-12 text-center">
              <div className="modern-cta">
                <p className="cta-text">
                  ¿Necesitas <strong>gigantografías</strong>,{" "}
                  <strong>lienzos</strong> o{" "}
                  <strong>displays personalizados</strong>?
                </p>
                <Link
                  href="/quote"
                  className="btn-cta-modern"
                  aria-label="Solicitar cotización personalizada de productos publicitarios"
                  title="Cotización gratuita en 24 horas - Elephant Group Valparaíso"
                >
                  <span>Solicitar Cotización Gratuita</span>
                  <div className="btn-glow"></div>
                </Link>
                <p className="cta-helper-text">
                  Respuesta en <strong>24 horas</strong> • Envío a toda la{" "}
                  <strong>Región de Valparaíso</strong>
                </p>
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

export default Products;
