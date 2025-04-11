import React from "react";
import Link from "next/link";

function ServicesTab({ lightMode }) {
  function openTab(event) {
    document
      .querySelectorAll(".tab-content")
      .forEach((element) => (element.style.display = "none"));
    const tabId = event.currentTarget.getAttribute("data-tab");
    document.querySelector(`.tab-content#${tabId}`).style.display = "block";
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
                      }/assets/imgs/sass-img/serv/work-publicity-700x84.png`}
                      alt=""
                    />
                  </div>
                  <div className="cont sub-bg">
                    <div className="icon-img-100 mb-40">
                      <img
                        src={`/${
                          lightMode ? "light" : "dark"
                        }/assets/imgs/serv-icons/4.png`}
                        alt=""
                      />
                    </div>
                    <div className="text">
                      <p>
                        Asesoramos a particulares o empresas, que necesiten dar
                        forma y dirección a sus ideas, entregando el
                        conocimiento y las herramientas para iniciar o mejorar
                        la imagen comunicacional de su empresa o emprendimiento.
                      </p>
                    </div>
                    <Link href="/dark/page-services" className="mt-30">
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
                      }/assets/imgs/sass-img/serv/work-design-700x840.png`}
                      alt=""
                    />
                  </div>
                  <div className="cont sub-bg">
                    <div className="icon-img-100 mb-40">
                      <img
                        src={`/${
                          lightMode ? "light" : "dark"
                        }/assets/imgs/serv-icons/1.png`}
                        alt=""
                      />
                    </div>
                    <div className="text">
                      <p>
                        Creamos digitalmente todo lo que necesites para tu
                        empresa, ya sea para versión web o impresión. Somos
                        expertos en creación de imagen corporativa (logotipos),
                        páginas web, etiquetas de productos, ilustraciones,
                        gráficas para redes sociales.
                      </p>
                    </div>
                    <Link href="/dark/page-services" className="mt-30">
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
                      }/assets/imgs/sass-img/serv/work-print-700x840.png`}
                      alt=""
                    />
                  </div>
                  <div className="cont sub-bg">
                    <div className="icon-img-100 mb-40">
                      <img
                        src={`/${
                          lightMode ? "light" : "dark"
                        }/assets/imgs/serv-icons/2.png`}
                        alt=""
                      />
                    </div>
                    <div className="text">
                      <p>
                        En nuestra área de impresión y producción podemos
                        entregar un producto final de calidad y personalizado,
                        con nuestro asesoramiento podrá saber cual es la mejor
                        manera y cuál es el mejor material para ejecutar sus
                        proyectos. Contamos con los servicios de imprenta;
                        Digital y Offset; Gigantografías, pendones, papelería,
                        stickers, etiquetas de productos y más.
                      </p>
                    </div>
                    <Link href="/dark/page-services" className="mt-30">
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
                      }/assets/imgs/sass-img/serv/work-webdesign-700x840.png`}
                      alt=""
                    />
                  </div>
                  <div className="cont sub-bg">
                    <div className="icon-img-100 mb-40">
                      <img
                        src={`/${
                          lightMode ? "light" : "dark"
                        }/assets/imgs/serv-icons/0.png`}
                        alt=""
                      />
                    </div>
                    <div className="text">
                      <p>
                        Desarrollamos desde cero tu proyecto llevándolo a una
                        aplicación o pagina web dinámica, amigable con el
                        usuario y muy productiva para tu empresa. Respetamos las
                        reglas que exigen los motores de búsqueda hoy en dia, ayudando a su vez buen posicionamiento.{" "}
                      </p>
                    </div>
                    <Link href="/dark/page-services" className="mt-30">
                      <span className="mr-15">Saber mas</span>
                      <i className="fas fa-long-arrow-alt-right"></i>
                    </Link>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div className="col-lg-5 offset-lg-1 valign order1">
            <div className="serv-tab-link tab-links full-width md-mb50">
              <div className="sec-lg-head mb-80">
                <h6 className="dot-titl-non mb-15">Servicios</h6>
                <p>
                  Te ayudamos a estar actualizado e incrementar el éxito de tu
                  empresa, buscando un mejor diseño para tu producto digital.
                </p>
              </div>
              <ul className="rest">
                <li
                  className="item-link current mb-15"
                  data-tab="tabs-1"
                  onClick={openTab}
                >
                  <span>01</span> Router CNC
                </li>
                <li
                  className="item-link mb-15"
                  data-tab="tabs-2"
                  onClick={openTab}
                >
                  <span>02</span> Diseño
                </li>
                <li
                  className="item-link mb-15"
                  data-tab="tabs-3"
                  onClick={openTab}
                >
                  <span>03</span> Imprenta
                </li>
                <li className="item-link" data-tab="tabs-4" onClick={openTab}>
                  <span>04</span> Programación Web
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
