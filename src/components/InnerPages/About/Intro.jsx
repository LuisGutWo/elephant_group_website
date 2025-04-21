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
                  src="/light/assets/imgs/about/work-127.jpeg"
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
                    <span className="up-text">detrás de nuestra empresa</span>
                  </span>
                  <span className="sideup-text">
                    <span className="up-text">
                      <b>Elephant Group.</b>
                    </span>
                  </span>
                </h2>
              </div>
              <div className="accordion bord mt-40">
                <div className="item mb-15 wow fadeInUp" data-wow-delay=".5s">
                  <div className="title" onClick={openAccordion}>
                    <h6 className="fz-18">IMPRESION</h6>
                    <span className="ico"></span>
                  </div>
                  <div className="accordion-info">
                    <p className="fz-14">
                      <b>ADHESIVOS PVC</b>
                      <br />
                      El adhesivo PVC es un material versátil y resistente,
                      ideal para aplicaciones en interiores y exteriores. Su
                      alta resistencia y durabilidad lo convierten en una
                      excelente alternativa para la impresión de etiquetas y
                      letreros.
                    </p>
                    <br />
                    <p className="fz-14">
                      <b>TELA PVC</b>
                      <br />
                      La tela PVC es una material versátil y resistente, siendo
                      una excelente opción para impresiones en gran formato. Es
                      altamente duradero, resistente a la intemperie y fácil de
                      limpiar, lo que lo convierte en una opción ideal para
                      aplicaciones en exteriores.
                    </p>
                  </div>
                </div>
                <div className="item mb-15 wow fadeInUp" data-wow-delay=".1s">
                  <div className="title" onClick={openAccordion}>
                    <h6 className="fz-18">CORTE CNC</h6>
                    <span className="ico"></span>
                  </div>
                  <div className="accordion-info">
                    <p className="fz-14">
                      Nuestro CNC es una herramienta de alta precisión que nos
                      permite realizar cortes y grabados en una amplia variedad de
                      materiales, como acrílicos, madera y aluminio compuesto.
                      Gracias a su tecnología avanzada, podemos crear diseños
                      personalizados y precisos.
                    </p>
                  </div>
                </div>
                <div className="item mb-15 wow fadeInUp" data-wow-delay=".3s">
                  <div className="title" onClick={openAccordion}>
                    <h6 className="fz-18">DISEÑO</h6>
                    <span className="ico"></span>
                  </div>
                  <div className="accordion-info">
                    <p className="fz-14">
                      En Elephant Group, nos especializamos en la <b>creación</b> y <b>diseño</b> de
                      logotipos, papelería, publicidad digital y física, así como
                      en la creación de contenido para redes sociales. Nuestro equipo
                      de expertos en <b>diseno de letreros</b> y <b>rótulos</b> y
                      <b>señalización</b> nos permite ofrecer soluciones
                      personalizadas y atractivas para nuestros clientes.
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
