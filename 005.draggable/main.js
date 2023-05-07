// let birdArr = [...new Array(20).keys()];
const parrotArr = ["01", "02", "03", "04", "05", "06", "07", "08", "09", "10"];
const noParrotArr = [
  "11",
  "12",
  "13",
  "14",
  "15",
  "16",
  "17",
  "18",
  "19",
  "20",
];
const birdArr = parrotArr.concat(noParrotArr);
const PARROT_NUM = parrotArr.length;

// create bird list
const birdList = birdArr.map((val) => {
  const btn = document.createElement("BUTTON");
  btn.className = "bird";
  btn.setAttribute("type", "button");
  btn.setAttribute("draggable", "true");
  btn.dataset.num = val;
  const img = document.createElement("IMG");
  img.src = `./images/bird${val}.png`;
  btn.appendChild(img);
  return btn;
});

// randomize bird list items
// 틀린 요소를 일정 수 이상 배치하려면?
let i = 0;
while (i <= birdList.length * 5) {
  const _randNum01 = Math.floor(Math.random() * birdList.length);
  const _randNum02 = Math.floor(Math.random() * birdList.length);
  [birdList[_randNum02], birdList[_randNum01]] = [
    birdList[_randNum01],
    birdList[_randNum02],
  ];
  i++;
}

// set bird items
const containers = document.querySelectorAll(".container");
containers[0].append(...birdList.slice(0, 10));
containers[1].append(...birdList.slice(-10));

const birds = document.querySelectorAll(".bird");

// https://stackoverflow.com/questions/74335612/drag-and-drop-when-using-flex-wrap

const getAfterDragging = (container, x, y) => {
  // 현재 드래그 중인 요소를 제외한 나머지
  const notDraggings = [...container.querySelectorAll(".bird:not(.dragging)")];

  // nextBox, inRow: 요소가 wrap 되는 경우...
  return notDraggings.reduce(
    (closest, item, index) => {
      const box = item.getBoundingClientRect();
      // item 의 다음 요소가 있을 때
      const nextBox =
        notDraggings[index + 1] &&
        notDraggings[index + 1].getBoundingClientRect();
      // 드래그 이벤트가 일어나는 지점이 item과 같은 행인지 확인
      // 현재 드래그 지점이 bottom 위치보다 위 && top 위치보다 아래
      const inRow = y - box.bottom <= 0 && y - box.top >= 0;
      /**
       * offset?
       */
      const offset = x - box.left - box.width / 2;
      // column 일 경우:
      // const offset = y - box.top - box.height / 2;

      // 같은 행일 때
      if (inRow) {
        //
        if (offset < 0 && offset > closest.offset) {
          return { offset: offset, element: item };
        } else {
          if (
            nextBox &&
            y - nextBox.top <= 0 &&
            closest.offset === Number.NEGATIVE_INFINITY
          ) {
            return {
              offset: 0,
              element: notDraggings[index + 1],
            };
          }
          return closest;
        }
        // 다른 행일 때 acc 반환
      } else {
        return closest;
      }
    },
    { offset: Number.NEGATIVE_INFINITY }
  ).element;
};

const checkAnswer = () => {
  const parrotConItems = Array.from(containers[1].children);
  let correctItems = 0;
  parrotConItems.forEach((item) =>
    parrotArr.forEach((num) => {
      if (num === item.dataset.num) correctItems++;
    })
  );

  // container 의 children 개수가 늦게 반영되는 문제로 - 1 적용
  document.getElementById("parrots_num").textContent =
    parrotArr.length - correctItems;
  document.getElementById("birds_num").textContent =
    parrotConItems.length - 1 - correctItems;

  if (parrotConItems.length - 1 === PARROT_NUM && correctItems === PARROT_NUM)
    alert("Hurray!");
};
checkAnswer();

// bird item addEventListener
birds.forEach((bird) => {
  bird.addEventListener("dragstart", () => bird.classList.add("dragging"));
  bird.addEventListener("dragend", () => {
    bird.classList.remove("dragging");
    checkAnswer();
  });
});

// container addEventListener
containers.forEach((container) => {
  // dragover: 해당 요소 위에서 드래그하는 매 시점마다
  container.addEventListener("dragover", (e) => {
    e.preventDefault();
    // e.clientX: 화면 왼쪽부터 이벤트가 발생한 지점까지
    const afterItem = getAfterDragging(container, e.clientX, e.clientY);
    const dragging = document.querySelector(".dragging");
    // 마지막 위치로 드래그 할 경우
    if (afterItem === undefined) {
      container.appendChild(dragging);
    } else {
      container.insertBefore(dragging, afterItem);
    }
  });
});
