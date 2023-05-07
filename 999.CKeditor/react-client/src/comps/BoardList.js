import { Link } from "react-router-dom";

const BoardList = ({ data }) => {
  const ListItem = () => {
    return data.map((item) => {
      return (
        <Link
          to={`/community/${item["board.b_eng"]}/${item.p_code}`}
          className="list-item"
          key={item.p_code}
        >
          <div className="title">{item.p_title}</div>
          <div className="date">{`${item.p_date} ${item.p_time}`}</div>
          <div className="nickname">{item.username}</div>
          <div className="detail-box">
            <span>{item.p_views}</span>
            <span>{item.p_replies}</span>
            <span>{item.p_upvote}</span>
          </div>
        </Link>
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

export default BoardList;
