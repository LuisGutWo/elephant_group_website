// Función de utilidad para compatibilidad con navegadores
const matchesSelector = (element, selector) => {
  if (element.matches) return element.matches(selector);
  if (element.matchesSelector) return element.matchesSelector(selector);
  if (element.webkitMatchesSelector)
    return element.webkitMatchesSelector(selector);
  if (element.mozMatchesSelector) return element.mozMatchesSelector(selector);
  if (element.msMatchesSelector) return element.msMatchesSelector(selector);
  if (element.oMatchesSelector) return element.oMatchesSelector(selector);
  return false;
};

const initIsotope = () => {
  // Verificar que Isotope está disponible globalmente
  if (typeof window === "undefined" || typeof window.Isotope === "undefined") {
    console.warn(
      "Isotope is not available. Make sure the isotope script is loaded."
    );
    return;
  }

  let iso;
  let grid = document.querySelectorAll(".gallery");
  let filtersElem = document.querySelector(".filtering");
  let buttonGroups = document.querySelectorAll(".filtering");

  if (grid.length >= 1) {
    grid.forEach((item) => {
      if (!item) {
        console.error("initIsotope: grid item is null");
        return;
      }

      // Configuración mejorada de Isotope
      iso = new window.Isotope(item, {
        itemSelector: ".items",
        layoutMode: "masonry",
        masonry: {
          columnWidth: ".items",
          gutter: 30,
        },
        percentPosition: true,
        transitionDuration: "0.6s",
      });

      console.log("✅ Isotope inicializado correctamente en:", item);
    });
  } else {
    console.warn("⚠️ No se encontraron elementos .gallery");
  }

  if (!filtersElem) {
    console.warn("⚠️ No se encontró el elemento .filtering");
    return;
  }

  filtersElem.addEventListener("click", function (event) {
    if (!matchesSelector(event.target, "span")) {
      return;
    }
    var filterValue = event.target.getAttribute("data-filter");
    if (!filterValue) {
      console.warn("⚠️ No se encontró data-filter en el elemento clickeado");
      return;
    }

    console.log("🔍 Aplicando filtro:", filterValue);
    if (iso) {
      iso.arrange({ filter: filterValue });
    }
  });

  const radioButtonGroup = (buttonGroup) => {
    if (!buttonGroup) {
      console.warn("⚠️ buttonGroup es null");
      return;
    }
    buttonGroup.addEventListener("click", (event) => {
      if (!matchesSelector(event.target, "span")) {
        return;
      }
      const activeButton = buttonGroup.querySelector(".active");
      if (activeButton) {
        activeButton.classList.remove("active");
      }
      event.target.classList.add("active");
      console.log("🎯 Filtro activo cambiado a:", event.target.textContent);
    });
  };

  for (var i = 0, len = buttonGroups.length; i < len; i++) {
    const buttonGroup = buttonGroups[i];
    if (buttonGroup) {
      radioButtonGroup(buttonGroup);
    }
  }

  console.log("✅ Isotope completamente inicializado");
};

export default initIsotope;
