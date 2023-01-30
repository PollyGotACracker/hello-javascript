import "../css/Write.css";
import EditorModule from "./EditorModule";
import { submitPost } from "../service/post.service";
import { usePostContext } from "../context/PostContextProvider";

const Write = () => {
  // 카테고리, 그룹 값은 이전 페이지(게시판)에서 가져옴
  // detail 페이지에서 fetch 데이터를 전역 context 에 저장해야 함
  // session 체크해서 게시글의 username 과 일치할 경우 수정 삭제 버튼 표시
  // 현재 경로를 체크해서 새로 글쓰는 경우와 수정하는 경우 분리
  // 수정은 저장된 postData 가져옴
  // 새로 글쓰기 전후로 postData 초기화해야
  // ckEditor setData 또는 initData 사용

  const { postData, setPostData } = usePostContext();

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
export default Write;
