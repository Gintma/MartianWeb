function updateProgress(input: HTMLInputElement) {
  const progress =
    ((Number(input.value) - Number(input.min)) /
      (Number(input.max) - Number(input.min))) *
    100;
  input.style.background = `linear-gradient(to right, #E43C0C ${progress}%, #ffffff ${progress}%)`;
}

function refreshRangeProgress() {
  document.querySelectorAll<HTMLInputElement>('input[type="range"]').forEach(updateProgress);
}

function applyAlignButtonState(button: Element, hovered = false) {
  if (!(button instanceof HTMLElement)) return;

  const orangeIcon = button.querySelector<HTMLElement>(".s8__bt-align-ic-o");
  const whiteIcon = button.querySelector<HTMLElement>(".s8__bt-align-ic-w");
  const iconEmbed = button.querySelector<HTMLElement>(".s8__ic-bt-align");
  const staticOrangeIcon = button.querySelector<HTMLElement>(".s8__bt-align-ic-orange");

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

function initTextControls() {
  const section = document.querySelector<HTMLElement>('[text-display="mod"]');
  const ddText = document.querySelector<HTMLElement>('[dd="text"]');
  const weightButtons = Array.from(document.querySelectorAll<HTMLElement>("[text]"));
  const alignButtons = Array.from(
    document.querySelectorAll<HTMLElement>("[text-align]"),
  );
  const sizeSlider = document.querySelector<HTMLInputElement>('[slider="size"]');
  const sizeDisplay = document.querySelector<HTMLElement>('[slider="size-display"]');
  const spacingSlider = document.querySelector<HTMLInputElement>('[slider="spacing"]');
  const spacingDisplay = document.querySelector<HTMLElement>(
    '[slider="spacing-display"]',
  );
  const heightSlider = document.querySelector<HTMLInputElement>('[slider="height"]');
  const heightDisplay = document.querySelector<HTMLElement>(
    '[slider="height-display"]',
  );

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

  const targetSection = section;
  const targetDdText = ddText;
  const targetSizeSlider = sizeSlider;
  const targetSizeDisplay = sizeDisplay;
  const targetSpacingSlider = spacingSlider;
  const targetSpacingDisplay = spacingDisplay;
  const targetHeightSlider = heightSlider;
  const targetHeightDisplay = heightDisplay;

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
        applyAlignButtonState(otherButton, false);
      });

      button.classList.add("active");
      targetSection.style.textAlign = button.getAttribute("text-align") || "";
      applyAlignButtonState(button, false);
    });

    applyAlignButtonState(button, false);

    if (window.innerWidth >= 992) {
      button.addEventListener("mouseenter", () => {
        if (!button.classList.contains("active")) {
          applyAlignButtonState(button, true);
        }
      });

      button.addEventListener("mouseleave", () => {
        if (!button.classList.contains("active")) {
          applyAlignButtonState(button, false);
        }
      });
    }
  });

  weightButtons.forEach((button) => {
    button.addEventListener("click", () => {
      targetSection.style.fontWeight = button.getAttribute("text") || "";
      targetDdText.textContent = button.textContent || "";
    });
  });

  function updateFontSizeAndLineHeight() {
    targetSection.style.fontSize = `${targetSizeSlider.value}px`;
    targetSizeDisplay.textContent = targetSizeSlider.value;
    targetHeightDisplay.textContent = targetHeightSlider.value;
    refreshRangeProgress();
  }

  function updateLetterSpacing() {
    targetSection.style.letterSpacing = `${targetSpacingSlider.value}px`;
    targetSpacingDisplay.textContent = targetSpacingSlider.value;
    refreshRangeProgress();
  }

  function updateLineHeight() {
    targetSection.style.lineHeight = `${targetHeightSlider.value}px`;
    targetHeightDisplay.textContent = targetHeightSlider.value;
    refreshRangeProgress();
  }

  targetSizeSlider.addEventListener("input", updateFontSizeAndLineHeight);
  targetSpacingSlider.addEventListener("input", updateLetterSpacing);
  targetHeightSlider.addEventListener("input", updateLineHeight);

  updateFontSizeAndLineHeight();
  updateLetterSpacing();
}

function initVariable2Dropdown() {
  const dropdown = document.querySelector<HTMLElement>(".s8__container .dropdown");
  const dropdownToggle = dropdown?.querySelector<HTMLElement>(".dropdown-toggle");
  const dropdownList = dropdown?.querySelector<HTMLElement>(".dropdown-list");
  const dropdownItems = Array.from(
    dropdownList?.querySelectorAll<HTMLElement>(".s8__bt") || [],
  );

  if (!dropdown || !dropdownToggle || !dropdownList || !dropdownItems.length) {
    return;
  }

  const targetDropdown = dropdown;
  const targetDropdownToggle = dropdownToggle;
  const targetDropdownList = dropdownList;

  let isOpen = false;
  let closeTimer: number | null = null;
  const delay = Number(dropdown.getAttribute("data-delay") || "0");
  const hoverEnabled = dropdown.getAttribute("data-hover") === "true";

  function isMobileDropdownMode() {
    return window.innerWidth <= 991;
  }

  function clearCloseTimer() {
    if (closeTimer !== null) {
      window.clearTimeout(closeTimer);
      closeTimer = null;
    }
  }

  function applyClosedState() {
    clearCloseTimer();
    targetDropdownList.style.opacity = "0";
    targetDropdownList.style.display = "none";
    targetDropdown.classList.remove("w--open");
    targetDropdownToggle.classList.remove("w--open");
    targetDropdownToggle.setAttribute("aria-expanded", "false");
    isOpen = false;
  }

  function openDropdown() {
    clearCloseTimer();
    targetDropdownList.style.display = "flex";
    targetDropdownList.style.transition = "opacity 200ms ease-out";
    targetDropdown.classList.add("w--open");
    targetDropdownToggle.classList.add("w--open");
    targetDropdownToggle.setAttribute("aria-expanded", "true");
    requestAnimationFrame(() => {
      targetDropdownList.style.opacity = "1";
    });
    isOpen = true;
  }

  function closeDropdown() {
    clearCloseTimer();
    targetDropdownList.style.transition = "opacity 200ms ease-out";
    targetDropdownList.style.opacity = "0";
    window.setTimeout(() => {
      if (!isOpen) {
        targetDropdownList.style.display = "none";
        targetDropdown.classList.remove("w--open");
        targetDropdownToggle.classList.remove("w--open");
        targetDropdownToggle.setAttribute("aria-expanded", "false");
      }
    }, 200);
    isOpen = false;
  }

  applyClosedState();

  targetDropdownToggle.addEventListener("click", (event) => {
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
    targetDropdown.addEventListener("mouseenter", () => {
      if (isMobileDropdownMode()) return;
      openDropdown();
    });

    targetDropdown.addEventListener("mouseleave", () => {
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
    if (targetDropdown.contains(event.target as Node)) return;
    closeDropdown();
  });

  window.addEventListener("resize", () => {
    if (!isMobileDropdownMode()) {
      applyClosedState();
    }
  });
}

export function initVariable2Section() {
  initTextControls();
  initVariable2Dropdown();
}
