type TriggerState = {
  element: Element | null;
  name: string | null;
  height: number;
  documentTopOffset: number;
};

function throttle<T extends Array<unknown>>(
  callback: (...args: T) => void,
  timeout: number,
) {
  let timer: number | null = null;
  return (...args: T) => {
    if (timer !== null) return;
    timer = window.setTimeout(() => {
      callback(...args);
      window.clearTimeout(timer!);
      timer = null;
    }, timeout);
  };
}

export function initScrollTriggerAttributes() {
  const triggerElements = Array.from(document.querySelectorAll("[scrollTrigger]"));
  if (!triggerElements.length) return;

  const state: {
    triggers: TriggerState[];
    pageHeight: number;
    windowHeight: number;
    currentPosition: number;
  } = {
    triggers: [],
    pageHeight: 0,
    windowHeight: 0,
    currentPosition: 0,
  };

  function recalculateScroll() {
    state.currentPosition = window.pageYOffset || document.documentElement.scrollTop;
    state.triggers.forEach((trigger) => {
      if (!trigger.name) return;
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

  function recalculatePage() {
    state.windowHeight = window.innerHeight;
    state.currentPosition = window.pageYOffset || document.documentElement.scrollTop;

    state.triggers = triggerElements.map((triggerEl) => {
      const triggerRect = triggerEl.getBoundingClientRect();
      return {
        element: triggerEl,
        name: triggerEl.getAttribute("scrollTrigger"),
        height: (triggerEl as HTMLElement).clientHeight,
        documentTopOffset: state.currentPosition + triggerRect.top,
      };
    });

    state.pageHeight = document.body.offsetHeight;
    recalculateScroll();
  }

  function loopRecalculatePage(handler: () => void) {
    window.setTimeout(() => {
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
