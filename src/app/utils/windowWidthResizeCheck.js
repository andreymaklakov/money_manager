export function windowWidthResizeCheck(setWindowWidth) {
  function handleResize() {
    setWindowWidth(window.innerWidth);
  }

  window.addEventListener("resize", handleResize);

  handleResize();

  return () => window.removeEventListener("resize", handleResize);
}
