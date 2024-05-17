const counter = document.querySelector(".counter.js");

const COUNT_MAX = 100;
const DELAY_MEDIAN = 30;

const EASE_IN_COUNT = 8;
const EASE_OUT_COUNT = COUNT_MAX - EASE_IN_COUNT * 2;
const EASE_IN_DELAY_OFFSET = 20;
const EASE_OUT_DELAY_OFFSET = EASE_IN_DELAY_OFFSET / 4.5;

let count = 0;
let delay = DELAY_MEDIAN + EASE_IN_COUNT * EASE_IN_DELAY_OFFSET;

const setDelayedAnimation = (callback, delay) => {
  window.requestAnimationFrame(() => setTimeout(callback, delay));
};

const setCounter = () => {
  counter.textContent = count;
  count += 1;

  if (count <= EASE_IN_COUNT) {
    delay -= EASE_IN_DELAY_OFFSET;
  }
  if (count > EASE_OUT_COUNT) {
    delay += EASE_OUT_DELAY_OFFSET;
  }
  if (count <= COUNT_MAX) {
    setDelayedAnimation(setCounter, delay);
  }
};

setDelayedAnimation(setCounter, 0);
