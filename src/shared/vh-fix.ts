const vhFixConfig = {
  elements: [
    { el: ".s1__wrapper", vh: 100 },
    { el: ".s1__bg", vh: 150 },
    { el: ".stars-trigger", vh: 130 },
    { el: ".s2__trigger-animation-scroll", vh: 100 },
    { el: ".s3_container-h-sticky", vh: 250 },
    { el: ".s3_container-h", vh: 100 },
    { el: ".s4", vh: 800 },
    { el: ".s4__lottie-container", vh: 100 },
    { el: ".s6__sticky-wrapper", vh: 100 },
    { el: ".s6__bg-lines", vh: 100 },
    { el: ".s6__frame", vh: 100 },
    { el: ".s6__glyph-container", vh: 100 },
    { el: ".footer__anchor ", vh: 100 },
  ],
  mobileBreakpoint: 991,
} as const;

function setVH(selector: string, breakpoint: number, valueVH: number) {
  const screenWrapper = document.querySelector<HTMLElement>(selector);
  if (!screenWrapper) return;
  const targetWrapper = screenWrapper;

  let lastResize = window.innerWidth;

  function applyScreenHeight(element: HTMLElement) {
    if (window.innerWidth <= breakpoint) {
      element.setAttribute(
        "style",
        `height: ${(window.innerHeight * valueVH) / 100}px !important`,
      );
    } else {
      element.setAttribute("style", "");
    }
  }

  function checkResizeWidth() {
    if (lastResize !== window.innerWidth) {
      applyScreenHeight(targetWrapper);
      lastResize = window.innerWidth;
    }
  }

  applyScreenHeight(targetWrapper);
  window.addEventListener("resize", checkResizeWidth);
}

export function initVhFix() {
  vhFixConfig.elements.forEach((element) => {
    setVH(element.el, vhFixConfig.mobileBreakpoint, element.vh);
  });
}
