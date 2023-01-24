// 게시글 목록: Category 와 Detail 에 포함
const List = () => {
  const ListItem = () => {
    // map 사용하여 추가
    return (
      <li className="list-item">
        <span>번호</span>
        <span>제목</span>
        <span>댓글수</span>
        <span>작성자</span>
        <span>작성일자</span>
        <span>조회수</span>
        <span>추천수</span>
      </li>
    );
  };

  return (
    <section className="commu-list">
      <ListItem />
    </section>
  );
};

export default List;
