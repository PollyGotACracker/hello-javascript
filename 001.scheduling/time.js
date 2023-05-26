// 반응형 사이드바
function responsibleMenu() {
  let nav = document.getElementsByTagName("nav")[0];
  let blind = document.querySelector(".blind");
  let btnMenu = document.querySelector(".btn-sidebar");
  // css에서 nav의 width값을 가져옴
  let navWidth = window.getComputedStyle(nav).getPropertyValue('width');

  if (window.matchMedia("(max-width: 1000px)").matches) {

    // 묶을 수 있는지??
    
    nav.style.right = -parseInt(navWidth) + "vw";
    btnMenu.style.display = "block";
    blind.style.display = "none";

    btnMenu.onclick = function openMenu() {
      nav.style.right = 0;
      btnMenu.style.display = "none";
      blind.style.display = "block";
    }
    window.onclick = function closeMenu(e) {
      if (e.target == blind) {
          nav.style.right = -parseInt(navWidth) + "vw";
          btnMenu.style.display = "block";
          blind.style.display = "none";
        }
    }

  } else {
    nav.style.right = 0;
    btnMenu.style.display = "none";
    blind.style.display = "none";
  }
}

responsibleMenu();
window.onresize = responsibleMenu;


// 메뉴 버튼 클릭 시 화면 전환

// 정리 필요

function openSection() {
  let sectionArr = Array.from(document.getElementsByTagName("section")).slice(1,7);
  let btnArr = document.querySelectorAll("nav button");

  document.querySelector(".cover").classList.remove("active");
  document.querySelector(".credit").classList.remove("active");
  document.querySelector(".btn-cover").style.display = "block";

  for (let i = 0; i < sectionArr.length; i++) {
    let sectionClassArr = sectionArr[i].getAttribute("class");
    let btnClassArr = this.getAttribute("class").slice(4);

    sectionArr[i].classList.remove("active");
    btnArr[i].classList.remove("active");

    if (btnClassArr === sectionClassArr) {
      sectionArr[i].classList.add("active");
      this.classList.add("active");
    }
  }
}
function openCover() {
  let sectionArr = Array.from(document.getElementsByTagName("section")).slice(1,7);
  let btnArr = document.querySelectorAll("nav button");

  document.querySelector(".cover").classList.add("active");
  document.querySelector(".credit").classList.remove("active");
  document.querySelector(".btn-cover").style.display = "none";

  for (let i = 0; i < sectionArr.length; i++) {
    sectionArr[i].classList.remove("active");
    btnArr[i].classList.remove("active");
  }
}
document.querySelector(".btn-credit").addEventListener("click", function openCredit() {
  let sectionArr = Array.from(document.getElementsByTagName("section")).slice(1,7);
  let btnArr = document.querySelectorAll("nav button");

  document.querySelector(".cover").classList.remove("active");
  document.querySelector(".credit").classList.add("active");
  document.querySelector(".btn-cover").style.display = "none";

  for (let i = 0; i < sectionArr.length; i++) {
    sectionArr[i].classList.remove("active");
    btnArr[i].classList.remove("active");
  }
});

window.onload = openCover();
document.querySelector(".btn-cover").addEventListener("click", openCover);
document.querySelector(".btn-todo").addEventListener("click", openSection);
document.querySelector(".btn-weather").addEventListener("click", openSection);
document.querySelector(".btn-news").addEventListener("click", openSection);
document.querySelector(".btn-alarm").addEventListener("click", openSection);
document.querySelector(".btn-stopwatch").addEventListener("click", openSection);
document.querySelector(".btn-timer").addEventListener("click", openSection);

// 마우스 커서 아이템
function cursorItem() {
  let x = 0;
  let y = 0;
  let mx = 0;
  let my = 0;
  let cursor = document.querySelector(".cursor");
  let circle = cursor.querySelector(".circle");
  let btnArr = document.getElementsByTagName("button");

  for (let i = 0; i < btnArr.length; i++) {
    btnArr[i].addEventListener("mouseover", function(e) {
      circle.style.transform = "scale(.3)";
    });
    btnArr[i].addEventListener("mouseout", function(e) {
      circle.style.transform = "scale(1)";
    });
  }

  window.addEventListener("mousemove", function(e) {
    circle.style.width = 80 + "px";
    circle.style.height = 80 + "px";
    x = e.clientX;    
    y = e.clientY;
  });
  loop();

  function loop() {
    mx += (x - mx) * .09;
    my += (y - my) * .09; 
    cursor.style.transform = "translate(" + mx + "px, " + my + "px )";

    requestAnimationFrame(loop);
  }
}
window.onload = cursorItem();

// 랜덤 백그라운드 음악 재생
let bgPlaylistArr = [
  "./audio/Lonesome_Star.mp3", 
  "./audio/Jeremiah_s_Song.mp3",
  "./audio/The_Gift.mp3",
];
let bgPlayer = document.querySelector(".btn-player audio");
let bgPlayNum = Math.floor(Math.random() * bgPlaylistArr.length);

bgPlayer.setAttribute("src", bgPlaylistArr[bgPlayNum]);

document.querySelector(".btn-player").addEventListener("click", function toggleBgPlayer() {
  let bgPlayerActive = this.classList.toggle("active");
  if (bgPlayerActive) {
    bgPlayer.play();
  } else {
    bgPlayer.pause();
  }
});

bgPlayer.addEventListener("ended", function playNextAudio() {
  if (bgPlayNum === (bgPlaylistArr.length - 1)) {
    bgPlayNum = 0;
  } else {
    ++ bgPlayNum;
  }
  bgPlayer.setAttribute("src", bgPlaylistArr[bgPlayNum]);
  bgPlayer.play();
});

// 1. cover 페이지 요소
// 랜덤 quote
function showRandomQuote() {
  let quotesArr = [
    "The trouble is, you think you have time.",
    "Time is a cruel thief to rob us of our former selves. We lose as much to life as we do to death.",
    "Suspect each moment, for it is a thief, tiptoeing away with more than it brings.",
    "Time brings all things to pass.",
    "Men talk of killing time, while time quietly kills them.",
    "There is one kind of robber whom the law does not strike at, and who steals what is most precious to men: time.",
    "The future is uncertain but the end is always near.",
    "Time takes it all, whether you want it to or not.",
    "Time is a storm in which we are all lost."
  ];

  document.querySelector(".quote").textContent = quotesArr[Math.floor(Math.random() * quotesArr.length)];
}
window.onload = showRandomQuote();



let current_mode;
let last_mode;
let tick = 0;

setInterval(showToday, tick);
current_mode = setInterval(showCurrentTime, tick);
tick = 1000;



// 현재 날짜 출력
function showToday() {
  let d = new Date;
  let year = d.getFullYear();
  let month = d.getMonth() + 1;
  let date = d.getDate();
  let day = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"][d.getDay()];

  document.getElementsByClassName("today")[0].textContent = `${day}, ${year}. ${month}. ${date}`;
}

// 현재 시각 출력
function showCurrentTime() {
  /*
  String.prototype.padStart()
  매개변수1: 문자열의 길이. 매개변수2: 문자열 좌측부터 채워질 문자
  */
  let d = new Date;
  let ampm = (d.getHours() >= 12) ? 'PM' : 'AM';
  let hr = `${(d.getHours() % 12 === 0) ? 12 : (d.getHours() % 12)}`.padStart(2, '0');
  let min = `${d.getMinutes()}`.padStart(2, '0');
  let sec = `${d.getSeconds()}`.padStart(2, '0');

  document.getElementsByClassName("clock")[0].textContent = `${ampm} ${hr} : ${min} : ${sec}`;
}

// 하루 중 남은 시간 출력
function showLastTime() {
  let d = new Date;
  let tomorrow = new Date(d.getFullYear(), d.getMonth(), d.getDate() + 1)
  let diff = tomorrow - d;

  let lastHour = `${Math.floor(diff / (1000 * 60 * 60))}`.padStart(2, '0');
  let lastMin = `${Math.floor(diff / (1000 * 60)) % 60}`.padStart(2, '0');
  let lastSec = `${Math.floor(diff / 1000) % 60}`.padStart(2, '0');

  document.getElementsByClassName("clock")[0].textContent = `${lastHour} : ${lastMin} : ${lastSec}`;
}

function switchTimeFunc() {
  let btnClass = this.classList.toggle("countdown");
  let tick = 0;
  if (btnClass) {
    clearInterval(current_mode);
    last_mode = setInterval(showLastTime, tick);
    this.textContent = "Current Time Mode";
  } else {
    clearInterval(last_mode);
    current_mode = setInterval(showCurrentTime, tick);
    this.textContent = "Countdown Mode";
  }
  tick = 1000;
}

document.querySelector(".btn-changeFunc").addEventListener("click", switchTimeFunc);



function stopwatchFunc() {

  document.querySelector(".btn-stopwatch-start").addEventListener("click", function() {
    startTime = Date.now();
    start_stopwatch = setInterval(stopwatchStart, 10);
    this.style.visibility = "hidden";
  });

  // 재시작 가능하게 해야
  
  document.querySelector(".btn-stopwatch-pause").addEventListener("click", function() {
    clearInterval(start_stopwatch);
    document.querySelector(".btn-stopwatch-start").style.visibility = "visible";

  });
  document.querySelector(".btn-stopwatch-stop").addEventListener("click", function() {
    clearInterval(start_stopwatch);
    document.querySelector(".stopwatch-counter").textContent = `00 : 00 . 00`;
    document.querySelector(".btn-stopwatch-start").style.visibility = "visible";
  });

function stopwatchStart() {
  endTime = Date.now();
  diff = endTime - startTime;
  let timeMin = `${Math.floor(diff / (1000 * 60)) % 60}`.padStart(2, '0');
  let timeSec = `${Math.floor(diff / 1000) % 60}`.padStart(2, '0');
  let timeMili = `${(Math.floor(diff % 1000) / 10).toFixed(0)}`.padStart(2, '0');

  document.querySelector(".stopwatch-counter").textContent = `${timeMin} : ${timeSec} . ${timeMili}`;
}

}
stopwatchFunc();


