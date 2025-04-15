import React from "react";
//= Components
import StatementSplitter from "@/components/Common/StatementSplitter";
//= Assets
const catalogoPDF = `${process.env.PUBLIC_URL || ''}/catalogo_impresion.pdf`
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
                <h6 className="dot-titl-non colorbg-3 mb-10">
                  Servicios Principales
                </h6>
                <h2 className="fz-60 fw-700">Nuestros Servicios</h2>
              </div>
            </div>
            <div className="col-lg-4 d-flex align-items-center">
              <div className="text">
                <p>
                  Nuestra misión es convertirnos en un asesor publicitario
                  confiable para nuestros clientes, proporcionando estrategias
                  claras para lograr una imagen visual empresarial más
                  profesional y efectiva.
                </p>
                <Link href={catalogoPDF} passHref className="btn btn-3 mt-30">
                  <span className="ico"></span>Ver más servicios
                </Link>
              </div>
            </div>
          </div>
        </div>
        <div className="row">
          {data.map((item) => (
            <div className="col-lg-4 text-center" key={item.id}>
              <div className="serv-item md-mb50 radius-10 d-flex flex-column justify-content-center align-items-center">
                <div className="icon-img-100 mb-40 ">
                  <img
                    src={`/${lightMode ? "light" : "dark"}/${item.image}`}
                    alt=""
                  />
                </div>
                <h5 className="mb-30 pb-30 bord-thin-bottom">
                  <StatementSplitter statement={item.title} />
                </h5>
                <p>{item.text}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

export default Services;
