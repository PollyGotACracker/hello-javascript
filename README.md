# :spaghetti: Hello JavaScript

## 목표

- scheduling 완성하기
- image sprite 를 parallax scrolling 으로 변경 후 완성하기
- 마우스 좌표 내용 정리하기
- Web Audio API 로 커스텀 플레이어 만들어보기
- canvas 제대로 공부해보기

## 폴더

### [Lottery](https://github.com/PollyGotACracker/hello-javascript/tree/master/000.lottery)

### [Scheduling](https://github.com/PollyGotACracker/hello-javascript/tree/master/001.scheduling)

### [Modal](https://github.com/PollyGotACracker/hello-javascript/tree/master/002.modal)

### [Image Sprite](https://github.com/PollyGotACracker/hello-javascript/tree/master/003.image_sprite)

### [Twinkling Stars](https://github.com/PollyGotACracker/hello-javascript/tree/master/004.twinkling_stars)

### [Draggable](https://github.com/PollyGotACracker/hello-javascript/tree/master/005.draggable)

### [File Dropzone](https://github.com/PollyGotACracker/hello-javascript/tree/master/006.file_dropzone)

### [Carousel](https://github.com/PollyGotACracker/hello-javascript/tree/master/007.carousel)

### [Intersection Observer](https://github.com/PollyGotACracker/hello-javascript/tree/master/008.intersection_observer)

### [Pagination](https://github.com/PollyGotACracker/hello-javascript/tree/master/009.pagination)

## 기억할 것들

### `||` 와 `??` 연산자의 차이점

- [ko.javascript.info: nullish 병합 연산자 '??'](https://ko.javascript.info/nullish-coalescing-operator)
- `||` 연산자: <b>논리 OR</b> 연산자  
  왼쪽 피연산자가 falsy 값 (`false`, `0`, `""`, `null`, `undefined`, `NaN`) 이면 오른쪽 피연산자를 반환
- `??` 연산자: <b>nullish 병합</b> 연산자  
  왼쪽 피연산자가 `null` 또는 `undefined` 일 때만 오른쪽 피연산자를 반환
- 참고: `!` 논리 NOT 연산자도 falsy 값을 기준으로 하므로, `0` 이나 `""` 을 다룰 때 주의할 것

```js
console.log(undefined || "value"); // value
console.log(0 || "value"); // valueJ
console.log(undefined ?? "value"); // value
console.log(0 ?? "value"); // 0

// 할당 연산자 사용
const a = 0 || "value";
console.log(a); // value
const b = 0 ?? "value";
console.log(b); // 0
```

### 원본 배열을 변경하는 메서드들

- `push()` :  
  원본 배열의 끝에 하나 이상의 요소를 추가하고, 배열의 새로운 길이 반환
- `pop()` :  
  원본 배열에서 마지막 요소를 제거하고, 제거된 요소를 반환
- `unshift()` :  
  원본 배열의 맨 앞에 새로운 요소를 추가하고, 새로운 길이를 반환
- `shift()` :  
  원본 배열의 첫 번째 요소를 제거한 후 제거된 요소를 반환
- `fill()` :  
  원본 배열의 시작 인덱스부터 끝 인덱스 전까지 정적 값으로 채운 후, 변경된 배열을 반환
- `reverse()` :  
  원본 배열의 순서를 반전한 후, 반전된 배열을 반환
- `sort()` :  
  원본 배열의 요소를 정렬한 후, 정렬한 배열을 반환
- `splice()` :  
   원본 배열의 요소를 삭제하거나 교체 또는 새로운 요소를 추가하여 배열 내용을 변경한 후, 변경된 배열을 반환

_주의: `slice()` 는 원본 배열을 변경하지 않고 새로운 배열 반환_

### 부동소수점 문제

- 2진법에서 무한소수인 실수는 부동소수점 방식으로 근삿값이 저장된다. 따라서 컴퓨터에서 실수를 연산할 경우 오차가 발생한다.
  `0.3 - 0.1  // 0.19999999999999998`
- 실수를 정수로 변환하여 계산한 뒤, 다시 실수로 변환한다.
  `(0.3 * 10 - 0.1 * 10) / 10  // 0.2`

### Falsy Value

- null
- undefined
- false
- NaN
- 0
- -0
- 0n
- ""
- document.all

### Event Method

- `Event.preventDefault()` :  
  이벤트 기본 동작 실행 X
- `Event.stopPropagation()` :
  이벤트 전파 X
- `Event.stopImmediatePropagation()` :  
  이벤트 전파 X, 같은 이벤트 의 다른 listener 실행 X

### MouseEvent property

- `Event.clientX`, `Event.clientY` :  
  브라우저 화면 기준
- `Event.pageX`, `Event.pageY` :  
  전체 문서 영역 기준, 스크롤한 픽셀 값을 포함
- `Event.offsetX`, `Event.offsetY` :  
  이벤트를 연결한 요소 기준
- `Event.screenX`, `Event.screenY` :  
  사용자 모니터 기준

### 고차함수

- return 값이 함수이거나, callback 함수를 인자로 전달받는 함수
- callback 함수로 고차함수를 사용하면 addEventListener 에서 함수를 호출해도 된다.

```js
// event 객체와 함께 매개변수에 인수 전달
const ele1 = document.querySelector("#element1");
const func1 = (event, value) => {
  console.log(event);
  console.log(value);
};
ele1.addEventListener("click", (event) => func1(event, "Hello"));

// 고차함수 사용
// callback 실행 직전에 event 객체를 인수로 전달한다.
const ele2 = document.querySelector("#element2");
const func2 = (value) => (event) => {
  console.log(event);
  console.log(value);
};
ele2.addEventListener("click", func2("Hello"));
```

### [Closure](https://poiemaweb.com/js-closure)

- Closure:  
  내부함수에서 외부함수의 context 에 접근할 수 있음을 뜻한다.
- Lexical Scope:  
  유효범위(scope)는 함수를 호출하는 위치가 아닌 *함수가 선언된 위치*에 따라 결정된다. 즉, 함수는 선언 당시의 lexical environment 를 기억하여 전역, 상위 scope 및 자신의 scope 를 참조할 수 있다.
- 외부함수가 내부함수보다 먼저 종료되어 실행 컨텍스트 스택에서 제거되더라도, 외부함수 실행 컨텍스트 내 활성 객체(Activation Object;변수나 함수 선언에 대한 정보)는 내부함수에 의해 참조되는 한 유효하다. 그러므로 외부함수 밖에서 내부함수가 호출될 때 내부함수는 scope chain 을 통해 외부함수의 지역변수에 접근 가능하다.
- 외부로부터의 접근을 제한하여 의도치 않은 값의 변경을 막거나 멤버변수의 값을 은닉화할 수 있다(private).

#### 비동기 함수 문제

- setTimeout 이나 setInterval 과 같은 비동기함수에서 접근하는 변수가 global scope 를 갖고 그 값이 계속 변경되는 경우 의도치 않은 결과가 나타난다. 이 때 closure 를 활용하면 해결 가능하다.
- JS 는 단일 thread 언어로 callStack 에 작업을 push 및 pop 한다. 그러나 비동기 작업은 callStack 이 아닌 eventQueue 에 저장되며, callStack 이 비는 순간 해당 작업을 push 하여 실행한다.
- 비동기함수 실행 시 내부 callback 함수는 이미 고정된 closure 를 가진다. 따라서 참조하는 변수의 값이 변하더라도 closure 가 고정되어 있으므로 변수의 값 또한 고정되어 있다.

```js
for (var i = 0; i < 5; i++) {
  setTimeout(() => console.log(i), 1000);
} // 5 5 5 5 5

for (let i = 0; i < 5; i++) {
  setTimeout(() => console.log(i), 1000);
} // 0 1 2 3 4

// 즉시실행함수
// 내부 함수에서 접근하는 변수를 감싸(closure) 값을 고정
for (var i = 0; i < 5; i++) {
  ((j) => {
    setTimeout(() => {
      console.log(j);
    }, 1000);
  })(i);
}
```

- var 키워드(function level scope): 1초 후 5를 다섯 번 출력한다.  
  내부함수가 참조하는 변수 i 는 for문 밖에서 하나의 scope 만을 가진다.
  따라서 callback 내부의 i 는 모든 loop 가 끝난 시점의 i 의 값인 5 이다
  (증가식 i++ 가 실행되어 i 는 5가 되고, i < 5 는 false 이므로 loop 중지).

- let 키워드(block level scope): 1초 후 0 부터 4 까지의 숫자를 출력한다.  
  내부함수가 참조하는 변수 i 는 각 loop 마다 생성된 새로운 scope 를 가진다. for문이 종료되어도 지역변수 i 는 유효하다.
  따라서 callback 내부의 i 는 각 loop 시점의 i 값이다.

### 그 외

- [script 태그의 async, defer](https://ko.javascript.info/script-async-defer) :

  - async와 defer 스크립트는 모두 페이지 렌더링을 막지 않고 백그라운드에서 병렬로 다운로드 된다.
  - `async`: DOM 이나 다른 스크립트와는 독립적인 스크립트, 또는 실행 순서가 중요하지 않은 경우에 적용한다.  
    스크립트는 다운로드 되는 즉시 실행되므로 DOM 생성이 지연될 수 있다(DOMContentLoaded 이벤트 발생 시점과 무관).
    async 스크립트들은 선언한 순서대로 실행 순서가 보장되지 않는다(비동기).
  - `defer`: DOM 전체가 필요한 스크립트나 실행 순서가 중요한 경우에 적용한다.  
    DOM 생성 완료 후, DOMContentLoaded 이벤트가 발생하기 전에 실행된다.
    따라서 DOM이 화면에 모두 로드되기 전까지 스크립트 실행이 지연되므로, 화면에 표시된 요소가 실제로 동작하지 않을 수 있음에 유의해야 한다.  
     defer 스크립트들은 선언한 순서대로 실행 순서가 보장된다.

- 객체를 return 문 없이 반환할 경우는 소괄호로 감쌀 것
  `const func = (a, b)=>({ a + b })`
