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
// mobile touch 이벤트로 반환되는 X좌표 저장
let touchStartX = 0;
let touchEndX = 0;

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
  const viewState = document.visibilityState;
  if (viewState === "hidden") stopSlide();
  if (viewState === "visible") startSlide();
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

const chkMobile = () => {
  const mobileKeyWords = [
    "Android",
    "iPhone",
    "iPod",
    "BlackBerry",
    "Windows CE",
    "SAMSUNG",
    "LG",
    "MOT",
    "SonyEricsson",
  ];
  for (let info in mobileKeyWords) {
    if (navigator.userAgent.match(info) != null) return true;
  }
  return false;
};

const touchSlider = (e) => {
  e.preventDefault();
  let touch;
  // TouchEvent.changedTouches: 이벤트 타입에 따른 터치포인트의 정보 (read-only)
  switch (e.type) {
    case "touchstart":
      stopSlide();
      touch = e.changedTouches[0];
      touchStartX = touch.clientX;
      touchEndX = 0;
      break;

    case "touchend":
      touch = e.changedTouches[0];
      touchEndX = touch.clientX;
      // 터치동작이 길어지면(스와이프, chkNum의 절대값이 100 이상) swipe 실행
      // chkNum 이 음수일 때 next(->), 양수일 때 prev(<-)
      const chkNum = touchStartX - touchEndX;
      const chkNumAbs = Math.abs(chkNum);
      if (chkNumAbs > 100) {
        if (chkNum < 0) nextImg();
        else prevImg();
      }
      startSlide();
      break;
  }
};

startSlide();
changePointer();
if (chkMobile()) {
  sliderContainer.addEventListener("touchstart", touchSlider);
  sliderContainer.addEventListener("touchend", touchSlider);
}
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
