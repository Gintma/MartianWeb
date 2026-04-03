function clamp(value: number, min: number, max: number) {
  return Math.min(Math.max(value, min), max);
}

function lerp(start: number, end: number, progress: number) {
  return start + (end - start) * progress;
}

function resolveKeyframedValue(
  progress: number,
  keyframes: Array<{ progress: number; value: number }>,
) {
  if (!keyframes.length) return null;
  if (progress <= keyframes[0].progress) return keyframes[0].value;
  for (let index = 1; index < keyframes.length; index += 1) {
    const previous = keyframes[index - 1];
    const current = keyframes[index];
    if (progress <= current.progress) {
      const localProgress =
        (progress - previous.progress) / (current.progress - previous.progress);
      return lerp(previous.value, current.value, localProgress);
    }
  }
  return keyframes[keyframes.length - 1].value;
}

export function initFooterSection() {
  const footerContainer = document.querySelector(".footer__container");
  if (!(footerContainer instanceof HTMLElement)) return;
  const targetFooterContainer = footerContainer;

  const leftCard = footerContainer.querySelector<HTMLElement>(
    ".footer__card-item.margin._1",
  );
  const rightCard = footerContainer.querySelector<HTMLElement>(".footer__card-item._2");
  const footerLinks = footerContainer.querySelector<HTMLElement>(".footer__links");
  const blackLeft = footerContainer.querySelector<HTMLElement>(".footer__lines-item-1-black");
  const rightLine = footerContainer.querySelector<HTMLElement>(".footer__lines-item-2");
  const footerCards = Array.from(
    footerContainer.querySelectorAll<HTMLElement>(".footer__card-item"),
  );

  function resetMobileFooterStyles() {
    if (leftCard) {
      leftCard.style.transform = "";
    }
    if (rightCard) {
      rightCard.style.transform = "";
    }
    if (blackLeft) {
      blackLeft.style.opacity = "";
    }
    if (rightLine) {
      rightLine.style.opacity = "";
    }
    if (footerLinks) {
      footerLinks.style.opacity = "";
    }
  }

  footerCards.forEach((card) => {
    const hoverLayer = card.querySelector<HTMLElement>(".bt-orange__hover");
    const monoTitle = card.querySelector<HTMLElement>(".p-big-mono");
    const groteskTitle = card.querySelector<HTMLElement>(".p-big-grotesk");

    if (hoverLayer) {
      hoverLayer.style.opacity = "0";
      hoverLayer.style.transition = "opacity 200ms ease-out";
    }
    if (monoTitle) {
      monoTitle.style.color = "#fff";
      monoTitle.style.transition = "color 300ms ease";
    }
    if (groteskTitle) {
      groteskTitle.style.color = "#fff";
      groteskTitle.style.transition = "color 300ms ease";
    }

    if (window.innerWidth >= 992) {
      card.addEventListener("mouseenter", () => {
        if (hoverLayer) hoverLayer.style.opacity = "1";
        if (monoTitle) monoTitle.style.color = "#E43C0C";
        if (groteskTitle) groteskTitle.style.color = "#E43C0C";
      });

      card.addEventListener("mouseleave", () => {
        if (hoverLayer) hoverLayer.style.opacity = "0";
        if (monoTitle) monoTitle.style.color = "#fff";
        if (groteskTitle) groteskTitle.style.color = "#fff";
      });
    }
  });

  function getFooterTargetProgress() {
    const rect = targetFooterContainer.getBoundingClientRect();
    const viewportHeight = window.innerHeight || 1;
    return clamp((-rect.top) / viewportHeight, 0, 1) * 100;
  }

  function renderFooterAnimations(progress: number) {
    const leftX = resolveKeyframedValue(progress, [
      { progress: 0, value: -107 },
      { progress: 35, value: 0 },
    ]);
    const rightX = resolveKeyframedValue(progress, [
      { progress: 0, value: 107 },
      { progress: 35, value: 0 },
    ]);

    if (leftCard) {
      leftCard.style.transform = `translate3d(${leftX}%, 0px, 0px)`;
    }
    if (rightCard) {
      rightCard.style.transform = `translate3d(${rightX}%, 0px, 0px)`;
    }

    if (blackLeft) {
      if (progress < 32.9) {
        blackLeft.style.opacity = "";
      } else if (progress < 33) {
        blackLeft.style.opacity = "1";
      } else {
        blackLeft.style.opacity = "0";
      }
    }

    if (rightLine) {
      if (progress < 32.9) {
        rightLine.style.opacity = "";
      } else if (progress < 33) {
        rightLine.style.opacity = "1";
      } else {
        rightLine.style.opacity = "0";
      }
    }

    if (footerLinks) {
      const linksOpacity = resolveKeyframedValue(progress, [
        { progress: 0, value: 0 },
        { progress: 36, value: 0 },
        { progress: 37, value: 1 },
      ]);
      footerLinks.style.opacity = `${linksOpacity}`;
    }
  }

  let rafId = 0;

  function applyFooterAnimations() {
    rafId = 0;
    if (window.innerWidth < 992) {
      resetMobileFooterStyles();
      return;
    }
    renderFooterAnimations(getFooterTargetProgress());
  }

  function requestApplyFooterAnimations() {
    if (rafId) return;
    rafId = requestAnimationFrame(applyFooterAnimations);
  }

  if (window.innerWidth >= 992) {
    renderFooterAnimations(getFooterTargetProgress());
  } else {
    resetMobileFooterStyles();
  }
  window.addEventListener("scroll", requestApplyFooterAnimations, {
    passive: true,
  });
  window.addEventListener("resize", requestApplyFooterAnimations);
}
