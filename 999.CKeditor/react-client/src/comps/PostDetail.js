// 게시글 상세보기
import Reply from "./Reply";
import "../css/PostDetail.css";
import { useState, useLayoutEffect } from "react";
import {
  getDetailPost,
  getReply,
  upvotePost,
  deletePost,
} from "../service/post.service";
import { usePostContext } from "../context/PostContextProvider";
import { useLoaderData, useParams, useNavigate, Link } from "react-router-dom";

// html tag -> entity -> tag 로 변환하는 과정 필요
// 자기 자신을 참조하도록 테이블 관계 설정?
// 댓글을 중첩 구조로 데이터 가공해야 하는지?

// hook 은 컴포넌트 함수 또는 커스텀 hook 에서만 호출할 수 있다.
// 따라서 일반 함수에서는 hook 을 호출할 수 없다.
export const loader = async ({ params }) => {
  const pCode = params.post;
  const detail = await getDetailPost(pCode);
  const reply = await getReply(pCode);
  return { detail, reply };
};

const PostDetail = () => {
  const nav = useNavigate();
  const bEng = useParams().board;
  const { detail, reply } = useLoaderData();
  const { replyCount, setReplyCount } = usePostContext();
  const [upvote, setUpvote] = useState(null);
  let board = detail?.board;
  let post = detail?.post;
  let list = reply?.list;
  let count = reply?.count;

  useLayoutEffect(() => {
    (async () => {
      if (detail.ERROR) {
        nav(`/community/${bEng}`, { replace: true });
      }
      setUpvote(post?.p_upvote);
      setReplyCount(count);
    })();
  }, []);

  // 임시 username(session context 에서)
  const username = "polly@gmail.com";

  // 추천 버튼 클릭
  const onClickUpvote = async () => {
    const result = await upvotePost(post.p_code, username);
    if (result) setUpvote(upvote + result[0]);
  };

  // 삭제 버튼 클릭
  const onClickDelete = async () => {
    const result = await deletePost(post.p_code);
    if (result.MESSAGE) {
      nav(`/community/${board.b_eng}`, { replace: true });
    }
  };

  // 예외 처리를 하지 않으면 alert 후 navigation 하기 전 오류 발생
  return (
    <>
      <main className="commu-detail">
        <Link className="board p-2" to={`/community/${board?.b_eng}`}>
          {board?.b_kor}
        </Link>

        <section>
          <div className="title ">{post?.p_title}</div>
          <span>{post?.p_views}</span>
          <span>{upvote}</span>
          <span>{replyCount}</span>
        </section>

        <section>
          <img alt="프로필 이미지" />
          {/* nickname으로 수정 필요 */}
          <div className="nickname">{post?.username}</div>
          <span>{`${post?.p_date} ${post?.p_time}`}</span>
        </section>

        <section>
          <div
            className="content"
            dangerouslySetInnerHTML={{ __html: post?.p_content }}
          ></div>
          <button onClick={onClickUpvote}>
            <div>{upvote}</div>
            추천
          </button>
        </section>
        {/* 게시글과 세션 username 비교 후 표시 */}
        <section className="button-box">
          <Link
            to={`/community/write/${post?.p_code}`}
            state={{ data: post, b_eng: board.b_eng }}
          >
            수정
          </Link>
          <button onClick={onClickDelete}>삭제</button>
        </section>
        <Reply code={post?.p_code} count={replyCount} list={list} />
      </main>
    </>
  );
};

export default PostDetail;
