import React from "react";

function ImpresionOffset() {
  return (
    <section className="services-details section-padding">
      <div className="container">
        <div className="row">
          <div className="col-lg-8">
            <div className="content">
              <div className="mb-50">
                <h2 className="mb-20">Impresión Offset de Alto Volumen</h2>
                <p className="mb-30">
                  La impresión offset es la tecnología ideal para grandes
                  tirajes, ofreciendo la mejor calidad de impresión con costos
                  optimizados. Perfecta para proyectos que requieren
                  consistencia y acabados profesionales.
                </p>
                <p className="mb-30">
                  Con nuestra maquinaria offset de última generación,
                  garantizamos colores precisos, detalles nítidos y resultados
                  uniformes en toda la tirada, independiente del volumen
                  solicitado.
                </p>
              </div>

              <div className="mb-50">
                <h3 className="mb-30">Productos Offset</h3>
                <div className="row">
                  <div className="col-md-6 mb-30">
                    <div className="item-box">
                      <h5 className="mb-15">
                        <i className="fas fa-check-circle text-orange me-2"></i>
                        Libros y Publicaciones
                      </h5>
                      <p>
                        Impresión de alta calidad para editoriales y
                        publicaciones corporativas.
                      </p>
                    </div>
                  </div>
                  <div className="col-md-6 mb-30">
                    <div className="item-box">
                      <h5 className="mb-15">
                        <i className="fas fa-check-circle text-orange me-2"></i>
                        Packaging y Embalaje
                      </h5>
                      <p>
                        Cajas, etiquetas y envases con impresión de alta
                        definición.
                      </p>
                    </div>
                  </div>
                  <div className="col-md-6 mb-30">
                    <div className="item-box">
                      <h5 className="mb-15">
                        <i className="fas fa-check-circle text-orange me-2"></i>
                        Material Publicitario
                      </h5>
                      <p>
                        Folletos, brochures y catálogos en grandes cantidades.
                      </p>
                    </div>
                  </div>
                  <div className="col-md-6 mb-30">
                    <div className="item-box">
                      <h5 className="mb-15">
                        <i className="fas fa-check-circle text-orange me-2"></i>
                        Papelería Corporativa
                      </h5>
                      <p>Hojas membretadas, sobres y documentos oficiales.</p>
                    </div>
                  </div>
                </div>
              </div>

              <div className="mb-50">
                <h3 className="mb-30">Ventajas de la Impresión Offset</h3>
                <ul className="list-style-check">
                  <li>
                    Mejor precio en grandes volúmenes (desde 500 unidades)
                  </li>
                  <li>Calidad superior y colores exactos</li>
                  <li>Amplia variedad de papeles y gramajes</li>
                  <li>Pantone y tintas especiales disponibles</li>
                  <li>Acabados profesionales y de lujo</li>
                  <li>Consistencia perfecta en toda la tirada</li>
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
                    <h6>Formatos</h6>
                    <p>Hasta 70x100cm</p>
                  </div>
                  <div className="item mb-20">
                    <h6>Gramajes</h6>
                    <p>60gr hasta 400gr</p>
                  </div>
                  <div className="item mb-20">
                    <h6>Tipos de Papel</h6>
                    <p>Todos los disponibles en mercado</p>
                  </div>
                  <div className="item mb-20">
                    <h6>Tintas</h6>
                    <p>CMYK, Pantone, Metálicas, UV</p>
                  </div>
                  <div className="item mb-20">
                    <h6>Tirada Mínima</h6>
                    <p>Desde 500 unidades</p>
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
                    <a href="/services/gran-formato">Gran Formato</a>
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

export default ImpresionOffset;
