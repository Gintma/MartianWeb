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

type MartianLottieElement = HTMLElement & {
  __martianLottie?: {
    totalFrames?: number;
    goToAndStop: (value: number, isFrame: boolean) => void;
  };
};

export function initDemo1Section() {
  const section = document.querySelector(".s4");
  const desktopLottie = document.querySelector(
    ".s4__lottie-item.desktop",
  ) as MartianLottieElement | null;
  const mobileLottie = document.querySelector(
    ".s4__lottie-item.mob",
  ) as MartianLottieElement | null;

  if (!(section instanceof HTMLElement)) return;

  const keyframes = [
    { progress: 0, value: 0 },
    { progress: 70, value: 39 },
    { progress: 85, value: 48 },
    { progress: 90, value: 70 },
  ];

  function interpolateValue(progressPercent: number) {
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
