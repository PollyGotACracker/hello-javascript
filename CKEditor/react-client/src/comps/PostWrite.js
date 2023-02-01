import "../css/PostWrite.css";
import EditorModule from "./EditorModule";
import { submitPost } from "../service/post.service";
import { usePostContext } from "../context/PostContextProvider";
import { useEffect } from "react";
import { useParams, useLocation } from "react-router-dom";

const PostWrite = () => {
  // 카테고리, 그룹 값은 이전 페이지(게시판)에서 가져옴
  // detail 페이지에서 fetch 데이터를 전역 context 에 저장해야 함
  // session 체크해서 게시글의 username 과 일치할 경우 수정 삭제 버튼 표시
  // 현재 경로를 체크해서 새로 글쓰는 경우와 수정하는 경우 분리
  // 수정은 저장된 postData 가져옴
  // 새로 글쓰기 전후로 postData 초기화해야
  // ckEditor setData 또는 initData 사용

  const { initPost, postData, setPostData } = usePostContext();
  //useLocation().state.aaa 안됨
  const location = useLocation();
  const pCode = useParams().post;

  useEffect(() => {
    const { data, b_code, b_group_code } = location?.state;
    // insert
    // username 추가해야
    if (!pCode) {
      console.log("before", postData);
      console.log(b_code, b_group_code);
      // initPost 가 spread 안됨...
      setPostData({ ...initPost, b_code: b_code, b_group_code: b_group_code });
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
