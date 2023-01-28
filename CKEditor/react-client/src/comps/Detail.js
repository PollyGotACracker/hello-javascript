// 게시글 상세보기
import List from "./List";
import Reply from "./Reply";
import "../css/Detail.css";
import { useState, useLayoutEffect } from "react";
import { getDetailPost } from "../service/post.service";

// html tag -> entity -> tag 로 변환하는 과정 필요

const Detail = () => {
  const [postData, setPostData] = useState({});

  useLayoutEffect(() => {
    (async () => {
      // 임시 게시글 코드
      const bCode = "a7236b4e-aa4d-4db9-a9db-7e7012eea8a9";
      const result = await getDetailPost(bCode);
      if (result) setPostData({ ...result });
      return null;
    })();
  }, []);

  return (
    <>
      <main className="commu-detail">
        <div className="category">카테고리</div>
        <div className="title">{postData.b_title}</div>
        <img alt="프로필 이미지" />
        {/* 나중에 nickname으로 수정 */}
        <div className="nickname">{postData.username}</div>
        <div className="wrap-detail">
          <span>{postData.b_views}</span>
          <span>{postData.b_upvote}</span>
          <span>{postData.r_count || "0"}</span>
          <span>{postData.b_date}</span>
          <span>{postData.b_time}</span>
        </div>
        <div
          className="content"
          dangerouslySetInnerHTML={{ __html: postData.b_content }}
        ></div>
        <button>추천</button>
        <div className="button-box">
          <button>수정</button>
          <button>삭제</button>
        </div>
        <Reply />
      </main>
      <List />
    </>
  );
};

export default Detail;
