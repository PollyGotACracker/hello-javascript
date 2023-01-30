// 게시글 상세보기
import Reply from "./Reply";
import "../css/Detail.css";
import { useState, useLayoutEffect } from "react";
import {
  getDetailPost,
  getReply,
  insertReply,
  upvotePost,
} from "../service/post.service";
import { usePostContext } from "../context/PostContextProvider";

// html tag -> entity -> tag 로 변환하는 과정 필요
// 자기 자신을 참조하도록 테이블 관계 설정
// 댓글을 중첩 구조로 데이터 가공해야 하는지?
// 카테고리 데이터 어떻게 해야?? 테이블 생성?

const Detail = () => {
  const { postData, setPostData, replyData, setReplyData, initReply } =
    usePostContext();
  const [upvote, setUpvote] = useState(null);
  const [replyCount, setReplyCount] = useState(null);
  const [replyList, setReplyList] = useState([]);

  const pCode = "831a670d-e0fd-4c88-9c19-2f10b101cade";

  useLayoutEffect(() => {
    (async () => {
      const postResult = await getDetailPost(pCode);
      const replyResult = await getReply(pCode);
      if (postResult) {
        setPostData({ ...postResult });
        setUpvote(postResult.p_upvote);
        setReplyList([...replyResult.replyList]);
        setReplyCount(replyResult.replyCount.p_replies);
      }
      return null;
    })();
  }, []);

  const onClickUpvote = async () => {
    // 임시 username(session context 에서)
    const username = "polly@gmail.com";
    const result = await upvotePost(pCode, username);
    if (result) setUpvote(upvote + result[0]);
  };

  const onChangeHandler = (e) => {
    setReplyData({ ...replyData, p_code: pCode, r_content: e.target.value });
  };

  const onClickReply = async () => {
    const result = await insertReply(replyData);
    if (result) {
      setReplyList([...result.replyList]);
      setReplyCount(result.replyCount.p_replies);
      setReplyData(initReply);
    }
  };

  return (
    <>
      <main className="commu-detail">
        <section className="category">카테고리</section>

        <section>
          <div className="title ">{postData.p_title}</div>
          <span>{postData.p_views}</span>
          <span>{postData.p_upvote}</span>
          <span>{postData.r_count || "0"}</span>
        </section>

        <section>
          <img alt="프로필 이미지" />
          {/* 나중에 nickname으로 수정 */}
          <div className="nickname">{postData.username}</div>
          <span>{`${postData.p_date} ${postData.p_time}`}</span>
        </section>

        <section>
          <div
            className="content"
            dangerouslySetInnerHTML={{ __html: postData.p_content }}
          ></div>
          <button onClick={onClickUpvote}>
            <div>{upvote}</div>
            추천
          </button>
        </section>

        <section className="button-box">
          <button>수정</button>
          <button>삭제</button>
        </section>
        <div>{`${replyCount || 0} 개의 댓글`}</div>
        <div className="reply-input-box">
          <input value={replyData.r_content} onChange={onChangeHandler} />
          <button onClick={onClickReply}>게시</button>
        </div>

        <Reply data={replyList} />
      </main>
    </>
  );
};

export default Detail;
