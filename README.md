# :spaghetti: Hello JavaScript

## Folders

### [Lottery](https://github.com/PollyGotACracker/Hello_JavaScript/tree/master/000.lottery)

### [Scheduling](https://github.com/PollyGotACracker/Hello_JavaScript/tree/master/001.scheduling)

### [Modal](https://github.com/PollyGotACracker/Hello_JavaScript/tree/master/002.modal)

### [Image Sprite](https://github.com/PollyGotACracker/Hello_JavaScript/tree/master/003.image_sprite)

### [Twinkling Stars](https://github.com/PollyGotACracker/Hello_JavaScript/tree/master/004.twinkling_stars)

### [Draggable](https://github.com/PollyGotACracker/Hello_JavaScript/tree/master/005.draggable)

### [File Dropzone](https://github.com/PollyGotACracker/Hello_JavaScript/tree/master/006.file_dropzone)

### [Carousel](https://github.com/PollyGotACracker/Hello_JavaScript/tree/master/007.carousel)

### [Intersection Observer](https://github.com/PollyGotACracker/Hello_JavaScript/tree/master/008.intersection_observer)

### [Pagination](https://github.com/PollyGotACracker/Hello_JavaScript/tree/master/009.pagination)

## 기억할 것들

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
  `(0.3 * 10 - 0.1 * 10) / 10`

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

### 그 외

- 객체를 return 문 없이 반환할 경우는 소괄호로 감쌀 것
  `const func = (a, b)=>({ a + b })`
