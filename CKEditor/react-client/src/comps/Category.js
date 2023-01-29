// 각 게시판별 페이지
// .../community/category/catA
import List from "./List";
import "../css/community/Category.css";
import { useState, useLayoutEffect } from "react";
import { getCatPosts } from "../service/post.service";

const Category = () => {
  // 임시 카테고리 코드
  const catCode = "C21";
  const [catList, setCatList] = useState([]);
  useLayoutEffect(() => {
    (async () => {
      const result = await getCatPosts(catCode);
      if (result) {
        setCatList([...result]);
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
      <List data={catList} />
    </main>
  );
};

export default Category;
