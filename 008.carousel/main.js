// https://www.youtube.com/watch?v=IEbaqI7F8vM
const images = document.querySelectorAll("#slider > img");
const sliderContainer = document.querySelector("#slider-container");
const pointerContainer = document.querySelector("#pointer-container");
const slider = document.querySelector("#slider");
const prevBtn = document.querySelector(".prev");
const nextBtn = document.querySelector(".next");

// 앞 뒤 이미지를 어떻게 해야 할까??
[...images].forEach(() => {
  const pointer = document.createElement("DIV");
  pointer.className = "pointer";
  pointer.style.width = `${100 / images.length}%`;
  pointerContainer.append(pointer);
});

let current = 1;
let intervalSlide;
// sliderContainer의 가로 길이
let imgSize = sliderContainer.getBoundingClientRect().width;
slider.style.transform = `translateX(${-imgSize}px)`;
pointerContainer.children[0].classList.add("active");

const prevImg = () => {
  if (current <= 0) return false;
  slider.style.transition = `transform 0.2s ease-in-out`;
  current--;
  slider.style.transform = `translateX(${-imgSize * current}px)`;
};

const nextImg = () => {
  if (current >= images.length - 1) return false;
  slider.style.transition = `transform 0.2s ease-in-out`;
  current++;
  slider.style.transform = `translateX(${-imgSize * current}px)`;
};

const startSlide = () => {
  console.log("start slideshow");
  intervalSlide = setInterval(nextImg, 2000);
};
const stopSlide = () => {
  console.log("stop slideshow");
  clearInterval(intervalSlide);
};

const changePointer = () => {
  [...pointerContainer.children].forEach((pointer) => {
    pointer.classList.remove("active");
  });
  pointerContainer.children[current].classList.add("active");
};

const chkImg = () => {
  if (images[current].classList.contains("first_img")) {
    slider.style.transition = "none";
    current = images.length - 2;
    slider.style.transform = `translateX(${-imgSize * current}px)`;
  }
  if (images[current].classList.contains("last_img")) {
    slider.style.transition = "none";
    current = images.length - current;
    slider.style.transform = `translateX(${-imgSize * current}px)`;
  }
};

const chkScreen = () => {
  if (document.hidden) stopSlide();
  else startSlide();
};

const resizeImg = () => {
  stopSlide();
  slider.style.transition = "none";
  imgSize = sliderContainer.getBoundingClientRect().width;
  slider.style.transform = `translateX(${-imgSize * current}px)`;
  startSlide();
};

const clickPointer = (idx) => {
  current = idx;
  slider.style.transform = `translateX(${-imgSize * current}px)`;
  slider.style.transition = "none";
  changePointer();
};

startSlide();

slider.addEventListener("transitionstart", changePointer);
slider.addEventListener("transitionend", chkImg);
sliderContainer.addEventListener("mouseenter", stopSlide);
sliderContainer.addEventListener("mouseleave", startSlide);
document.addEventListener("visibilitychange", chkScreen);
window.addEventListener("resize", resizeImg);
prevBtn.addEventListener("click", prevImg);
nextBtn.addEventListener("click", nextImg);
[...pointerContainer.childNodes].forEach((pointer, idx) => {
  pointer.addEventListener("click", () => {
    clickPointer(idx);
  });
});
/*
  cf)
  transitionstart, transitionend :
      css transition 시작 및 종료
  mouseover, mouseout : 
      bubbling O, preventDefault O
  mouseenter, mouseleave : 
      bubbling X, preventDefault X, target === currentTarget
  visibilitychange :
      현재 화면의 표시 여부(탭 전환, 창 최소화 등) 
      interval 오류와 리소스 낭비 방지
  resize : 
      반응형 구현
*/
