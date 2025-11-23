import React from "react";
import Link from "next/link";
//= Data
import data from "@/data/Main/services.json";

function Services() {
  return (
    <section className="services main-bg ontop bord-thin-top bord-thin-bottom">
      <div className="container-fluid text-center">
        <div className="row justify-content-center mb-50">
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
                  style={{ color: "#f7a800" }}
                >
                  {item.title}
                </h4>
                <h6 className="mb-15">
                  {item.subtitle}

                  <span className="dot">
                    <i className="fa fa-angle-right fs-5 ms-2" />
                  </span>
                </h6>
                <p>{item.text}</p>
              </Link>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

export default Services;
