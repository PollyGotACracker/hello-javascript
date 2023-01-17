# CKEditor 5 (React, NodeJS)

1. React 에서 dependencies 추가

```
npm install --save @ckeditor/ckeditor5-react
```

2. custom builder 사이트를 이용하여 plugin 추가 및 다운로드(프리미엄 기능은 유료)
   classic 형식으로 진행
   https://ckeditor.com/ckeditor-5/online-builder/

   - plugin 설명  
     https://ckeditor.com/docs/ckeditor5/latest/features/index.html

3. 파일 압축 해제, 폴더명 ckeditor5 로 변경
4. 폴더를 NodeJS 프로젝트 폴더의 최상위 경로에 추가
5. NodeJS 에서 파일 build(yarn 으로 실행) -> dependencies 추가됨

```
yarn add file:./ckeditor5
```

6. React 에서 import

```js
import Editor from "ckeditor5-custom-build/build/ckeditor";
import { CKEditor } from "@ckeditor/ckeditor5-react";
```

7. 공식 문서를 참고하여 컴포넌트 추가
   https://ckeditor.com/docs/ckeditor5/latest/installation/frameworks/react.html

   - Integrating a build from the online builder 항목
   - !!! config={Editor.defaultConfig} 로 값 변경(해당 경로: ckeditor5/src/ckeditor.js) !

8. "widget toolbar no items" {toolbarId: 'mediaEmbed'} 오류가 생길 경우  
   `webpack.config.js` 에 다음 코드 추가

```js
removePlugins: ["MediaEmbedToolbar"],
```

## 기타

- https://ckeditor.com/docs/ckeditor5/latest/features/images/image-upload/image-upload.html
- 서버에서 임시(에디터에만 업로드),영구 이미지 저장 로직 구현해야
