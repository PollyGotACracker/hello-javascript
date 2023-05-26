# [Intersection Observer](https://developer.mozilla.org/en-US/docs/Web/API/Intersection_Observer_API)

- 2023.05

- 이미지 또는 기타 콘텐츠의 지연 로딩
- 무한 스크롤
- 광고의 가시성 리포팅
- 사용자에게 요소 표시 여부에 따른 작업 또는 애니메이션 수행

```js
let target = document.querySelector("#item");

let options = {
  root: document.querySelector("#scrollArea"),
  rootMargin: "0px",
  threshold: 1.0,
};

let observer = new IntersectionObserver((entries, observer) => {
  entries.forEach((entry) => console.log(entry));
  console.log(observer);
}, options);

observer.observe(target);
```

## Entries

- IntersectionObserverEntry interface 의 Instance properties

### boundingClientRect

- root 요소에서 관찰 대상의 상대적 위치에 대한 사각형 정보인 DOMRectReadOnly 객체 반환
- `Element.getBoundingClientRect()` 의 반환값과 동일하나,  
  Intersection Observer 는 비동기적으로 실행되므로 reflow 현상을 방지할 수 있음
  - Renderer Process : JavaScript -> Style -> Layout -> Paint -> Composite
  - reflow : 문서 내 DOM요소의 크기나 위치 등 레이아웃이 변하면
    이를 계산(layout)하여 문서의 일부 또는 전체를 다시 rendering 하는 작업(frame drop 발생)
  - repaint : 단순히 요소의 색상이 변경되거나, reflow 로 인해 render tree 가 변경된 경우  
    이를 다시 화면에 그리는(paint) 작업

### intersectionRect

- 관찰 대상과 root 요소가 교차된 영역에 대한 사각형 정보인 DOMRectReadOnly 객체 반환

### intersectionRatio

- 관찰 대상과 root 요소가 교차된 영역 내에서 현재 표시되는 대상 요소 영역의 백분율 (0.0 ~ 1.0) 반환
- intersectionRect 영역과 boundingClientRect 영역의 비율

### isIntersecting

- 관찰 대상과 root 요소의 교차 상태 여부. boolean 값 반환

### rootBounds

- root 요소의 사각형 정보인 DOMRectReadOnly 객체 반환

### target

- 관찰 대상인 요소 반환

### time

- 교차가 발생한 시간 정보인 DOMHighResTimeStamp 반환 (ms 단위의 double 값)

## Observer

- callback 이 실행되는 해당 인스턴스 참조

## Options

- Instance properties

### root

- 관찰 대상이 화면에 들어왔음을 감지하는 viewport 영역
- 관찰 대상의 상위 요소여야 함
- 기본값은 null(브라우저 viewport)

### rootMargin

- root 요소의 영역을 지정한 margin 값까지 확장
- 옵션값을 지정할 때는 단위와 함께 문자열로 작성 (css 의 margin 과 유사한 형식)
- 기본값은 "0px 0px 0px 0px"

### threshold

- 관찰 대상의 가시성 백분율을 나타내는 숫자 배열 또는 단일 숫자로, callback 이 호출되는 시점
- 기본값은 [0]
- [0, 0.25, 0.5, 0.75, 1] 은 가시성이 매 25% 를 넘을 때마다 callback 호출
- [1] 일 경우 관찰 대상의 모든 픽셀이 표시될 때(100%) callback 호출

## Instance methods

### observe()

- 대상 요소의 관찰 시작

### unobserve(target)

- 인수로 지정한 대상 요소의 관찰을 중단

### disconnect()

- IntersectionObserver 인스턴스가 관찰하는 모든 요소의 관찰을 중단

### takeRecords()

- IntersectionObserverEntry 객체의 배열을 반환

## 적용

- 감시되는 요소에 height 값 또는 충분한 margin 값 설정이 필요하다.

### [Lazy Loading](https://web.dev/fast/#lazy-load-images-and-video)

### Infinite Scroll
