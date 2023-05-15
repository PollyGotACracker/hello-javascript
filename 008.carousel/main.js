// https://www.youtube.com/watch?v=IEbaqI7F8vM
// 처음, 마지막 이미지를 별도로 추가해야 transition 이 자연스러움

const images = document.querySelectorAll("#slider > img");
const sliderContainer = document.querySelector("#slider-container");
const pointerContainer = document.querySelector("#pointer-container");
const slider = document.querySelector("#slider");
const prevBtn = document.querySelector(".prev");
const nextBtn = document.querySelector(".next");

// generate pointer buttons
[...images].forEach((_, idx) => {
  if (idx === 0 || idx === images.length - 1) return false;
  const pointer = document.createElement("DIV");
  pointer.className = "pointer";
  pointer.dataset.num = idx - 1;
  pointerContainer.append(pointer);
});

// sliderContainer의 가로 길이
let imgSize = sliderContainer.getBoundingClientRect().width;
let current = 1;
slider.style.transform = `translateX(${-imgSize}px)`;
let intervalSlide;

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
  let num = current - 1;
  // - (별도로 추가한 이미지 2장 + index 고려 1 )
  if (current === 0) num = images.length - 3;
  if (current === images.length - 1) num = 0;
  [...pointerContainer.children].forEach((pointer) => {
    pointer.classList.remove("active");
  });
  pointerContainer.children[num].classList.add("active");
};

const chkImg = () => {
  if (images[current] === slider.firstElementChild) {
    slider.style.transition = "none";
    current = images.length - 2;
    slider.style.transform = `translateX(${-imgSize * current}px)`;
  }
  if (images[current] === slider.lastElementChild) {
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
  // container 의 사이즈가 브라우저 크기에 상대적일 경우, 새로운 값을 재할당
  imgSize = sliderContainer.getBoundingClientRect().width;
  slider.style.transition = "none";
  slider.style.transform = `translateX(${-imgSize * current}px)`;
  startSlide();
};

const clickPointer = (idx) => {
  current = idx + 1;
  slider.style.transform = `translateX(${-imgSize * current}px)`;
  slider.style.transition = "none";
  changePointer();
};

startSlide();
changePointer();

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
