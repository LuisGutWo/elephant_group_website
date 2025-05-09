import React from "react";

function Header({ data, subBg }) {
  return (
    <header
      className={`page-header section-padding pb-0 ${subBg ? "sub-bg" : ""}`}
    >
      <div className="background-img"> </div>
      <div className="container mt-80">
        <div className="row">
          <div className="col-lg-8">
            <div className="caption">
              <h6 className="sub-title">{data.subTitle}</h6>
              <h1 className="fz-55">{data.title}</h1>
            </div>
          </div>
        </div>
        <div className="row">
          <div className="col-lg-5 offset-lg-4">
            <div className="text mt-30">
              <p>
                Nos basamos en una combinación de servicios para lograr el
                proyecto que tienes en mente. Asesoramos a nuestros clientes
                durante todo el proceso, logrando así este trabajo personalizado
                que requiere tu marca.
              </p>
              <br />
              <p>
                Nuestra misión es ser un asesor publicitario para nuestros
                clientes, entregando los pasos a seguir para tener una imagen
                visual empresarial más profesional.
              </p>
            </div>
          </div>
        </div>
      </div>
      <div className="main-marq xlrg section-padding pb-0">
        <div className="slide-har st1">
          <div className="box">
            {new Array(5).fill().map((_, i) => (
              <div className="item" key={i}>
                <h4>{data.text}</h4>
              </div>
            ))}
          </div>
          <div className="box">
            {new Array(5).fill().map((_, i) => (
              <div className="item" key={i}>
                <h4>{data.text}</h4>
              </div>
            ))}
          </div>
        </div>
      </div>
    </header>
  );
}

export default Header;
