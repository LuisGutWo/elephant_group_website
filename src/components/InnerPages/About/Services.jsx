import React from "react";
//= Assets
const catalogoPDF = `${process.env.PUBLIC_URL || ""}/catalogo_impresion.pdf`;
//= Data
import data from "@/data/Main/services.json";
import Link from "next/link";

function Services({ lightMode }) {
  return (
    <section className="serv-box section-padding">
      <div className="container">
        <div className="sec-lg-head mb-80">
          <div className="row">
            <div className="col-lg-8">
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
            </div>
            <div className="col-lg-4 d-flex align-items-center">
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
            </div>
          </div>
        </div>
        <div className="row justify-content-center mb-50">
          {data.map((item) => (
            <div
              className="text-center d-flex flex-wrap flex-column justify-content-center align-items-center item-bord col-lg-4 col-md-8"
              key={item.id}
            >
              <div className="icon-img-100 mb-40">
                <img
                  src={`/${lightMode ? "light" : "dark"}${item.image}`}
                  alt=""
                />
              </div>
              <h4 className="mb-15" key={item.id} style={{ color: "#fca311" }}>
                {item.title}
              </h4>
              <h6 className="mb-15 text-dark">{item.subtitle}</h6>
              <p>{item.text}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

export default Services;
