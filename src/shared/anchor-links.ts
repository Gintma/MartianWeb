const scrollLinkPairs = [
  ["btFooter", "footer"],
  ["btAbout", "about"],
  ["btCreator", "creator"],
  ["btDemo1", "demo1"],
  ["btSymbols", "symbols"],
  ["btVariable1", "variable1"],
  ["btVariable2", "variable2"],
  ["btDemo2", "demo2"],
] as const;

export function initAnchorLinks() {
  scrollLinkPairs.forEach(([buttonId, anchorId]) => {
    const button = document.getElementById(buttonId);
    const anchor = document.getElementById(anchorId);
    if (!button || !anchor) return;

    button.addEventListener("click", (event) => {
      event.preventDefault();
      anchor.scrollIntoView({ behavior: "instant" });
    });
  });
}
