import React from "react";

function Acabados() {
  return (
    <section className="services-details section-padding">
      <div className="container">
        <div className="row">
          <div className="col-lg-8">
            <div className="content">
              <div className="mb-50">
                <h2 className="mb-20">Acabados y Terminaciones</h2>
                <p className="mb-30">
                  Los acabados y terminaciones son el toque final que transforma
                  un impreso común en una pieza de alto valor percibido.
                  Nuestros procesos de post-impresión añaden funcionalidad,
                  protección y un acabado premium a tus proyectos.
                </p>
                <p className="mb-30">
                  Contamos con maquinaria especializada y personal experto para
                  aplicar diversos acabados que realzan la calidad de tus
                  impresos y los hacen destacar frente a la competencia.
                </p>
              </div>

              <div className="mb-50">
                <h3 className="mb-30">Tipos de Acabados</h3>
                <div className="row">
                  <div className="col-md-6 mb-30">
                    <div className="item-box">
                      <h5 className="mb-15">
                        <i className="fas fa-check-circle text-orange me-2"></i>
                        Laminado
                      </h5>
                      <p>
                        Mate, brillante o soft-touch para protección y
                        elegancia.
                      </p>
                    </div>
                  </div>
                  <div className="col-md-6 mb-30">
                    <div className="item-box">
                      <h5 className="mb-15">
                        <i className="fas fa-check-circle text-orange me-2"></i>
                        Barniz UV
                      </h5>
                      <p>
                        Sectorial o total, para efectos de relieve y brillo
                        intenso.
                      </p>
                    </div>
                  </div>
                  <div className="col-md-6 mb-30">
                    <div className="item-box">
                      <h5 className="mb-15">
                        <i className="fas fa-check-circle text-orange me-2"></i>
                        Hot Stamping
                      </h5>
                      <p>
                        Estampado en caliente con foil metalizado o holográfico.
                      </p>
                    </div>
                  </div>
                  <div className="col-md-6 mb-30">
                    <div className="item-box">
                      <h5 className="mb-15">
                        <i className="fas fa-check-circle text-orange me-2"></i>
                        Troquelado
                      </h5>
                      <p>Cortes especiales y formas personalizadas.</p>
                    </div>
                  </div>
                  <div className="col-md-6 mb-30">
                    <div className="item-box">
                      <h5 className="mb-15">
                        <i className="fas fa-check-circle text-orange me-2"></i>
                        Relieve y Bajorrelieve
                      </h5>
                      <p>Textura táctil para logos y elementos destacados.</p>
                    </div>
                  </div>
                  <div className="col-md-6 mb-30">
                    <div className="item-box">
                      <h5 className="mb-15">
                        <i className="fas fa-check-circle text-orange me-2"></i>
                        Encuadernación
                      </h5>
                      <p>Anillado, cosido, encolado y tapa dura.</p>
                    </div>
                  </div>
                </div>
              </div>

              <div className="mb-50">
                <h3 className="mb-30">Beneficios de los Acabados</h3>
                <ul className="list-style-check">
                  <li>Mayor durabilidad y resistencia</li>
                  <li>Protección contra rayones y humedad</li>
                  <li>Acabado premium y profesional</li>
                  <li>Diferenciación de la competencia</li>
                  <li>Mayor valor percibido del producto</li>
                  <li>Experiencia táctil y visual mejorada</li>
                </ul>
              </div>
            </div>
          </div>

          <div className="col-lg-4">
            <div className="sidebar">
              <div className="widget-box mb-50">
                <h4 className="mb-30">Acabados Disponibles</h4>
                <div className="info-list">
                  <div className="item mb-20">
                    <h6>Laminados</h6>
                    <p>Mate, Brillante, Soft-Touch</p>
                  </div>
                  <div className="item mb-20">
                    <h6>Barnices</h6>
                    <p>UV Sectorial, UV Total, Mate</p>
                  </div>
                  <div className="item mb-20">
                    <h6>Especiales</h6>
                    <p>Hot Stamping, Relieve, Troquelado</p>
                  </div>
                  <div className="item mb-20">
                    <h6>Encuadernación</h6>
                    <p>Anillado, Cosido, Wire-O, Tapa Dura</p>
                  </div>
                </div>
              </div>

              <div className="widget-box mb-50">
                <h4 className="mb-30">¿Necesitas una Cotización?</h4>
                <p className="mb-20">
                  Contáctanos para recibir una cotización personalizada de tu
                  proyecto.
                </p>
                <a
                  href="/quote"
                  className="butn butn-md butn-bord butn-rounded"
                >
                  <span>Solicitar Cotización</span>
                </a>
              </div>

              <div className="widget-box">
                <h4 className="mb-30">Servicios Relacionados</h4>
                <ul className="services-links">
                  <li>
                    <a href="/services/impresion-digital">Impresión Digital</a>
                  </li>
                  <li>
                    <a href="/services/impresion-offset">Impresión Offset</a>
                  </li>
                  <li>
                    <a href="/services/gran-formato">Gran Formato</a>
                  </li>
                  <li>
                    <a href="/services/diseno">Diseño Gráfico</a>
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </div>

      <style jsx>{`
        .services-details {
          background: #2a2a2a;
          color: #ffffff;
        }

        .content h2 {
          color: #fca311;
          font-weight: 700;
        }

        .content h3 {
          color: #ffffff;
          font-weight: 600;
          font-size: 28px;
        }

        .content p {
          color: rgba(255, 255, 255, 0.8);
          line-height: 1.8;
          font-size: 16px;
        }

        .item-box {
          padding: 20px;
          background: rgba(255, 255, 255, 0.05);
          border-radius: 10px;
          border: 1px solid rgba(255, 255, 255, 0.1);
          transition: all 0.3s ease;
        }

        .item-box:hover {
          background: rgba(252, 163, 17, 0.1);
          border-color: rgba(252, 163, 17, 0.3);
          transform: translateY(-5px);
        }

        .item-box h5 {
          color: #ffffff;
          font-size: 18px;
        }

        .item-box p {
          color: rgba(255, 255, 255, 0.7);
          margin: 0;
          font-size: 14px;
        }

        .text-orange {
          color: #fca311;
        }

        .list-style-check {
          list-style: none;
          padding: 0;
        }

        .list-style-check li {
          padding: 12px 0;
          padding-left: 30px;
          position: relative;
          color: rgba(255, 255, 255, 0.9);
          font-size: 16px;
        }

        .list-style-check li:before {
          content: "✓";
          position: absolute;
          left: 0;
          color: #fca311;
          font-weight: bold;
          font-size: 20px;
        }

        .sidebar {
          position: sticky;
          top: 100px;
        }

        .widget-box {
          background: rgba(255, 255, 255, 0.05);
          padding: 30px;
          border-radius: 15px;
          border: 1px solid rgba(255, 255, 255, 0.1);
        }

        .widget-box h4 {
          color: #fca311;
          font-weight: 700;
          font-size: 22px;
        }

        .widget-box p {
          color: rgba(255, 255, 255, 0.8);
          font-size: 15px;
        }

        .info-list .item h6 {
          color: #ffffff;
          font-weight: 600;
          margin-bottom: 5px;
        }

        .info-list .item p {
          color: rgba(255, 255, 255, 0.7);
          font-size: 14px;
          margin: 0;
        }

        .butn {
          display: inline-block;
          padding: 12px 30px;
          background: transparent;
          color: #fca311;
          border: 2px solid #fca311;
          border-radius: 30px;
          text-decoration: none;
          transition: all 0.3s ease;
          font-weight: 700;
          text-transform: uppercase;
          letter-spacing: 1px;
        }

        .butn:hover {
          background: #fca311;
          color: #000000;
        }

        .services-links {
          list-style: none;
          padding: 0;
        }

        .services-links li {
          margin-bottom: 15px;
        }

        .services-links a {
          color: rgba(255, 255, 255, 0.8);
          text-decoration: none;
          transition: all 0.3s ease;
          display: block;
          padding: 10px 15px;
          border-left: 3px solid transparent;
          padding-left: 15px;
        }

        .services-links a:hover {
          color: #fca311;
          border-left-color: #fca311;
          padding-left: 20px;
        }

        @media (max-width: 991px) {
          .sidebar {
            position: relative;
            top: 0;
            margin-top: 50px;
          }
        }
      `}</style>
    </section>
  );
}

export default Acabados;
