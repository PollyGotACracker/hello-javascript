import Editor from "ckeditor5-custom-build/build/ckeditor";
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
