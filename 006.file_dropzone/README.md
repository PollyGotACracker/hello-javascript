# File Dropzone

- 2023.05
- 참고: [https://codepen.io/YWTechIT/pen/VwMxWYm](https://codepen.io/YWTechIT/pen/VwMxWYm)

## 구현

- Drag and Drop 하여 파일 업로드
- 중복 파일 업로드 금지
- 업로드 된 파일들의 thumbnail 표시
- 파일 thumbnail 을 클릭하면 해당 파일 삭제

## 문제

- dragenter-dragleave 이벤트를 설정한 대상에 child 요소가 있을 경우  
  capturing 이 false 임에도 불구하고, parent 내 각각의 child 요소에서 계속적으로 trigger 되는 문제 발생  
  따라서 전역 변수 `let counter = 0;` 를 선언하고 enter 시 `counter++`, leave 시 `counter--`
  parent 에 마지막 dragleave 이벤트가 발생하는 시점(counter === 0)에만 원하는 동작이 수행되도록 할 것
  참고: [https://stackoverflow.com/questions/7110353/html5-dragleave-fired-when-hovering-a-child-element](https://stackoverflow.com/questions/7110353/html5-dragleave-fired-when-hovering-a-child-element)
- DOM 객체를 생성하여 객체의 속성을 사용하려면 먼저 객체가 load 되었는지 체크해야 함  
  그렇지 않을 경우 간헐적으로 속성의 값이 제대로 표시되지 않는 오류 발생(undefined, 0 등)  
  단, eventListener 의 callback 은 모든 코드가 실행되기 전까지 blocking 된다는 점에 유의
- load eventListener 가 설정된 기존 객체의 속성이 변경될 경우 callback 이 loop 하는 오류 발생
  따라서 기존 객체와 변경할 객체를 별도로 생성하고 변경할 객체에 load eventListener 를 사용할 것
- canvas 를 이용해 이미지를 resize 할 때, gif 나 webp 등 움직이는 이미지 형식은 생성된 이미지가 움직이지 않으며,  
  image/gif 포맷이 지원되지 않아 `toDataURL()` 에서 기본 확장자인 image/png 가 반환되는 등의 문제 발생  
  따라서 animated 확장자를 별도로 처리하거나, 한 가지 확장자로 통일하여 표시

## 공부

- dragover 가 없으면 drop 이 발생하지 않음  
  따라서 dragover 이벤트와 drop 모두 eventListener 적용해야 함
- 파일을 drop 할 경우 기본 동작으로 파일이 브라우저에서 열리므로 e.preventDefault() 필요
- `input.files` 의 각 file 에서 `lastModified` property 를 file 의 id 로 사용(String)
- `document.createElement("img")` 와 `new Image()` 는 같은 객체를 반환

### [DataTransfer 객체](https://developer.mozilla.org/en-US/docs/Web/API/DataTransfer)

- drag and drop 작업 중 끌고 있는 데이터에 대한 정보를 저장하는 객체

### [FileReader 객체](https://developer.mozilla.org/en-US/docs/Web/API/FileReader)

- 사용자의 컴퓨터에 저장된 파일(또는 raw data 버퍼)의 내용을
  File 또는 Blob 개체를 사용하여 비동기적으로 읽는 객체
- input 요소를 통해 파일을 선택한 결과로 반환되는 FileList,  
  또는 drag and drop 작업의 DataTransfer 에서 파일 객체를 가져올 수 있음
- FileReader.readAsDataURL(): 데이터를 특정 Blob 이나 File에서 읽어 오는 역할
