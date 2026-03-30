function setTransition(element: Element | null, transition: string) {
  if (!(element instanceof HTMLElement)) return;
  element.style.transition = transition;
}

function setTransform(element: Element | null, transform: string) {
  if (!(element instanceof HTMLElement)) return;
  element.style.transform = transform;
}

function setOpacity(element: Element | null, value: string) {
  if (!(element instanceof HTMLElement)) return;
  element.style.opacity = value;
}

function animatePercentage(
  element: HTMLElement | null,
  start: number,
  end: number,
  duration: number,
) {
  if (!element) return;
  const target = element;
  const startTime = performance.now();

  function updatePercentage(timestamp: number) {
    const progress = Math.min((timestamp - startTime) / duration, 1);
    const currentPercentage = start + progress * (end - start);
    target.textContent = `${Math.round(currentPercentage)}%`;

    if (progress < 1) {
      requestAnimationFrame(updatePercentage);
    }
  }

  requestAnimationFrame(updatePercentage);
}

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

function normalizeEnteringProgress(element: Element | null) {
  if (!(element instanceof HTMLElement)) return 0;
  const rect = element.getBoundingClientRect();
  const viewportHeight = window.innerHeight || 1;
  return clamp((viewportHeight - rect.top) / viewportHeight, 0, 1);
}

function normalizeEnteringProgressFromDocumentTop(documentTop: number) {
  const viewportHeight = window.innerHeight || 1;
  const top = documentTop - window.scrollY;
  return clamp((viewportHeight - top) / viewportHeight, 0, 1);
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

function normalizeProgressWindow(
  progress: number,
  start: number,
  end: number,
) {
  if (end <= start) return progress >= end ? 1 : 0;
  return clamp((progress - start) / (end - start), 0, 1);
}

function animateElement(
  element: Element | null,
  {
    delay = 0,
    duration = 300,
    easing = "ease",
    opacity,
    transform,
    width,
  }: {
    delay?: number;
    duration?: number;
    easing?: string;
    opacity?: string;
    transform?: string;
    width?: string;
  },
) {
  if (!(element instanceof HTMLElement)) return;

  window.setTimeout(() => {
    const transitions = [];
    if (transform !== undefined) {
      transitions.push(`transform ${duration}ms ${easing}`);
    }
    if (opacity !== undefined) {
      transitions.push(`opacity ${duration}ms ${easing}`);
    }
    if (width !== undefined) {
      transitions.push(`width ${duration}ms ${easing}`);
    }
    if (transitions.length) {
      setTransition(element, transitions.join(", "));
    }

    requestAnimationFrame(() => {
      if (transform !== undefined) {
        setTransform(element, transform);
      }
      if (opacity !== undefined) {
        setOpacity(element, opacity);
      }
      if (width !== undefined) {
        element.style.width = width;
      }
    });
  }, delay);
}

const firstScreenSequenceState = {
  initialized: false,
  started: false,
  emptyPulseStarted: false,
};

function startEmptyIndicatorPulse() {
  if (firstScreenSequenceState.emptyPulseStarted) return;

  const emptyAbsolute = document.querySelector(
    ".s1__item-p-empty-absolute",
  ) as HTMLElement | null;
  if (!emptyAbsolute) return;
  const target = emptyAbsolute;

  firstScreenSequenceState.emptyPulseStarted = true;
  target.style.opacity = "0";
  target.style.willChange = "opacity";

  function fadeIn() {
    target.style.transition = "opacity 500ms ease-out";
    target.style.opacity = "1";
    window.setTimeout(fadeOut, 500);
  }

  function fadeOut() {
    target.style.transition = "opacity 500ms ease";
    target.style.opacity = "0";
    window.setTimeout(fadeIn, 500);
  }

  fadeIn();
}

function initFirstScreenState() {
  if (firstScreenSequenceState.initialized) return;

  const menuLine = document.querySelector(".menu__container-line");
  const bottomBar = document.querySelector(".container-bottom__p");
  const bottomItems = document.querySelector(".container-bottom__p-items");
  const burger = document.querySelector(".menu__bt-burger");
  const logo = document.querySelector(".link-logo");
  const desktopCta = document.querySelector(".menu .bt-orange.mob-hide");
  const mobileCta = document.querySelector(".s1__mob-bt-container .bt-orange");
  const orangeMask = document.querySelector(".s1__container-p-orange-mask");
  const orangeInner = document.querySelector(".s1__container-p-orange");
  const textMasks = [
    document.querySelector(".s1__text-mask-s._1"),
    document.querySelector(".s1__text-mask-s._2"),
    document.querySelector(".s1__text-mask-s._3"),
    document.querySelector(".s1__text-mask-s._4"),
  ].filter(Boolean);
  const textInners = [
    document.querySelector(".s1__text-mask-s._1 .p-normal-grotesk"),
    document.querySelector(".s1__text-mask-s._2 .p-normal-grotesk"),
    document.querySelector(".s1__text-mask-s._3 .p-normal-grotesk"),
    document.querySelector(".s1__text-mask-s._4 .p-normal-grotesk"),
  ].filter(Boolean);
  const titles = [
    document.querySelector(".s1__container-h1 .h1-mono"),
    document.querySelector(".s1__container-h1._2 .h1-mono"),
  ].filter(Boolean);
  const titleContainers = document.querySelectorAll(".s1__container-h1");
  const backgroundImages = [
    document.querySelector(".s1__bg-image-1"),
    document.querySelector(".s1__bg-image-2"),
  ].filter(Boolean);
  const emptyItem = document.querySelector(
    ".s1__item-p-empty",
  ) as HTMLElement | null;
  const emptyAbsolute = document.querySelector(
    ".s1__item-p-empty-absolute",
  ) as HTMLElement | null;
  const capsMask = document.querySelector(
    ".s1__p-caps-mask-7",
  ) as HTMLElement | null;
  const lineMask = document.querySelector(".s1__ic-line-mask") as HTMLElement | null;

  [menuLine, bottomBar, burger, logo, desktopCta, mobileCta].forEach((element) =>
    setOpacity(element, "0"),
  );

  if (bottomItems instanceof HTMLElement) {
    bottomItems.style.display = "block";
  }

  setTransform(orangeMask, "translate3d(0, 24vh, 0)");
  setTransform(orangeInner, "translate3d(0, 102%, 0)");

  textMasks.forEach((element) => {
    setTransform(element, "translate3d(0, 24vh, 0)");
  });

  textInners.forEach((element) => {
    setTransform(element, "translate3d(0, 102%, 0)");
  });

  titles.forEach((element) => {
    setTransform(element, "translate3d(0, 101%, 0)");
  });

  if (window.innerWidth >= 992) {
    titleContainers.forEach((element) => {
      setTransform(element, "scale3d(0.9, 0.9, 1)");
      if (element instanceof HTMLElement) {
        element.style.transformOrigin = "50% 50%";
      }
    });
  }

  backgroundImages.forEach((element) => {
    setOpacity(element, "1");
    setTransform(element, "translate3d(0, 5%, 0) scale3d(1.2, 1.2, 1)");
  });

  if (emptyItem) {
    const targetWidth = emptyItem.getBoundingClientRect().width;
    const targetHeight = emptyItem.getBoundingClientRect().height;
    emptyItem.dataset.targetWidth = `${targetWidth}px`;
    emptyItem.dataset.targetHeight = `${targetHeight}px`;
    emptyItem.style.width = "0px";
    emptyItem.style.height = `${targetHeight}px`;
    emptyItem.style.overflow = "hidden";
  }

  if (emptyAbsolute) {
    emptyAbsolute.style.opacity = "0";
  }

  if (capsMask) {
    const targetWidth = capsMask.getBoundingClientRect().width;
    capsMask.dataset.targetWidth = `${targetWidth}px`;
    capsMask.style.width = "0px";
    capsMask.style.overflow = "hidden";
  }

  if (lineMask) {
    lineMask.style.width = "0%";
    lineMask.style.overflow = "hidden";
  }

  firstScreenSequenceState.initialized = true;
}

function playFirstScreenSequence() {
  if (firstScreenSequenceState.started) return;
  firstScreenSequenceState.started = true;

  const burger = document.querySelector(".menu__bt-burger");
  const logo = document.querySelector(".link-logo");
  const desktopCta = document.querySelector(".menu .bt-orange.mob-hide");
  const mobileCta = document.querySelector(".s1__mob-bt-container .bt-orange");
  const orangeMask = document.querySelector(".s1__container-p-orange-mask");
  const orangeInner = document.querySelector(".s1__container-p-orange");
  const textMasks = [
    document.querySelector(".s1__text-mask-s._1"),
    document.querySelector(".s1__text-mask-s._2"),
    document.querySelector(".s1__text-mask-s._3"),
    document.querySelector(".s1__text-mask-s._4"),
  ].filter(Boolean);
  const textInners = [
    document.querySelector(".s1__text-mask-s._1 .p-normal-grotesk"),
    document.querySelector(".s1__text-mask-s._2 .p-normal-grotesk"),
    document.querySelector(".s1__text-mask-s._3 .p-normal-grotesk"),
    document.querySelector(".s1__text-mask-s._4 .p-normal-grotesk"),
  ].filter(Boolean);
  const lineMask = document.querySelector(".s1__ic-line-mask");
  const titleMartian = document.querySelector(".s1__container-h1 .h1-mono");
  const titleMono = document.querySelector(".s1__container-h1._2 .h1-mono");
  const backgroundImage1 = document.querySelector(".s1__bg-image-1");
  const backgroundImage2 = document.querySelector(".s1__bg-image-2");
  const emptyItem = document.querySelector(
    ".s1__item-p-empty",
  ) as HTMLElement | null;
  animateElement(orangeInner, {
    delay: 0,
    duration: 950,
    transform: "translate3d(0, 0, 0)",
  });

  textInners.forEach((element, index) => {
    animateElement(element, {
      delay: 100 + index * 100,
      duration: 300,
      transform: "translate3d(0, 0, 0)",
    });
  });

  animateElement(mobileCta, {
    delay: 500,
    duration: 400,
    opacity: "1",
  });

  animateElement(orangeMask, {
    delay: 0,
    duration: 950,
    transform: "translate3d(0, 0, 0)",
  });

  textMasks.forEach((element, index) => {
    animateElement(element, {
      delay: 10 + index * 10,
      duration: 950,
      transform: "translate3d(0, 0, 0)",
    });
  });

  animateElement(backgroundImage1, {
    delay: 300,
    duration: 850,
    easing: "ease",
    transform: "translate3d(0, 0, 0) scale3d(1, 1, 1)",
    opacity: "1",
  });
  animateElement(backgroundImage2, {
    delay: 300,
    duration: 850,
    easing: "ease",
    transform: "translate3d(0, 0, 0) scale3d(1, 1, 1)",
    opacity: "1",
  });

  window.setTimeout(() => {
    if (backgroundImage1 instanceof HTMLElement) {
      backgroundImage1.style.transition = "none";
    }
    if (backgroundImage2 instanceof HTMLElement) {
      backgroundImage2.style.transition = "none";
    }
  }, 1150);

  animateElement(titleMartian, {
    delay: 300,
    duration: 1000,
    transform: "translate3d(0, 0, 0)",
  });
  animateElement(titleMono, {
    delay: 500,
    duration: 1000,
    transform: "translate3d(0, 0, 0)",
  });

  animateElement(lineMask, {
    delay: 900,
    duration: 1000,
    width: "100%",
  });

  if (emptyItem) {
    const targetWidth = emptyItem.dataset.targetWidth || "auto";
    animateElement(emptyItem, {
      delay: 2000,
      duration: 1000,
      width: targetWidth,
    });
    window.setTimeout(() => {
      emptyItem.style.width = "auto";
      const targetHeight = emptyItem.dataset.targetHeight;
      if (targetHeight) {
        emptyItem.style.height = targetHeight;
      }
    }, 3000);
  }

  [burger, logo, desktopCta].forEach((element) => {
    animateElement(element, {
      delay: 2200,
      duration: 800,
      easing: "ease-out",
      opacity: "1",
    });
  });

  window.setTimeout(() => {
    startEmptyIndicatorPulse();
  }, 2200);
}

function initPreloaderSequence() {
  const preloader = document.querySelector(".preloader") as HTMLElement | null;
  const preloaderBlock = document.querySelector(
    ".preloader__block",
  ) as HTMLElement | null;
  const batteryBlock = document.querySelector(
    ".preloader__block-battery",
  ) as HTMLElement | null;
  const percentageBlock = document.querySelector(
    ".preloader__block-p",
  ) as HTMLElement | null;
  const percentageElement = document.getElementById("percentage");
  const menuLine = document.querySelector(".menu__container-line") as HTMLElement | null;
  const bottomBar = document.querySelector(".container-bottom__p") as HTMLElement | null;
  const batterySteps = [
    document.querySelector(".preloader__battery-img-2"),
    document.querySelector(".preloader__battery-img-3"),
    document.querySelector(".preloader__battery-img-4"),
    document.querySelector(".preloader__battery-img-5"),
  ].filter((value): value is HTMLElement => value instanceof HTMLElement);

  if (!preloader) return;

  const batteryStepDuration = 800;
  const batteryPhaseDuration = batterySteps.length * batteryStepDuration;
  const collapseDuration = 500;
  const expandDuration = 500;
  const preloaderFadeDuration = 600;
  const percentageDuration = 3000;
  const totalDuration =
    batteryPhaseDuration +
    collapseDuration +
    expandDuration +
    preloaderFadeDuration;

  batterySteps.forEach((step) => {
    step.style.opacity = "0";
    step.style.transition = "opacity 800ms ease-out";
  });

  requestAnimationFrame(() => {
    animatePercentage(percentageElement, 0, 100, percentageDuration);

    batterySteps.forEach((step, index) => {
      window.setTimeout(() => {
        step.style.opacity = "1";
      }, index * batteryStepDuration);
    });

    window.setTimeout(() => {
      if (preloaderBlock) {
        preloaderBlock.style.transition = "width 500ms ease, height 500ms ease";
        preloaderBlock.style.width = "11.38vw";
        preloaderBlock.style.height = "100%";
      }
      if (batteryBlock) {
        batteryBlock.style.transition = "opacity 500ms ease-out";
        batteryBlock.style.opacity = "0";
      }
      if (percentageBlock) {
        percentageBlock.style.transition = "opacity 500ms ease-out";
        percentageBlock.style.opacity = "0";
      }
    }, batteryPhaseDuration);

    window.setTimeout(() => {
      if (preloaderBlock) {
        preloaderBlock.style.transition = "width 500ms ease, height 500ms ease";
        preloaderBlock.style.width = "100%";
        preloaderBlock.style.height = "100%";
      }
    }, batteryPhaseDuration + collapseDuration);

    window.setTimeout(() => {
      if (menuLine) {
        menuLine.style.transition = "none";
        menuLine.style.opacity = "1";
      }
      if (bottomBar) {
        bottomBar.style.transition = "none";
        bottomBar.style.opacity = "1";
      }
      preloader.classList.add("is-exiting");
      preloader.setAttribute("aria-hidden", "true");
    }, batteryPhaseDuration + collapseDuration + expandDuration);

    window.setTimeout(() => {
      preloader.classList.add("edit");
      preloader.style.display = "none";
      playFirstScreenSequence();
      const maybeWindow = window as Window & {
        __martianUnblockScroll?: () => void;
      };
      if (typeof maybeWindow.__martianUnblockScroll === "function") {
        maybeWindow.__martianUnblockScroll();
      }
    }, totalDuration);
  });
}

function initFirstSectionObservers() {
  const smallTextContainer = document.querySelector(".s1__container-p-b");
  if (!smallTextContainer) return;

  const smallTextItems = [
    smallTextContainer.querySelector(".s1__container-p-b-mask:nth-child(1) > *"),
    smallTextContainer.querySelector(".s1__container-p-b-mask:nth-child(2) > *"),
    smallTextContainer.querySelector(".s1__container-p-b-mask:nth-child(3) > *"),
  ].filter(Boolean);

  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (!entry.isIntersecting) return;

        smallTextItems.forEach((element, index) => {
          animateElement(element, {
            delay: index * 100,
            duration: 500,
            easing: "ease",
            transform: "translate3d(0, 0, 0)",
          });
        });

        observer.disconnect();
      });
    },
    { threshold: 0.4 },
  );

  observer.observe(smallTextContainer);
}

function initFirstScreenScrollEffects() {
  if (window.innerWidth < 992) return;

  const firstTrigger = document.querySelector(".s1__scroll-animation-trigger");
  const secondTrigger = document.querySelector(".s2__trigger-animation-scroll");
  const blackContainer = document.querySelector(".s1__bg-black-container");
  const orangeContainer = document.querySelector(".s1__bg-orange-container");
  const bgBlack = document.querySelector(".s1__bg-black");
  const bgImage1 = document.querySelector(".s1__bg-image-1");
  const bgImage2 = document.querySelector(".s1__bg-image-2");
  const bgImage3 = document.querySelector(".s1__bg-image-3");
  const bgImage4 = document.querySelector(".s1__bg-image-4");
  const bgImage4Bg = document.querySelector(".s1__bg-image-4-bg");
  const titleContainers = Array.from(
    document.querySelectorAll(".s1__container-h1"),
  );
  const titleHeadings = Array.from(
    document.querySelectorAll(".s1__container-h1 .h1-mono"),
  );
  const circleBg = document.querySelector(".s2__circle-bg-container");
  if (!firstTrigger) return;
  const blackContainerDocumentTop =
    blackContainer instanceof HTMLElement
      ? blackContainer.getBoundingClientRect().top + window.scrollY
      : null;

  const firstScreenKeyframes = {
    titleScale: [
      { progress: 0, value: 0.9 },
      { progress: 0.3, value: 1 },
    ],
    bg1Y: [
      { progress: 0, value: 0 },
      { progress: 0.8, value: -10 },
    ],
    bg1Scale: [
      { progress: 0, value: 1 },
      { progress: 0.8, value: 1.4 },
    ],
    bg2Y: [
      { progress: 0, value: 0 },
      { progress: 0.95, value: -20 },
    ],
    bg2Scale: [
      { progress: 0, value: 1 },
      { progress: 0.95, value: 1.4 },
    ],
    bg3Y: [
      { progress: 0, value: 5 },
      { progress: 0.95, value: -60 },
    ],
    bg3Scale: [
      { progress: 0, value: 1 },
      { progress: 0.95, value: 1.6 },
    ],
    bg4X: [
      { progress: 0, value: 0 },
      { progress: 1, value: 10 },
    ],
    bg4Y: [
      { progress: 0, value: 0 },
      { progress: 1, value: -80 },
    ],
    bg4Scale: [
      { progress: 0, value: 1 },
      { progress: 1, value: 1.4 },
    ],
  };

  const blackContainerKeyframes = {
    titleWeight: [
      { progress: 0.1, value: 400 },
      { progress: 0.8, value: 800 },
    ],
    orangeY: [
      { progress: 0, value: 0 },
      { progress: 0.8, value: -60 },
    ],
    blackContainerY: [
      { progress: 0, value: 0 },
      { progress: 1, value: -100 },
    ],
    blackScale: [
      { progress: 0, value: 1 },
      { progress: 1, value: 1.6 },
    ],
  };

  const secondScreenKeyframes = {
    titleY: [
      { progress: 0, value: 0 },
      { progress: 1, value: -10 },
    ],
    circleY: [
      { progress: 0, value: 0 },
      { progress: 1, value: -20 },
    ],
  };

  let rafId = 0;
  let firstProgressTarget = normalizeInViewProgress(firstTrigger);
  let firstProgressCurrent = firstProgressTarget;
  let secondProgressTarget = secondTrigger
    ? normalizeEnteringProgress(secondTrigger)
    : 0;
  let secondProgressCurrent = secondProgressTarget;
  let blackProgressTarget =
    blackContainerDocumentTop !== null
      ? normalizeEnteringProgressFromDocumentTop(blackContainerDocumentTop)
      : 0;
  let blackProgressCurrent = blackProgressTarget;
  const smoothingFactor = 0.1;

  function applyTransforms() {
    const firstProgress = firstProgressCurrent;
    const secondProgress = secondProgressCurrent;
    const blackProgressRaw = clamp(blackProgressCurrent, 0, 1);
    const blackProgress = normalizeProgressWindow(blackProgressCurrent, 0, 0.86);
    const firstProgressForBg1 = clamp(firstProgressTarget, 0, 1);

    const titleScale = resolveKeyframedValue(
      firstProgress,
      firstScreenKeyframes.titleScale,
    );
    const titleWeight = resolveKeyframedValue(
      blackProgressRaw,
      blackContainerKeyframes.titleWeight,
    );
    const titleYVw = resolveKeyframedValue(
      secondProgress,
      secondScreenKeyframes.titleY,
    );

    titleContainers.forEach((element) => {
      if (!(element instanceof HTMLElement)) return;
      element.style.transform = `translate3d(0, ${titleYVw}vw, 0) scale3d(${titleScale}, ${titleScale}, 1)`;
      element.style.transformOrigin = "50% 50%";
      element.style.willChange = "transform";
    });

    titleHeadings.forEach((element) => {
      if (!(element instanceof HTMLElement)) return;
      element.style.fontVariationSettings = `"wght" ${titleWeight}`;
      element.style.willChange = "font-variation-settings, transform";
    });

    if (orangeContainer instanceof HTMLElement) {
      const orangeY = resolveKeyframedValue(
        blackProgress,
        blackContainerKeyframes.orangeY,
      );
      orangeContainer.style.transform = `translate3d(0, ${orangeY}vh, 0)`;
      orangeContainer.style.willChange = "transform";
    }

    if (blackContainer instanceof HTMLElement) {
      const y = resolveKeyframedValue(
        blackProgress,
        blackContainerKeyframes.blackContainerY,
      );
      blackContainer.style.transform = `translate3d(0, ${y}vh, 0)`;
      blackContainer.style.willChange = "transform";
    }

    if (bgBlack instanceof HTMLElement) {
      const scale = resolveKeyframedValue(
        blackProgress,
        blackContainerKeyframes.blackScale,
      );
      bgBlack.style.transform = `scale3d(${scale}, ${scale}, 1)`;
      bgBlack.style.transformOrigin = "50% 50%";
      bgBlack.style.willChange = "transform";
    }

    if (bgImage1 instanceof HTMLElement) {
      const y = resolveKeyframedValue(firstProgressForBg1, firstScreenKeyframes.bg1Y);
      const scale = resolveKeyframedValue(
        firstProgressForBg1,
        firstScreenKeyframes.bg1Scale,
      );
      bgImage1.style.transform = `translate3d(0, ${y}rem, 0) scale3d(${scale}, ${scale}, 1)`;
      bgImage1.style.willChange = "transform";
    }

    if (bgImage2 instanceof HTMLElement) {
      const y = resolveKeyframedValue(firstProgress, firstScreenKeyframes.bg2Y);
      const scale = resolveKeyframedValue(
        firstProgress,
        firstScreenKeyframes.bg2Scale,
      );
      bgImage2.style.transform = `translate3d(0, ${y}rem, 0) scale3d(${scale}, ${scale}, 1)`;
      bgImage2.style.willChange = "transform";
    }

    if (bgImage3 instanceof HTMLElement) {
      const y = resolveKeyframedValue(firstProgress, firstScreenKeyframes.bg3Y);
      const scale = resolveKeyframedValue(
        firstProgress,
        firstScreenKeyframes.bg3Scale,
      );
      bgImage3.style.transform = `translate3d(0, ${y}rem, 0) scale3d(${scale}, ${scale}, 1)`;
      bgImage3.style.willChange = "transform";
    }

    if (bgImage4 instanceof HTMLElement) {
      const x = resolveKeyframedValue(firstProgress, firstScreenKeyframes.bg4X);
      const y = resolveKeyframedValue(firstProgress, firstScreenKeyframes.bg4Y);
      const scale = resolveKeyframedValue(
        firstProgress,
        firstScreenKeyframes.bg4Scale,
      );
      bgImage4.style.transform = `translate3d(${x}rem, ${y}rem, 0) scale3d(${scale}, ${scale}, 1)`;
      bgImage4.style.willChange = "transform";
    }

    if (bgImage4Bg instanceof HTMLElement) {
      const x = resolveKeyframedValue(firstProgress, firstScreenKeyframes.bg4X);
      const y = resolveKeyframedValue(firstProgress, firstScreenKeyframes.bg4Y);
      const scale = resolveKeyframedValue(
        firstProgress,
        firstScreenKeyframes.bg4Scale,
      );
      bgImage4Bg.style.transform = `translate3d(${x}rem, ${y}rem, 0) scale3d(${scale}, ${scale}, 1)`;
      bgImage4Bg.style.willChange = "transform";
    }

    if (circleBg instanceof HTMLElement) {
      const y = resolveKeyframedValue(secondProgress, secondScreenKeyframes.circleY);
      circleBg.style.transform = `translate3d(0, ${y}vw, 0)`;
      circleBg.style.willChange = "transform";
    }
  }

  function tick() {
    rafId = 0;

    firstProgressCurrent +=
      (firstProgressTarget - firstProgressCurrent) * smoothingFactor;
    secondProgressCurrent +=
      (secondProgressTarget - secondProgressCurrent) * smoothingFactor;
    blackProgressCurrent +=
      (blackProgressTarget - blackProgressCurrent) * smoothingFactor;

    const shouldContinue =
      Math.abs(firstProgressTarget - firstProgressCurrent) > 0.0005 ||
      Math.abs(secondProgressTarget - secondProgressCurrent) > 0.0005 ||
      Math.abs(blackProgressTarget - blackProgressCurrent) > 0.0005;

    applyTransforms();

    if (shouldContinue) {
      rafId = requestAnimationFrame(tick);
    }
  }

  function requestApplyTransforms() {
    firstProgressTarget = normalizeInViewProgress(firstTrigger);
    secondProgressTarget = secondTrigger
      ? normalizeEnteringProgress(secondTrigger)
      : 0;
    blackProgressTarget =
      blackContainerDocumentTop !== null
        ? normalizeEnteringProgressFromDocumentTop(blackContainerDocumentTop)
      : 0;

    if (rafId) return;
    rafId = requestAnimationFrame(tick);
  }

  applyTransforms();
  window.addEventListener("scroll", requestApplyTransforms, { passive: true });
  window.addEventListener("resize", requestApplyTransforms);
}

function initNoiseAnimation() {
  const noise = document.querySelector(".noise");
  if (!(noise instanceof HTMLElement)) return;
  const target = noise;

  const keyframes = [
    { x: 0, y: 0, duration: 0 },
    { x: 20, y: -20, duration: 200 },
    { x: -20, y: 20, duration: 200 },
    { x: 20, y: -20, duration: 200 },
    { x: -20, y: 20, duration: 200 },
  ];

  const loopDuration = keyframes
    .slice(1)
    .reduce((total, keyframe) => total + keyframe.duration, 0);

  let startedAt = 0;

  function applyNoiseTransform(progressMs: number) {
    let elapsed = progressMs;
    let previous = keyframes[0];

    for (let index = 1; index < keyframes.length; index += 1) {
      const current = keyframes[index];
      if (elapsed <= current.duration) {
        const segmentProgress =
          current.duration === 0 ? 1 : elapsed / current.duration;
        const x = lerp(previous.x, current.x, segmentProgress);
        const y = lerp(previous.y, current.y, segmentProgress);
        target.style.transform = `translate3d(${x}vw, ${y}vh, 0)`;
        target.style.willChange = "transform";
        return;
      }
      elapsed -= current.duration;
      previous = current;
    }

    const last = keyframes[keyframes.length - 1];
    target.style.transform = `translate3d(${last.x}vw, ${last.y}vh, 0)`;
    target.style.willChange = "transform";
  }

  function tick(timestamp: number) {
    if (!startedAt) startedAt = timestamp;
    const elapsed = (timestamp - startedAt) % loopDuration;
    applyNoiseTransform(elapsed);
    requestAnimationFrame(tick);
  }

  applyNoiseTransform(0);
  requestAnimationFrame(tick);
}

export function initHeroSection() {
  initFirstScreenState();
  initPreloaderSequence();
  initFirstSectionObservers();
  initFirstScreenScrollEffects();
  initNoiseAnimation();
}
