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

export function initPlusIconScrollEffects() {
  const plusIcons = Array.from(document.querySelectorAll<HTMLElement>(".ic-plus"));
  if (!plusIcons.length) return;

  let rafId = 0;

  function applyPlusIconScroll() {
    rafId = 0;
    plusIcons.forEach((element) => {
      const progress = normalizeInViewProgress(element);
      const rotation = lerp(0, 540, progress);
      element.style.transform = `rotate(${rotation}deg)`;
      element.style.willChange = "transform";
    });
  }

  function requestApplyPlusIconScroll() {
    if (rafId) return;
    rafId = requestAnimationFrame(applyPlusIconScroll);
  }

  applyPlusIconScroll();
  window.addEventListener("scroll", requestApplyPlusIconScroll, {
    passive: true,
  });
  window.addEventListener("resize", requestApplyPlusIconScroll);
}
