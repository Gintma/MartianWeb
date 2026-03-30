import lottie, { type AnimationItem, type RendererType } from "lottie-web";

type LottieElement = HTMLElement & {
  __martianLottie?: AnimationItem;
};

function getRendererType(element: HTMLElement): RendererType {
  const renderer = element.getAttribute("data-lottie-renderer");
  if (renderer === "canvas" || renderer === "html") return renderer;
  return "svg";
}

export function initRuntimeLotties() {
  document.querySelectorAll<HTMLElement>("[data-runtime-lottie]").forEach((element) => {
    const path = element.getAttribute("data-lottie-src");
    if (!path) return;

    const animation = lottie.loadAnimation({
      container: element,
      renderer: getRendererType(element),
      loop: element.getAttribute("data-lottie-loop") !== "0",
      autoplay: element.getAttribute("data-lottie-autoplay") !== "0",
      path,
    });

    const direction = Number(element.getAttribute("data-lottie-direction") || 1);
    if (direction === -1) {
      animation.setDirection(-1);
    }

    (element as LottieElement).__martianLottie = animation;
  });
}

export function initInteractiveLotties() {
  const interactiveNodes = document.querySelectorAll<HTMLElement>(
    '[data-runtime-lottie="interactive"]',
  );
  if (!interactiveNodes.length) return;

  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (!entry.isIntersecting) return;
        const target = entry.target as LottieElement;
        const animation = target.__martianLottie;
        if (!animation || target.dataset.lottiePlayed === "1") return;
        target.dataset.lottiePlayed = "1";
        animation.goToAndPlay(0, true);
      });
    },
    { threshold: 0.35 },
  );

  interactiveNodes.forEach((element) => {
    if (element.classList.contains("s4__lottie-item")) return;
    const path = element.getAttribute("data-src");
    if (!path) return;

    const animation = lottie.loadAnimation({
      container: element,
      renderer: getRendererType(element),
      loop: element.getAttribute("data-lottie-loop") !== "0",
      autoplay: false,
      path: element.getAttribute("data-lottie-src") || "",
    });

    const direction = Number(element.getAttribute("data-lottie-direction") || 1);
    if (direction === -1) {
      animation.setDirection(-1);
    }

    (element as LottieElement).__martianLottie = animation;
    observer.observe(element);
  });
}
