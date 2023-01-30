// 각 게시판별 페이지
// .../community/category/catA
import List from "./List";
import "../css/community/Category.css";
import { useState, useLayoutEffect } from "react";
import { getBoardPosts } from "../service/post.service";

const Category = () => {
  // 임시 카테고리 코드
  const bCode = "C21";
  const [boardList, setBoardList] = useState([]);
  useLayoutEffect(() => {
    (async () => {
      const result = await getBoardPosts(bCode);
      if (result) {
        setBoardList([...result]);
      }
      return null;
    })();
  }, []);

  return (
    <main className="commu-cat">
      <section>
        <button>{"최신순"}</button>
        <div>
          <button className="latest">최신순</button>
          <button className="upvote">추천순</button>
          <button className="reply">댓글순</button>
          <button className="views">조회순</button>
        </div>
        <div>
          <input />
          <button>검색</button>
        </div>
        <button>글쓰기</button>
      </section>
      <List data={boardList} />
    </main>
  );
};

export default Category;
