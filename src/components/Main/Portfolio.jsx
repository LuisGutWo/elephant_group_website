import React from "react";
import Link from "next/link";

// Datos de productos optimizados
const portfolioData = [
  {
    id: 1,
    title: "LETREROS",
    subtitle: "publicitarios y corporativos",
    description:
      "Diseños personalizados en materiales como trovicel, acrílico y aluminio compuesto.",
    image: "/light/assets/imgs/works/corte_el_brioche.webp",
    category: "Letreros",
  },
  {
    id: 2,
    title: "SEÑALÉTICAS",
    subtitle: "industriales",
    description: "Soluciones claras y duraderas para interiores y exteriores.",
    image: "/light/assets/imgs/works/letrero_covisa.webp",
    category: "señaléticas",
  },
  {
    id: 3,
    title: "ADHESIVOS",
    subtitle: "personalizados",
    description:
      "Desde etiquetas hasta gráficos para vidrieras ideales para tu marca.",
    image: "/light/assets/imgs/works/Adhesivos-Personalizarme.webp",
    category: "adhesivos",
  },
];

function Portfolio() {
  const handleImageClick = (imageUrl) => {
    window.open(imageUrl, "_blank");
  };

  return (
    <section className="eg-portfolio section-padding sub-bg">
      <div className="container">
        {/* Header Section */}
        <div className="eg-portfolio-header">
          <div className="row justify-content-center">
            <div className="col-lg-8 text-center">
              <h2 className="eg-portfolio-title">NUESTROS PRODUCTOS</h2>
              <p className="eg-portfolio-description">
                Soluciones integrales de diseño y fabricación para impulsar tu
                marca
              </p>
            </div>
          </div>
        </div>

        {/* Portfolio Grid */}
        <div className="eg-portfolio-grid">
          <div className="row justify-content-center g-4">
            {portfolioData.map((item, index) => (
              <div key={item.id} className="col-lg-4 col-md-6">
                <div className="eg-portfolio-card">
                  <div className="eg-portfolio-image">
                    <img
                      src={item.image}
                      alt={`Elephant Group - ${item.title}`}
                      loading="lazy"
                      onClick={() => handleImageClick(item.image)}
                    />
                    <div className="eg-portfolio-overlay">
                      <div className="eg-portfolio-category">
                        {item.category}
                      </div>
                    </div>
                  </div>

                  <div className="eg-portfolio-content">
                    <div className="eg-portfolio-header-badge">
                      <h3 className="eg-portfolio-card-title">{item.title}</h3>
                      <span className="eg-portfolio-card-subtitle">
                        {item.subtitle}
                      </span>
                    </div>

                    <p className="eg-portfolio-card-description">
                      {item.description}
                    </p>

                    <div className="eg-portfolio-actions">
                      <Link
                        href="/light/page-portfolio"
                        className="eg-portfolio-btn"
                      >
                        Ver Detalles
                        <svg
                          width="16"
                          height="16"
                          viewBox="0 0 24 24"
                          fill="none"
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
              </div>
            ))}
          </div>
        </div>

        {/* Call to Action */}
        <div className="eg-portfolio-cta">
          <div className="row justify-content-center">
            <div className="col-lg-8 text-center">
              <Link
                href="/light/page-portfolio"
                className="eg-portfolio-view-all"
              >
                Ver Todo el Portafolio
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none">
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
      </div>
    </section>
  );
}

export default Portfolio;
