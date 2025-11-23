import React, { useEffect } from "react";
import Link from "next/link";
//= Scripts
import parallaxie from "@/common/parallaxie";
import { arrowRightUpSvg } from "@/data/icons";

function Contact({ innerPageStyle }) {
  useEffect(() => {
    const cleanup = parallaxie(`.sec-bg-img.parallaxie`, 0.4);

    // Cleanup function retornada por parallaxie
    return cleanup;
  }, []);

  return (
    <section className="contact-img">
      <div className="container">
        <div
          className="sec-bg-img bg-img parallaxie"
          data-background="/dark/assets/imgs/background/viña-del-mar.webp"
        ></div>
        <div className="sec-lg-head section-padding">
          <div className="row ontop">
            <div className="col-11 d-flex align-items-center">
              <article className="valign">
                <h2 className="fz-50 d-rotate wow ls1 sub-font">
                  <span className="rotate-text">
                    Tienes un proyecto en mente?
                  </span>
                  <span className="rotate-text">
                    Entonces{" "}
                    <span className={innerPageStyle ? "" : "sub-font"}>
                      trabajemos juntos.
                    </span>
                    .
                  </span>
                </h2>
              </article>
              <article className="ml-auto">
                <Link
                  href="/contact"
                  className="butn-circle d-flex align-items-center text-center m-auto"
                >
                  <div className="full-width">
                    <span className="icon">{arrowRightUpSvg}</span>
                    <span className="full-width">Escríbenos</span>
                  </div>
                  <img
                    src="/light/assets/imgs/svg-assets/circle-star.svg"
                    alt="Elephant Group - Circle Star Contact page button"
                    className="circle-star"
                  />
                </Link>
              </article>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

export default Contact;
