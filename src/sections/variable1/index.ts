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

export function initVariable1Section() {
  const section = document.querySelector(".s5");
  if (!(section instanceof HTMLElement)) return;

  const revealMasks = [
    { element: section.querySelector(".s5__container-p-r-3-mask"), delay: 700 },
    { element: section.querySelector(".s5__container-p-r-3-mask-2"), delay: 800 },
    {
      element: section.querySelector(".s5__container-p-r-2-mask-container"),
      delay: 1000,
    },
  ].filter(
    (
      item,
    ): item is typeof item & {
      element: HTMLElement;
    } => item.element instanceof HTMLElement,
  );

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
      texts:
        config.element instanceof HTMLElement
          ? Array.from(config.element.querySelectorAll<HTMLElement>(config.textSelector))
          : [],
      images:
        config.element instanceof HTMLElement
          ? Array.from(config.element.querySelectorAll<HTMLElement>(".big-mono-image"))
          : [],
    }))
    .filter(
      (
        config,
      ): config is typeof config & {
        element: HTMLElement;
        texts: HTMLElement[];
        images: HTMLElement[];
      } => config.element instanceof HTMLElement,
    );

  const bottomText = section.querySelector(".s5__container-bottom");
  const bottomLabel = section.querySelector(
    '[data-w-id="cb587eb0-ac85-0dc9-d8cf-1173b9b25159"]',
  ) as HTMLElement | null;
  const bottomCount = section.querySelector(
    ".s6__container-bottom-p-mask",
  ) as HTMLElement | null;

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
  const targetSection = section;

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

    if (
      !revealPlayed &&
      rectIntersectsViewportBand(targetSection.getBoundingClientRect(), 60)
    ) {
      revealPlayed = true;
      playRevealMasks();
    }

    if (
      !bottomPlayed &&
      bottomText instanceof HTMLElement &&
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
