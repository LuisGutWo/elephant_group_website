export default function parallaxie(selector, speed = 0.8, startPosition) {
  let elementBg = document.querySelector(selector);
  if (!elementBg) return () => {}; // Si no existe el elemento, retornar cleanup vacío

  let image = elementBg.getAttribute("data-background");
  if (!image) {
    image = window.getComputedStyle(elementBg).backgroundImage;
  }
  let position = elementBg.getBoundingClientRect().top * speed;

  elementBg.style.backgroundImage = `url("${image}")`;
  elementBg.style.backgroundSize = "cover";
  elementBg.style.backgroundRepeat = "no-repeat";
  elementBg.style.backgroundAttachment = "fixed";
  elementBg.style.backgroundPosition = `center ${
    startPosition !== undefined ? startPosition : position
  }px`;

  const handleScroll = () => {
    if (elementBg) {
      position = elementBg.getBoundingClientRect().top * speed;
      elementBg.style.backgroundPosition = `center ${position}px`;
    }
  };

  window.addEventListener("scroll", handleScroll);

  // Retornar función de cleanup para remover el event listener
  return () => {
    window.removeEventListener("scroll", handleScroll);
  };
}
