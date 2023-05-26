# Modal

- 2022.11, 2023.05
- class 와 css transform 을 이용한 slide, modal 애니메이션 연습

## 문제

- 자주 호출되는 함수 내에서 addEventListener() 를 호출하지 말 것
- 해당 요소에 이벤트가 발생할 때, 함수를 호출한 횟수만큼 eventListener 의 callback 이 연속 실행됨
- 이때 함수의 local 변수 값은 각 eventListener 에 별도로 저장되어 있어 callback 이 실행될 때마다 다른 값이 표시되었음

## 공부

### addEventListener()

- 함수 또는 객체(Object)가 특정 요소에 대한 eventListener 목록에 이미 있으면 중복해서 추가되지 않는다.
- 그러나, 특정 익명 함수가 특정 요소에 대해 등록된 eventListener 목록에 있고, 이후 코드에서 addEventListener 호출에 동일한 익명 함수가 인자로 있는 경우 eventListener 목록에 이어서 추가된다. 익명 함수는 반복적으로 호출되는 동일한 불변 소스 코드를 사용하여 정의하더라도 서로 동일하지 않다.
