function bindOpacityHover(
  selector: string,
  hoverSelector: string,
  transition: string,
) {
  const isDesktop = (window.innerWidth || 0) >= 992;

  if (!isDesktop) return;

  document.querySelectorAll<HTMLElement>(selector).forEach((button) => {
    const hoverLayer = button.querySelector<HTMLElement>(hoverSelector);
    if (!hoverLayer) return;

    hoverLayer.style.opacity = "0";
    hoverLayer.style.transition = transition;

    button.addEventListener("mouseenter", () => {
      hoverLayer.style.opacity = "1";
    });

    button.addEventListener("mouseleave", () => {
      hoverLayer.style.opacity = "0";
    });
  });
}

export function initButtonHoverEffects() {
  bindOpacityHover(".bt-orange", ".bt-orange__hover", "opacity 200ms ease-out");
  bindOpacityHover(".bt-black", ".bt-black-hover", "opacity 200ms ease-out");
}
