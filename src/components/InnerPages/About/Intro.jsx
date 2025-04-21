import React from "react";

function Intro() {
  function openAccordion(event) {
    document.querySelectorAll(".accordion-info").forEach((element) => {
      element.classList.remove("active");
      element.style.maxHeight = 0;
      element.parentElement.classList.remove("active");
    });
    event.currentTarget.parentElement.classList.add("active");
    event.currentTarget.nextElementSibling.style.maxHeight = "300px";
    event.currentTarget.nextElementSibling.classList.add("active");
  }

  return (
    <section className="intro-corp section-padding pt-0">
      <div className="container">
        <div className="row justify-content-around">
          <div className="col-lg-5 valign md-mb50">
            <div className="imgs mb-80">
              <div className="img1 wow fadeInUp">
                <img
                  src="/dark/assets/imgs/about/elephant-blackbg-700x840.png"
                  alt="Elephant Group fondo negro 700x840"
                  className="radius-10"
                />
              </div>
              <div className="img2 wow fadeInLeft">
                <img
                  src="/light/assets/imgs/header/banner_impresion.png"
                  alt="Elephant Group etiquetas 700x840"
                  className="radius-10"
                />
              </div>
            </div>
          </div>
          <div className="col-lg-5 valign">
            <div className="cont">
              <div className="text">
                <h2 className="d-slideup wow">
                  <span className="sideup-text">
                    <span className="up-text">Descubre el proceso</span>
                  </span>
                  <span className="sideup-text">
                    <span className="up-text">detrás de nuestra empresa.</span>
                  </span>
                  <span className="sideup-text">
                    <span className="up-text">Elephant Group.</span>
                  </span>
                </h2>
              </div>
              <div className="accordion bord mt-40">
                <div className="item mb-15 wow fadeInUp" data-wow-delay=".1s">
                  <div className="title" onClick={openAccordion}>
                    <h6 className="fz-18">Router CNC</h6>
                    <span className="ico"></span>
                  </div>
                  <div className="accordion-info">
                    <p className="fz-14">
                      Ofrecemos servicio de corte y grabado en 2D, así como
                      mecanizado en 3D. Nuestra cama de corte tiene dimensiones
                      de 2000 x 3000 mm. Trabajamos con todo tipo de maderas,
                      naturales o procesadas, además de una amplia variedad de
                      materiales como plásticos de ingeniería, acrílicos,
                      aluminio compuesto, HPL, poliestireno expandido, espumas,
                      entre otros.
                    </p>
                  </div>
                </div>
                <div className="item mb-15 wow fadeInUp" data-wow-delay=".3s">
                  <div className="title" onClick={openAccordion}>
                    <h6 className="fz-18">Diseño</h6>
                    <span className="ico"></span>
                  </div>
                  <div className="accordion-info">
                    <p className="fz-14">
                      Diseñamos digitalmente todo lo que necesites para tu
                      empresa, ya sea para web o impresión. Somos expertos en
                      creación de imagen corporativa (logotipos), páginas web,
                      etiquetas de productos, ilustraciones y gráficas para
                      redes sociales.
                    </p>
                  </div>
                </div>
                <div className="item wow fadeInUp" data-wow-delay=".5s">
                  <div className="title" onClick={openAccordion}>
                    <h6 className="fz-18">Impresión</h6>
                    <span className="ico"></span>
                  </div>
                  <div className="accordion-info">
                    <p className="fz-14">
                      En nuestra área de impresión y producción, entregamos
                      productos finales de alta calidad y personalizados. Con
                      nuestro asesoramiento, podrás determinar la mejor manera
                      y el material ideal para ejecutar tus proyectos. Ofrecemos
                      servicios de impresión digital y offset, gigantografías,
                      pendones, papelería, stickers, etiquetas de productos y
                      mucho más.
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

export default Intro;
