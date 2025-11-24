import React from "react";

function GranFormato() {
  return (
    <section className="services-details section-padding">
      <div className="container">
        <div className="row">
          <div className="col-lg-8">
            <div className="content">
              <div className="mb-50">
                <h2 className="mb-20">Impresión de Gran Formato</h2>
                <p className="mb-30">
                  Nuestro servicio de impresión de gran formato está diseñado
                  para proyectos de alto impacto visual. Utilizamos tecnología
                  de punta para producir gráficos de gran tamaño con colores
                  vibrantes y detalles excepcionales.
                </p>
                <p className="mb-30">
                  Ideal para publicidad exterior, señalética, eventos, ferias y
                  cualquier aplicación que requiera visibilidad y presencia.
                  Trabajamos con diversos materiales y acabados según las
                  necesidades de cada proyecto.
                </p>
              </div>

              <div className="mb-50">
                <h3 className="mb-30">Productos de Gran Formato</h3>
                <div className="row">
                  <div className="col-md-6 mb-30">
                    <div className="item-box">
                      <h5 className="mb-15">
                        <i className="fas fa-check-circle text-orange me-2"></i>
                        Gigantografías y Banners
                      </h5>
                      <p>
                        Para fachadas, eventos y publicidad exterior de alto
                        impacto.
                      </p>
                    </div>
                  </div>
                  <div className="col-md-6 mb-30">
                    <div className="item-box">
                      <h5 className="mb-15">
                        <i className="fas fa-check-circle text-orange me-2"></i>
                        Vinilos Adhesivos
                      </h5>
                      <p>
                        Para vidrieras, vehículos, paredes y superficies
                        diversas.
                      </p>
                    </div>
                  </div>
                  <div className="col-md-6 mb-30">
                    <div className="item-box">
                      <h5 className="mb-15">
                        <i className="fas fa-check-circle text-orange me-2"></i>
                        Roll Up y Pendones
                      </h5>
                      <p>
                        Sistemas portátiles ideales para ferias y
                        presentaciones.
                      </p>
                    </div>
                  </div>
                  <div className="col-md-6 mb-30">
                    <div className="item-box">
                      <h5 className="mb-15">
                        <i className="fas fa-check-circle text-orange me-2"></i>
                        Señalética y Letreros
                      </h5>
                      <p>
                        Soluciones para identificación corporativa y navegación.
                      </p>
                    </div>
                  </div>
                  <div className="col-md-6 mb-30">
                    <div className="item-box">
                      <h5 className="mb-15">
                        <i className="fas fa-check-circle text-orange me-2"></i>
                        Backlight y Frontlight
                      </h5>
                      <p>
                        Lonas especiales para cajas de luz y publicidad
                        iluminada.
                      </p>
                    </div>
                  </div>
                  <div className="col-md-6 mb-30">
                    <div className="item-box">
                      <h5 className="mb-15">
                        <i className="fas fa-check-circle text-orange me-2"></i>
                        Decoración de Espacios
                      </h5>
                      <p>
                        Murales, fotomurales y gráficas para ambientación
                        interior.
                      </p>
                    </div>
                  </div>
                </div>
              </div>

              <div className="mb-50">
                <h3 className="mb-30">Ventajas del Gran Formato</h3>
                <ul className="list-style-check">
                  <li>Alto impacto visual y visibilidad</li>
                  <li>Múltiples materiales y acabados disponibles</li>
                  <li>Resistente a intemperie para uso exterior</li>
                  <li>Instalación y montaje especializado</li>
                  <li>Durabilidad y resistencia garantizada</li>
                  <li>Colores vibrantes y definición HD</li>
                </ul>
              </div>
            </div>
          </div>

          <div className="col-lg-4">
            <div className="sidebar">
              <div className="widget-box mb-50">
                <h4 className="mb-30">Especificaciones Técnicas</h4>
                <div className="info-list">
                  <div className="item mb-20">
                    <h6>Anchos Disponibles</h6>
                    <p>Hasta 5 metros de ancho</p>
                  </div>
                  <div className="item mb-20">
                    <h6>Largo</h6>
                    <p>Sin límite de metraje</p>
                  </div>
                  <div className="item mb-20">
                    <h6>Materiales</h6>
                    <p>Lona, Vinilo, Tela, PVC, Foam, Acrílico</p>
                  </div>
                  <div className="item mb-20">
                    <h6>Resolución</h6>
                    <p>1440 DPI calidad fotográfica</p>
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
                    <a href="/services/acabados">Acabados y Terminaciones</a>
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

export default GranFormato;
