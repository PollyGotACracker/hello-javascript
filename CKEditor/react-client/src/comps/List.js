// 게시글 목록: Category 와 Detail 에 포함
const List = ({ data }) => {
  const ListItem = () => {
    return data.map((item) => {
      return (
        <li className="list-item" key={item.b_code}>
          <div className="title">{item.b_title}</div>
          <div className="date">{`${item.b_date} ${item.b_time}`}</div>
          <div className="nickname">{item.username}</div>
          <div className="detail-box">
            <span>{item.b_views}</span>
            <span>{item.b_replies}</span>
            <span>{item.b_upvote}</span>
          </div>
        </li>
      );
    });
  };

  return (
    <section className="commu-list">
      <ul className="item-wrapper">
        <ListItem />
      </ul>
    </section>
  );
};

export default List;
