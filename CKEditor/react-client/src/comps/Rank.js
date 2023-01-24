import { useState } from "react";
// 추천수(또는 조회수) 랭킹 : Main 과 Category 에 포함

const Rank = (props) => {
  const [itemKey, setItemKey] = useState(0);

  const RankItem = () => {
    // map 사용하여 추가

    // setItemKey(itemKey + 1);
    return (
      // <div className="rank-item" key={itemKey}>
      <div className="rank-item">
        <img />
        <div>제목</div>
        <div>댓글 수</div>
        <div>내용 요약</div>
      </div>
    );
  };

  return (
    <section className="commu-rank">
      <RankItem />
    </section>
  );
};

export default Rank;
