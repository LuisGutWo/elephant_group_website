import React, { useEffect } from "react";
import Link from "next/link";
//= Scripts
import initIsotope from "@/common/initIsotope";
//= Assets
const catalogoPDF = `${process.env.PUBLIC_URL || ""}/catalogo_impresion.pdf`;
//= Data
import data from "@/data/Main/portfolioGalleryPage.json";

function GridPortfolioImages() {
  // Datos del portfolio cargados correctamente

  useEffect(() => {
    // Función para verificar si Isotope está disponible
    const checkIsotope = () => {
      return (
        typeof window !== "undefined" && typeof window.Isotope !== "undefined"
      );
    };

    // Función para inicializar Isotope
    const initializeIsotope = () => {
      // Dar tiempo para que el DOM esté completamente listo
      setTimeout(() => {
        initIsotope();
      }, 300);
    };

    // Verificar si Isotope ya está disponible
    if (checkIsotope()) {
      initializeIsotope();
      return;
    }

    // Si no está disponible, esperamos a que se cargue
    let attemptCount = 0;
    const maxAttempts = 50; // 10 segundos máximo (50 * 200ms)

    const checkIsotopeLoaded = setInterval(() => {
      attemptCount++;

      if (checkIsotope()) {
        clearInterval(checkIsotopeLoaded);
        initializeIsotope();
      } else if (attemptCount >= maxAttempts) {
        clearInterval(checkIsotopeLoaded);
        // Intentar cargar Isotope dinámicamente como respaldo
        loadIsotopeFallback();
      }
    }, 200);

    // Función de respaldo para cargar Isotope dinámicamente
    const loadIsotopeFallback = () => {
      if (typeof window !== "undefined" && !window.Isotope) {
        const script = document.createElement("script");
        script.src =
          "https://unpkg.com/isotope-layout@3/dist/isotope.pkgd.min.js";
        script.onload = () => {
          setTimeout(() => initIsotope(), 300);
        };
        document.head.appendChild(script);
      }
    };

    return () => {
      clearInterval(checkIsotopeLoaded);
    };
  }, []);

  return (
    <section className="portfolio section-padding pb-100">
      <div className="container-xxl">
        <div className="row">
          <div className="filtering col-12 mb-80 text-center">
            <div className="filter">
              <span className="text">Filtrar Por :</span>
              {data?.filters?.map((item, index) => (
                <span
                  data-filter={item?.filter}
                  className={index === 0 ? "active" : ""}
                  data-count={item?.count}
                  key={item?.id}
                >
                  {item?.title}
                </span>
              ))}
            </div>
          </div>
        </div>
        <div className="gallery metro text-center">
          <div className="row">
            {data?.gallery?.map((item) => (
              <div
                className={`col-lg-${item?.width} col-md-6 items ${item?.filter} info-overlay height-${item?.height} mb-30`}
                key={item?.id}
                data-category={item?.filter}
              >
                <div className="item-img o-hidden">
                  <Link href={catalogoPDF} className="imago wow">
                    <div className="inner wow">
                      <img
                        src={item?.image}
                        alt={`${item?.type} - ${item?.year}`}
                      />
                    </div>
                  </Link>
                  <div className="info">
                    <span className="sub-title tag">
                      <Link href={catalogoPDF} className="imago wow">
                        {item?.year} <br /> {item?.type}
                      </Link>
                    </span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

export default GridPortfolioImages;
