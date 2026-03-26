const glyphGroups = {
  "[Basic Latin Uppercase]": "ABCDEFGHIJKLMNOPQRSTUVWXYZ",
  "[Basic Latin Lowercase]": "abcdefghijklmnopqrstuvwxyz",
  "[Extended Latin Uppercase]":
    "ÁĂǍÂÄÀĀĄÅǺÃÆǼĆČÇĊÐĎḌÉĚÊËĖÈĒĘẼƏĞǦĢĠĦḤĲÍÎÏİỊÌĪĮĨĶĹĽĻĿŁŃŇŅƝÑŊÓÔÖỌÒŐŌØǾÕŒÞŔŘŖŚŠŞṢẞŦŤŢȚṬÚŬÛÜỤÙŰŪŲŮŨẂŴẄẀÝŶŸỲȲỸŹŽŻẒ",
  "[Extended Latin Lowercase]":
    "áăǎâäàāąåǻãæǽćčçċðďḍéěêëėèēęẽəğǧģġħḥĳíîïıịìīįĩķĺľļŀłńňņɲñŋóôöọòőōøǿõœþŕřŗśšşṣßŧťţțṭúŭûüụùűūųůũẃŵẅẁýŷÿỳȳỹźžżẓ",
  "[Punctuation]": "!¡?¿.,:;…·•*/\\|¦†‡(){}[]\"'‚„“”‘’«‹›»––—‑_",
  "[Figures]": "0123456789",
  "[Math]": "+-×÷=≠<>±≈¬µ",
  "[Symbols]": "@¶§©ƒ№#&%‰Ꞌꞌ°ªº®™",
  "[Arrows]": "←↑→↓",
};

function initPreloader() {
  const preloader = document.querySelector("[data-preloader]");
  const value = document.getElementById("preloader-value");

  if (!preloader || !value) return;

  const duration = 1800;
  const start = performance.now();

  function tick(now) {
    const progress = Math.min((now - start) / duration, 1);
    value.textContent = `${Math.round(progress * 100)}%`;

    if (progress < 1) {
      requestAnimationFrame(tick);
      return;
    }

    preloader.classList.add("is-hidden");
  }

  requestAnimationFrame(tick);
}

function initReveal() {
  const items = document.querySelectorAll(".reveal");
  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add("is-visible");
          observer.unobserve(entry.target);
        }
      });
    },
    {
      threshold: 0.15,
      rootMargin: "0px 0px -10% 0px",
    },
  );

  items.forEach((item) => observer.observe(item));
}

function initSmoothAnchors() {
  document.querySelectorAll('a[href^="#"]').forEach((link) => {
    link.addEventListener("click", (event) => {
      const id = link.getAttribute("href");
      if (!id || id === "#") return;
      const target = document.querySelector(id);
      if (!target) return;

      event.preventDefault();
      target.scrollIntoView({ behavior: "smooth", block: "start" });
    });
  });
}

function initSectionRail() {
  const links = [...document.querySelectorAll("[data-section-link]")];
  if (!links.length) return;

  const map = new Map();
  links.forEach((link) => {
    const id = link.getAttribute("href")?.replace("#", "");
    if (!id) return;
    const target = document.getElementById(id) || (id === "top" ? document.querySelector("main") : null);
    if (target) map.set(target, link);
  });

  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (!entry.isIntersecting) return;
        links.forEach((link) => link.classList.remove("is-active"));
        const link = map.get(entry.target);
        if (link) link.classList.add("is-active");
      });
    },
    {
      threshold: 0.35,
      rootMargin: "-20% 0px -45% 0px",
    },
  );

  map.forEach((_, element) => observer.observe(element));

  const topLink = document.querySelector('[data-section-link="top"]');
  if (topLink) topLink.classList.add("is-active");
}

function initGlyphSelector() {
  const groupsRoot = document.querySelector("[data-glyph-groups]");
  const display = document.querySelector("[data-glyph-display]");
  const weightButtons = document.querySelectorAll("[data-weight-controls] button");

  if (!groupsRoot || !display) return;

  Object.entries(glyphGroups).forEach(([title, chars]) => {
    const group = document.createElement("section");
    group.className = "glyph-group";

    const heading = document.createElement("div");
    heading.className = "glyph-group__title";
    heading.textContent = title;

    const letters = document.createElement("div");
    letters.className = "glyph-group__letters";

    chars.split("").forEach((char) => {
      const button = document.createElement("button");
      button.type = "button";
      button.textContent = char;
      button.setAttribute("aria-label", `Preview glyph ${char}`);
      button.addEventListener("mouseenter", () => {
        display.textContent = char;
      });
      button.addEventListener("focus", () => {
        display.textContent = char;
      });
      button.addEventListener("click", () => {
        display.textContent = char;
      });
      letters.appendChild(button);
    });

    group.append(heading, letters);
    groupsRoot.appendChild(group);
  });

  weightButtons.forEach((button) => {
    button.addEventListener("click", () => {
      weightButtons.forEach((item) => item.classList.remove("is-active"));
      button.classList.add("is-active");
      display.style.fontWeight = button.dataset.weight;
      groupsRoot.style.setProperty("--glyph-weight", button.dataset.weight);
      groupsRoot
        .querySelectorAll(".glyph-group__letters button")
        .forEach((glyph) => {
          glyph.style.fontWeight = button.dataset.weight;
        });
    });
  });

  const defaultButton = document.querySelector('[data-weight="300"]');
  if (defaultButton) {
    defaultButton.click();
  }
}

function initPlayground() {
  const input = document.querySelector("[data-playground-input]");
  const output = document.querySelector("[data-playground-output]");
  const weight = document.querySelector('[data-control="weight"]');
  const size = document.querySelector('[data-control="size"]');
  const spacing = document.querySelector('[data-control="spacing"]');
  const leading = document.querySelector('[data-control="leading"]');
  const alignButtons = document.querySelectorAll("[data-align-controls] button");

  if (!input || !output || !weight || !size || !spacing || !leading) return;

  function render() {
    output.textContent = input.value;
    output.style.fontWeight = weight.value;
    output.style.fontSize = `${size.value}px`;
    output.style.letterSpacing = `${spacing.value}px`;
    output.style.lineHeight = String(leading.value);
  }

  [input, weight, size, spacing, leading].forEach((control) => {
    control.addEventListener("input", render);
  });

  alignButtons.forEach((button) => {
    button.addEventListener("click", () => {
      alignButtons.forEach((item) => item.classList.remove("is-active"));
      button.classList.add("is-active");
      output.style.textAlign = button.dataset.align;
    });
  });

  render();
}

initPreloader();
initReveal();
initSmoothAnchors();
initSectionRail();
initGlyphSelector();
initPlayground();
