// 게시글 상세보기
import Reply from "./Reply";
import "../css/PostDetail.css";
import { useState, useLayoutEffect } from "react";
import {
  getDetailPost,
  getReply,
  insertReply,
  upvotePost,
} from "../service/post.service";
import { usePostContext } from "../context/PostContextProvider";
import { useLoaderData, Link } from "react-router-dom";

// html tag -> entity -> tag 로 변환하는 과정 필요
// 자기 자신을 참조하도록 테이블 관계 설정
// 댓글을 중첩 구조로 데이터 가공해야 하는지?

export const loader = async ({ params }) => {
  const pCode = params.post;
  const { postData, boardData } = await getDetailPost(pCode);
  const { replyList, replyCount } = await getReply(pCode);
  return {
    board: boardData,
    post: postData,
    reply: replyList,
    count: replyCount,
  };
};

const PostDetail = () => {
  const { board, post, reply, count } = useLoaderData();
  const { replyData, setReplyData, initReply } = usePostContext();
  // reRendering data
  const [upvote, setUpvote] = useState(null);
  const [replyCount, setReplyCount] = useState(null);
  const [replyList, setReplyList] = useState([]);

  useLayoutEffect(() => {
    (async () => {
      setUpvote(post.p_upvote);
      setReplyList([...reply]);
      setReplyCount(count.p_replies);
    })();
  }, []);

  // 임시 username(session context 에서)
  const username = "polly@gmail.com";

  // 추천 버튼 클릭
  const onClickUpvote = async () => {
    const result = await upvotePost(post.p_code, username);
    if (result) setUpvote(upvote + result[0]);
  };

  // 댓글 입력 데이터 갱신
  const onChangeHandler = (e) => {
    setReplyData({
      ...replyData,
      p_code: post.p_code,
      r_content: e.target.value,
    });
  };

  // 댓글 등록 버튼 클릭
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
        <Link className="board p-2" to={`/community/${board.b_eng}`}>
          {board.b_kor}
        </Link>

        <section>
          <div className="title ">{post.p_title}</div>
          <span>{post.p_views}</span>
          <span>{upvote}</span>
          <span>{replyCount}</span>
        </section>

        <section>
          <img alt="프로필 이미지" />
          {/* nickname으로 수정 필요 */}
          <div className="nickname">{post.username}</div>
          <span>{`${post.p_date} ${post.p_time}`}</span>
        </section>

        <section>
          <div
            className="content"
            dangerouslySetInnerHTML={{ __html: post.p_content }}
          ></div>
          <button onClick={onClickUpvote}>
            <div>{upvote}</div>
            추천
          </button>
        </section>
        {/* 게시글과 세션 username 비교 후 표시 */}
        <section className="button-box">
          <Link to={`/community/write/${post.p_code}`} state={{ data: post }}>
            수정
          </Link>
          <button>삭제</button>
        </section>
        <div>{`댓글 ${replyCount} 개`}</div>
        <div className="reply-input-box">
          <input value={replyData.r_content} onChange={onChangeHandler} />
          <button onClick={onClickReply}>게시</button>
        </div>

        <Reply data={replyList} />
      </main>
    </>
  );
};

export default PostDetail;
