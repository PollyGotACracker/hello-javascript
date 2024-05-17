# Counter

- 2024.05

## 설명

- css 의 `@property`(`CSS.registerProperty`) 또는 javascript 를 사용해 애니메이션 카운터 구현
- `@property` 는 css variable 의 스펙을 정의하며, firefox 에서 아직 호환되지 않음
- javascript 구현 시 만든 변수 설명:

```js
const COUNT_MAX = 100; // 최대 카운트 값
const DELAY_MEDIAN = 30; // 딜레이 중앙값(delay 초기값에 넣음)

const EASE_IN_COUNT = 8; // easing 시작 시 마지막 카운트 값
const EASE_OUT_COUNT = COUNT_MAX - EASE_IN_COUNT * 2; // easing 종료 시 첫 카운트 값
const EASE_IN_DELAY_OFFSET = 20; // easing 시작 시 딜레이 오프셋 값
const EASE_OUT_DELAY_OFFSET = EASE_IN_DELAY_OFFSET / 4.5; // easing 종료 시 딜레이 오프셋 값

let count = 0; // 실제 카운트 수
let delay = DELAY_MEDIAN + EASE_IN_COUNT * EASE_IN_DELAY_OFFSET; // 실제 딜레이 값
```

## 참고

- css 코드: https://css-tricks.com/animating-number-counters/
