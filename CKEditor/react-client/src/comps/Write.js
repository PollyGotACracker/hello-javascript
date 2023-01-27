import { useEffect, useState } from "react";
import "../css/Write.css";
import EditorModule from "./EditorModule";
import { submitPost } from "../service/post.service";
import { v4 } from "uuid";

const Write = () => {
  const initPost = () => {
    const postData = {
      b_code: v4(),
      username: "polly@gmail.com",
      b_title: "",
      b_content: "",
      b_category: "C21",
      b_group: "C2",
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

  return (
    <form className="post-editor">
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
