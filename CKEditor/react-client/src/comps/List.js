// 게시글 목록: Category 와 Detail 에 포함
const List = ({ data }) => {
  const ListItem = () => {
    return data.map((item) => {
      return (
        <li className="list-item" key={item.p_code}>
          <div className="title">{item.p_title}</div>
          <div className="date">{`${item.p_date} ${item.p_time}`}</div>
          <div className="nickname">{item.username}</div>
          <div className="detail-box">
            <span>{item.p_views}</span>
            <span>{item.p_replies}</span>
            <span>{item.p_upvote}</span>
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
