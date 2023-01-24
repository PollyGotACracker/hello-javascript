// 각 게시판별 페이지
// .../community/category/catA
import Rank from "./Rank";
import List from "./List";

const Category = () => {
  return (
    <main className="commu-cat">
      <Rank />
      <button>글쓰기</button>
      <List />
      <section className="cat-search">
        <select className="search-select">
          <option value="title-content" selected>
            제목+내용
          </option>
          <option value="title">제목</option>
          <option value="nickname">작성자</option>
          <option value="content">내용</option>
          <option value="reply">댓글</option>
        </select>
        <input />
        <button>검색</button>
      </section>
    </main>
  );
};

export default Category;
