# Lottery

- ~ 2022.10
- js 의 Set 객체, for문 다시 공부

## 공부

```js
const getRandomNumber = (num, max) => {
  const numbers = new Set();
  while (numbers.size < num) {
    numbers.add(Math.floor(Math.random() * max) + 1);
  }
  console.log(numbers.values());
};
```

- 여기서 while문을 `for(let i = numbers.size; i < num; i++)`으로 바꿀 경우,  
  `getRandomNumber` 함수를 반복 실행하면 `numbers` 의 요소 개수가 `num` 과 일치하지 않는 경우가 종종 있었다.
- Set 객체는 자료형과 관계없이 원시 값과 객체 참조 모두 유일한 값(unique element)을 저장한다.  
  따라서 `Math.random()` 에서 중복값이 나올 때 문제가 발생하는 것이라 추측했다.

### for문의 동작 순서

- 초기화 -> 조건문 -> 조건이 참일 경우 실행문 실행 -> 증감문 -> 조건문 -> 조건이 참일 경우 실행문 실행 -> 증감문...
- 초기화문 `let i = numbers.size` 는 for문 최초 진입 시에만 실행된다.  
  그러므로 for문의 i 변수는 실제 `numbers.size`의 값과 상관없이 `i++` 되고, 0 ~ 5까지 6회 반복한다.
- 반면 위의 while문은 loop 할 때마다 index 변수 없이 직접 `numbers.size` 와 `num` 을 비교한 후 true 일 때 실행문으로 진입하기 때문에 문제가 발생하지 않았다.  
  만약 while문에 index 변수를 사용할 경우 for문과 동일한 문제가 발생하게 된다.
