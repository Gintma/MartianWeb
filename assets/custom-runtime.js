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
  const iconOrangeStatic = "s8__bt-align-ic-orange";

  function applyAlignButtonState(button, hovered = !1) {
    const orangeIcon = button.querySelector(`.${iconOrange}`);
    const whiteIcon = button.querySelector(`.${iconWhite}`);
    const iconEmbed = button.querySelector(".s8__ic-bt-align");
    const staticOrangeIcon = button.querySelector(`.${iconOrangeStatic}`);
    if (!orangeIcon || !whiteIcon || !iconEmbed) return;

    const active = button.classList.contains("active");
    const highlight = active || hovered;

    orangeIcon.style.transition = "opacity 300ms ease-out";
    whiteIcon.style.transition = "opacity 300ms ease-out";
    iconEmbed.style.transition = "color 300ms ease";

    orangeIcon.style.opacity = highlight ? "1" : "0";
    whiteIcon.style.opacity = highlight ? "0" : "1";
    iconEmbed.style.color = highlight ? "#fff" : "#000";

    if (staticOrangeIcon) {
      staticOrangeIcon.style.opacity = highlight ? "1" : "0";
    }
  }

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
          orangeIcon.style.display = "block";
          whiteIcon.style.display = "block";
        } else {
          orangeIcon.style.display = "block";
          whiteIcon.style.display = "block";
        }

        applyAlignButtonState(otherButton, !1);
      });

      button.classList.add("active");
      section.style.textAlign = button.getAttribute("text-align");
      applyAlignButtonState(button, !1);
    });

    const orangeIcon = button.querySelector(`.${iconOrange}`);
    const whiteIcon = button.querySelector(`.${iconWhite}`);
    if (!orangeIcon || !whiteIcon) return;

    orangeIcon.style.display = "block";
    whiteIcon.style.display = "block";
    applyAlignButtonState(button, !1);

    if (window.innerWidth >= 992) {
      button.addEventListener("mouseenter", () => {
        if (!button.classList.contains("active")) {
          applyAlignButtonState(button, !0);
        }
      });

      button.addEventListener("mouseleave", () => {
        if (!button.classList.contains("active")) {
          applyAlignButtonState(button, !1);
        }
      });
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
}

function initVariable2Dropdown() {
  const dropdown = document.querySelector(".s8__container .dropdown");
  const dropdownToggle = dropdown?.querySelector(".dropdown-toggle");
  const dropdownList = dropdown?.querySelector(".dropdown-list");
  const dropdownItems = dropdownList?.querySelectorAll(".s8__bt");

  if (!dropdown || !dropdownToggle || !dropdownList || !dropdownItems?.length) {
    return;
  }

  let isOpen = !1;
  let closeTimer = null;
  const delay = Number(dropdown.getAttribute("data-delay") || "0");
  const hoverEnabled = dropdown.getAttribute("data-hover") === "true";

  function isMobileDropdownMode() {
    return window.innerWidth <= 991;
  }

  function clearCloseTimer() {
    if (closeTimer) {
      window.clearTimeout(closeTimer);
      closeTimer = null;
    }
  }

  function applyClosedState() {
    clearCloseTimer();
    dropdownList.style.opacity = "0";
    dropdownList.style.display = "none";
    dropdown.classList.remove("w--open");
    dropdownToggle.classList.remove("w--open");
    dropdownToggle.setAttribute("aria-expanded", "false");
    isOpen = !1;
  }

  function openDropdown() {
    clearCloseTimer();
    dropdownList.style.display = "flex";
    dropdownList.style.transition = "opacity 200ms ease-out";
    dropdown.classList.add("w--open");
    dropdownToggle.classList.add("w--open");
    dropdownToggle.setAttribute("aria-expanded", "true");
    requestAnimationFrame(() => {
      dropdownList.style.opacity = "1";
    });
    isOpen = !0;
  }

  function closeDropdown() {
    clearCloseTimer();
    dropdownList.style.transition = "opacity 200ms ease-out";
    dropdownList.style.opacity = "0";
    window.setTimeout(() => {
      if (!isOpen) {
        dropdownList.style.display = "none";
        dropdown.classList.remove("w--open");
        dropdownToggle.classList.remove("w--open");
        dropdownToggle.setAttribute("aria-expanded", "false");
      }
    }, 200);
    isOpen = !1;
  }

  applyClosedState();

  dropdownToggle.addEventListener("click", (event) => {
    if (!isMobileDropdownMode()) return;
    event.preventDefault();
    event.stopPropagation();
    if (isOpen) {
      closeDropdown();
    } else {
      openDropdown();
    }
  });

  if (hoverEnabled) {
    dropdown.addEventListener("mouseenter", () => {
      if (isMobileDropdownMode()) return;
      openDropdown();
    });

    dropdown.addEventListener("mouseleave", () => {
      if (isMobileDropdownMode()) return;
      clearCloseTimer();
      if (!delay) {
        closeDropdown();
        return;
      }
      closeTimer = window.setTimeout(closeDropdown, delay);
    });
  }

  dropdownItems.forEach((item) => {
    item.addEventListener("click", () => {
      if (isMobileDropdownMode()) {
        closeDropdown();
      }
    });
  });

  document.addEventListener("click", (event) => {
    if (!isOpen || !isMobileDropdownMode()) return;
    if (dropdown.contains(event.target)) return;
    closeDropdown();
  });

  window.addEventListener("resize", () => {
    if (!isMobileDropdownMode()) {
      applyClosedState();
    }
  });
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
    recalculateScroll();
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

function rectIntersectsViewportBand(rect, offsetPercent) {
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

  }

  function requestApplyTransforms() {
    if (rafId) return;
    rafId = requestAnimationFrame(applyTransforms);
  }

  applyTransforms();
  window.addEventListener("scroll", requestApplyTransforms, { passive: true });
  window.addEventListener("resize", requestApplyTransforms);
}

function initPlusIconScrollEffects() {
  const plusIcons = Array.from(document.querySelectorAll(".ic-plus"));
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

function initAboutCardsParallax() {
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
    .filter((config) => config.element);

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

function initCreatorSectionAnimations() {
  const section = document.querySelector(".s3");
  const card = document.querySelector(".s3__card");
  const heading1 = document.querySelector(".s3_container-h-1");
  const heading2 = document.querySelector(".s3_container-h-2");
  const plusIcons = Array.from(document.querySelectorAll(".ic-plus-s3"));
  const battery = document.querySelector(".s3__battary-2");
  const globus = document.querySelector(".s3__img-globus");
  const cardButton = document.querySelector(".s3__card .bt-orange");
  const aboutMask = document.querySelector(".s3__card-block-3-p-mask-6");
  const mask1 = document.querySelector(".s3__card-block-2-p-mask-1");
  const mask2 = document.querySelector(".s3__card-block-2-p-mask-2");
  const mask3 = document.querySelector(".s3__card-block-2-p-mask-3");
  const mask4 = document.querySelector(".s3__card-block-2-p-mask-4");
  const mask5 = document.querySelector(".s3__card-block-2-p-mask-5");
  const lineItems = Array.from(
    document.querySelectorAll(
      ".s3__card-block-3-p-line-item-1, .s3__card-block-3-p-line-item-2, .s3__card-block-3-p-line-item-3, .s3__card-block-3-p-line-item-4, .s3__card-block-3-p-line-item-5, .s3__card-block-3-p-line-item-6, .s3__card-block-3-p-line-item-7, .s3__card-block-3-p-line-item-8",
    ),
  );

  if (!section) return;

  function setWidth(element, value) {
    if (!element) return;
    element.style.width = `${value}%`;
  }

  function setRotation(element, value) {
    if (!element) return;
    element.style.transform = `rotate(${value}deg)`;
    element.style.willChange = "transform";
  }

  function initCreatorIntoViewState() {
    setWidth(mask1, 0);
    setWidth(mask2, 0);
    setWidth(mask3, 0);
    setWidth(mask4, 0);
    setWidth(mask5, 0);
    setWidth(aboutMask, 0);
    lineItems.forEach((element) => setWidth(element, 100));
    setOpacity(globus, 0);
    setOpacity(cardButton, 0);
    setOpacity(battery, 0);
  }

  function initCreatorScrollHeading() {
    let rafId = 0;

    function applyHeadingScroll() {
      rafId = 0;
      const progress = normalizeInViewProgress(section);
      const headingProgress = clamp(progress / 0.35, 0, 1);
      const headingY = lerp(100, 0, headingProgress);
      const plusRotation = lerp(0, 360, progress);

      if (heading1) {
        heading1.style.transform = `translate3d(0, ${headingY}%, 0)`;
        heading1.style.willChange = "transform";
      }

      if (heading2) {
        heading2.style.transform = `translate3d(0, ${headingY}%, 0)`;
        heading2.style.willChange = "transform";
      }

      plusIcons.forEach((element) => setRotation(element, plusRotation));
    }

    function requestApplyHeadingScroll() {
      if (rafId) return;
      rafId = requestAnimationFrame(applyHeadingScroll);
    }

    applyHeadingScroll();
    window.addEventListener("scroll", requestApplyHeadingScroll, { passive: true });
    window.addEventListener("resize", requestApplyHeadingScroll);
  }

  function playBatteryFlash() {
    if (!battery) return;
    if (battery._creatorBatteryAnimation) return;
    battery.style.willChange = "opacity";
    battery._creatorBatteryAnimation = battery.animate(
      [
        { opacity: 0, offset: 0 },
        { opacity: 1, offset: 1000 / 1300, easing: "ease-out" },
        { opacity: 0, offset: 1, easing: "ease-out" },
      ],
      {
        duration: 1300,
        iterations: Infinity,
        fill: "both",
      },
    );
  }

  function playGlobusRotation() {
    if (!globus) return;
    if (globus._creatorRotationAnimation) return;
    globus.style.willChange = "transform";
    globus._creatorRotationAnimation = globus.animate(
      [
        { transform: "translate3d(0px, 0px, 0px) rotate(0deg)" },
        { transform: "translate3d(0px, 0px, 0px) rotate(-360deg)" },
      ],
      {
        duration: 6000,
        iterations: Infinity,
        easing: "linear",
        fill: "both",
      },
    );
  }

  function stopBatteryFlash() {
    if (!battery || !battery._creatorBatteryAnimation) return;
    battery._creatorBatteryAnimation.cancel();
    battery._creatorBatteryAnimation = null;
    setOpacity(battery, 0);
  }

  function stopGlobusRotation() {
    if (!globus || !globus._creatorRotationAnimation) return;
    globus._creatorRotationAnimation.cancel();
    globus._creatorRotationAnimation = null;
    setRotation(globus, 0);
  }

  function playCreatorCardReveal() {
    const widthTargets = [
      { element: mask1, delay: 0 },
      { element: mask2, delay: 200 },
      { element: mask3, delay: 400 },
      { element: mask4, delay: 1000 },
      { element: mask5, delay: 1100 },
      { element: aboutMask, delay: 1500 },
    ];

    widthTargets.forEach(({ element, delay }) => {
      if (!element) return;
      window.setTimeout(() => {
        element.style.transition = "width 600ms ease";
        setWidth(element, 100);
      }, delay);
    });

    if (globus) {
      window.setTimeout(() => {
        setTransition(globus, "opacity 600ms ease-out");
        setOpacity(globus, 1);
      }, 600);
    }

    if (cardButton) {
      window.setTimeout(() => {
        setTransition(cardButton, "opacity 600ms ease-out");
        setOpacity(cardButton, 1);
      }, 1300);
    }

    lineItems.forEach((element, index) => {
      window.setTimeout(() => {
        element.style.transition = "width 600ms ease";
        setWidth(element, 0);
      }, 1700 + index * 100);
    });
  }

  initCreatorIntoViewState();
  initCreatorScrollHeading();

  if (card) {
    let revealPlayed = false;
    let rafId = 0;
    let wasInView = false;
    let wasInRevealZone = false;

    function checkCreatorEntry() {
      rafId = 0;
      const rect = card.getBoundingClientRect();
      const viewportHeight = window.innerHeight || 0;
      const isInView = rect.top <= viewportHeight && rect.bottom >= 0;
      const isInRevealZone =
        rect.top <= viewportHeight * 0.7 && rect.bottom >= 0;

      if (!wasInView && isInView) {
        playBatteryFlash();
        playGlobusRotation();
      }

      if (wasInView && !isInView) {
        stopBatteryFlash();
        stopGlobusRotation();
      }

      if (!revealPlayed && !wasInRevealZone && isInRevealZone) {
        revealPlayed = true;
        playCreatorCardReveal();
      }

      wasInView = isInView;
      wasInRevealZone = isInRevealZone;

    }

    function requestCheckCreatorEntry() {
      if (rafId) return;
      rafId = requestAnimationFrame(checkCreatorEntry);
    }

    checkCreatorEntry();
    window.addEventListener("scroll", requestCheckCreatorEntry, { passive: true });
    window.addEventListener("resize", requestCheckCreatorEntry);
  }
}

function initVariable1SectionAnimations() {
  const section = document.querySelector(".s5");
  if (!section) return;

  const revealMasks = [
    { element: section.querySelector(".s5__container-p-r-3-mask"), delay: 700 },
    { element: section.querySelector(".s5__container-p-r-3-mask-2"), delay: 800 },
    {
      element: section.querySelector(".s5__container-p-r-2-mask-container"),
      delay: 1000,
    },
  ].filter(({ element }) => element);

  const rows = [
    {
      element: section.querySelector(".s5__container-h.margin"),
      textSelector: ".big-mono",
      widthKeyframes: [
        { progress: 0, value: 200 },
        { progress: 50, value: 100 },
      ],
      xKeyframes: [
        { progress: 0, value: 100 },
        { progress: 50, value: 0 },
      ],
      weightKeyframes: [
        { progress: 0, value: 800 },
        { progress: 10, value: 800 },
        { progress: 50, value: 200 },
      ],
      textOpacityKeyframes: [
        { progress: 0, value: 1 },
        { progress: 50, value: 1 },
        { progress: 52, value: 0 },
      ],
      imageOpacityKeyframes: [
        { progress: 0, value: 0 },
        { progress: 50, value: 0 },
        { progress: 52, value: 1 },
      ],
    },
    {
      element: section.querySelector(".s5__container-h-2"),
      textSelector: ".big-mono-230",
      widthKeyframes: [
        { progress: 0, value: 200 },
        { progress: 40, value: 90 },
      ],
      xKeyframes: [
        { progress: 0, value: 100 },
        { progress: 40, value: 0 },
      ],
      weightKeyframes: [
        { progress: 0, value: 800 },
        { progress: 10, value: 800 },
        { progress: 40, value: 200 },
      ],
      textOpacityKeyframes: [
        { progress: 0, value: 1 },
        { progress: 40, value: 1 },
        { progress: 42, value: 0 },
      ],
      imageOpacityKeyframes: [
        { progress: 0, value: 0 },
        { progress: 40, value: 0 },
        { progress: 42, value: 1 },
      ],
    },
    {
      element: section.querySelector(".s5__container-h-3"),
      textSelector: ".big-mono-230",
      widthKeyframes: [
        { progress: 0, value: 200 },
        { progress: 40, value: 45 },
      ],
      xKeyframes: [
        { progress: 0, value: 100 },
        { progress: 40, value: 0 },
      ],
      weightKeyframes: [
        { progress: 0, value: 800 },
        { progress: 10, value: 800 },
        { progress: 40, value: 200 },
      ],
      textOpacityKeyframes: [
        { progress: 0, value: 1 },
        { progress: 40, value: 1 },
        { progress: 42, value: 0 },
      ],
      imageOpacityKeyframes: [
        { progress: 0, value: 0 },
        { progress: 40, value: 0 },
        { progress: 42, value: 1 },
      ],
    },
  ]
    .map((config) => ({
      ...config,
      texts: config.element
        ? Array.from(config.element.querySelectorAll(config.textSelector))
        : [],
      images: config.element
        ? Array.from(config.element.querySelectorAll(".big-mono-image"))
        : [],
    }))
    .filter((config) => config.element);

  const bottomText = section.querySelector(".s5__container-bottom");
  const bottomLabel = section.querySelector(
    '[data-w-id="cb587eb0-ac85-0dc9-d8cf-1173b9b25159"]',
  );
  const bottomCount = section.querySelector(".s6__container-bottom-p-mask");

  revealMasks.forEach(({ element }) => {
    element.style.width = "0%";
  });

  if (bottomLabel) {
    bottomLabel.style.transform = "translate3d(0px, 100%, 0px)";
  }
  if (bottomCount) {
    bottomCount.style.transform = "translate3d(0px, 100%, 0px)";
  }

  rows.forEach(({ element, texts, images, widthKeyframes, xKeyframes }) => {
    const initialWidth = resolveKeyframedValue(0, widthKeyframes);
    const initialX = resolveKeyframedValue(0, xKeyframes);
    element.style.width = `${initialWidth}%`;
    element.style.transform = `translate3d(${initialX}%, 0px, 0px)`;
    element.style.willChange = "transform, width";
    texts.forEach((text) => {
      text.style.fontVariationSettings = '"wght" 800';
      text.style.opacity = "1";
      text.style.willChange = "font-variation-settings, opacity";
    });
    images.forEach((image) => {
      image.style.opacity = "0";
      image.style.willChange = "opacity";
    });
  });

  let revealPlayed = false;
  let bottomPlayed = false;
  let rafId = 0;

  function playRevealMasks() {
    revealMasks.forEach(({ element, delay }) => {
      window.setTimeout(() => {
        element.style.transition = "width 600ms ease";
        element.style.width = "100%";
      }, delay);
    });
  }

  function playBottomText() {
    if (bottomLabel) {
      bottomLabel.style.transition = "transform 500ms ease";
      bottomLabel.style.transform = "translate3d(0px, 0%, 0px)";
    }
    if (bottomCount) {
      bottomCount.style.transition = "transform 500ms ease 100ms";
      bottomCount.style.transform = "translate3d(0px, 0%, 0px)";
    }
  }

  function applyVariable1Scroll() {
    rafId = 0;

    rows.forEach(
      ({
        element,
        texts,
        images,
        widthKeyframes,
        xKeyframes,
        weightKeyframes,
        textOpacityKeyframes,
        imageOpacityKeyframes,
      }) => {
        const progress = normalizeInViewProgress(element) * 100;
        const width = resolveKeyframedValue(progress, widthKeyframes);
        const x = resolveKeyframedValue(progress, xKeyframes);
        const weight = resolveKeyframedValue(progress, weightKeyframes);
        const textOpacity = resolveKeyframedValue(progress, textOpacityKeyframes);
        const imageOpacity = resolveKeyframedValue(progress, imageOpacityKeyframes);

        element.style.width = `${width}%`;
        element.style.transform = `translate3d(${x}%, 0px, 0px)`;

        texts.forEach((text) => {
          text.style.fontVariationSettings = `"wght" ${weight}`;
          text.style.opacity = `${textOpacity}`;
        });

        images.forEach((image) => {
          image.style.opacity = `${imageOpacity}`;
        });
      },
    );

    if (!revealPlayed && rectIntersectsViewportBand(section.getBoundingClientRect(), 60)) {
      revealPlayed = true;
      playRevealMasks();
    }

    if (
      !bottomPlayed &&
      bottomText &&
      rectIntersectsViewportBand(bottomText.getBoundingClientRect(), 20)
    ) {
      bottomPlayed = true;
      playBottomText();
    }
  }

  function requestApplyVariable1Scroll() {
    if (rafId) return;
    rafId = requestAnimationFrame(applyVariable1Scroll);
  }

  applyVariable1Scroll();
  window.addEventListener("scroll", requestApplyVariable1Scroll, {
    passive: true,
  });
  window.addEventListener("resize", requestApplyVariable1Scroll);
}

function initSymbolsSectionAnimations() {
  if (window.innerWidth < 992) return;

  const section = document.querySelector(".s6");
  const frameItem1 = document.querySelector(".s6__frame-item._1");
  const frameItem2 = document.querySelector(".s6__frame-item._2");
  const show = document.querySelector(".s6 .show");
  const symbolsSection = document.querySelector(".s6__section");
  const bottomText = document.querySelector(".s6__container-bottom-text:not(.mob)");
  const bottomTextLabel = bottomText?.querySelector(
    ".s6__container-bottom__mask .p-normal-grotesk.white",
  );
  const bottomTextCount = bottomText?.querySelector(
    ".s6__container-bottom-p .s6__container-bottom-p-mask",
  );

  if (!section) return;

  const outCircBezier = "cubic-bezier(0.075, 0.820, 0.165, 1)";

  function applySymbolsOutState() {
    if (frameItem1) {
      frameItem1.style.transform = "translate3d(-50vw, 0px, 0px)";
    }
    if (frameItem2) {
      frameItem2.style.transform = "translate3d(50vw, 0px, 0px)";
    }
    if (show) {
      show.style.transform = "translate3d(-50vw, 0px, 0px)";
    }
    if (symbolsSection) {
      symbolsSection.style.transform = "translate3d(50vw, 0px, 0px)";
    }
  }

  function playSymbolsIn() {
    if (frameItem1) {
      frameItem1.style.transition = `transform 1000ms ${outCircBezier}`;
      frameItem1.style.transform = "translate3d(0vw, 0px, 0px)";
    }
    if (frameItem2) {
      frameItem2.style.transition = `transform 1000ms ${outCircBezier}`;
      frameItem2.style.transform = "translate3d(0vw, 0px, 0px)";
    }
    if (show) {
      show.style.transition = "transform 1200ms ease";
      show.style.transform = "translate3d(0vw, 0px, 0px)";
    }
    if (symbolsSection) {
      symbolsSection.style.transition = "transform 1200ms ease";
      symbolsSection.style.transform = "translate3d(0vw, 0px, 0px)";
    }
  }

  function playSymbolsOut() {
    if (frameItem1) {
      frameItem1.style.transition = `transform 1000ms ${outCircBezier}`;
      frameItem1.style.transform = "translate3d(-50vw, 0px, 0px)";
    }
    if (frameItem2) {
      frameItem2.style.transition = `transform 1000ms ${outCircBezier}`;
      frameItem2.style.transform = "translate3d(50vw, 0px, 0px)";
    }
    if (show) {
      show.style.transition = "transform 1200ms ease";
      show.style.transform = "translate3d(-50vw, 0px, 0px)";
    }
    if (symbolsSection) {
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

  applySymbolsOutState();
  applyBottomTextInitialState();

  let rafId = 0;
  let entered = false;
  let bottomTextPlayed = false;

  function checkSymbolsState() {
    rafId = 0;
    const rect = section.getBoundingClientRect();
    const shouldEnter = rectIntersectsViewportBand(rect, 50);
    const shouldStayForExit = rectIntersectsViewportBand(rect, 70);
    const shouldShowBottomText =
      bottomText && rectIntersectsViewportBand(bottomText.getBoundingClientRect(), 10);

    if (!entered && shouldEnter) {
      entered = true;
      playSymbolsIn();
    }

    if (entered && !shouldStayForExit) {
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

    element.__martianLottie = animation;
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
    if (element.classList.contains("s4__lottie-item")) return;
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

function initDemo1LottieScroll() {
  const section = document.querySelector(".s4");
  const desktopLottie = document.querySelector(".s4__lottie-item.desktop");
  const mobileLottie = document.querySelector(".s4__lottie-item.mob");

  if (!section || (typeof lottie === "undefined")) return;

  const keyframes = [
    { progress: 0, value: 0 },
    { progress: 70, value: 39 },
    { progress: 85, value: 48 },
    { progress: 90, value: 70 },
  ];

  function interpolateValue(progressPercent) {
    if (progressPercent <= keyframes[0].progress) return keyframes[0].value;

    for (let index = 1; index < keyframes.length; index += 1) {
      const previous = keyframes[index - 1];
      const current = keyframes[index];
      if (progressPercent <= current.progress) {
        const segmentProgress =
          (progressPercent - previous.progress) /
          (current.progress - previous.progress);
        return lerp(previous.value, current.value, segmentProgress);
      }
    }

    return keyframes[keyframes.length - 1].value;
  }

  function resolveActiveAnimation() {
    return window.innerWidth >= 992
      ? desktopLottie?.__martianLottie
      : mobileLottie?.__martianLottie;
  }

  let rafId = 0;

  function applyDemo1LottieScroll() {
    rafId = 0;
    const animation = resolveActiveAnimation();
    if (!animation) return;

    const progress = normalizeInViewProgress(section);
    const playheadValue = interpolateValue(progress * 100);
    const totalFrames = Math.max((animation.totalFrames || 1) - 1, 1);
    const frame = (playheadValue / 100) * totalFrames;
    animation.goToAndStop(frame, true);
  }

  function requestApplyDemo1LottieScroll() {
    if (rafId) return;
    rafId = requestAnimationFrame(applyDemo1LottieScroll);
  }

  applyDemo1LottieScroll();
  window.addEventListener("scroll", requestApplyDemo1LottieScroll, {
    passive: true,
  });
  window.addEventListener("resize", requestApplyDemo1LottieScroll);
}

function initDemo2SectionAnimations() {
  const section = document.querySelector(".s9");
  if (!section) return;

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
  ].filter(({ element }) => element);

  const floatingItems = [
    {
      element: section.querySelector(".s9__img-1"),
      x: 0,
      y: -1.3888888888888888,
      rotate: 10,
    },
    {
      element: section.querySelector(".s9__img-4"),
      x: 0.4861111111111111,
      y: 2.0833333333333335,
      rotate: -7,
    },
    {
      element: section.querySelector(".s9__img-3"),
      x: 1.38,
      y: -0.7,
      rotate: 2,
    },
    {
      element: section.querySelector(".s9__img-2"),
      x: 1.3888888888888888,
      y: -1.0416666666666667,
      rotate: 2,
    },
    {
      element: section.querySelector(".s9__img-6"),
      x: -1.1,
      y: -2.2,
      rotate: -12,
    },
    {
      element: section.querySelector(".s9__img-7"),
      x: 0,
      y: -2.0833333333333335,
      rotate: 5,
    },
    {
      element: section.querySelector(".s9__img-5"),
      x: 1.3888888888888888,
      y: -1.3888888888888888,
      rotate: -5,
    },
    {
      element: section.querySelector(".s9__img-8"),
      x: -2,
      y: -2,
      rotate: -7,
    },
    {
      element: section.querySelector(".s9__img-9"),
      x: -2.8472222222222223,
      y: -1.45,
      rotate: -6,
    },
    {
      element: section.querySelector(".s9__img-10"),
      x: 0,
      y: -2.0833333333333335,
      rotate: 7,
    },
  ].filter(({ element }) => element);

  const desktopText = section.parentElement?.querySelector(".s9-text");
  const mobileText = section.parentElement?.querySelector(".s9-text-mob");
  const desktopTextItems = desktopText
    ? Array.from(desktopText.querySelectorAll(".s9-text-item > .s9-p"))
    : [];
  const mobileTextItems = mobileText
    ? Array.from(mobileText.querySelectorAll(".s9-text-item > .s9-p"))
    : [];
  const lineItems = Array.from(section.querySelectorAll(".s9__container-line"));
  const smallHoverContainers = Array.from(
    section.querySelectorAll(".s9__container-img-1, .s9__container-img-3, .s9__container-img-4, .s9__container-img-6, .s9__container-img-8"),
  );
  const globalSmallMasks = Array.from(
    section.querySelectorAll(".s9__small-container-mask"),
  );
  const globalLineCenters = Array.from(
    section.querySelectorAll(".s9__line-ic-center"),
  );

  function storeNaturalWidth(element, width) {
    if (!element) return;
    element.dataset.martianNaturalWidth = `${Math.max(width, 0)}`;
  }

  function getStoredNaturalWidth(element) {
    return Number(element?.dataset.martianNaturalWidth || 0);
  }

  function measureNaturalWidths() {
    const widthTargets = [
      ...globalSmallMasks,
      ...globalLineCenters,
      ...lineItems.flatMap((line) =>
        Array.from(
          line.querySelectorAll(
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

  function applyLineDesktopInitialState(line) {
    const lineIc = line.querySelector(".s9__line-ic");
    const plusIc = line.querySelector(".s9__plus-ic");
    const textNumber = line.querySelector(".s9__container-text-number");
    const masks = Array.from(line.querySelectorAll(".s9__mask-item-1, .s9__mask-item-2, .s9__mask-item-3"));

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

  function playLineDesktopIn(line) {
    const lineIc = line.querySelector(".s9__line-ic");
    const plusIc = line.querySelector(".s9__plus-ic");
    const textNumber = line.querySelector(".s9__container-text-number");
    const mask1 = line.querySelector(".s9__mask-item-1");
    const mask2 = line.querySelector(".s9__mask-item-2");
    const mask3 = line.querySelector(".s9__mask-item-3");

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

  function playLineDesktopOut(line) {
    const lineIc = line.querySelector(".s9__line-ic");
    const plusIc = line.querySelector(".s9__plus-ic");
    const textNumber = line.querySelector(".s9__container-text-number");
    const mask1 = line.querySelector(".s9__mask-item-1");
    const mask2 = line.querySelector(".s9__mask-item-2");
    const mask3 = line.querySelector(".s9__mask-item-3");
    const lineCenters = Array.from(line.querySelectorAll(".s9__line-ic-center"));

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

  function showSingleSmallMask(container) {
    const mask = container.querySelector(".s9__small-container-mask");
    if (!mask) return;
    mask.style.transition = "width 300ms ease-in";
    mask.style.width = `${getStoredNaturalWidth(mask)}px`;
  }

  function hideSingleSmallMask(container) {
    const mask = container.querySelector(".s9__small-container-mask");
    if (!mask) return;
    mask.style.transition = "width 300ms ease-in";
    mask.style.width = "0px";
  }

  function applyLineMobileState(line, visible) {
    const mobileLine = line.querySelector(".s9__line-ic-mob");
    const mobilePlus = line.querySelector(".s9__plus-ic-mob");

    [mobileLine, mobilePlus].forEach((item) => {
      if (!item) return;
      item.style.transition = "opacity 500ms ease-out";
      item.style.opacity = visible ? "1" : "0";
    });
  }

  function updateFloatingItem(item, inView) {
    if (!inView) {
      item.progress = 0;
      item.direction = 1;
      item.element.style.transform =
        "translate3d(0vw, 0vw, 0px) rotateZ(0deg)";
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

    const eased = item.progress < 0.5
      ? 2 * item.progress * item.progress
      : 1 - Math.pow(-2 * item.progress + 2, 2) / 2;

    const x = lerp(0, item.x, eased);
    const y = lerp(0, item.y, eased);
    const rotate = lerp(0, item.rotate, eased);
    item.element.style.transform =
      `translate3d(${x}vw, ${y}vw, 0px) rotateZ(${rotate}deg)`;
  }

  measureNaturalWidths();

  floatingItems.forEach((item) => {
    item.progress = 0;
    item.direction = 1;
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

    const desktopProgress = desktopText ? normalizeInViewProgress(desktopText) * 100 : 0;
    const desktopY = resolveKeyframedValue(desktopProgress, [
      { progress: 5, value: 100 },
      { progress: 45, value: 0 },
    ]);
    desktopTextItems.forEach((item) => {
      item.style.transform = `translate3d(0px, ${desktopY}%, 0px)`;
    });

    const mobileProgress = mobileText ? normalizeInViewProgress(mobileText) * 100 : 0;
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

function initFooterAnimations() {
  const footerContainer = document.querySelector(".footer__container");
  if (!footerContainer) return;
  const footerScrollStartOffset = 100;

  const leftCard = footerContainer.querySelector(".footer__card-item.margin._1");
  const rightCard = footerContainer.querySelector(".footer__card-item._2");
  const footerLinks = footerContainer.querySelector(".footer__links");
  const blackLeft = footerContainer.querySelector(".footer__lines-item-1-black");
  const rightLine = footerContainer.querySelector(".footer__lines-item-2");
  const footerCards = Array.from(
    footerContainer.querySelectorAll(".footer__card-item"),
  );

  footerCards.forEach((card) => {
    const hoverLayer = card.querySelector(".bt-orange__hover");
    const monoTitle = card.querySelector(".p-big-mono");
    const groteskTitle = card.querySelector(".p-big-grotesk");

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

  let rafId = 0;

  function getFooterTargetProgress() {
    const rect = footerContainer.getBoundingClientRect();
    const viewportHeight = window.innerHeight || 1;
    return clamp(
      (-rect.top) / viewportHeight,
      0,
      1,
    ) * 100;
  }

  function renderFooterAnimations(progress) {
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

  function applyFooterAnimations() {
    rafId = 0;
    renderFooterAnimations(getFooterTargetProgress());
  }

  function requestApplyFooterAnimations() {
    if (rafId) return;
    rafId = requestAnimationFrame(applyFooterAnimations);
  }

  renderFooterAnimations(getFooterTargetProgress());
  window.addEventListener("scroll", requestApplyFooterAnimations, {
    passive: true,
  });
  window.addEventListener("resize", requestApplyFooterAnimations);
}

function initButtonHoverEffects() {
  const isDesktop = (window.innerWidth || 0) >= 992;

  document.querySelectorAll(".bt-orange").forEach((button) => {
    const hoverLayer = button.querySelector(".bt-orange__hover");
    if (!hoverLayer) return;

    hoverLayer.style.opacity = "0";
    hoverLayer.style.transition = "opacity 200ms ease-out";

    if (!isDesktop) return;

    button.addEventListener("mouseenter", () => {
      hoverLayer.style.opacity = "1";
    });

    button.addEventListener("mouseleave", () => {
      hoverLayer.style.opacity = "0";
    });
  });

  document.querySelectorAll(".bt-black").forEach((button) => {
    const hoverLayer = button.querySelector(".bt-black-hover");
    if (!hoverLayer) return;

    hoverLayer.style.opacity = "0";
    hoverLayer.style.transition = "opacity 200ms ease-out";

    if (!isDesktop) return;

    button.addEventListener("mouseenter", () => {
      hoverLayer.style.opacity = "1";
    });

    button.addEventListener("mouseleave", () => {
      hoverLayer.style.opacity = "0";
    });
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

initVhFix();

document.addEventListener("DOMContentLoaded", () => {
  initSelectorBlocks();
  initScrollTriggerAttributes();
  initFirstScreenState();
  initFirstScreenScrollEffects();
  initPlusIconScrollEffects();
  initAboutCardsParallax();
  initCreatorSectionAnimations();
  initVariable1SectionAnimations();
  initSymbolsSectionAnimations();
  initNoiseAnimation();
  initRuntimeLotties();
  initDemo1LottieScroll();
  initInteractiveLotties();
  initTextControls();
  initVariable2Dropdown();
  initDemo2SectionAnimations();
  initFooterAnimations();
  initButtonHoverEffects();
  initPreloaderSequence();
  initAnchorButtons();
  initLenisAndScrollLock();
  initMenuPopup();
  initFirstSectionObservers();
});

window.addEventListener("load", () => {
  initCanvasFlames();
});
