import Lenis from "lenis";

export function initLenisAndScrollLock() {
  const lenis = new Lenis();
  const preloader = document.querySelector<HTMLElement>(".preloader");
  const runtimeWindow = window as Window & {
    __martianBlockScroll?: () => void;
    __martianUnblockScroll?: () => void;
  };

  function raf(time: number) {
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

  runtimeWindow.__martianBlockScroll = blockScroll;
  runtimeWindow.__martianUnblockScroll = unblockScroll;

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
