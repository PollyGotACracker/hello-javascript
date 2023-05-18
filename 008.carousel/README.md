# Carousel

- 2023.05
- 참고: [https://www.youtube.com/watch?v=IEbaqI7F8vM](https://www.youtube.com/watch?v=IEbaqI7F8vM)

## 구현

- 이미지 무한 루프, 자동 슬라이드
- 슬라이드 toggle 버튼, prev, next 버튼과 각 이미지 pointer
- 반응형 이미지
- 모바일에서 swipe

## 공부

- 처음, 마지막 이미지를 별도로 추가해야 슬라이드 애니메이션이 자연스러움

### touch 및 wheel 관련 eventListener 의 passive option

- 브라우저는 eventListener 가 스크롤을 방지하는지 여부를 알 수 없기 때문에  
  listener 실행이 끝날 때까지 페이지 스크롤을 지연함(rendering 차단)
- `{ passive: true }` 로 eventListener 가 스크롤을 방지하지 않는다는 것을 명시함으로써  
  스크롤 지연을 해결하고 퍼포먼스가 향상됨. 단, e.preventDefault 사용 불가능

### transitionstart, transitionend

- css transition 시작 및 종료

### mouseover, mouseout

- bubbling O, preventDefault

### mouseenter, mouseleave

- bubbling X, preventDefault X, target === currentTarget

### visibilitychange

- 현재 document 컨텐츠의 표시 여부(document 객체에 적용)
- 탭 전환, 창 최소화 등이 일어날 때 document.visibilityState 는 visible 또는 hidden 반환
- interval 오류 및 리소스 낭비 방지 용도로 사용

### resize

- document 의 view 크기가 변경되었을 때(window 객체에 적용)
- 반응형 구현 시 사용
