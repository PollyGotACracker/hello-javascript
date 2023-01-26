import { useRef } from "react";
// 추천수(또는 조회수) 랭킹 : Main 과 Category 에 포함

const Rank = ({ data }) => {
  const keyRef = useRef(0);

  const RankItem = () => {
    return data.map((item) => {
      keyRef.current++;
      const content = item?.b_content;
      let imgSrc = "";
      if (content) {
        const imgStartIdx = content.indexOf("![](");
        if (imgStartIdx > -1) {
          const imgLastIdx = item?.b_content.indexOf(")", imgStartIdx);
          imgSrc = item?.b_content.slice(imgStartIdx + 4, imgLastIdx);
        }
      }

      return (
        <div className="rank-item" key={keyRef.current}>
          <div>
            <img src={`/static/uploads/${item["attachs.thumb"]}`} />
          </div>
          <div>
            <div>{item.b_title}</div>
            <div> [{item.count}]</div>
          </div>
          <div>{item.b_content}</div>
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
