// https://ckeditor.com/docs/ckeditor5/latest/features/images/image-upload/image-upload.html
// https://ckeditor.com/docs/ckeditor5/latest/installation/frameworks/react.html
// 서버에서 임시(에디터에만 업로드),영구 이미지 저장 로직 구현해야

/**
 * CKEditor 5
 * 1. React 에서 dependencies 2개 추가
 *    npm install --save @ckeditor/ckeditor5-react @ckeditor/ckeditor5-build-classic
 *
 * 2. custom builder 사이트를 이용하여 plugin 추가 및 다운로드(프리미엄 기능은 유료)
 *    classic 형식으로 진행
 *    https://ckeditor.com/ckeditor-5/online-builder/
 *    - 참고 문서
 *    https://ckeditor.com/docs/ckeditor5/latest/installation/getting-started/quick-start-other.html#option-building-to-es5-target
 *
 * 3. 파일 압축 해제, 폴더명 ckeditor5 로 변경
 * 4. 폴더를 NodeJS 프로젝트 폴더의 최상위 경로에 추가(node_modules 와 같음)
 * 5. NodeJS 에서 파일 build(yarn 으로 실행) -> dependencies 1개 추가
 *    yarn add file:./ckeditor5
 *    - yarn 파일은 지워도 된다.
 *
 * 6. React 에서 import
 *    import { Editor } from "ckeditor5-custom-build/build/ckeditor";
 *    import { CKEditor } from "@ckeditor/ckeditor5-react";
 *    !!! 공식 문서 오류: Editor 를 중괄호로 감쌀 것 !!!
 *
 * 7. 공식 문서를 참고하여 컴포넌트 추가
 *    https://ckeditor.com/docs/ckeditor5/latest/installation/frameworks/react.html
 *    - Integrating a build from the online builder 항목
 *    !!! 공식 문서 오류: config={Editor.defaultConfig} 로 값 변경(해당 경로: ckeditor5/src/ckeditor.js) !!!
 */

import { Editor } from "ckeditor5-custom-build/build/ckeditor";
import { CKEditor } from "@ckeditor/ckeditor5-react";
import { useEffect, useState } from "react";
import "../css/Write.css";

const Write = () => {
  const topicList = [
    { eng: "hobbies", kor: "취미" },
    { eng: "learning", kor: "학습" },
    { eng: "economics", kor: "경제" },
    { eng: "health", kor: "건강" },
  ];

  const initPost = () => {
    const postData = {
      topic: "",
      title: "",
      content: "",
    };
    return postData;
  };

  const [postData, setPostData] = useState(initPost);

  const onChangeHandler = (e) => {
    setPostData({ ...postData, [e.target.name]: e.target.value });
  };

  const onChangeContentHandler = (e, editor) => {
    const data = editor.getData();
    setPostData({ ...postData, content: data });
  };

  useEffect(() => {
    console.log(postData);
  }, [postData]);

  // topicList 배열을 이용하여 checkbox 요소 동적 추가
  const checkboxList = topicList.map((topic) => {
    return (
      <div className="topic-item" key={topic.eng}>
        <input
          type="radio"
          id={topic.eng}
          value={topic.eng}
          name="topic"
          onChange={onChangeHandler}
        />
        <label htmlFor={topic.eng}>{topic.kor}</label>
      </div>
    );
  });

  return (
    <form className="post-editor">
      <div className="topic-group">
        <div>카테고리</div>
        {checkboxList}
      </div>
      <input
        className="title"
        name="title"
        placeholder="제목"
        value={postData.title}
        onChange={onChangeHandler}
      />
      <CKEditor
        className="content"
        editor={Editor}
        config={Editor.defaultConfig}
        data="<p></p>"
        onReady={(editor) => {}}
        onChange={onChangeContentHandler}
        onBlur={(event, editor) => {
          console.log("Blur.", editor);
        }}
        onFocus={(event, editor) => {
          console.log("Focus.", editor);
        }}
      />

      <button id="submit" type="button">
        등록
      </button>
    </form>
  );
};
export default Write;
