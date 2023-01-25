import { useEffect, useState } from "react";
import "../css/Write.css";
import EditorModule from "./EditorModule";
import { submitPost } from "../service/post.service";
import { v4 } from "uuid";

const Write = () => {
  const catList = [
    { eng: "hobbies", kor: "취미" },
    { eng: "learning", kor: "학습" },
    { eng: "economics", kor: "경제" },
    { eng: "health", kor: "건강" },
  ];

  const initPost = () => {
    const postData = {
      b_code: v4(),
      username: "polly",
      b_category: "",
      b_title: "",
      b_content: "",
    };
    return postData;
  };

  const [postData, setPostData] = useState(initPost);

  const onChangeHandler = (e) => {
    setPostData({ ...postData, [e.target.name]: e.target.value });
  };

  const onChangeContentHandler = (e, editor) => {
    const data = editor.getData();
    setPostData({ ...postData, b_content: data });
  };

  const onClickHandler = (e) => {
    submitPost(postData);
  };

  useEffect(() => {
    console.log(postData);
  }, [postData]);

  // topicList 배열을 이용하여 checkbox 요소 동적 추가
  const checkboxList = catList.map((cat) => {
    return (
      <div className="topic-item" key={cat.eng}>
        <input
          type="radio"
          id={cat.eng}
          value={cat.eng}
          name="b_category"
          onChange={onChangeHandler}
        />
        <label htmlFor={cat.eng}>{cat.kor}</label>
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
        name="b_title"
        placeholder="제목"
        value={postData.b_title}
        onChange={onChangeHandler}
      />
      <EditorModule handler={onChangeContentHandler} b_code={postData.b_code} />
      <button id="submit" type="button" onClick={onClickHandler}>
        등록
      </button>
    </form>
  );
};
export default Write;
