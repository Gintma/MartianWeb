const selectorGlyphGroups = {
  "[Basic Latin Uppercase]": "ABCDEFGHIJKLMNOPQRSTUVWXYZ",
  "[Basic Latin Lowercase]": "abcdefghijklmnopqrstuvwxyz",
  "[Extended Latin Uppercase]":
    "ÁĂǍÂÄÀĀĄÅǺÃÆǼĆČÇĊÐĎḌÉĚÊËĖÈĒĘẼƏĞǦĢĠĦḤĲÍÎÏİỊÌĪĮĨĶĹĽĻĿŁŃŇŅƝÑŊÓÔÖỌÒŐŌØǾÕŒÞŔŘŖŚŠŞṢẞŦŤŢȚṬÚŬÛÜỤÙŰŪŲŮŨẂŴẄẀÝŶŸỲȲỸŹŽŻẒ",
  "[Extended Latin Lowercase]":
    "áăǍâäàāąåǺãæǼćčçċðďḍéěêëėèēęẼəğǦĢĠĦḤĳíîïıịìīįĩķĺľĻŀłńňņƞñŋóôöọòőōøǿõœþŕřŗśšşṣẞŧťţțṭúŭûüụùűūųůũẃŵẅẀýŷÿỳȳỹźžżẒ",
  "[Punctuation]": "!¡?¿.,:;…·•*/\\|¦†‡(){}[]\"'‚„“”‘’«‹›»––—‑_",
  "[Figures]": "0123456789",
  "[Math]": "+-×÷=≠<>±≈¬µ",
  "[Symbols]": "@¶§©ƒ№#&%‰Ꞌꞌ°ªº®™",
  "[Arrows]": "←↑→↓",
};

const scrollLinkPairs = [
  ["btFooter", "footer"],
  ["btAbout", "about"],
  ["btCreator", "creator"],
  ["btDemo1", "demo1"],
  ["btSymbols", "symbols"],
  ["btVariable1", "variable1"],
  ["btVariable2", "variable2"],
  ["btDemo2", "demo2"],
];

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
};

function initSelectorBlocks() {
  const selectorWrapper = document.querySelector("[selector]");
  const show = document.querySelector("[text-display]");
  const weightButtons = document.querySelectorAll("[text-weight-1]");
  if (!selectorWrapper || !show || !weightButtons.length) return;

  Object.entries(selectorGlyphGroups).forEach(([groupName, glyphs]) => {
    const selectorBlock = document.createElement("div");
    selectorBlock.classList.add("selector-block");

    const selectorHead = document.createElement("div");
    selectorHead.classList.add("selector-head");
    selectorHead.textContent = groupName;

    const selectorLetterSection = document.createElement("div");
    selectorLetterSection.classList.add("selector-letter-sec");
    selectorBlock.appendChild(selectorHead);

    glyphs.split("").forEach((letter) => {
      const selectorLetter = document.createElement("div");
      selectorLetter.classList.add("selector-letter");
      selectorLetter.textContent = letter;
      selectorLetterSection.appendChild(selectorLetter);
      selectorLetter.addEventListener("mouseover", () => {
        show.textContent = letter;
        show.style.display = "flex";
      });
    });

    selectorBlock.appendChild(selectorLetterSection);
    selectorWrapper.appendChild(selectorBlock);
  });

  let lastSelectedButton = null;
  weightButtons.forEach((button, index) => {
    button.addEventListener("click", () => {
      const fontWeightValue = button.getAttribute("text-weight-1");
      show.style.fontWeight = fontWeightValue;

      document.querySelectorAll(".selector-letter").forEach((letter) => {
        letter.style.fontWeight = fontWeightValue;
      });

      if (lastSelectedButton) {
        lastSelectedButton.classList.remove("active");
      }

      button.classList.add("active");
      lastSelectedButton = button;
    });

    if (index === 2) {
      button.click();
    }
  });
}

function initTextControls() {
  const section = document.querySelector('[text-display="mod"]');
  const ddText = document.querySelector('[dd="text"]');
  const weightButtons = document.querySelectorAll("[text]");
  const alignButtons = document.querySelectorAll("[text-align]");
  const sizeSlider = document.querySelector('[slider="size"]');
  const sizeDisplay = document.querySelector('[slider="size-display"]');
  const spacingSlider = document.querySelector('[slider="spacing"]');
  const spacingDisplay = document.querySelector('[slider="spacing-display"]');
  const heightSlider = document.querySelector('[slider="height"]');
  const heightDisplay = document.querySelector('[slider="height-display"]');
  if (
    !section ||
    !ddText ||
    !sizeSlider ||
    !sizeDisplay ||
    !spacingSlider ||
    !spacingDisplay ||
    !heightSlider ||
    !heightDisplay
  ) {
    return;
  }

  const iconWhite = "s8__bt-align-ic-w";
  const iconOrange = "s8__bt-align-ic-o";

  section.addEventListener("input", () => {
    const text = section.textContent || section.innerText;
    if (text.length > 50) {
      section.innerText = text.substring(0, 50);
    }
  });

  alignButtons.forEach((button) => {
    button.addEventListener("click", () => {
      alignButtons.forEach((otherButton) => {
        otherButton.classList.remove("active");

        const orangeIcon = otherButton.querySelector(`.${iconOrange}`);
        const whiteIcon = otherButton.querySelector(`.${iconWhite}`);
        if (!orangeIcon || !whiteIcon) return;

        if (otherButton !== button) {
          orangeIcon.style.display = "none";
          whiteIcon.style.display = "block";
        } else {
          orangeIcon.style.display = "block";
          whiteIcon.style.display = "none";
        }
      });

      button.classList.add("active");
      section.style.textAlign = button.getAttribute("text-align");
    });

    const orangeIcon = button.querySelector(`.${iconOrange}`);
    const whiteIcon = button.querySelector(`.${iconWhite}`);
    if (!orangeIcon || !whiteIcon) return;

    if (button.classList.contains("active")) {
      orangeIcon.style.display = "block";
      whiteIcon.style.display = "none";
    } else {
      orangeIcon.style.display = "none";
      whiteIcon.style.display = "block";
    }
  });

  weightButtons.forEach((button) => {
    button.addEventListener("click", () => {
      section.style.fontWeight = button.getAttribute("text");
      ddText.textContent = button.textContent;
    });
  });

  function updateProgress(input) {
    const progress =
      ((input.value - input.min) / (input.max - input.min)) * 100;
    input.style.background = `linear-gradient(to right, #E43C0C ${progress}%, #ffffff ${progress}%)`;
  }

  function refreshRangeProgress() {
    document.querySelectorAll('input[type="range"]').forEach(updateProgress);
  }

  function updateFontSizeAndLineHeight() {
    section.style.fontSize = `${sizeSlider.value}px`;
    sizeDisplay.textContent = sizeSlider.value;
    heightDisplay.textContent = heightSlider.value;
    refreshRangeProgress();
  }

  function updateLetterSpacing() {
    section.style.letterSpacing = `${spacingSlider.value}px`;
    spacingDisplay.textContent = spacingSlider.value;
    refreshRangeProgress();
  }

  function updateLineHeight() {
    section.style.lineHeight = `${heightSlider.value}px`;
    heightDisplay.textContent = heightSlider.value;
    refreshRangeProgress();
  }

  sizeSlider.addEventListener("input", updateFontSizeAndLineHeight);
  spacingSlider.addEventListener("input", updateLetterSpacing);
  heightSlider.addEventListener("input", updateLineHeight);

  updateFontSizeAndLineHeight();
  updateLetterSpacing();
  updateLineHeight();
}

function animatePercentage(element, start, end, duration) {
  if (!element) return;
  const startTime = performance.now();

  function updatePercentage(timestamp) {
    const progress = Math.min((timestamp - startTime) / duration, 1);
    const currentPercentage = start + progress * (end - start);
    element.textContent = `${Math.round(currentPercentage)}%`;

    if (progress < 1) {
      requestAnimationFrame(updatePercentage);
    }
  }

  requestAnimationFrame(updatePercentage);
}

function setTransition(element, transition) {
  if (!element) return;
  element.style.transition = transition;
}

function setTransform(element, transform) {
  if (!element) return;
  element.style.transform = transform;
}

function setOpacity(element, value) {
  if (!element) return;
  element.style.opacity = value;
}

const firstScreenSequenceState = {
  initialized: false,
  started: false,
  emptyPulseStarted: false,
};

const sectionTriggerNames = [
  "first",
  "about",
  "creator",
  "demo1",
  "symbols",
  "variable1",
  "demo2",
  "variable2",
  "demo3",
  "footer",
];

function startEmptyIndicatorPulse() {
  if (firstScreenSequenceState.emptyPulseStarted) return;

  const emptyAbsolute = document.querySelector(".s1__item-p-empty-absolute");
  if (!emptyAbsolute) return;

  firstScreenSequenceState.emptyPulseStarted = true;
  emptyAbsolute.style.opacity = "0";
  emptyAbsolute.style.willChange = "opacity";

  function fadeIn() {
    emptyAbsolute.style.transition = "opacity 500ms ease-out";
    emptyAbsolute.style.opacity = "1";
    window.setTimeout(fadeOut, 500);
  }

  function fadeOut() {
    emptyAbsolute.style.transition = "opacity 500ms ease";
    emptyAbsolute.style.opacity = "0";
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
  const emptyItem = document.querySelector(".s1__item-p-empty");
  const emptyAbsolute = document.querySelector(".s1__item-p-empty-absolute");
  const capsMask = document.querySelector(".s1__p-caps-mask-7");
  const lineMask = document.querySelector(".s1__ic-line-mask");

  if ((window.pageYOffset || document.documentElement.scrollTop || 0) === 0) {
    sectionTriggerNames.forEach((name) => {
      if (name === "first") {
        document.body.setAttribute(name, "");
      } else {
        document.body.removeAttribute(name);
      }
    });
  }

  [menuLine, bottomBar, burger, logo, desktopCta, mobileCta].forEach((element) =>
    setOpacity(element, "0"),
  );

  if (bottomItems) {
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
      element.style.transformOrigin = "50% 50%";
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

function animateElement(
  element,
  {
    delay = 0,
    duration = 300,
    easing = "ease",
    opacity,
    transform,
    width,
  },
) {
  if (!element) return;

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

function playFirstScreenSequence() {
  if (firstScreenSequenceState.started) return;
  firstScreenSequenceState.started = true;

  const menuLine = document.querySelector(".menu__container-line");
  const bottomBar = document.querySelector(".container-bottom__p");
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
  const emptyItem = document.querySelector(".s1__item-p-empty");
  const firstGroupDuration = 950;

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
    delay: firstGroupDuration,
    duration: 950,
    transform: "translate3d(0, 0, 0)",
  });

  textMasks.forEach((element, index) => {
    animateElement(element, {
      delay: firstGroupDuration + 10 + index * 10,
      duration: 950,
      transform: "translate3d(0, 0, 0)",
    });
  });

  animateElement(backgroundImage1, {
    delay: firstGroupDuration + 300,
    duration: 850,
    easing: "ease",
    transform: "translate3d(0, 0, 0) scale3d(1, 1, 1)",
    opacity: "1",
  });
  animateElement(backgroundImage2, {
    delay: firstGroupDuration + 300,
    duration: 850,
    easing: "ease",
    transform: "translate3d(0, 0, 0) scale3d(1, 1, 1)",
    opacity: "1",
  });

  animateElement(titleMartian, {
    delay: firstGroupDuration + 300,
    duration: 1000,
    transform: "translate3d(0, 0, 0)",
  });
  animateElement(titleMono, {
    delay: firstGroupDuration + 500,
    duration: 1000,
    transform: "translate3d(0, 0, 0)",
  });

  animateElement(lineMask, {
    delay: firstGroupDuration + 900,
    duration: 1000,
    transform: undefined,
    width: "100%",
  });

  if (emptyItem) {
    const targetWidth = emptyItem.dataset.targetWidth || "auto";
    animateElement(emptyItem, {
      delay: firstGroupDuration + 2000,
      duration: 1000,
      width: targetWidth,
    });
    window.setTimeout(() => {
      emptyItem.style.width = "auto";
      const targetHeight = emptyItem.dataset.targetHeight;
      if (targetHeight) {
        emptyItem.style.height = targetHeight;
      }
    }, firstGroupDuration + 3000);
  }

  [burger, logo, desktopCta].forEach((element) => {
    animateElement(element, {
      delay: firstGroupDuration + 2200,
      duration: 800,
      easing: "ease-out",
      opacity: "1",
    });
  });

  window.setTimeout(() => {
    startEmptyIndicatorPulse();
  }, firstGroupDuration + 2200);
}

function initPreloaderSequence() {
  const preloader = document.querySelector(".preloader");
  const preloaderBlock = document.querySelector(".preloader__block");
  const batteryBlock = document.querySelector(".preloader__block-battery");
  const percentageBlock = document.querySelector(".preloader__block-p");
  const percentageElement = document.getElementById("percentage");
  const menuLine = document.querySelector(".menu__container-line");
  const bottomBar = document.querySelector(".container-bottom__p");
  const batterySteps = [
    document.querySelector(".preloader__battery-img-2"),
    document.querySelector(".preloader__battery-img-3"),
    document.querySelector(".preloader__battery-img-4"),
    document.querySelector(".preloader__battery-img-5"),
  ].filter(Boolean);
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
        preloaderBlock.style.transition =
          "width 500ms ease, height 500ms ease";
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
        preloaderBlock.style.transition =
          "width 500ms ease, height 500ms ease";
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
      if (typeof window.__martianUnblockScroll === "function") {
        window.__martianUnblockScroll();
      }
    }, totalDuration);
  });
}

function initAnchorButtons() {
  scrollLinkPairs.forEach(([buttonId, anchorId]) => {
    const button = document.getElementById(buttonId);
    const anchor = document.getElementById(anchorId);
    if (!button || !anchor) return;

    button.addEventListener("click", () => {
      anchor.scrollIntoView({ behavior: "instant" });
    });
  });
}

function initScrollTriggerAttributes() {
  const triggerElements = document.querySelectorAll("[scrollTrigger]");
  if (!triggerElements.length) return;

  const state = {
    triggers: [
      {
        element: null,
        name: null,
        height: 0,
        documentTopOffset: 0,
      },
    ],
    pageHeight: 0,
    windowHeight: 0,
    currentPosition: 0,
  };

  function recalculatePage() {
    state.windowHeight = window.innerHeight;
    state.currentPosition =
      window.pageYOffset || document.documentElement.scrollTop;

    state.triggers = [];
    triggerElements.forEach((triggerEl) => {
      const triggerRect = triggerEl.getBoundingClientRect();
      const triggerName = triggerEl.getAttribute("scrollTrigger");
      state.triggers.push({
        element: triggerEl,
        name: triggerName,
        height: triggerEl.clientHeight,
        documentTopOffset: state.currentPosition + triggerRect.top,
      });
    });

    state.pageHeight = document.body.offsetHeight;
  }

  function recalculateScroll() {
    state.currentPosition =
      window.pageYOffset || document.documentElement.scrollTop;
    state.triggers.forEach((trigger) => {
      if (
        state.currentPosition > trigger.documentTopOffset - state.windowHeight &&
        state.currentPosition < trigger.documentTopOffset + trigger.height
      ) {
        document.body.setAttribute(trigger.name, "");
      } else {
        document.body.removeAttribute(trigger.name);
      }
    });
  }

  function throttle(callback, timeout) {
    let timer = null;
    return (...args) => {
      if (timer) return;
      timer = setTimeout(() => {
        callback(...args);
        clearTimeout(timer);
        timer = null;
      }, timeout);
    };
  }

  function loopRecalculatePage(handler) {
    setTimeout(() => {
      handler();
      loopRecalculatePage(handler);
    }, 400);
  }

  const optimizedScrollHandler = throttle(recalculateScroll, 200);
  const optimizedResizeHandler = throttle(recalculatePage, 200);

  recalculatePage();
  recalculateScroll();

  window.addEventListener("scroll", optimizedScrollHandler);
  window.addEventListener("resize", optimizedResizeHandler);
  loopRecalculatePage(optimizedResizeHandler);
}

function clamp(value, min, max) {
  return Math.min(Math.max(value, min), max);
}

function lerp(start, end, progress) {
  return start + (end - start) * progress;
}

function normalizeInViewProgress(element) {
  if (!element) return 0;
  const rect = element.getBoundingClientRect();
  const viewportHeight = window.innerHeight || 1;
  const total = viewportHeight + rect.height;
  if (total <= 0) return 0;
  return clamp((viewportHeight - rect.top) / total, 0, 1);
}

function resolveKeyframedValue(progress, keyframes) {
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

function initFirstScreenScrollEffects() {
  if (window.innerWidth < 992) return;

  const firstTrigger = document.querySelector(".s1__scroll-animation-trigger");
  const secondTrigger = document.querySelector(".s2__trigger-animation-scroll");
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
  const plusIcons = Array.from(document.querySelectorAll(".ic-plus"));

  if (!firstTrigger) return;

  const firstScreenKeyframes = {
    titleScale: [
      { progress: 0, value: 0.9 },
      { progress: 0.3, value: 1 },
    ],
    titleWeight: [
      { progress: 0.1, value: 400 },
      { progress: 0.8, value: 800 },
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

  function applyTransforms() {
    rafId = 0;

    const firstProgress = normalizeInViewProgress(firstTrigger);
    const secondProgress = secondTrigger
      ? normalizeInViewProgress(secondTrigger)
      : 0;

    const titleScale = resolveKeyframedValue(
      firstProgress,
      firstScreenKeyframes.titleScale,
    );
    const titleWeight = resolveKeyframedValue(
      firstProgress,
      firstScreenKeyframes.titleWeight,
    );
    const titleYVw = resolveKeyframedValue(
      secondProgress,
      secondScreenKeyframes.titleY,
    );

    titleContainers.forEach((element) => {
      element.style.transform = `translate3d(0, ${titleYVw}vw, 0) scale3d(${titleScale}, ${titleScale}, 1)`;
      element.style.transformOrigin = "50% 50%";
      element.style.willChange = "transform";
    });

    titleHeadings.forEach((element) => {
      element.style.fontVariationSettings = `"wght" ${titleWeight}`;
      element.style.willChange = "font-variation-settings, transform";
    });

    if (bgImage1) {
      const y = resolveKeyframedValue(firstProgress, firstScreenKeyframes.bg1Y);
      const scale = resolveKeyframedValue(
        firstProgress,
        firstScreenKeyframes.bg1Scale,
      );
      bgImage1.style.transform = `translate3d(0, ${y}rem, 0) scale3d(${scale}, ${scale}, 1)`;
      bgImage1.style.willChange = "transform";
    }

    if (bgImage2) {
      const y = resolveKeyframedValue(firstProgress, firstScreenKeyframes.bg2Y);
      const scale = resolveKeyframedValue(
        firstProgress,
        firstScreenKeyframes.bg2Scale,
      );
      bgImage2.style.transform = `translate3d(0, ${y}rem, 0) scale3d(${scale}, ${scale}, 1)`;
      bgImage2.style.willChange = "transform";
    }

    if (bgImage3) {
      const y = resolveKeyframedValue(firstProgress, firstScreenKeyframes.bg3Y);
      const scale = resolveKeyframedValue(
        firstProgress,
        firstScreenKeyframes.bg3Scale,
      );
      bgImage3.style.transform = `translate3d(0, ${y}rem, 0) scale3d(${scale}, ${scale}, 1)`;
      bgImage3.style.willChange = "transform";
    }

    if (bgImage4) {
      const x = resolveKeyframedValue(firstProgress, firstScreenKeyframes.bg4X);
      const y = resolveKeyframedValue(firstProgress, firstScreenKeyframes.bg4Y);
      const scale = resolveKeyframedValue(
        firstProgress,
        firstScreenKeyframes.bg4Scale,
      );
      bgImage4.style.transform = `translate3d(${x}rem, ${y}rem, 0) scale3d(${scale}, ${scale}, 1)`;
      bgImage4.style.willChange = "transform";
    }

    if (bgImage4Bg) {
      const x = resolveKeyframedValue(firstProgress, firstScreenKeyframes.bg4X);
      const y = resolveKeyframedValue(firstProgress, firstScreenKeyframes.bg4Y);
      const scale = resolveKeyframedValue(
        firstProgress,
        firstScreenKeyframes.bg4Scale,
      );
      bgImage4Bg.style.transform = `translate3d(${x}rem, ${y}rem, 0) scale3d(${scale}, ${scale}, 1)`;
      bgImage4Bg.style.willChange = "transform";
    }

    if (circleBg) {
      const y = resolveKeyframedValue(secondProgress, secondScreenKeyframes.circleY);
      circleBg.style.transform = `translate3d(0, ${y}vw, 0)`;
      circleBg.style.willChange = "transform";
    }

    const plusRotation = lerp(0, 540, secondTrigger ? secondProgress : firstProgress);
    plusIcons.forEach((element) => {
      element.style.transform = `rotate(${plusRotation}deg)`;
      element.style.willChange = "transform";
    });
  }

  function requestApplyTransforms() {
    if (rafId) return;
    rafId = requestAnimationFrame(applyTransforms);
  }

  applyTransforms();
  window.addEventListener("scroll", requestApplyTransforms, { passive: true });
  window.addEventListener("resize", requestApplyTransforms);
}

function initNoiseAnimation() {
  const noise = document.querySelector(".noise");
  if (!noise) return;

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

  function applyNoiseTransform(progressMs) {
    let elapsed = progressMs;
    let previous = keyframes[0];

    for (let index = 1; index < keyframes.length; index += 1) {
      const current = keyframes[index];
      if (elapsed <= current.duration) {
        const segmentProgress =
          current.duration === 0 ? 1 : elapsed / current.duration;
        const x = lerp(previous.x, current.x, segmentProgress);
        const y = lerp(previous.y, current.y, segmentProgress);
        noise.style.transform = `translate3d(${x}vw, ${y}vh, 0)`;
        noise.style.willChange = "transform";
        return;
      }
      elapsed -= current.duration;
      previous = current;
    }

    const last = keyframes[keyframes.length - 1];
    noise.style.transform = `translate3d(${last.x}vw, ${last.y}vh, 0)`;
    noise.style.willChange = "transform";
  }

  function tick(timestamp) {
    if (!startedAt) startedAt = timestamp;
    const elapsed = (timestamp - startedAt) % loopDuration;
    applyNoiseTransform(elapsed);
    requestAnimationFrame(tick);
  }

  applyNoiseTransform(0);
  requestAnimationFrame(tick);
}

function initLenisAndScrollLock() {
  if (typeof Lenis !== "function") return;

  const lenis = new Lenis();
  const preloader = document.querySelector(".preloader");

  function raf(time) {
    lenis.raf(time);
    requestAnimationFrame(raf);
  }

  function blockScroll() {
    document.body.classList.add("no-scroll");
    lenis.stop();
  }

  function unblockScroll() {
    document.body.classList.remove("no-scroll");
    lenis.start();
  }

  window.__martianBlockScroll = blockScroll;
  window.__martianUnblockScroll = unblockScroll;

  requestAnimationFrame(raf);
  blockScroll();

  if (preloader) {
    const observer = new MutationObserver(() => {
      if (window.getComputedStyle(preloader).display === "none") {
        unblockScroll();
        observer.disconnect();
      }
    });

    observer.observe(preloader, {
      attributes: true,
      childList: false,
      subtree: false,
    });
  }
}

function initRuntimeLotties() {
  if (typeof lottie === "undefined") return;

  document.querySelectorAll("[data-runtime-lottie]").forEach((element) => {
    const path = element.getAttribute("data-lottie-src");
    if (!path) return;

    const animation = lottie.loadAnimation({
      container: element,
      renderer: element.getAttribute("data-lottie-renderer") || "svg",
      loop: element.getAttribute("data-lottie-loop") !== "0",
      autoplay: element.getAttribute("data-lottie-autoplay") !== "0",
      path,
    });

    const direction = Number(element.getAttribute("data-lottie-direction") || 1);
    if (direction === -1) {
      animation.setDirection(-1);
    }
  });
}

function initInteractiveLotties() {
  if (typeof lottie === "undefined") return;

  const interactiveNodes = document.querySelectorAll(
    '[data-runtime-lottie="interactive"]',
  );
  if (!interactiveNodes.length) return;

  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (!entry.isIntersecting) return;
        const animation = entry.target.__martianLottie;
        if (!animation || entry.target.dataset.lottiePlayed === "1") return;
        entry.target.dataset.lottiePlayed = "1";
        animation.goToAndPlay(0, true);
      });
    },
    { threshold: 0.35 },
  );

  interactiveNodes.forEach((element) => {
    const path = element.getAttribute("data-src");
    if (!path) return;

    const animation = lottie.loadAnimation({
      container: element,
      renderer: element.getAttribute("data-lottie-renderer") || "svg",
      loop: element.getAttribute("data-lottie-loop") !== "0",
      autoplay: false,
      path: element.getAttribute("data-lottie-src") || "",
    });

    const direction = Number(element.getAttribute("data-lottie-direction") || 1);
    if (direction === -1) {
      animation.setDirection(-1);
    }

    element.__martianLottie = animation;
    observer.observe(element);
  });
}

function initMenuPopup() {
  const menuPopup = document.querySelector(".menu-popup");
  const openButtons = document.querySelectorAll("[data-menu-open]");
  const closeButtons = document.querySelectorAll("[data-menu-close]");
  const burger = document.querySelector(".menu__bt-burger");
  const burgerLine1 = document.querySelector(".menu__bt-burger-line-1");
  const burgerLine2 = document.querySelector(".menu__bt-burger-line-2");
  const burgerLine3 = document.querySelector(".menu__bt-burger-line-3");
  const openOverlay = document.querySelector(".menu-popup__open-div");
  const closeOverlay = document.querySelector(".menu-popup__close-div");
  const noClickWrap = document.querySelector(".no-click-wrap");

  if (!menuPopup || !burger || !openButtons.length || !closeButtons.length) return;

  function applyBurgerState(open) {
    if (burgerLine1) {
      burgerLine1.style.transform = open
        ? "translateY(0.4vw) rotate(45deg)"
        : "translateY(0) rotate(0deg)";
    }
    if (burgerLine2) {
      burgerLine2.style.opacity = open ? "0" : "1";
    }
    if (burgerLine3) {
      burgerLine3.style.transform = open
        ? "translateY(-0.5vw) rotate(-45deg)"
        : "translateY(0) rotate(0deg)";
    }
  }

  function openMenu() {
    menuPopup.style.display = "flex";
    if (closeOverlay) closeOverlay.style.display = "block";
    if (openOverlay) openOverlay.style.display = "none";
    if (noClickWrap) noClickWrap.style.display = "none";
    applyBurgerState(true);
    if (typeof window.__martianBlockScroll === "function") {
      window.__martianBlockScroll();
    }
  }

  function closeMenu() {
    menuPopup.style.display = "none";
    if (closeOverlay) closeOverlay.style.display = "none";
    if (openOverlay) openOverlay.style.display = "block";
    if (noClickWrap) noClickWrap.style.display = "block";
    applyBurgerState(false);
    if (typeof window.__martianUnblockScroll === "function") {
      window.__martianUnblockScroll();
    }
  }

  menuPopup.style.display = "none";
  if (closeOverlay) closeOverlay.style.display = "none";
  if (openOverlay) openOverlay.style.display = "block";
  if (noClickWrap) noClickWrap.style.display = "block";
  applyBurgerState(false);

  openButtons.forEach((button) => {
    button.addEventListener("click", (event) => {
      event.preventDefault();
      openMenu();
    });
  });

  closeButtons.forEach((button) => {
    button.addEventListener("click", () => {
      closeMenu();
    });
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

function initCanvasFlames() {
  const canvasConfigs = [
    {
      id: "flameCanvas1",
      flameColor: "#c21b01",
      columnCount: 20,
      baseSpeed: 0.5,
      heightsInPercent: [
        74, 72, 76, 78, 78, 76, 72, 70, 68, 64, 62, 60, 62, 62, 60, 58, 60, 64,
        62, 60,
      ],
      delayDuration: 3100,
      riseDuration: 5000,
    },
    {
      id: "flameCanvas2",
      flameColor: "#c21b01",
      columnCount: 20,
      baseSpeed: 0.5,
      heightsInPercent: [
        49, 47, 51, 53, 53, 51, 47, 45, 43, 39, 37, 35, 37, 37, 35, 33, 37, 39,
        37, 35,
      ],
      delayDuration: 2900,
      riseDuration: 5000,
    },
  ];

  function easeOutQuad(t) {
    return t * (2 - t);
  }

  function initSecondAnimation(config, animState) {
    const fps = 60;
    const interval = 1000 / fps;
    let lastFrameTime = Date.now();
    const originalHeights = [...animState.targetHeights];
    const currentHeights = [...animState.targetHeights];
    const maxDelta = originalHeights.map((height) => height * 0.03);
    const direction = new Array(config.columnCount)
      .fill(0)
      .map(() => (Math.random() < 0.5 ? -1 : 1));

    function frame() {
      const now = Date.now();
      const elapsed = now - lastFrameTime;

      if (elapsed > interval) {
        lastFrameTime = now - (elapsed % interval);
        animState.ctx.clearRect(0, 0, animState.width, animState.height);

        for (let i = 0; i < config.columnCount; i += 1) {
          const speedPerFrame =
            maxDelta[i] * config.baseSpeed * (interval / 1000);

          currentHeights[i] += speedPerFrame * direction[i];

          if (
            currentHeights[i] >= originalHeights[i] + maxDelta[i] ||
            currentHeights[i] <= originalHeights[i] - maxDelta[i]
          ) {
            direction[i] *= -1;
          }

          animState.ctx.fillStyle = config.flameColor;
          animState.ctx.fillRect(
            i * animState.columnWidth,
            animState.height - currentHeights[i],
            animState.columnWidth,
            currentHeights[i],
          );
        }
      }

      requestAnimationFrame(frame);
    }

    requestAnimationFrame(frame);
  }

  function animateCanvas(config) {
    const canvas = document.getElementById(config.id);
    if (!canvas) return;

    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    canvas.width = window.innerWidth / 2;
    canvas.height = 400;

    const animState = {
      ctx,
      width: canvas.width,
      height: canvas.height,
      columnWidth: canvas.width / config.columnCount,
      targetHeights: config.heightsInPercent.map(
        (percent) => (percent * canvas.height) / 100,
      ),
      startTime: 0,
    };

    setTimeout(() => {
      animState.startTime = Date.now();

      function frame() {
        const now = Date.now();
        const timeElapsed = now - animState.startTime;
        const progress = Math.min(timeElapsed / config.riseDuration, 1);
        const easedProgress = easeOutQuad(progress);

        ctx.clearRect(0, 0, animState.width, animState.height);
        for (let i = 0; i < config.columnCount; i += 1) {
          const currentHeight = easedProgress * animState.targetHeights[i];
          ctx.fillStyle = config.flameColor;
          ctx.fillRect(
            i * animState.columnWidth,
            animState.height - currentHeight,
            animState.columnWidth,
            currentHeight,
          );
        }

        if (progress < 1) {
          requestAnimationFrame(frame);
        } else {
          initSecondAnimation(config, animState);
        }
      }

      requestAnimationFrame(frame);
    }, config.delayDuration);
  }

  canvasConfigs.forEach(animateCanvas);
}

function setVH(selector, breakpoint, valueVH) {
  const screenWrapper = document.querySelector(selector);
  if (!screenWrapper) return;

  let lastResize = window.innerWidth;

  function applyScreenHeight(element) {
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
      applyScreenHeight(screenWrapper);
      lastResize = window.innerWidth;
    }
  }

  applyScreenHeight(screenWrapper);
  window.addEventListener("resize", checkResizeWidth);
}

function initVhFix() {
  vhFixConfig.elements.forEach((element) => {
    setVH(element.el, vhFixConfig.mobileBreakpoint, element.vh);
  });
}

initScrollTriggerAttributes();
initVhFix();

document.addEventListener("DOMContentLoaded", () => {
  initFirstScreenState();
  initFirstScreenScrollEffects();
  initNoiseAnimation();
  initRuntimeLotties();
  initInteractiveLotties();
  initSelectorBlocks();
  initTextControls();
  initPreloaderSequence();
  initAnchorButtons();
  initLenisAndScrollLock();
  initMenuPopup();
  initFirstSectionObservers();
});

window.addEventListener("load", () => {
  initCanvasFlames();
});
