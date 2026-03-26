const section = document.querySelector('[text-display="mod"]');
const weightButtons2 = document.querySelectorAll("[text]");
const alignButtons = document.querySelectorAll("[text-align]");
const ddtext = document.querySelector('[dd="text"]');

section.addEventListener("input", function () {
  const text = this.textContent || this.innerText;

  if (text.length > 50) {
    this.innerText = text.substring(0, 50);
  }
});

weightButtons2.forEach((button) => {
  button.addEventListener("click", () => {
    section.style.fontWeight = button.getAttribute("text");
    ddtext.textContent = button.textContent;
  });
});

alignButtons.forEach((button) => {
  button.addEventListener('click', () => {
    alignButtons.forEach((otherButton) => {
      otherButton.classList.remove('active');
    });

    button.classList.add('active');

    section.style.textAlign = button.getAttribute('text-align');
  });
});

const sizeSlider = document.querySelector('[slider="size"]');
const sizeDisplay = document.querySelector('[slider="size-display"]');
const spacingSlider = document.querySelector('[slider="spacing"]');
const spacingDisplay = document.querySelector('[slider="spacing-display"]');
const heightSlider = document.querySelector('[slider="height"]');
const heightDisplay = document.querySelector('[slider="height-display"]');

function updateFontSizeAndLineHeight() {
  section.style.fontSize = sizeSlider.value + "px";
  sizeDisplay.textContent = sizeSlider.value;
  section.style.lineHeight = sizeSlider.value + "px";
  heightSlider.value = sizeSlider.value;
  heightDisplay.textContent = sizeSlider.value;
}

function updateLetterSpacing() {
  section.style.letterSpacing = spacingSlider.value + "px";
  spacingDisplay.textContent = spacingSlider.value;
}

function updateLineHeight() {
  section.style.lineHeight = heightSlider.value + "px";
  heightDisplay.textContent = heightSlider.value;
}

sizeSlider.addEventListener("input", updateFontSizeAndLineHeight);
spacingSlider.addEventListener("input", updateLetterSpacing);
heightSlider.addEventListener("input", updateLineHeight);

/* function updateSliderRanges() {
  const screenWidth = window.innerWidth;

  if (screenWidth < 490) {
    sizeSlider.setAttribute("min", x); 
    sizeSlider.setAttribute("max", y); 
    spacingSlider.setAttribute("min", a); 
    spacingSlider.setAttribute("max", b); 
    heightSlider.setAttribute("min", c); 
    heightSlider.setAttribute("max", d); 
  } else {
    sizeSlider.setAttribute("min", 10);
    sizeSlider.setAttribute("max", 100);
    spacingSlider.setAttribute("min", 0);
    spacingSlider.setAttribute("max", 20);
    heightSlider.setAttribute("min", 10);
    heightSlider.setAttribute("max", 100);
  }
}

window.addEventListener("resize", updateSliderRanges);

updateSliderRanges(); */
updateFontSizeAndLineHeight();
updateLetterSpacing();
