// JavaScript Document

// SELECTEREN VAN DOM-ELEMENTEN
const productSliderList = document.querySelector(".slider ul");
const productDropdownButtons = document.querySelectorAll(".dropdown-header");

// ================================
// SLIDER FUNCTIONALITEIT
// ================================
if (productSliderList) {

  // OPHALEN VAN SLIDER ELEMENTEN
  const items = Array.from(productSliderList.querySelectorAll("li"));
  const nextBtn = document.querySelector(".slider .icon-right");
  const prevBtn = document.querySelector(".slider .icon-left");


  // SLIDER STATUS VARIABELEN
  let currentPosition = 0;
  let itemWidth = 0;
  let isAnimating = false;

  // SLIDER ITEMS DUPLICEREN
  // (voor oneindige loop)
  for (let i = 0; i < 4; i++) {
    items.forEach(item => {
      productSliderList.appendChild(item.cloneNode(true));
    });
  }

  const totalItems = items.length;


  // BEREKENEN VAN ITEM BREEDTE
  function updateItemWidth() {
    const firstItem = productSliderList.querySelector("li");
    if (!firstItem) return;

    const gap = parseFloat(getComputedStyle(productSliderList).gap) || 0;
    itemWidth = firstItem.offsetWidth + gap;
  }

  // SLIDER VERPLAATSEN
  function moveSlider(instant = false) {
    productSliderList.style.transition = instant
      ? "none"
      : "transform 0.5s ease";

    productSliderList.style.transform = `translateX(${-currentPosition}px)`;
  }


  // CONTROLEREN VAN ONEINDIGE LOOP
  function checkLoop() {
    const setWidth = itemWidth * totalItems;

    if (currentPosition >= setWidth * 3) {
      currentPosition = setWidth;
      moveSlider(true);
    } else if (currentPosition <= 0) {
      currentPosition = setWidth * 2;
      moveSlider(true);
    }
  }

  // SLIDER INITIALISEREN
  updateItemWidth();
  currentPosition = itemWidth * totalItems;
  moveSlider(true);

  // EVENT LISTENER: VOLGENDE SLIDE
  nextBtn?.addEventListener("click", () => {
    if (isAnimating) return;
    isAnimating = true;

    currentPosition += itemWidth;
    moveSlider();

    setTimeout(() => {
      checkLoop();
      isAnimating = false;
    }, 500);
  });

  // EVENT LISTENER: VORIGE SLIDE
  prevBtn?.addEventListener("click", () => {
    if (isAnimating) return;
    isAnimating = true;

    currentPosition -= itemWidth;
    moveSlider();

    setTimeout(() => {
      checkLoop();
      isAnimating = false;
    }, 500);
  });
}

/* bron: https://developer.mozilla.org/en-US/docs/Web/API/Element , https://developer.mozilla.org/en-US/docs/Web/CSS/transform*/

// ================================
// DROPDOWN MENU FUNCTIONALITEIT
// ================================

productDropdownButtons.forEach(button => {
  button.addEventListener("click", () => {

    // OPEN / SLUIT DROPDOWN
    button.nextElementSibling?.classList.toggle("open");
  });
});

/* bron: https://developer.mozilla.org/en-US/docs/Web/API/Element/classList*/