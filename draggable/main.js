const containers = document.querySelectorAll(".container");
const birds = document.querySelectorAll(".bird");

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
       * offset? -infinity?
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

birds.forEach((bird) => {
  bird.addEventListener("dragstart", () => bird.classList.add("dragging"));
  bird.addEventListener("dragend", () => bird.classList.remove("dragging"));
});

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
