import { initButtonHoverEffects } from "./shared/button-hover";
import { initAnchorLinks } from "./shared/anchor-links";
import { initMenuPopup } from "./shared/menu-popup";
import { initSelectorBlocks } from "./shared/selector-blocks";
import { initScrollTriggerAttributes } from "./shared/scroll-triggers";
import { initPlusIconScrollEffects } from "./shared/plus-icons";
import { initVhFix } from "./shared/vh-fix";
import { initRuntimeLotties, initInteractiveLotties } from "./shared/runtime-lotties";
import { initLenisAndScrollLock } from "./shared/lenis-runtime";
import { initCanvasFlames } from "./shared/canvas-flames";
import { initHeroSection } from "./sections/hero";
import { initAboutSection } from "./sections/about";
import { initCreatorSection } from "./sections/creator";
import { initVariable1Section } from "./sections/variable1";
import { initSymbolsSection } from "./sections/symbols";
import { initVariable2Section } from "./sections/variable2";
import { initDemo1Section } from "./sections/demo1";
import { initDemo2Section } from "./sections/demo2";
import { initFooterSection } from "./sections/footer";

const root = document.documentElement;

const legacyScriptSources = [
  "/assets/lenis.min.js",
  "/assets/lottie.min.js",
];

function loadClassicScript(src: string): Promise<void> {
  const existing = document.querySelector<HTMLScriptElement>(
    `script[src="${src}"]`,
  );
  if (existing) return Promise.resolve();

  return new Promise((resolve, reject) => {
    const script = document.createElement("script");
    script.src = src;
    script.async = false;
    script.onload = () => resolve();
    script.onerror = () => reject(new Error(`Failed to load ${src}`));
    document.body.appendChild(script);
  });
}

async function bootLegacyRuntime() {
  for (const src of legacyScriptSources) {
    // Preserve runtime order for vendor globals consumed by shared modules.
    await loadClassicScript(src);
  }
}

function initPostVendorModules() {
  initRuntimeLotties();
  initInteractiveLotties();
  initLenisAndScrollLock();
}

function initAppModules() {
  initButtonHoverEffects();
  initAnchorLinks();
  initMenuPopup();
  initVhFix();
  initSelectorBlocks();
  initScrollTriggerAttributes();
  initPlusIconScrollEffects();
  initCanvasFlames();
  initHeroSection();
  initAboutSection();
  initCreatorSection();
  initVariable1Section();
  initSymbolsSection();
  initVariable2Section();
  initDemo1Section();
  initDemo2Section();
  initFooterSection();
}

root.dataset.app = "vite";

initAppModules();
void bootLegacyRuntime().then(() => {
  initPostVendorModules();
});

if (import.meta.env.DEV) {
  console.info("[app] Vite entry attached");
}
