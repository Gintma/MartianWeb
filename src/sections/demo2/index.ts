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

type FloatingItem = {
  element: HTMLElement;
  x: number;
  y: number;
  rotate: number;
  progress: number;
  direction: 1 | -1;
};

function storeNaturalWidth(element: HTMLElement, width: number) {
  element.dataset.martianNaturalWidth = `${Math.max(width, 0)}`;
}

function getStoredNaturalWidth(element: HTMLElement | null) {
  return Number(element?.dataset.martianNaturalWidth || 0);
}

export function initDemo2Section() {
  const section = document.querySelector(".s9");
  if (!(section instanceof HTMLElement)) return;

  const parallaxItems = [
    { element: section.querySelector(".s9__container-img-1"), from: 5, to: -5 },
    { element: section.querySelector(".s9__container-img-2"), from: 20, to: -40 },
    { element: section.querySelector(".s9__container-img-3"), from: 7.5, to: -7.5 },
    { element: section.querySelector(".s9__container-img-4"), from: 7, to: -7 },
    { element: section.querySelector(".s9__container-img-5"), from: 30, to: -30 },
    { element: section.querySelector(".s9__container-img-6"), from: 1, to: -1 },
    { element: section.querySelector(".s9__container-img-7"), from: 25, to: -25 },
    { element: section.querySelector(".s9__container-img-8"), from: 8, to: -8 },
    { element: section.querySelector(".s9__container-img-9"), from: 10, to: -10 },
  ].filter(
    (
      item,
    ): item is typeof item & {
      element: HTMLElement;
    } => item.element instanceof HTMLElement,
  );

  const floatingItems: FloatingItem[] = [
    { element: section.querySelector(".s9__img-1") as HTMLElement | null, x: 0, y: -1.3888888888888888, rotate: 10, progress: 0, direction: 1 },
    { element: section.querySelector(".s9__img-4") as HTMLElement | null, x: 0.4861111111111111, y: 2.0833333333333335, rotate: -7, progress: 0, direction: 1 },
    { element: section.querySelector(".s9__img-3") as HTMLElement | null, x: 1.38, y: -0.7, rotate: 2, progress: 0, direction: 1 },
    { element: section.querySelector(".s9__img-2") as HTMLElement | null, x: 1.3888888888888888, y: -1.0416666666666667, rotate: 2, progress: 0, direction: 1 },
    { element: section.querySelector(".s9__img-6") as HTMLElement | null, x: -1.1, y: -2.2, rotate: -12, progress: 0, direction: 1 },
    { element: section.querySelector(".s9__img-7") as HTMLElement | null, x: 0, y: -2.0833333333333335, rotate: 5, progress: 0, direction: 1 },
    { element: section.querySelector(".s9__img-5") as HTMLElement | null, x: 1.3888888888888888, y: -1.3888888888888888, rotate: -5, progress: 0, direction: 1 },
    { element: section.querySelector(".s9__img-8") as HTMLElement | null, x: -2, y: -2, rotate: -7, progress: 0, direction: 1 },
    { element: section.querySelector(".s9__img-9") as HTMLElement | null, x: -2.8472222222222223, y: -1.45, rotate: -6, progress: 0, direction: 1 },
    { element: section.querySelector(".s9__img-10") as HTMLElement | null, x: 0, y: -2.0833333333333335, rotate: 7, progress: 0, direction: 1 },
  ].filter((item): item is FloatingItem => item.element instanceof HTMLElement);

  const desktopText = section.parentElement?.querySelector(".s9-text");
  const mobileText = section.parentElement?.querySelector(".s9-text-mob");
  const desktopTextItems =
    desktopText instanceof HTMLElement
      ? Array.from(desktopText.querySelectorAll<HTMLElement>(".s9-text-item > .s9-p"))
      : [];
  const mobileTextItems =
    mobileText instanceof HTMLElement
      ? Array.from(mobileText.querySelectorAll<HTMLElement>(".s9-text-item > .s9-p"))
      : [];
  const lineItems = Array.from(section.querySelectorAll<HTMLElement>(".s9__container-line"));
  const smallHoverContainers = Array.from(
    section.querySelectorAll<HTMLElement>(
      ".s9__container-img-1, .s9__container-img-3, .s9__container-img-4, .s9__container-img-6, .s9__container-img-8",
    ),
  );
  const globalSmallMasks = Array.from(
    section.querySelectorAll<HTMLElement>(".s9__small-container-mask"),
  );
  const globalLineCenters = Array.from(
    section.querySelectorAll<HTMLElement>(".s9__line-ic-center"),
  );

  function measureNaturalWidths() {
    const widthTargets = [
      ...globalSmallMasks,
      ...globalLineCenters,
      ...lineItems.flatMap((line) =>
        Array.from(
          line.querySelectorAll<HTMLElement>(
            ".s9__container-text-number, .s9__mask-item-1, .s9__mask-item-2, .s9__mask-item-3",
          ),
        ),
      ),
    ];

    widthTargets.forEach((element) => {
      const previousWidth = element.style.width;
      element.style.width = "";
      const rectWidth = element.getBoundingClientRect().width;
      const fallbackWidth = element.scrollWidth || rectWidth;
      storeNaturalWidth(element, fallbackWidth);
      element.style.width = previousWidth;
    });
  }

  function applyLineDesktopInitialState(line: HTMLElement) {
    const lineIc = line.querySelector<HTMLElement>(".s9__line-ic");
    const plusIc = line.querySelector<HTMLElement>(".s9__plus-ic");
    const textNumber = line.querySelector<HTMLElement>(".s9__container-text-number");
    const masks = Array.from(
      line.querySelectorAll<HTMLElement>(
        ".s9__mask-item-1, .s9__mask-item-2, .s9__mask-item-3",
      ),
    );

    if (lineIc) lineIc.style.opacity = "0";
    if (plusIc) plusIc.style.opacity = "0";
    if (textNumber) textNumber.style.width = "0px";
    masks.forEach((item) => {
      item.style.width = "0px";
    });
    globalSmallMasks.forEach((item) => {
      item.style.width = "0px";
    });
    globalLineCenters.forEach((item) => {
      item.style.width = "0px";
    });
  }

  function playLineDesktopIn(line: HTMLElement) {
    const lineIc = line.querySelector<HTMLElement>(".s9__line-ic");
    const plusIc = line.querySelector<HTMLElement>(".s9__plus-ic");
    const textNumber = line.querySelector<HTMLElement>(".s9__container-text-number");
    const mask1 = line.querySelector<HTMLElement>(".s9__mask-item-1");
    const mask2 = line.querySelector<HTMLElement>(".s9__mask-item-2");
    const mask3 = line.querySelector<HTMLElement>(".s9__mask-item-3");

    if (lineIc) {
      lineIc.style.transition = "opacity 300ms ease-out";
      lineIc.style.opacity = "1";
    }

    globalLineCenters.forEach((item) => {
      item.style.transition = "width 300ms ease-in";
      item.style.width = `${getStoredNaturalWidth(item)}px`;
    });

    window.setTimeout(() => {
      if (plusIc) {
        plusIc.style.transition = "opacity 300ms ease-out";
        plusIc.style.opacity = "1";
      }
      if (textNumber) {
        textNumber.style.transition = "width 300ms ease-in";
        textNumber.style.width = `${getStoredNaturalWidth(textNumber)}px`;
      }
      if (mask1) {
        mask1.style.transition = "width 300ms ease-in";
        mask1.style.width = `${getStoredNaturalWidth(mask1)}px`;
      }
      globalSmallMasks.forEach((item) => {
        item.style.transition = "width 300ms ease-in";
        item.style.width = `${getStoredNaturalWidth(item)}px`;
      });
    }, 100);

    window.setTimeout(() => {
      if (mask2) {
        mask2.style.transition = "width 300ms ease-in";
        mask2.style.width = `${getStoredNaturalWidth(mask2)}px`;
      }
    }, 200);

    window.setTimeout(() => {
      if (mask3) {
        mask3.style.transition = "width 300ms ease-in";
        mask3.style.width = `${getStoredNaturalWidth(mask3)}px`;
      }
    }, 300);
  }

  function playLineDesktopOut(line: HTMLElement) {
    const lineIc = line.querySelector<HTMLElement>(".s9__line-ic");
    const plusIc = line.querySelector<HTMLElement>(".s9__plus-ic");
    const textNumber = line.querySelector<HTMLElement>(".s9__container-text-number");
    const mask1 = line.querySelector<HTMLElement>(".s9__mask-item-1");
    const mask2 = line.querySelector<HTMLElement>(".s9__mask-item-2");
    const mask3 = line.querySelector<HTMLElement>(".s9__mask-item-3");
    const lineCenters = Array.from(
      line.querySelectorAll<HTMLElement>(".s9__line-ic-center"),
    );

    if (mask3) {
      mask3.style.transition = "width 300ms ease-in";
      mask3.style.width = "0px";
    }
    if (mask1) {
      mask1.style.transition = "width 300ms ease-in";
      mask1.style.width = "0px";
    }
    if (mask2) {
      mask2.style.transition = "width 300ms ease-in";
      mask2.style.width = "0px";
    }
    if (textNumber) {
      textNumber.style.transition = "width 300ms ease-in";
      textNumber.style.width = "0px";
    }
    globalSmallMasks.forEach((item) => {
      item.style.transition = "width 300ms ease-in";
      item.style.width = "0px";
    });

    window.setTimeout(() => {
      lineCenters.forEach((item) => {
        item.style.transition = "width 300ms ease-in";
        item.style.width = "0px";
      });
    }, 200);

    window.setTimeout(() => {
      if (plusIc) {
        plusIc.style.transition = "opacity 300ms ease";
        plusIc.style.opacity = "0";
      }
      if (lineIc) {
        lineIc.style.transition = "opacity 300ms ease";
        lineIc.style.opacity = "0";
      }
    }, 300);
  }

  function showSingleSmallMask(container: HTMLElement) {
    const mask = container.querySelector<HTMLElement>(".s9__small-container-mask");
    if (!mask) return;
    mask.style.transition = "width 300ms ease-in";
    mask.style.width = `${getStoredNaturalWidth(mask)}px`;
  }

  function hideSingleSmallMask(container: HTMLElement) {
    const mask = container.querySelector<HTMLElement>(".s9__small-container-mask");
    if (!mask) return;
    mask.style.transition = "width 300ms ease-in";
    mask.style.width = "0px";
  }

  function applyLineMobileState(line: HTMLElement, visible: boolean) {
    const mobileLine = line.querySelector<HTMLElement>(".s9__line-ic-mob");
    const mobilePlus = line.querySelector<HTMLElement>(".s9__plus-ic-mob");

    [mobileLine, mobilePlus].forEach((item) => {
      if (!item) return;
      item.style.transition = "opacity 500ms ease-out";
      item.style.opacity = visible ? "1" : "0";
    });
  }

  function updateFloatingItem(item: FloatingItem, inView: boolean) {
    if (!inView) {
      item.progress = 0;
      item.direction = 1;
      item.element.style.transform = "translate3d(0vw, 0vw, 0px) rotateZ(0deg)";
      return;
    }

    item.progress += item.direction * (16 / 4000);
    if (item.progress >= 1) {
      item.progress = 1;
      item.direction = -1;
    } else if (item.progress <= 0) {
      item.progress = 0;
      item.direction = 1;
    }

    const eased =
      item.progress < 0.5
        ? 2 * item.progress * item.progress
        : 1 - Math.pow(-2 * item.progress + 2, 2) / 2;

    const x = lerp(0, item.x, eased);
    const y = lerp(0, item.y, eased);
    const rotate = lerp(0, item.rotate, eased);
    item.element.style.transform = `translate3d(${x}vw, ${y}vw, 0px) rotateZ(${rotate}deg)`;
  }

  measureNaturalWidths();

  floatingItems.forEach((item) => {
    item.element.style.transform = "translate3d(0vw, 0vw, 0px) rotateZ(0deg)";
    item.element.style.willChange = "transform";
  });

  lineItems.forEach((line) => {
    applyLineDesktopInitialState(line);
    applyLineMobileState(line, false);
  });

  desktopTextItems.forEach((item) => {
    item.style.transform = "translate3d(0px, 100%, 0px)";
    item.style.willChange = "transform";
  });

  mobileTextItems.forEach((item) => {
    item.style.transform = "translate3d(0px, 100%, 0px)";
    item.style.willChange = "transform";
  });

  if (window.innerWidth >= 992) {
    lineItems.forEach((line) => {
      line.addEventListener("mouseenter", () => {
        playLineDesktopIn(line);
      });
      line.addEventListener("mouseleave", () => {
        playLineDesktopOut(line);
      });
    });

    smallHoverContainers.forEach((container) => {
      container.addEventListener("mouseenter", () => {
        showSingleSmallMask(container);
      });
      container.addEventListener("mouseleave", () => {
        hideSingleSmallMask(container);
      });
    });
  }

  let rafId = 0;

  function applyDemo2SectionAnimations() {
    rafId = 0;

    parallaxItems.forEach(({ element, from, to }) => {
      const progress = normalizeInViewProgress(element);
      const y = lerp(from, to, progress);
      element.style.transform = `translate3d(0px, ${y}vw, 0px)`;
    });

    const desktopProgress =
      desktopText instanceof HTMLElement ? normalizeInViewProgress(desktopText) * 100 : 0;
    const desktopY = resolveKeyframedValue(desktopProgress, [
      { progress: 5, value: 100 },
      { progress: 45, value: 0 },
    ]);
    desktopTextItems.forEach((item) => {
      item.style.transform = `translate3d(0px, ${desktopY}%, 0px)`;
    });

    const mobileProgress =
      mobileText instanceof HTMLElement ? normalizeInViewProgress(mobileText) * 100 : 0;
    const mobileY = resolveKeyframedValue(mobileProgress, [
      { progress: 10, value: 100 },
      { progress: 50, value: 0 },
    ]);
    mobileTextItems.forEach((item) => {
      item.style.transform = `translate3d(0px, ${mobileY}%, 0px)`;
    });

    if (window.innerWidth <= 991) {
      lineItems.forEach((line) => {
        applyLineMobileState(
          line,
          rectIntersectsViewportBand(line.getBoundingClientRect(), 50),
        );
      });
    }
  }

  function requestApplyDemo2SectionAnimations() {
    if (rafId) return;
    rafId = requestAnimationFrame(applyDemo2SectionAnimations);
  }

  function handleDemo2Resize() {
    measureNaturalWidths();
    requestApplyDemo2SectionAnimations();
  }

  function animateFloatingItems() {
    floatingItems.forEach((item) => {
      const rect = item.element.getBoundingClientRect();
      const inView = rect.bottom >= 0 && rect.top <= (window.innerHeight || 0);
      updateFloatingItem(item, inView);
    });

    requestAnimationFrame(animateFloatingItems);
  }

  applyDemo2SectionAnimations();
  requestAnimationFrame(animateFloatingItems);
  window.addEventListener("scroll", requestApplyDemo2SectionAnimations, {
    passive: true,
  });
  window.addEventListener("resize", handleDemo2Resize);
}
