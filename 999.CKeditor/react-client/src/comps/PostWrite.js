import "../css/PostWrite.css";
import EditorModule from "./EditorModule";
import { submitPost } from "../service/post.service";
import { usePostContext } from "../context/PostContextProvider";
import { useLayoutEffect } from "react";
import { useParams, useNavigate, useLocation } from "react-router-dom";

const PostWrite = () => {
  const nav = useNavigate();
  const { initPost, postData, setPostData } = usePostContext();
  const location = useLocation();
  const { b_code, b_eng, b_group_code } = location?.state;
  const data = location?.state?.data;
  const pCode = useParams()?.post;

  useLayoutEffect(() => {
    // setState 를 같은 함수 내에서 여러 번 실행하면
    // 가장 마지막 setState 만 실행된다.

    // username 추가 필요
    // insert
    if (!pCode) {
      const init = initPost();
      setPostData({ ...init, b_code: b_code, b_group_code: b_group_code });
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

  const onClickHandler = async () => {
    let result;
    // insert
    if (!pCode) result = await submitPost(postData);
    // update
    if (pCode) result = await submitPost(postData, pCode);
    if (result.MESSAGE) {
      nav(`/community/${b_eng}`, { replace: true });
    }
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
