const images = document.querySelectorAll("#slider > img");
const sliderContainer = document.querySelector("#sliderContainer");
const pointerContainer = document.querySelector("#pointerContainer");
const controller = document.querySelector("#controller");
const slider = document.querySelector("#slider");
const prevBtn = document.querySelector(".prev");
const nextBtn = document.querySelector(".next");
// generate pointer buttons
[...images].forEach((_, idx) => {
  if (idx === 0 || idx === images.length - 1) return false;
  const pointer = document.createElement("DIV");
  pointer.className = "pointer";
  pointer.dataset.num = idx;
  pointerContainer.append(pointer);
});
const pointers = document.querySelectorAll(".pointer");

const IMAGE_COUNT = images.length - 2;
let isPlaying = true;
// 처음 이미지의 current 는 1 또는 -1
// 마지막 이미지의 current 는 0 또는 IMAGE_COUNT - 1
let current = 1;
let intervalSlide;
// mobile touch 이벤트로 반환되는 X좌표 저장
let touchStartX = 0;
let touchEndX = 0;
// sliderContainer의 가로 길이
let imgSize = sliderContainer.getBoundingClientRect().width;
slider.style.transform = `translateX(${-imgSize}px)`;

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

const playSlide = () => {
  console.log("play slideshow");
  intervalSlide = setInterval(nextImg, 2000);
  isPlaying = true;
};
const pauseSlide = () => {
  console.log("pause slideshow");
  clearInterval(intervalSlide);
  isPlaying = false;
};

const changeState = () => {
  controller.className = isPlaying ? "paused" : "playing";
  return isPlaying ? pauseSlide() : playSlide();
};

const changePointer = () => {
  let idx = current - 1;
  // 마지막 이미지
  if (current === 0) idx = IMAGE_COUNT - 1;
  // 첫번째 이미지
  if (current === IMAGE_COUNT + 1) idx = 0;

  [...pointers].forEach((pointer) => {
    pointer.classList.remove("active");
  });
  pointers[idx].classList.add("active");
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
  /**
   * 현재 상태가 pause 일 경우, 다시 표시되어도 pause 로 유지되어야 함
   * 표시 여부와 관계없이 값이 변하지 않는 변수가 필요할 것이라 생각
   * 따라서 controller 의 class 는 변하지 않도록 했음
   */
  const isDisplay = document.visibilityState === "visible"; // hidden, visible
  const isReplay = controller.className === "playing";
  if (isReplay && !isDisplay) pauseSlide();
  if (isReplay && isDisplay) changeState();
};

const resizeImg = () => {
  // container 의 사이즈가 브라우저 크기에 상대적일 경우, 새로운 값을 재할당
  imgSize = sliderContainer.getBoundingClientRect().width;
  slider.style.transition = "none";
  slider.style.transform = `translateX(${-imgSize * current}px)`;
  if (isPlaying) {
    pauseSlide();
    playSlide();
  }
};

const clickPointer = (e) => {
  current = Number(e.currentTarget.dataset.num);
  slider.style.transition = "none";
  slider.style.transform = `translateX(${-imgSize * current}px)`;
  changePointer();
  if (isPlaying) {
    pauseSlide();
    playSlide();
  }
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
  // pointer 나 controller 를 터치했을 경우 click eventListener 동작 실행
  const isNotSwipe =
    e.target.className === "paging" ||
    e.target.className === "pointer" ||
    e.target.id === "controller";
  if (isNotSwipe) return false;

  e.preventDefault();
  let touch;
  // TouchEvent.changedTouches: 이벤트 타입에 따른 터치포인트의 정보 (read-only)
  switch (e.type) {
    case "touchstart":
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
        if (isPlaying) {
          pauseSlide();
          playSlide();
        }
      } else {
        return false;
      }
      break;
  }
};

playSlide();
changePointer();

if (chkMobile()) {
  sliderContainer.addEventListener("touchstart", touchSlider, {
    passive: false,
  });
  sliderContainer.addEventListener("touchend", touchSlider, { passive: false });
}
slider.addEventListener("transitionstart", changePointer);
slider.addEventListener("transitionend", chkImg);
document.addEventListener("visibilitychange", chkScreen);
window.addEventListener("resize", resizeImg);
prevBtn.addEventListener("click", () => {
  prevImg();
  if (isPlaying) {
    pauseSlide();
    playSlide();
  }
});
nextBtn.addEventListener("click", () => {
  nextImg();
  if (isPlaying) {
    pauseSlide();
    playSlide();
  }
});
controller.addEventListener("click", changeState);
[...pointers].forEach((pointer) => {
  pointer.addEventListener("click", clickPointer);
});

// sliderContainer.addEventListener("mouseenter", pauseSlide);
// sliderContainer.addEventListener("mouseleave", playSlide);
