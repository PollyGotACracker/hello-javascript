// 게시글 상세보기
import List from "./List";

const Detail = () => {
  return (
    <main className="commu-detail">
      <div className="category">카테고리</div>
      <div className="title">제목</div>
      <img alt="프로필 이미지" />
      <div className="nickname">작성자</div>
      <div className="wrap-detail">
        <span>조회수</span>
        <span>댓글수</span>
        <span>작성일자</span>
        <span>작성시각</span>
      </div>
      <div className="content">내용</div>
      <div>추천 수</div>
      <List />
    </main>
  );
};

export default Detail;
