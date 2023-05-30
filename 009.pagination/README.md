# Pagination

- 2023.05

## 구현

### 변수

- DATA_COUNT(고정) : 총 데이터 개수
- dataSize(고정) : 화면에 표시할 데이터 개수
- pageSize(고정) : 화면에 표시할 페이지 버튼 개수
- dataOffset : 화면에 표시할 데이터의 첫 번째 index
- pageOffset : 화면에 표시할 페이지 버튼들의 첫 번째 번호
- pageCurrent : 현재 페이지 번호(페이지 버튼 숫자)
- pageTotal(고정) : 총 페이지 개수 또는 마지막 페이지 번호
- pageLastOffset(고정) : 마지막 페이지일 때 pagination에 표시되는 첫 번째 페이지 번호.  
  버튼 상태 관리를 용이하게 하기 위해 추가

## 공부

### Array.sort()

`arr.sort([compareFunction]);`

```js
const arr = [10, 9, 8, 7, 6, 5, 4, 3, 2, 1];

arr.sort((previous, current) => {
  //   if (previous < current) return -1;
  //   if (previous > current) return 1;
  //   return 0;
  return previous - current;
});

console.log(arr); // [1, 2, 3, 4, 5, 6, 7, 8, 9, 10]
```

- compareFunction 을 생략할 경우, 각 문자의 UTF-16 코드 단위 값에 따라 정렬한다.  
  이때 숫자 요소는 문자열로 형변환하므로 1 이 10 보다 우선 정렬된다.
  `[1, 10, 2, 3, 4, 5, 6, 7, 8, 9]`
- return previous - current : 오름차순
- return current - previous : 내림차순
- return 0 : 순서 유지. previous 와 current 가 서로 같음
- return 음수 : 순서 유지. previous 가 current 보다 우선
- return 양수 : 순서 변경. current 가 previous 보다 우선
