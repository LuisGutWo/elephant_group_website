import React from "react";
//= Assets
const catalogoPDF = `${process.env.PUBLIC_URL || ""}/catalogo_impresion.pdf`;
//= Data
import data from "@/data/Main/services.json";
import Link from "next/link";

function Services() {
  return (
    <section className="serv-box section-padding pb-10">
      <div className="container">
        <div className="sec-lg-head mb-80">
          <div className="row">
            <article className="col-lg-8">
              <div className="position-re">
                <Link
                  href={catalogoPDF}
                  passHref
                  target="_blank"
                  rel="noreferrer"
                  aria-label="Catalogo"
                  className="d-flex w-100"
                >
                  <h6 className="dot-titl-non colorbg-3 mb-10 d-flex align-items-center justify-content-center gap-4">
                    <p>Catalogo</p>
                    <span className="dot">
                      <i className="fa fa-angle-right fs-6" />
                    </span>
                  </h6>
                </Link>
                <h2 className="fz-60 fw-700">Nuestros Servicios</h2>
              </div>
            </article>
            <article className="col-lg-4 d-flex align-items-center">
              <div className="text">
                <p>
                  Ofrecemos soluciones de impresion en diferentes formatos,
                  ideales para quienes buscan destacar con materiales visuales
                  de alto impacto. Contamos con tecnología de de vanguardia y
                  maquinaria propia, lo que nos permite controlar cada detalle
                  del proceso y asegurar resultados excepcionales.
                </p>
                <br />
                <p>
                  Desde letreros y gigantografías hasta pendones y señaleticas,
                  trabajamos con materiales de la mas alta calidad, como PVC,
                  trovicel y acrílicos, garantizando acabados duraderos y
                  atractivos.
                </p>
                <Link
                  href={catalogoPDF}
                  passHref
                  target="_blank"
                  rel="noreferrer"
                  aria-label="Catalogo"
                  className="d-flex w-100"
                >
                  <h6 className="dot-titl-non colorbg-3 mb-10 mt-40 d-flex align-items-center justify-content-center gap-4 w-75">
                    <p>Ver mas servicios</p>
                    <span className="dot">
                      <i className="fa fa-angle-right fs-6" />
                    </span>
                  </h6>
                </Link>
              </div>
            </article>
          </div>
        </div>
        <article className="row justify-content-center mb-50">
          {data.map((item) => (
            <div className="item-bord col-lg-4 col-md-8" key={item.id}>
              <Link
                href="/services"
                className="d-flex flex-wrap flex-column justify-content-center align-items-center arrow mt-40"
              >
                <div className="mb-40">
                  <img
                    src={`/light${item.image}`}
                    alt="Service Icon Image - Elephant Group"
                    className="img-fluid w-100 h-100 mb-20"
                    style={{ maxWidth: "100px", maxHeight: "100px" }}
                  />
                </div>
                <h4
                  className="mb-15"
                  key={item.id}
                  style={{ color: "#fca311" }}
                >
                  {item.title}
                </h4>
                <h6 className="mb-15">
                  {item.subtitle}

                  <span className="dot">
                    <i className="fa fa-angle-right fs-5 ms-2" />
                  </span>
                </h6>
                <p className="text-center" style={{ fontSize: "0.9rem" }}>
                  {item.text}
                </p>
              </Link>
            </div>
          ))}
        </article>
      </div>
    </section>
  );
}

export default Services;
