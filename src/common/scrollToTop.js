const scrollToTop = () => {
  let offset = 150;
  let progressWrap = document.querySelector(".progress-wrap");
  let progressPath = document.querySelector(".progress-wrap path");

  if (!progressWrap || !progressPath) {
    return () => {}; // Retornar cleanup vacío si no existen los elementos
  }

  let pathLength = progressPath.getTotalLength();

  const updateProgress = () => {
    let scroll = window.pageYOffset;
    let height = document.documentElement.scrollHeight - window.innerHeight;
    let progress = pathLength - (scroll * pathLength) / height;
    progressPath.style.strokeDashoffset = progress;
  };

  const handleScrollActive = () => {
    if (window.pageYOffset > offset) {
      progressWrap.classList.add("active-progress");
    } else {
      progressWrap.classList.remove("active-progress");
    }
  };

  const handleClick = (event) => {
    event.preventDefault();
    window.scrollTo({ top: 0, behavior: "smooth" });
    return false;
  };

  progressPath.style.transition = progressPath.style.WebkitTransition = "none";
  progressPath.style.strokeDasharray = pathLength + " " + pathLength;
  progressPath.style.strokeDashoffset = pathLength;
  progressPath.getBoundingClientRect();
  progressPath.style.transition = progressPath.style.WebkitTransition =
    "stroke-dashoffset 10ms linear";

  updateProgress();
  window.addEventListener("scroll", updateProgress);
  window.addEventListener("scroll", handleScrollActive);
  progressWrap.addEventListener("click", handleClick);

  // Retornar función de cleanup
  return () => {
    window.removeEventListener("scroll", updateProgress);
    window.removeEventListener("scroll", handleScrollActive);
    if (progressWrap) {
      progressWrap.removeEventListener("click", handleClick);
    }
  };
};

export default scrollToTop;
