import React from "react";
import Link from "next/link";
import { arrowRightUpSvg } from "@/data/icons";

function Intro() {
  return (
    <section className="about section-padding main-bg">
      <div className="container ontop">
        <div className="row">
          <article className="col-lg-5 valign">
            <div className="about-circle-crev md-hide">
              <div className="circle-button">
                <div className="rotate-circle fz-16 ls1">
                  <svg className="textcircle" viewBox="0 0 500 500">
                    <defs>
                      <path
                        id="textcircle"
                        d="M250,400 a150,150 0 0,1 0,-300a150,150 0 0,1 0,300Z"
                      ></path>
                    </defs>
                    <text>
                      <textPath xlinkHref="#textcircle" textLength="900">
                        {" "}
                        Cortes CNC - Diseño - Impresión{" "}
                      </textPath>
                    </text>
                  </svg>
                </div>
              </div>
              <div className="half-circle-img">
                <img
                  src="/light/assets/imgs/about/elephant_group_bg.webp"
                  alt="Elephant Group - Background Image of the about section"
                  loading="lazy"
                  className="img-fluid"
                />
              </div>
            </div>
          </article>
          <article className="col-lg-7 valign">
            <div className="cont sec-lg-head">
              <h6 className="dot-titl mb-20">Acerca de nosotros</h6>
              <h2 className="d-slideup wow">
                <span className="sideup-text">
                  <span className="up-text">
                    Somos <strong>Elephant Group</strong>, una empresa que{" "}
                    <b>CREA</b> y <b>PRODUCE</b> implementos publicitarios.
                  </span>
                </span>
              </h2>
              <div className="row">
                <div className="col-lg-12">
                  <div className="text mt-20">
                    <p>
                      Nos basamos en una combinación de servicios para lograr el
                      proyecto que tienes en mente. Asesoramos a nuestros
                      clientes durante todo el proceso, logrando así este
                      trabajo personalizado que requiere tu marca.
                    </p>
                  </div>
                  <div className="underline">
                    <Link href="/quote" className="mt-30 ls1 sub-title">
                      Solicita tu cotización{" "}
                      <i className="ml-5">{arrowRightUpSvg}</i>
                    </Link>
                  </div>
                </div>
              </div>
            </div>
          </article>
        </div>
      </div>
    </section>
  );
}

export default Intro;
