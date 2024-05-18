# AbortSignal

- 2024.05

## 설명

- 사용자가 직접 HTTP 요청을 취소하거나, 일정 시간이 지나면 요청을 중단하는 동작 구현

## `AbortSignal`

- `fetch()` 호출 시 두 번째 인수로 `headers` 와 함께 `{ signal: ... }` 로 전달

### [`AbortController`](https://developer.mozilla.org/en-US/docs/Web/API/AbortController)

- `new AbortController()`: `AbortSignal` 객체 인스턴스 생성
- `instance.signal`: signal 반환
- `instance.abort()`: 요청 취소

### [`AbortSignal`](https://developer.mozilla.org/en-US/docs/Web/API/AbortSignal)

- `AbortSignal.timeout(number)`: 지정한 시간이 지나면 요청 중단
- `AbortSignal.any([...])`: iterable 을 전달하여 하나라도 abort 되면 요청이 중단되는 새로운 signal 생성

## 참고

- 숫자 안에 `_` 을 넣어 가독성 확보 가능
