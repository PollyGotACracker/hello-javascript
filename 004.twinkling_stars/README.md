# Twinkling Stars

- 2022.11
- 화면의 좌표에 요소 무작위로 생성, 랜덤값의 애니메이션 적용
- [https://www.youtube.com/watch?v=Iw860SbfqP8](https://www.youtube.com/watch?v=Iw860SbfqP8)

## 공부

### DOM style Object

- `Object.assign(target, ...sources)`  
  Object.assign 을 이용하여 대상 객체(Object) 에서 동일 key를 갖는 property 에 value 를 덮어쓸 수 있다. 마찬가지로 특정 element 의 css style 을 변경할 수 있다.

```js
const size = 10;
Object.assign(element.style, {
  width: size + "px",
  height: size + "px",
});
```

### Window Sizes

- window.innerWidth / innerHeight: 스크롤바가 차지하는 영역을 포함
- document.documentElement.clientWidth / clientHeight: 스크롤바가 차지하는 영역을 포함하지 않음
- 화면 크기를 구하는 경우는 대부분 무언가를 화면에 그리거나 위치시키는 경우가 많으므로 document.documentElement 를 사용

### Document Height

- 아래 property 들이 반환하는 값 중 최댓값을 골라야 함

```js
let documentHeight = Math.max(
  document.body.scrollHeight,
  document.documentElement.scrollHeight,
  document.body.offsetHeight,
  document.documentElement.offsetHeight,
  document.body.clientHeight,
  document.documentElement.clientHeight
);
```
