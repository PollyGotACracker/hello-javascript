# Draggable

- 2023.05

## 구현

- Drag and Drop 하여 요소의 위치 변경

## 문제

- css hover 또는 mouseover event 가 여러 요소에 적용될 경우, drag 시 예상치 못한 요소에서 trigger 되는 경우가 있다.

## 공부

### wrap 되는 경우 요소 drag

- !! 제대로 이해하지 못했을 수도 있음
- 참고: [https://stackoverflow.com/questions/74335612/drag-and-drop-when-using-flex-wrap](https://stackoverflow.com/questions/74335612/drag-and-drop-when-using-flex-wrap)

1. container 의 dragover event 로 호출되는 `getAfterDragging(container, x, y)` 함수는 현재 drag 중인 위치 바로 뒤에 있는 요소를 반환한다.  
   함수는 dragover event 가 발생한 target 인 container, event.clientX, event.clientY 를 받는다.
2. `notDraggings`: target 에서 drag 되고 있지 않은 요소 리스트를 배열로 가져온다.
3. `Array.reduce()` 를 사용해 `notDraggings` 의 각 요소를 순회한다.  
   `return notDraggings.reduce((closest, item, index)=>{},{ offset: Number.NEGATIVE_INFINITY }).element`
4. `box`: 각 notDragging 요소 item 의 좌표 정보
5. reduce() 의 callback 내에서 `nextBox`, `inRow` 는 wrap 을 고려한 변수이다:
   - `nextBox`: `item` 의 바로 다음 요소가 있을 때 그 요소의 좌표 정보
   - `inRow`: drag 이벤트가 일어나는 지점이 `item` 의 행 내부인지 확인  
     drag Y축 좌표가 `item` 의 bottom 보다 위면서, `item` 의 top 보다 아래인지의 Boolean 값
6. `offset`: drag 이벤트가 일어나는 지점이 `item` 의 위치보다 더 앞(왼쪽)에 있는지 확인
   drag X축 좌표 값에서 `item` 의 left 와 width / 2 를 더한 값을 뺀 값  
   만약 `offset` 이 음수라면 `item` 은 drag 좌표보다 뒤에 있음을 알 수 있음
7. `inRow` 일 때 `offset < 0 && offset > closest.offset`(`isAfterInRow`):
   - `offset` 이 음수이면서 (뒤에 있는 요소이면서)
   - `closest.offset`(0, 음수, -infinity) 보다 클 경우 (이전의 반환값보다 크므로 좌표에 더욱 가까운 요소)
   - `return { offset: offset, element: item }`
8. `inRow` 일 때 `nextBox && y - nextBox.top <= 0 && closest.offset === Number.NEGATIVE_INFINITY`(`isAfterInNextRow`):
   - `item` 의 바로 다음 요소인 `nextBox` 가 있고,
   - `nextBox` 의 top 이 drag Y축 좌표 보다 크면서 (next 가 drag 좌표가 있는 행의 다음 행에 있으면서)
   - drag 좌표 위치로부터 뒤에 있는 요소를 현재 행에서 찾지 못했을 경우
   - `return { offset: 0, element: notDraggings[index + 1] }`
9. 추가로 각 행 사이로 drag 할 때도 `element === undefined` 되어 요소가 마지막 위치로 이동하는 문제를 수정하였다.  
   다른 container 로 drag 될 때만 요소 위치가 마지막으로 이동하도록 하고, 현재 container 내부에서 drag 될 때는 그대로 둔다.

### [Array.reduce()](https://developer.mozilla.org/ko/docs/Web/JavaScript/Reference/Global_Objects/Array/reduce)

`arr.reduce(callback[, initialValue])`

```js
const arr = [0, 1, 2, 3, 4];

arr.reduce((accumulator, currentValue, currentIndex, array) => {
  return accumulator + currentValue;
}, initialValue);
```

- reduce 의 callback 은 배열의 각 요소를 순회하며, 다음 네 가지 인수를 받는다.

#### accumulator

- callback 이 이전에 반환한 값을 누적한다.
- callback 이 최초로 호출될 때, initialValue 가 없는 경우 배열의 첫 번째 요소가 할당된다.
- callback 이 최초로 호출될 때, initialValue 가 있는 경우 initialValue 의 값이 할당된다.

#### currentValue

- 처리할 현재 요소.

#### currentIndex (Optional)

- 처리할 현재 요소의 인덱스 값.
- initialValue 이 있는 경우 0, 아니면 1부터 시작한다.

#### array (Optional)

- reduce() 를 호출한 배열.

#### initialValue (Optional)

- callback 의 최초 호출에서 accumulator 에 할당되는 값.
- 빈 배열에서 initialValue 없이 reduce() 를 호출하면 오류가 발생한다.

### Node.childNodes 와 Element.children

- childNodes 는 텍스트, 주석을 포함한 모든 요소가 담긴 nodeList 를 반환한다.
- children 은 모든 자식 요소가 담긴 HTMLCollection 을 반환한다.
