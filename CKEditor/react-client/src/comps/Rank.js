import { useRef } from "react";
// 추천수(또는 조회수) 랭킹 : Main 과 Category 에 포함

const Rank = ({ data }) => {
  const keyRef = useRef(0);

  const RankItem = () => {
    return data.map((item) => {
      keyRef.current++;

      return (
        <div
          // to={`/community/${item.b_cat_eng}/${b_code}`}
          className="rank-item"
          key={keyRef.current}
        >
          {/* <div>
            <img src={`/static/uploads/${item["attachs.thumb"]}`} />
          </div> */}
          {/* 나중에 nickname으로 수정 */}
          <div>{item.username}</div>
          <div>
            <div>{item.b_replies}</div>
            <span>{item.b_upvote}</span>
          </div>
          <div>{item.b_title}</div>
          <div>{item.b_category}</div>
        </div>
      );
    });
  };

  return (
    <section className="commu-rank">
      <RankItem />
    </section>
  );
};

export default Rank;
