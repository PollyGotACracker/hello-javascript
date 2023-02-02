import "../css/PostWrite.css";
import EditorModule from "./EditorModule";
import { submitPost } from "../service/post.service";
import { usePostContext } from "../context/PostContextProvider";
import { useLayoutEffect } from "react";
import { useParams, useLocation } from "react-router-dom";

export const loader = async ({ params }) => {
  const pCode = params?.post;
};

const PostWrite = () => {
  // data setting: ckEditor setData 또는 initData 사용

  const { initPost, postData, setPostData } = usePostContext();
  //useLocation().state.aaa 안됨
  const location = useLocation();
  const pCode = useParams()?.post;

  useLayoutEffect(() => {
    const { b_code, b_group_code } = location?.state;
    const data = location?.state?.data;
    // insert
    // username 추가해야
    console.log(pCode);
    // setState 를 같은 함수 내에서 여러 번 실행하면
    // 가장 마지막 setState 만 실행된다.
    const init = initPost();

    if (!pCode) {
      console.log("before", postData);
      console.log(b_code, b_group_code);

      setPostData({ ...init, b_code: b_code, b_group_code: b_group_code });
      console.log("after", postData);
    }
    // update
    else {
      setPostData({ ...data });
    }
  }, []);

  const onChangeHandler = (e) => {
    setPostData({ ...postData, [e.target.name]: e.target.value });
  };

  const onChangeContentHandler = (e, editor) => {
    const data = editor.getData();
    setPostData({ ...postData, p_content: data });
  };

  const onClickHandler = () => {
    submitPost(postData);
  };

  return (
    <form className="post-editor">
      <input
        className="title"
        name="p_title"
        placeholder="제목"
        value={postData.p_title}
        onChange={onChangeHandler}
      />
      <EditorModule
        data={postData.p_content}
        handler={onChangeContentHandler}
        code={postData.p_code}
      />
      <button id="submit" type="button" onClick={onClickHandler}>
        등록
      </button>
    </form>
  );
};
export default PostWrite;
