function clamp(value: number, min: number, max: number) {
  return Math.min(Math.max(value, min), max);
}

function lerp(start: number, end: number, progress: number) {
  return start + (end - start) * progress;
}

function normalizeInViewProgress(element: Element | null) {
  if (!(element instanceof HTMLElement)) return 0;
  const rect = element.getBoundingClientRect();
  const viewportHeight = window.innerHeight || 1;
  const total = viewportHeight + rect.height;
  if (total <= 0) return 0;
  return clamp((viewportHeight - rect.top) / total, 0, 1);
}

export function initAboutSection() {
  if (window.innerWidth < 992) return;

  const cardConfigs = [
    { selector: ".s2__card-container._4", from: 12, to: -12 },
    { selector: ".s2__card-container.align._3", from: 8, to: -8 },
    { selector: ".s2__card-container._2", from: 4, to: -4 },
    { selector: ".s2__card-container.align._1", from: 0, to: 0 },
  ];

  const cards = cardConfigs
    .map((config) => ({
      ...config,
      element: document.querySelector(config.selector),
    }))
    .filter(
      (
        config,
      ): config is typeof config & {
        element: HTMLElement;
      } => config.element instanceof HTMLElement,
    );

  if (!cards.length) return;

  let rafId = 0;

  function applyParallax() {
    rafId = 0;
    cards.forEach(({ element, from, to }) => {
      const progress = normalizeInViewProgress(element);
      const y = lerp(from, to, progress);
      element.style.transform = `translate3d(0, ${y}vw, 0)`;
      element.style.willChange = "transform";
    });
  }

  function requestApplyParallax() {
    if (rafId) return;
    rafId = requestAnimationFrame(applyParallax);
  }

  applyParallax();
  window.addEventListener("scroll", requestApplyParallax, { passive: true });
  window.addEventListener("resize", requestApplyParallax);
}
