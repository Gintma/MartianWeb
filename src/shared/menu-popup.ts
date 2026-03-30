export function initMenuPopup() {
  const menuPopup = document.querySelector<HTMLElement>(".menu-popup");
  const openButtons = Array.from(
    document.querySelectorAll<HTMLElement>("[data-menu-open]"),
  );
  const closeButtons = Array.from(
    document.querySelectorAll<HTMLElement>("[data-menu-close]"),
  );
  const burgerLine1 = document.querySelector<HTMLElement>(".menu__bt-burger-line-1");
  const burgerLine2 = document.querySelector<HTMLElement>(".menu__bt-burger-line-2");
  const burgerLine3 = document.querySelector<HTMLElement>(".menu__bt-burger-line-3");
  const openOverlay = document.querySelector<HTMLElement>(".menu-popup__open-div");
  const closeOverlay = document.querySelector<HTMLElement>(".menu-popup__close-div");
  const noClickWrap = document.querySelector<HTMLElement>(".no-click-wrap");
  const topMask = document.querySelector<HTMLElement>(".menu-popup__img-top-mask");
  const bottomMask = document.querySelector<HTMLElement>(".menu-popup__img-bottom-mask");
  const topLine = document.querySelector<HTMLElement>(".menu-popup__img-top-line");
  const bottomLine = document.querySelector<HTMLElement>(".menu-popup__img-bottom-line");
  const topLineMob = document.querySelector<HTMLElement>(".menu-popup__img-top-line-mob");
  const bottomLineMob = document.querySelector<HTMLElement>(".menu-popup__img-bottom-line-mob");
  const bottomItems = document.querySelector<HTMLElement>(".container-bottom__p-items");
  const popupItems = Array.from(
    menuPopup?.querySelectorAll<HTMLElement>(".menu-popup__item-p") || [],
  );
  const popupCloseBlock = document.querySelector<HTMLElement>(".menu-popup__close-block");
  const hoverablePopupItems = popupItems.filter(
    (item) =>
      item.classList.contains("_2") ||
      item.classList.contains("_3") ||
      item.classList.contains("_4") ||
      item.classList.contains("_5") ||
      item.classList.contains("_6") ||
      item.classList.contains("_7") ||
      item.classList.contains("_9") ||
      item.classList.contains("_10"),
  );

  if (!menuPopup || !openButtons.length || !closeButtons.length) return;
  const targetMenuPopup = menuPopup;

  const runtimeWindow = window as Window & {
    __martianBlockScroll?: () => void;
    __martianUnblockScroll?: () => void;
  };

  document
    .querySelectorAll<HTMLElement>(".black-div-b, .fixed-black-line-l, .fixed-black-line-r")
    .forEach((el) => {
      el.style.display = "none";
    });

  let isOpen = false;
  let timerIds: number[] = [];

  function clearTimers() {
    timerIds.forEach((id) => window.clearTimeout(id));
    timerIds = [];
  }

  function later(delay: number, fn: () => void) {
    const id = window.setTimeout(fn, delay);
    timerIds.push(id);
  }

  function isDesktopMenu() {
    return (window.innerWidth || 0) >= 992;
  }

  function setMenuItemWidth(item: HTMLElement | null, value: string) {
    if (!item) return;
    item.style.overflow = "hidden";
    item.style.width = value;
  }

  function getNaturalItemWidth(item: HTMLElement | null) {
    if (!item) return "0px";
    if (item.classList.contains("_2")) return "100%";
    const prevWidth = item.style.width;
    const prevTransition = item.style.transition;
    item.style.transition = "none";
    item.style.width = "auto";
    const width = item.getBoundingClientRect().width || item.scrollWidth || 0;
    item.style.width = prevWidth;
    item.style.transition = prevTransition;
    return `${width}px`;
  }

  function applyBurgerState(open: boolean, desktop: boolean) {
    if (burgerLine1) {
      burgerLine1.style.transition = "transform 300ms ease";
      burgerLine1.style.transform = open
        ? `translateY(${desktop ? "0.4vw" : "1.5vw"}) rotate(45deg)`
        : "translateY(0) rotate(0deg)";
    }
    if (burgerLine2) {
      burgerLine2.style.opacity = open ? "0" : "1";
    }
    if (burgerLine3) {
      burgerLine3.style.transition = "transform 300ms ease";
      burgerLine3.style.transform = open
        ? `translateY(${desktop ? "-0.5vw" : "-2vw"}) rotate(-45deg)`
        : "translateY(0) rotate(0deg)";
    }
  }

  function setMenuBaseState() {
    popupItems.forEach((item) => {
      item.style.transition = "";
      setMenuItemWidth(item, "0%");
    });

    if (topMask) {
      topMask.style.transition = "";
      topMask.style.transform = "translate3d(0, -100%, 0)";
    }
    if (bottomMask) {
      bottomMask.style.transition = "";
      bottomMask.style.transform = "translate3d(0, 100%, 0)";
    }
    if (topLine) topLine.style.opacity = "1";
    if (bottomLine) bottomLine.style.opacity = "1";
    if (topLineMob) topLineMob.style.opacity = "1";
    if (bottomLineMob) bottomLineMob.style.opacity = "1";
    if (popupCloseBlock) popupCloseBlock.style.display = "none";
    if (closeOverlay) closeOverlay.style.display = "none";
    if (openOverlay) openOverlay.style.display = "block";
    if (noClickWrap) noClickWrap.style.display = "block";
  }

  function openMenu() {
    clearTimers();
    const desktop = isDesktopMenu();
    const endDelay = desktop ? 2000 : 2100;
    isOpen = true;

    targetMenuPopup.style.display = "flex";
    if (closeOverlay) closeOverlay.style.display = "none";
    if (openOverlay) openOverlay.style.display = "none";
    if (noClickWrap) noClickWrap.style.display = "block";
    if (desktop && bottomItems) bottomItems.style.display = "none";
    applyBurgerState(true, desktop);

    if (topMask) {
      topMask.style.transition = `transform ${desktop ? 600 : 1000}ms ease`;
    }
    if (bottomMask) {
      bottomMask.style.transition = `transform ${desktop ? 600 : 1000}ms ease`;
    }

    later(0, () => {
      if (!isOpen) return;
      if (topMask) topMask.style.transform = "translate3d(0, 0%, 0)";
      if (bottomMask) bottomMask.style.transform = "translate3d(0, 0%, 0)";
    });

    popupItems.forEach((item) => {
      item.style.transition = "width 1000ms ease";
    });

    const openOrder = ["_1", "_2", "_3", "_4", "_5", "_6", "_7", "_9", "_10", "_11"];
    openOrder.forEach((className, index) => {
      const item = popupItems.find((entry) => entry.classList.contains(className));
      if (!item) return;
      later(200 + index * 100, () => {
        if (!isOpen) return;
        setMenuItemWidth(item, getNaturalItemWidth(item));
      });
    });

    later(desktop ? 500 : 700, () => {
      if (!isOpen) return;
      if (desktop) {
        if (topLine) topLine.style.opacity = "0";
        if (bottomLine) bottomLine.style.opacity = "0";
      } else {
        if (topLineMob) topLineMob.style.opacity = "0";
        if (bottomLineMob) bottomLineMob.style.opacity = "0";
      }
    });

    later(endDelay, () => {
      if (!isOpen) return;
      if (closeOverlay) closeOverlay.style.display = "block";
      if (noClickWrap) noClickWrap.style.display = "none";
    });

    if (typeof runtimeWindow.__martianBlockScroll === "function") {
      runtimeWindow.__martianBlockScroll();
    }
  }

  function closeMenu() {
    clearTimers();
    const desktop = isDesktopMenu();
    const endDelay = desktop ? 2100 : 2300;
    isOpen = false;

    if (closeOverlay) closeOverlay.style.display = "none";
    if (noClickWrap) noClickWrap.style.display = desktop ? "block" : "none";
    applyBurgerState(false, desktop);

    popupItems.forEach((item) => {
      item.style.transition = `width ${desktop ? 300 : 500}ms ease`;
    });

    const closeOrder = desktop
      ? ["_10", "_9", "_7", "_6", "_5", "_4", "_3", "_2", "_1"]
      : ["_11", "_10", "_9", "_7", "_6", "_5", "_4", "_3", "_2", "_1"];

    closeOrder.forEach((className, index) => {
      const item = popupItems.find((entry) => entry.classList.contains(className));
      if (!item) return;
      later(index * 100, () => {
        setMenuItemWidth(item, "0%");
      });
    });

    if (desktop) {
      later(1100, () => {
        if (topMask) {
          topMask.style.transition = "transform 1000ms ease";
          topMask.style.transform = "translate3d(0, -100%, 0)";
        }
        if (bottomMask) {
          bottomMask.style.transition = "transform 1000ms ease";
          bottomMask.style.transform = "translate3d(0, 100%, 0)";
        }
        if (topLine) topLine.style.opacity = "1";
        if (bottomLine) bottomLine.style.opacity = "1";
      });
      later(1200, () => {
        if (bottomItems) bottomItems.style.display = "block";
      });
    } else {
      later(800, () => {
        if (topLineMob) topLineMob.style.opacity = "1";
        if (bottomLineMob) bottomLineMob.style.opacity = "1";
      });
      later(1300, () => {
        if (topMask) {
          topMask.style.transition = "transform 1000ms ease";
          topMask.style.transform = "translate3d(0, -100%, 0)";
        }
        if (bottomMask) {
          bottomMask.style.transition = "transform 1000ms ease";
          bottomMask.style.transform = "translate3d(0, 100%, 0)";
        }
      });
    }

    later(endDelay, () => {
      targetMenuPopup.style.display = "none";
      if (openOverlay) openOverlay.style.display = "block";
    });

    if (typeof runtimeWindow.__martianUnblockScroll === "function") {
      runtimeWindow.__martianUnblockScroll();
    }
  }

  targetMenuPopup.style.display = "none";
  if (closeOverlay) closeOverlay.style.display = "none";
  if (openOverlay) openOverlay.style.display = "block";
  if (noClickWrap) noClickWrap.style.display = "block";
  if (bottomItems) bottomItems.style.display = "block";
  setMenuBaseState();
  applyBurgerState(false, isDesktopMenu());

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

  hoverablePopupItems.forEach((item) => {
    const label = item.querySelector<HTMLElement>(".p-big-caps");
    if (!label) return;

    label.style.color = "rgb(255, 255, 255)";
    label.style.transition = "color 200ms ease";

    item.addEventListener("mouseenter", () => {
      if ((window.innerWidth || 0) < 992) return;
      label.style.color = "rgb(0, 0, 0)";
    });

    item.addEventListener("mouseleave", () => {
      if ((window.innerWidth || 0) < 992) return;
      label.style.color = "rgb(255, 255, 255)";
    });
  });

  window.addEventListener("resize", () => {
    if (isOpen) return;
    setMenuBaseState();
    applyBurgerState(false, isDesktopMenu());
  });
}
