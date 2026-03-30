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
} as const;

export function initSelectorBlocks() {
  const selectorWrapper = document.querySelector("[selector]");
  const show = document.querySelector<HTMLElement>("[text-display]");
  const weightButtons = Array.from(
    document.querySelectorAll<HTMLElement>("[text-weight-1]"),
  );

  if (!(selectorWrapper instanceof HTMLElement) || !show || !weightButtons.length) {
    return;
  }

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

  let lastSelectedButton: HTMLElement | null = null;

  weightButtons.forEach((button, index) => {
    button.addEventListener("click", () => {
      const fontWeightValue = button.getAttribute("text-weight-1") || "";
      show.style.fontWeight = fontWeightValue;

      document.querySelectorAll<HTMLElement>(".selector-letter").forEach((letter) => {
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
