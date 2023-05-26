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
const PARROT_COUNT = parrotArr.length;

// create bird list
const birdList = birdArr.map((num) => {
  const div = document.createElement("DIV");
  div.className = "bird";
  div.setAttribute("draggable", "true");
  div.dataset.num = num;

  const img = document.createElement("IMG");
  img.src = `./images/bird${num}.png`;
  img.title = `bird`;

  div.appendChild(img);
  return div;
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
const containers = document.querySelectorAll(".bird-box");
containers[0].append(...birdList.slice(0, 10));
containers[1].append(...birdList.slice(-10));

const birds = document.querySelectorAll(".bird");

const getAfterDragging = (container, x, y) => {
  // 현재 드래그 중인 요소를 제외한 나머지
  const notDraggings = [...container.querySelectorAll(".bird:not(.dragging)")];

  return notDraggings.reduce(
    (closest, item, index) => {
      const box = item.getBoundingClientRect();
      const nextBox =
        notDraggings[index + 1] &&
        notDraggings[index + 1].getBoundingClientRect();
      const inRow = y - box.bottom <= 0 && y - box.top >= 0;
      const offset = x - box.left - box.width / 2;
      // direction 이 column 일 경우:
      // const offset = y - box.top - box.height / 2;

      const isAfterInRow = offset < 0 && offset > closest.offset;
      const isAfterInNextRow =
        nextBox &&
        y - nextBox.top <= 0 &&
        closest.offset === Number.NEGATIVE_INFINITY;

      if (inRow) {
        if (isAfterInRow) {
          return { offset: offset, element: item };
        }
        if (isAfterInNextRow) {
          return { offset: 0, element: notDraggings[index + 1] };
        }
        return closest;
      }
      if (!inRow) {
        if (
          isAfterInNextRow &&
          container.contains(document.querySelector(".dragging"))
        ) {
          return { offset: 0, element: false };
        }
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

  // children 개수가 가끔 다르게 표시되는 문제?
  document.getElementById("parrotsNum").textContent =
    parrotArr.length - correctItems;
  document.getElementById("birdsNum").textContent =
    parrotConItems.length - correctItems;

  if (parrotConItems.length === PARROT_COUNT && correctItems === PARROT_COUNT) {
    containers.forEach((container) => {
      container.style.pointerEvents = "none";
    });
    setTimeout(() => alert("Hurray!"), 200);
  }
};

// bird item addEventListener
birds.forEach((bird) => {
  bird.addEventListener("dragstart", () => {
    bird.classList.add("dragging");
  });
  bird.addEventListener("dragend", () => {
    bird.classList.remove("dragging");
    checkAnswer();
  });
});

// container addEventListener
containers.forEach((container) => {
  // dragover: 해당 요소 위에서 drag 하는 매 시점마다
  container.addEventListener("dragover", (e) => {
    e.preventDefault();

    // e.clientX: 화면 왼쪽부터 drag가 발생한 지점까지의 좌표값
    const afterItem = getAfterDragging(container, e.clientX, e.clientY);

    // drag 한 요소의 위치 변경
    const dragging = document.querySelector(".dragging");
    if (afterItem === false) return false;
    if (afterItem === undefined) container.appendChild(dragging);
    if (afterItem) container.insertBefore(dragging, afterItem);
  });
});

checkAnswer();
