# Carousel

- 2023.05
- 참고: [https://www.youtube.com/watch?v=IEbaqI7F8vM](https://www.youtube.com/watch?v=IEbaqI7F8vM)

## 구현

- 이미지 무한 루프, 자동 슬라이드
- 슬라이더에 커서를 올리면 슬라이드 멈춤
- prev, next 버튼과 각 이미지 pointer
- 반응형 이미지
- 모바일에서 swipe

## 공부

- 처음, 마지막 이미지를 별도로 추가해야 슬라이드 애니메이션이 자연스러움

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
