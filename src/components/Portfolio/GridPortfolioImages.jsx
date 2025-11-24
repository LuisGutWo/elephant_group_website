import React, { useState, useEffect } from "react";
import Link from "next/link";
import data from "@/data/Main/portfolioGalleryPage.json";

function GridPortfolioImages() {
  const [activeFilter, setActiveFilter] = useState("*");
  const [filteredItems, setFilteredItems] = useState(data?.gallery || []);
  const [isLoaded, setIsLoaded] = useState(false);
  const [showModal, setShowModal] = useState(false);
  const [selectedProject, setSelectedProject] = useState(null);

  const catalogoPDF = "/catalogo_impresion.pdf";

  // Función para abrir modal
  const handleImageClick = (item) => {
    setSelectedProject(item);
    setShowModal(true);
    // Prevenir scroll del body cuando el modal está abierto
    document.body.style.overflow = "hidden";
    // Remover sticky del navbar
    const navbar = document.querySelector(".navbar");
    if (navbar) {
      navbar.style.position = "relative";
    }
  };

  // Función para cerrar modal
  const handleCloseModal = () => {
    setShowModal(false);
    setSelectedProject(null);
    document.body.style.overflow = "auto";
    // Restaurar sticky del navbar
    const navbar = document.querySelector(".navbar");
    if (navbar) {
      navbar.style.position = "";
    }
  };

  // Función para filtrar items
  const filterItems = (filterValue) => {
    setActiveFilter(filterValue);

    if (filterValue === "*") {
      setFilteredItems(data?.gallery || []);
    } else {
      const filtered = data?.gallery?.filter((item) =>
        item.filter.includes(filterValue.replace(".", ""))
      );
      setFilteredItems(filtered);
    }
  };

  // Helper para obtener altura en px
  const getItemHeight = (height) => {
    const heights = {
      1: "280px",
      2: "380px",
      3: "480px",
      6: "680px",
    };
    return heights[height] || "380px";
  };

  useEffect(() => {
    // Animación de carga inicial
    setTimeout(() => {
      setIsLoaded(true);
    }, 100);
  }, []);

  return (
    <section
      className="portfolio-gallery-section"
      itemScope
      itemType="https://schema.org/ImageGallery"
      aria-label="Galería de proyectos publicitarios"
    >
      {/* Filtros de categoría */}
      <div className="filter-bar">
        <div className="container-filter">
          <nav
            className="filter-buttons"
            role="navigation"
            aria-label="Filtros de categoría"
          >
            {data?.filters?.map((item, index) => (
              <button
                key={item?.id}
                onClick={() => filterItems(item?.filter)}
                className={`filter-btn ${
                  activeFilter === item?.filter ? "active" : ""
                }`}
                aria-label={`Filtrar por ${item?.title}`}
                aria-pressed={activeFilter === item?.filter}
              >
                {item?.title}
                {item?.count && <span className="count">{item?.count}</span>}
              </button>
            ))}
          </nav>
        </div>
      </div>

      {/* Grid de imágenes */}
      <div className="gallery-container">
        <div className={`masonry-grid ${isLoaded ? "loaded" : ""}`}>
          {filteredItems.length > 0 ? (
            filteredItems.map((item, idx) => (
              <div
                key={item?.id}
                className="gallery-item"
                style={{
                  animationDelay: `${idx * 0.1}s`,
                }}
                itemProp="image"
                itemScope
                itemType="https://schema.org/ImageObject"
              >
                {/* Imagen Clickeable */}
                <button
                  className="item-image-wrapper"
                  onClick={() => handleImageClick(item)}
                  aria-label={`Ver opciones para ${item?.type} ${item?.year}`}
                  type="button"
                >
                  <img
                    src={item?.image}
                    alt={`${item?.type} ${item?.year} - Proyecto publicitario Elephant Group Valparaíso y Viña del Mar`}
                    className="item-image"
                    itemProp="contentUrl"
                    loading="lazy"
                  />

                  {/* Schema.org metadata */}
                  <meta
                    itemProp="name"
                    content={`${item?.type} ${item?.year}`}
                  />
                  <meta
                    itemProp="description"
                    content={`Proyecto de ${item?.type} realizado en ${item?.year} por Elephant Group en la Región de Valparaíso`}
                  />
                  <meta
                    itemProp="datePublished"
                    content={`${item?.year}-01-01`}
                  />
                  <meta itemProp="creator" content="Elephant Group" />
                  <meta itemProp="copyrightHolder" content="Elephant Group" />

                  {/* Badge con info del proyecto */}
                  <div className="project-badge">
                    <span className="badge-type">{item?.type}</span>
                    <span className="badge-year">{item?.year}</span>
                  </div>

                  {/* Overlay con icono de click */}
                  <div className="click-overlay">
                    <div className="click-icon">
                      <svg
                        viewBox="0 0 24 24"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="2"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      >
                        <circle cx="12" cy="12" r="10" />
                        <path d="M12 8v8M8 12h8" />
                      </svg>
                      <span className="click-text">Ver Opciones</span>
                    </div>
                  </div>
                </button>
              </div>
            ))
          ) : (
            <div className="no-results">
              <p>No se encontraron proyectos en esta categoría.</p>
            </div>
          )}
        </div>
      </div>

      {/* Modal de Acciones */}
      {showModal && selectedProject && (
        <div
          className="modal-backdrop"
          onClick={handleCloseModal}
          role="dialog"
          aria-modal="true"
          aria-labelledby="modal-title"
        >
          <div className="modal-content" onClick={(e) => e.stopPropagation()}>
            {/* Header del Modal */}
            <div className="modal-header">
              <div className="modal-title-section">
                <h2 id="modal-title" className="modal-title">
                  {selectedProject.type}
                </h2>
                <span className="modal-year">{selectedProject.year}</span>
              </div>
              <button
                className="modal-close"
                onClick={handleCloseModal}
                aria-label="Cerrar modal"
                type="button"
              >
                <svg
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                >
                  <line x1="18" y1="6" x2="6" y2="18" />
                  <line x1="6" y1="6" x2="18" y2="18" />
                </svg>
              </button>
            </div>

            {/* Imagen Preview */}
            <div className="modal-image-preview">
              <img
                src={selectedProject.image}
                alt={`${selectedProject.type} ${selectedProject.year}`}
                className="modal-preview-img"
              />
            </div>

            {/* Descripción */}
            <div className="modal-description">
              <p>
                Proyecto de {selectedProject.type} realizado en{" "}
                {selectedProject.year} por Elephant Group en la Región de
                Valparaíso.
              </p>
            </div>

            {/* Botones de Acción */}
            <div className="modal-actions">
              <Link
                href={catalogoPDF}
                className="modal-btn modal-btn-catalog"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="Ver catálogo en PDF"
              >
                Ver Catálogo PDF
              </Link>

              <Link
                href="/quote"
                className="modal-btn modal-btn-quote"
                aria-label="Solicitar presupuesto"
              >
                Solicitar Presupuesto
              </Link>
            </div>
          </div>
        </div>
      )}

      {/* Estilos con styled-jsx */}
      <style jsx>{`
        /* ============================================
           VARIABLES Y CONFIGURACIÓN BASE
           ============================================ */
        .portfolio-gallery-section {
          --color-bg: #2a2a2a;
          --color-bg-dark: #242424;
          --color-primary: #fca311;
          --color-primary-alt: #ff9500;
          --color-white: #ffffff;
          --color-black: #000000;
          --spacing-base: 30px;
          --border-radius: 16px;
          --transition-base: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
          --transition-smooth: all 0.4s cubic-bezier(0.4, 0, 0.2, 1);
          --shadow-sm: 0 2px 8px rgba(0, 0, 0, 0.3);
          --shadow-md: 0 4px 15px;
          --shadow-lg: 0 6px 20px;
          --blur-glass: blur(15px);
        }

        /* ============================================
           SECCIÓN PRINCIPAL
           ============================================ */
        .portfolio-gallery-section {
          padding: 120px 0 100px;
          background: var(--color-bg);
          position: relative;
          overflow: hidden;
        }

        /* ============================================
           BARRA DE FILTROS
           ============================================ */
        .filter-bar {
          padding: 30px 20px 60px;
          margin-bottom: 40px;
          background: var(--color-bg);
          position: sticky;
          top: 0;
          z-index: 100;
        }

        .container-filter {
          max-width: 1400px;
          margin: 0 auto;
          padding: 0 20px;
        }

        .filter-buttons {
          display: flex;
          justify-content: center;
          align-items: center;
          gap: 12px;
          flex-wrap: wrap;
        }

        .filter-btn {
          background: rgba(255, 255, 255, 0.05);
          color: rgba(255, 255, 255, 0.7);
          border: 1px solid rgba(255, 255, 255, 0.1);
          padding: 12px 28px;
          border-radius: 50px;
          font-size: 14px;
          font-weight: 300;
          letter-spacing: 0.5px;
          cursor: pointer;
          transition: var(--transition-smooth);
          display: inline-flex;
          align-items: center;
          gap: 8px;
          outline: none;
          position: relative;
          overflow: hidden;
        }

        .filter-btn::before {
          content: "";
          position: absolute;
          top: 0;
          left: 0;
          width: 0;
          height: 100%;
          background: linear-gradient(
            90deg,
            var(--color-primary) 0%,
            var(--color-primary-alt) 100%
          );
          transition: width 0.4s cubic-bezier(0.4, 0, 0.2, 1);
          z-index: -1;
        }

        .filter-btn:hover {
          color: var(--color-white);
          border-color: var(--color-primary);
          transform: translateY(-2px);
          box-shadow: 0 8px 20px rgba(252, 163, 17, 0.2);
        }

        .filter-btn:hover::before {
          width: 100%;
        }

        .filter-btn.active {
          background: linear-gradient(
            135deg,
            var(--color-primary) 0%,
            var(--color-primary-alt) 100%
          );
          color: var(--color-black);
          border-color: var(--color-primary);
          font-weight: 400;
          box-shadow: var(--shadow-md) rgba(252, 163, 17, 0.4);
        }

        .filter-btn.active::before {
          display: none;
        }

        .filter-btn .count {
          background: rgba(0, 0, 0, 0.2);
          padding: 2px 8px;
          border-radius: 12px;
          font-size: 12px;
          font-weight: 500;
        }

        /* ============================================
           CONTENEDOR Y GRID MASONRY
           ============================================ */
        .gallery-container {
          max-width: 1600px;
          margin: 0 auto;
          padding: 0 20px;
        }

        .masonry-grid {
          column-count: 3;
          column-gap: var(--spacing-base);
        }

        .masonry-grid.loaded .gallery-item {
          opacity: 1;
          transform: translateY(0);
        }

        /* ============================================
           ITEMS DE GALERÍA
           ============================================ */
        .gallery-item {
          position: relative;
          border-radius: var(--border-radius);
          overflow: visible;
          opacity: 0;
          transform: translateY(30px);
          animation: fadeInUp 0.8s cubic-bezier(0.4, 0, 0.2, 1) forwards;
          transition: var(--transition-base);
          break-inside: avoid;
          margin-bottom: var(--spacing-base);
          display: inline-block;
          width: 100%;
        }

        .gallery-item:hover {
          transform: translateY(-8px);
          z-index: 10;
        }

        .item-image-wrapper {
          position: relative;
          width: 100%;
          height: 100%;
          background: var(--color-bg-dark);
          border-radius: var(--border-radius);
          overflow: hidden;
          border: none;
          padding: 0;
          cursor: pointer;
          display: block;
        }

        .item-image {
          width: 100%;
          height: 100%;
          object-fit: cover;
          display: block;
          transition: transform 0.6s cubic-bezier(0.4, 0, 0.2, 1);
          position: relative;
          z-index: 1;
          border-radius: var(--border-radius);
        }

        .gallery-item:hover .item-image {
          transform: scale(1.1);
          filter: brightness(0.8);
        }

        /* ============================================
           OVERLAY DE CLICK
           ============================================ */
        .click-overlay {
          position: absolute;
          top: 0;
          left: 0;
          width: 100%;
          height: 100%;
          background: rgba(0, 0, 0, 0);
          display: flex;
          align-items: center;
          justify-content: center;
          opacity: 0;
          transition: all 0.4s cubic-bezier(0.4, 0, 0.2, 1);
          z-index: 2;
          pointer-events: none;
        }

        .gallery-item:hover .click-overlay {
          background: rgba(0, 0, 0, 0.6);
          opacity: 1;
        }

        .click-icon {
          display: flex;
          flex-direction: column;
          align-items: center;
          gap: 12px;
          transform: translateY(20px);
          transition: transform 0.4s cubic-bezier(0.4, 0, 0.2, 1);
        }

        .gallery-item:hover .click-icon {
          transform: translateY(0);
        }

        .click-icon svg {
          width: 36px;
          height: 36px;
          stroke: var(--color-white);
          stroke-width: 2.5;
          filter: drop-shadow(0 4px 12px rgba(252, 163, 17, 0.6));
        }

        .click-text {
          color: var(--color-white);
          font-size: 16px;
          font-weight: 600;
          letter-spacing: 0.5px;
          text-shadow: 0 2px 8px rgba(0, 0, 0, 0.8);
        }

        /* ============================================
           BADGES (Reutilizable)
           ============================================ */
        .project-badge {
          position: absolute;
          top: 15px;
          right: 15px;
          display: flex;
          flex-direction: column;
          gap: 8px;
          z-index: 3;
          align-items: flex-end;
        }

        .badge-type,
        .badge-year {
          backdrop-filter: blur(10px);
          -webkit-backdrop-filter: blur(10px);
          border-radius: 8px;
          font-weight: 600;
          letter-spacing: 0.3px;
          border: 1px solid rgba(255, 255, 255, 0.2);
          transition: var(--transition-base);
        }

        .badge-type {
          background: rgba(252, 163, 17, 0.95);
          color: var(--color-black);
          padding: 8px 14px;
          font-size: 13px;
          box-shadow: var(--shadow-md) rgba(252, 163, 17, 0.4), var(--shadow-sm);
        }

        .badge-year {
          background: rgba(255, 255, 255, 0.95);
          color: var(--color-black);
          padding: 6px 12px;
          font-size: 11px;
          border-radius: 6px;
          letter-spacing: 0.5px;
          box-shadow: var(--shadow-md) rgba(255, 255, 255, 0.3),
            var(--shadow-sm);
        }

        .gallery-item:hover .badge-type {
          background: var(--color-primary);
          transform: translateX(-5px);
          box-shadow: var(--shadow-lg) rgba(252, 163, 17, 0.6),
            0 4px 12px rgba(0, 0, 0, 0.4);
        }

        .gallery-item:hover .badge-year {
          background: var(--color-white);
          transform: translateX(-5px);
          box-shadow: var(--shadow-lg) rgba(255, 255, 255, 0.5),
            0 4px 12px rgba(0, 0, 0, 0.4);
        }

        /* ============================================
           MODAL
           ============================================ */
        .modal-backdrop {
          position: fixed;
          top: 0;
          left: 0;
          width: 100%;
          height: 100%;
          background: rgba(0, 0, 0, 0.75);
          backdrop-filter: blur(10px);
          -webkit-backdrop-filter: blur(10px);
          z-index: 10000;
          display: flex;
          align-items: center;
          justify-content: center;
          padding: 20px;
          animation: fadeIn 0.3s ease;
        }

        .modal-content {
          background: #1e1e1e;
          border-radius: 20px;
          max-width: 520px;
          width: 100%;
          max-height: fit-content;
          display: flex;
          flex-direction: column;
          box-shadow: 0 25px 70px rgba(0, 0, 0, 0.8),
            0 0 0 2px rgba(252, 163, 17, 0.6);
          animation: slideUp 0.4s cubic-bezier(0.4, 0, 0.2, 1);
          overflow: hidden;
        }

        .modal-header {
          display: flex;
          justify-content: space-between;
          align-items: flex-start;
          padding: 20px;
          border-bottom: 2px solid rgba(252, 163, 17, 0.3);
          background: #2a2a2a;
          border-radius: 20px 20px 0 0;
        }

        .modal-title-section {
          flex: 1;
        }

        .modal-title {
          font-size: 24px;
          font-weight: 700;
          color: #ffffff;
          margin: 0 0 10px 0;
          line-height: 1.3;
          text-shadow: 0 2px 4px rgba(0, 0, 0, 0.3);
        }

        .modal-year {
          display: inline-block;
          background: linear-gradient(135deg, #fca311 0%, #ff9500 100%);
          color: #000000;
          padding: 6px 14px;
          border-radius: 8px;
          font-size: 14px;
          font-weight: 700;
          letter-spacing: 0.5px;
          box-shadow: 0 2px 8px rgba(252, 163, 17, 0.4);
        }

        .modal-close {
          width: 40px;
          height: 40px;
          display: flex;
          align-items: center;
          justify-content: center;
          background: rgba(255, 255, 255, 0.05);
          border: 1px solid rgba(255, 255, 255, 0.1);
          border-radius: 50%;
          cursor: pointer;
          transition: var(--transition-base);
          padding: 0;
          margin-left: 20px;
        }

        .modal-close:hover {
          background: rgba(255, 255, 255, 0.1);
          border-color: var(--color-primary);
          transform: rotate(90deg);
        }

        .modal-close svg {
          width: 20px;
          height: 20px;
          stroke: var(--color-white);
        }

        .modal-image-preview {
          padding: 20px;
          display: flex;
          justify-content: center;
          align-items: center;
          background: #242424;
        }

        .modal-preview-img {
          width: 100%;
          height: auto;
          border-radius: 14px;
          box-shadow: 0 8px 30px rgba(0, 0, 0, 0.4);
          max-height: 220px;
          object-fit: cover;
        }

        .modal-description {
          padding: 18px 20px;
          background: #2a2a2a;
          color: #ffffff;
          font-size: 14px;
          line-height: 1.6;
          text-align: center;
          font-weight: 500;
          border-top: 1px solid rgba(255, 255, 255, 0.1);
          border-bottom: 1px solid rgba(255, 255, 255, 0.1);
        }

        .modal-description p {
          margin: 0;
          color: #ffffff;
          opacity: 1;
        }

        .modal-actions {
          display: flex;
          gap: 12px;
          padding: 20px;
          background: #1e1e1e;
          border-radius: 0 0 20px 20px;
        }

        :global(.modal-btn) {
          flex: 1;
          display: block;
          text-align: center;
          padding: 14px 20px;
          border-radius: 8px;
          font-size: 13px;
          font-weight: 800;
          text-decoration: none;
          transition: all 0.3s ease;
          cursor: pointer;
          letter-spacing: 0.5px;
          text-transform: uppercase;
          line-height: 1;
        }

        :global(.modal-btn-catalog) {
          background: #ffffff;
          color: #000000;
          border: 2px solid #ffffff;
        }

        :global(.modal-btn-catalog:hover) {
          background: #fca311;
          color: #000000;
          border-color: #fca311;
          transform: translateY(-2px);
        }

        :global(.modal-btn-quote) {
          background: transparent;
          color: #fca311;
          border: 2px solid #fca311;
        }

        :global(.modal-btn-quote:hover) {
          background: #fca311;
          color: #000000;
          border-color: #fca311;
          transform: translateY(-2px);
        }

        /* ============================================
           SIN RESULTADOS
           ============================================ */
        .no-results {
          grid-column: 1 / -1;
          text-align: center;
          padding: 80px 20px;
          color: rgba(255, 255, 255, 0.5);
          font-size: 16px;
          font-weight: 300;
        }

        /* ============================================
           ANIMACIONES
           ============================================ */
        @keyframes fadeInUp {
          from {
            opacity: 0;
            transform: translateY(30px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }

        @keyframes fadeIn {
          from {
            opacity: 0;
          }
          to {
            opacity: 1;
          }
        }

        @keyframes slideUp {
          from {
            opacity: 0;
            transform: translateY(40px) scale(0.95);
          }
          to {
            opacity: 1;
            transform: translateY(0) scale(1);
          }
        }

        /* ============================================
           RESPONSIVE: TABLET (768px - 991px)
           ============================================ */
        @media (max-width: 991px) {
          .portfolio-gallery-section {
            padding: 60px 0 80px;
          }

          .filter-bar {
            padding: 20px 15px 40px;
            margin-bottom: 30px;
          }

          .filter-btn {
            padding: 10px 20px;
            font-size: 13px;
          }

          .masonry-grid {
            column-count: 2;
            column-gap: 20px;
          }

          .gallery-item {
            margin-bottom: 20px;
          }

          .btn-icon-action {
            width: 42px;
            height: 42px;
          }

          .btn-icon-action svg {
            width: 18px;
            height: 18px;
          }
        }

        /* ============================================
           RESPONSIVE: MOBILE (< 768px)
           ============================================ */
        @media (max-width: 767px) {
          .portfolio-gallery-section {
            padding: 40px 0 60px;
          }

          .filter-bar {
            padding: 15px 10px 30px;
            margin-bottom: 20px;
          }

          .filter-buttons {
            gap: 8px;
          }

          .filter-btn {
            padding: 8px 16px;
            font-size: 12px;
          }

          .filter-btn .count {
            display: none;
          }

          .gallery-container {
            padding: 0 15px;
          }

          .masonry-grid {
            column-count: 1;
            column-gap: 0;
          }

          .gallery-item {
            margin-bottom: 20px;
          }

          .badge-type {
            font-size: 11px;
            padding: 6px 10px;
          }

          .badge-year {
            font-size: 10px;
            padding: 4px 8px;
          }

          .click-icon svg {
            width: 32px;
            height: 32px;
          }

          .click-text {
            font-size: 13px;
          }

          .modal-content {
            max-width: 95%;
            border-radius: 16px;
          }

          .modal-header {
            padding: 20px;
          }

          .modal-title {
            font-size: 20px;
          }

          .modal-year {
            font-size: 12px;
            padding: 5px 12px;
          }

          .modal-close {
            width: 36px;
            height: 36px;
            margin-left: 10px;
          }

          .modal-image-preview {
            padding: 20px;
          }

          .modal-preview-img {
            max-height: 200px;
          }

          .modal-description {
            padding: 0 20px 20px;
            font-size: 14px;
            color: rgba(255, 255, 255, 0.95);
          }

          .modal-actions {
            flex-direction: column;
            padding: 0 20px 20px;
            gap: 10px;
          }

          .modal-btn {
            padding: 13px 18px;
            font-size: 13px;
          }

          .modal-btn svg {
            width: 14px;
            height: 14px;
          }

          .no-results {
            padding: 60px 15px;
            font-size: 14px;
          }
        }

        /* ============================================
           RESPONSIVE: LARGE SCREENS (> 1400px)
           ============================================ */
        @media (min-width: 1400px) {
          .masonry-grid {
            column-count: 4;
            column-gap: 35px;
          }

          .gallery-item {
            margin-bottom: 35px;
          }

          .filter-btn {
            padding: 14px 32px;
            font-size: 15px;
          }

          .click-icon svg {
            width: 42px;
            height: 42px;
          }

          .click-text {
            font-size: 17px;
          }

          .modal-content {
            max-width: 600px;
          }

          .modal-title {
            font-size: 26px;
          }

          .modal-preview-img {
            max-height: 320px;
          }

          .modal-btn {
            padding: 15px 22px;
            font-size: 15px;
          }

          .modal-btn svg {
            width: 17px;
            height: 17px;
          }
        }
      `}</style>
    </section>
  );
}

export default GridPortfolioImages;
