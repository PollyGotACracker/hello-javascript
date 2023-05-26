# Draggable

- 2023.05
- 참고: [https://stackoverflow.com/questions/74335612/drag-and-drop-when-using-flex-wrap](https://stackoverflow.com/questions/74335612/drag-and-drop-when-using-flex-wrap)

## 구현

- Drag and Drop 하여 요소의 위치 변경
- 요소가 wrap 될 경우 고려

## 공부

### Node.childNodes 와 Element.children

- childNodes 는 텍스트, 주석을 포함한 모든 요소가 담긴 nodeList 를 반환한다.
- children 은 모든 자식 요소가 담긴 HTMLCollection 을 반환한다.
