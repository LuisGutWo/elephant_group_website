import React from "react";
import { useRouter } from "next/router";

const FooterBottom = () => {
  const router = useRouter();
  const currentPath = router.asPath;
  const isDark = currentPath.includes("/dark/");

  // Determinar el logo apropiado basado en el tema
  const logoSrc = isDark
    ? "/dark/assets/imgs/logo-light.webp"
    : "/light/assets/imgs/logo-light.webp";

  return (
    <footer>
      <div className="eg-footer-bottom">
        <div className="container eg-footer-bottom-inner">
          {/* Contenido principal del footer */}
          <div className="eg-footer-content">
            {/* Navegación del footer - primero como en el diseño original */}
            <nav
              className="eg-footer-nav"
              role="navigation"
              aria-label="Footer Navigation"
            >
              <div className="eg-footer-nav-row">
                <a
                  href="/blog"
                  className="eg-footer-link"
                  onClick={(e) => {
                    e.preventDefault();
                    console.log("Navegando a Blog");
                    // Aquí se puede agregar la lógica de navegación
                  }}
                >
                  Blog
                </a>
                <a
                  href="https://listado.mercadolibre.com.ar/_CustId_254777934"
                  className="eg-footer-link"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  Mercado Libre
                </a>
              </div>
              <div className="eg-footer-nav-row">
                <a
                  href="/politica-privacidad"
                  className="eg-footer-link"
                  onClick={(e) => {
                    e.preventDefault();
                    console.log("Navegando a Política de Privacidad");
                    // Aquí se puede agregar la lógica de navegación
                  }}
                >
                  Política de Privacidad
                </a>
                <a
                  href="/terminos-condiciones"
                  className="eg-footer-link"
                  onClick={(e) => {
                    e.preventDefault();
                    console.log("Navegando a Términos y Condiciones");
                    // Aquí se puede agregar la lógica de navegación
                  }}
                >
                  Términos y Condiciones
                </a>
              </div>
            </nav>

            {/* Logo - después de la navegación como en el diseño original */}
            <div className="eg-footer-logo-container">
              <img
                src={logoSrc}
                alt="Elephant Group"
                className="eg-footer-logo"
                loading="lazy"
                onError={(e) => {
                  // Fallback si la imagen no carga
                  e.target.src = "/light/assets/imgs/logo-light.webp";
                }}
              />
            </div>
          </div>

          {/* Copyright */}
          <div className="eg-footer-copyright">
            <small>
              © {new Date().getFullYear()} Elephant Group — LAGmedia.
              <br className="eg-footer-break-mobile" />
              Todos los derechos reservados
            </small>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default FooterBottom;
