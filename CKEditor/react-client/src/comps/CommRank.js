// Main 에 포함
import { useRef } from "react";
import { Link } from "react-router-dom";

const CommRank = ({ data }) => {
  const keyRef = useRef(0);

  const RankItem = () => {
    return data.map((item) => {
      keyRef.current++;

      return (
        <Link
          className="rank-item"
          key={keyRef.current}
          to={`/community/${item["board.b_eng"]}/${item.p_code}`}
        >
          {/* <div>
            <img src={`/static/uploads/${item["attachs.thumb"]}`} />
          </div> */}
          <div>{item.p_title}</div>
          <div>
            <div>{item.p_replies}</div>
            <span>{item.p_upvote}</span>
          </div>
          {/* nickname으로 수정 필요 */}
          <div>{item.username}</div>
          <div>{item["board.b_kor"]}</div>
        </Link>
      );
    });
  };

  return (
    <section className="commu-rank">
      <RankItem />
    </section>
  );
};

export default CommRank;
