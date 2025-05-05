import React from "react";
import Link from "next/link";

function ServicesTab({ lightMode }) {
  function openTab(event) {
    const elements = document.querySelectorAll(".tab-content");
    elements.forEach((element) => (element.style.display = "none"));
    const tabId = event?.currentTarget?.getAttribute("data-tab");
    if (tabId) {
      const tabElement = document.querySelector(`.tab-content#${tabId}`);
      if (tabElement) {
        tabElement.style.display = "block";
      }
    }
  }

  return (
    <section className="services-tab section-padding">
      <div className="container">
        <div className="row" id="tabs">
          <div className="col-lg-6 order2">
            <div className="serv-tab-cont mb-80">
              <div className="tab-content current" id="tabs-1">
                <div className="item">
                  <div className="img">
                    <img
                      src={`/${
                        lightMode ? "light" : "dark"
                      }/assets/imgs/works/casa_colibri_servicestab.webp`}
                      alt=""
                    />
                  </div>
                  <div className="cont sub-bg">
                    <div className="icon-img-100 mb-40">
                      <img
                        src={`/${
                          lightMode ? "light" : "dark"
                        }/assets/imgs/serv-icons/4.webp`}
                        alt=""
                      />
                    </div>
                    <h4>Corte CNC</h4>
                    <div className="text">
                      <p>
                        Nuestro CNC es una herramienta poderosa y precisa, ideal
                        para la creación de letreros y una variedad de otros
                        productos cortados en materiales como trovicel,
                        acrílicos, madera y aluminio compuesto.
                      </p>
                    </div>
                    <Link
                      href={`/${lightMode ? "light" : "dark"}/page-services`}
                      className="mt-30"
                    >
                      <span className="mr-15">Saber mas</span>
                      <i className="fas fa-long-arrow-alt-right"></i>
                    </Link>
                  </div>
                </div>
              </div>
              <div className="tab-content" id="tabs-2">
                <div className="item">
                  <div className="img">
                    <img
                      src={`/${
                        lightMode ? "light" : "dark"
                      }/assets/imgs/works/diseno_servicestab.webp`}
                      alt=""
                    />
                  </div>
                  <div className="cont sub-bg">
                    <div className="icon-img-100 mb-40">
                      <img
                        src={`/${
                          lightMode ? "light" : "dark"
                        }/assets/imgs/serv-icons/1.webp`}
                        alt=""
                      />
                    </div>
                    <h4>Diseño</h4>
                    <div className="text">
                      <p>
                        Creamos diseños únicos y personalizados para tu
                        empresa, adaptándonos a tus necesidades y objetivos. Nos
                        aseguramos de que cada diseño sea atractivo y
                        funcional, ayudando a tu marca a destacar en el mercado.
                      </p>
                    </div>
                    <Link
                      href={`/${lightMode ? "light" : "dark"}/page-services`}
                      className="mt-30"
                    >
                      <span className="mr-15">Saber mas</span>
                      <i className="fas fa-long-arrow-alt-right"></i>
                    </Link>
                  </div>
                </div>
              </div>
              <div className="tab-content" id="tabs-3">
                <div className="item">
                  <div className="img">
                    <img
                      src={`/${
                        lightMode ? "light" : "dark"
                      }/assets/imgs/works/impresion_servicestab.webp`}
                      alt=""
                    />
                  </div>
                  <div className="cont sub-bg">
                    <div className="icon-img-100 mb-40">
                      <img
                        src={`/${
                          lightMode ? "light" : "dark"
                        }/assets/imgs/serv-icons/2.webp`}
                        alt=""
                      />
                    </div>
                    <h4>Impresión</h4>
                    <div className="text">
                      <p>
                      Ofrecemos soluciones de impresión en diferentes formato, ideales para quienes buscan destacar con materiales visuales de alto impacto. Contamos con tecnología de vanguardia y maquinaria propia, lo que nos permite controlar cada detalle del proceso y asegurar resultados excepcionales.
                      </p>
                    </div>
                    <Link
                      href={`/${lightMode ? "light" : "dark"}/page-services`}
                      className="mt-30"
                    >
                      <span className="mr-15">Saber mas</span>
                      <i className="fas fa-long-arrow-alt-right"></i>
                    </Link>
                  </div>
                </div>
              </div>
              <div className="tab-content" id="tabs-4">
                <div className="item">
                  <div className="img">
                    <img
                      src={`/${
                        lightMode ? "light" : "dark"
                      }/assets/imgs/works/desarrollo_servicestab.webp`}
                      alt=""
                    />
                  </div>
                  <div className="cont sub-bg">
                    <div className="icon-img-100 mb-40">
                      <img
                        src={`/${
                          lightMode ? "light" : "dark"
                        }/assets/imgs/serv-icons/0.webp`}
                        alt=""
                      />
                    </div>
                    <h4>Desarrollo Web</h4>
                    <div className="text">
                      <p>
                        Creamos sitios web personalizados y optimizados para
                        SEO, adaptados a las necesidades de tu negocio. Nuestro
                        equipo de expertos se encarga de cada detalle, desde el
                        diseño hasta la implementación, asegurando una
                        experiencia de usuario excepcional.
                      </p>
                    </div>
                    <Link
                      href={`/${lightMode ? "light" : "dark"}/page-services`}
                      className="mt-30"
                    >
                      <span className="mr-15">Saber mas</span>
                      <i className="fas fa-long-arrow-alt-right"></i>
                    </Link>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div className="col-lg-5 offset-lg-1 valign order1">
            <div className="serv-tab-link tab-links full-width md-mb80">
              <div className="sec-lg-head mb-80">
                <h6 className="dot-titl-non mb-50">Servicios</h6>
                <p>
                  Conoce nuestros servicios y como podemos ayudarte a potenciar
                  tu negocio. Te asesoramos en cada paso del proceso, desde la
                  idea hasta la entrega final.
                </p>
              </div>
              <ul className="rest">
                <li
                  className="item-link mb-30"
                  data-tab="tabs-3"
                  onClick={openTab}
                >
                  <span>01</span> Impresión
                </li>
                <li
                  className="item-link current mb-30"
                  data-tab="tabs-1"
                  onClick={openTab}
                >
                  <span>02</span> Corte CNC
                </li>
                <li
                  className="item-link mb-30"
                  data-tab="tabs-2"
                  onClick={openTab}
                >
                  <span>03</span> Diseño
                </li>

                <li className="item-link" data-tab="tabs-4" onClick={openTab}>
                  <span>04</span> Desarrollo Web
                </li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

export default ServicesTab;
