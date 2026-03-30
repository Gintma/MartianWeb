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

function setOpacity(element: Element | null, value: number | string) {
  if (!(element instanceof HTMLElement)) return;
  element.style.opacity = String(value);
}

function setTransition(element: Element | null, transition: string) {
  if (!(element instanceof HTMLElement)) return;
  element.style.transition = transition;
}

export function initCreatorSection() {
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

  if (!(section instanceof HTMLElement)) return;

  function setWidth(element: Element | null, value: number) {
    if (!(element instanceof HTMLElement)) return;
    element.style.width = `${value}%`;
  }

  function setRotation(element: Element | null, value: number) {
    if (!(element instanceof HTMLElement)) return;
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

      if (heading1 instanceof HTMLElement) {
        heading1.style.transform = `translate3d(0, ${headingY}%, 0)`;
        heading1.style.willChange = "transform";
      }

      if (heading2 instanceof HTMLElement) {
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
    if (!(battery instanceof HTMLElement)) return;
    const batteryWithAnimation = battery as HTMLElement & {
      _creatorBatteryAnimation?: Animation | null;
    };
    if (batteryWithAnimation._creatorBatteryAnimation) return;

    battery.style.willChange = "opacity";
    batteryWithAnimation._creatorBatteryAnimation = battery.animate(
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
    if (!(globus instanceof HTMLElement)) return;
    const globusWithAnimation = globus as HTMLElement & {
      _creatorRotationAnimation?: Animation | null;
    };
    if (globusWithAnimation._creatorRotationAnimation) return;

    globus.style.willChange = "transform";
    globusWithAnimation._creatorRotationAnimation = globus.animate(
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
    if (!(battery instanceof HTMLElement)) return;
    const batteryWithAnimation = battery as HTMLElement & {
      _creatorBatteryAnimation?: Animation | null;
    };
    if (!batteryWithAnimation._creatorBatteryAnimation) return;
    batteryWithAnimation._creatorBatteryAnimation.cancel();
    batteryWithAnimation._creatorBatteryAnimation = null;
    setOpacity(battery, 0);
  }

  function stopGlobusRotation() {
    if (!(globus instanceof HTMLElement)) return;
    const globusWithAnimation = globus as HTMLElement & {
      _creatorRotationAnimation?: Animation | null;
    };
    if (!globusWithAnimation._creatorRotationAnimation) return;
    globusWithAnimation._creatorRotationAnimation.cancel();
    globusWithAnimation._creatorRotationAnimation = null;
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
      if (!(element instanceof HTMLElement)) return;
      window.setTimeout(() => {
        element.style.transition = "width 600ms ease";
        setWidth(element, 100);
      }, delay);
    });

    if (globus instanceof HTMLElement) {
      window.setTimeout(() => {
        setTransition(globus, "opacity 600ms ease-out");
        setOpacity(globus, 1);
      }, 600);
    }

    if (cardButton instanceof HTMLElement) {
      window.setTimeout(() => {
        setTransition(cardButton, "opacity 600ms ease-out");
        setOpacity(cardButton, 1);
      }, 1300);
    }

    lineItems.forEach((element, index) => {
      if (!(element instanceof HTMLElement)) return;
      window.setTimeout(() => {
        element.style.transition = "width 600ms ease";
        setWidth(element, 0);
      }, 1700 + index * 100);
    });
  }

  initCreatorIntoViewState();
  initCreatorScrollHeading();

  if (card instanceof HTMLElement) {
    const targetCard = card;
    let revealPlayed = false;
    let rafId = 0;
    let wasInView = false;
    let wasInRevealZone = false;

    function checkCreatorEntry() {
      rafId = 0;
      const rect = targetCard.getBoundingClientRect();
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
