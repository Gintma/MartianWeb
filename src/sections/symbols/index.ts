function rectIntersectsViewportBand(rect: DOMRect, offsetPercent: number) {
  const viewportWidth = window.innerWidth || 0;
  const viewportHeight = window.innerHeight || 0;
  const offset = (viewportHeight * (offsetPercent || 0)) / 100;
  const band = {
    left: 0,
    top: offset,
    right: viewportWidth,
    bottom: viewportHeight - offset,
  };

  return !(
    rect.left > band.right ||
    rect.right < band.left ||
    rect.top > band.bottom ||
    rect.bottom < band.top
  );
}

export function initSymbolsSection() {
  const section = document.querySelector(".s6");
  const frameItem1 = document.querySelector(".s6__frame-item._1");
  const frameItem2 = document.querySelector(".s6__frame-item._2");
  const show = document.querySelector(".s6 .show");
  const symbolsSection = document.querySelector(".s6__section");
  const bottomText = document.querySelector(".s6__container-bottom-text:not(.mob)");
  const bottomTextLabel = bottomText?.querySelector(
    ".s6__container-bottom__mask .p-normal-grotesk.white",
  ) as HTMLElement | null;
  const bottomTextCount = bottomText?.querySelector(
    ".s6__container-bottom-p .s6__container-bottom-p-mask",
  ) as HTMLElement | null;

  if (!(section instanceof HTMLElement)) return;

  const outCircBezier = "cubic-bezier(0.075, 0.820, 0.165, 1)";
  const isDesktop = window.innerWidth >= 992;

  function applySymbolsOutState() {
    if (frameItem1 instanceof HTMLElement) {
      frameItem1.style.transform = "translate3d(-50vw, 0px, 0px)";
    }
    if (frameItem2 instanceof HTMLElement) {
      frameItem2.style.transform = "translate3d(50vw, 0px, 0px)";
    }
    if (show instanceof HTMLElement) {
      show.style.transform = "translate3d(-50vw, 0px, 0px)";
    }
    if (symbolsSection instanceof HTMLElement) {
      symbolsSection.style.transform = "translate3d(50vw, 0px, 0px)";
    }
  }

  function playSymbolsIn() {
    if (frameItem1 instanceof HTMLElement) {
      frameItem1.style.transition = `transform 1000ms ${outCircBezier}`;
      frameItem1.style.transform = "translate3d(0vw, 0px, 0px)";
    }
    if (frameItem2 instanceof HTMLElement) {
      frameItem2.style.transition = `transform 1000ms ${outCircBezier}`;
      frameItem2.style.transform = "translate3d(0vw, 0px, 0px)";
    }
    if (show instanceof HTMLElement) {
      show.style.transition = "transform 1200ms ease";
      show.style.transform = "translate3d(0vw, 0px, 0px)";
    }
    if (symbolsSection instanceof HTMLElement) {
      symbolsSection.style.transition = "transform 1200ms ease";
      symbolsSection.style.transform = "translate3d(0vw, 0px, 0px)";
    }
  }

  function playSymbolsOut() {
    if (frameItem1 instanceof HTMLElement) {
      frameItem1.style.transition = `transform 1000ms ${outCircBezier}`;
      frameItem1.style.transform = "translate3d(-50vw, 0px, 0px)";
    }
    if (frameItem2 instanceof HTMLElement) {
      frameItem2.style.transition = `transform 1000ms ${outCircBezier}`;
      frameItem2.style.transform = "translate3d(50vw, 0px, 0px)";
    }
    if (show instanceof HTMLElement) {
      show.style.transition = "transform 1200ms ease";
      show.style.transform = "translate3d(-50vw, 0px, 0px)";
    }
    if (symbolsSection instanceof HTMLElement) {
      symbolsSection.style.transition = "transform 1200ms ease";
      symbolsSection.style.transform = "translate3d(50vw, 0px, 0px)";
    }
  }

  function applyBottomTextInitialState() {
    if (bottomTextLabel) {
      bottomTextLabel.style.transform = "translate3d(0px, 100%, 0px)";
    }
    if (bottomTextCount) {
      bottomTextCount.style.transform = "translate3d(0px, 100%, 0px)";
    }
  }

  function playBottomTextIn() {
    if (bottomTextLabel) {
      bottomTextLabel.style.transition = "transform 500ms ease";
      bottomTextLabel.style.transform = "translate3d(0px, 0%, 0px)";
    }
    if (bottomTextCount) {
      bottomTextCount.style.transition = "transform 500ms ease 100ms";
      bottomTextCount.style.transform = "translate3d(0px, 0%, 0px)";
    }
  }

  applyBottomTextInitialState();
  if (isDesktop) {
    applySymbolsOutState();
  }

  const targetSection = section;
  let rafId = 0;
  let entered = false;
  let bottomTextPlayed = false;

  function checkSymbolsState() {
    rafId = 0;
    const rect = targetSection.getBoundingClientRect();
    const shouldEnter = rectIntersectsViewportBand(rect, 50);
    const shouldStayForExit = rectIntersectsViewportBand(rect, 70);
    const shouldShowBottomText =
      bottomText instanceof HTMLElement &&
      (rectIntersectsViewportBand(bottomText.getBoundingClientRect(), 10) ||
        (!isDesktop && shouldEnter));

    if (isDesktop && !entered && shouldEnter) {
      entered = true;
      playSymbolsIn();
    }

    if (isDesktop && entered && !shouldStayForExit) {
      entered = false;
      playSymbolsOut();
    }

    if (!bottomTextPlayed && shouldShowBottomText) {
      bottomTextPlayed = true;
      playBottomTextIn();
    }
  }

  function requestCheckSymbolsState() {
    if (rafId) return;
    rafId = requestAnimationFrame(checkSymbolsState);
  }

  checkSymbolsState();
  window.addEventListener("scroll", requestCheckSymbolsState, { passive: true });
  window.addEventListener("resize", requestCheckSymbolsState);
}
