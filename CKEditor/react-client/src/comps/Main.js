// 커뮤니티 초기 화면
import Rank from "./Rank";
import { getMainPosts } from "../service/post.service";
import { useLayoutEffect, useState } from "react";

const Main = () => {
  const [rankData, setRankData] = useState([]);

  useLayoutEffect(() => {
    const fetch = async () => {
      const result = await getMainPosts();
      if (result) setRankData([...result.data]);
    };
    fetch();
  }, []);

  console.log(rankData);

  // component 함수는 비동기로 실행되서는 안된다(async, await X).
  const MainItem = () => {
    return rankData.map((item) => {
      return (
        <section className="main-item" key={item.code}>
          <div>{item.name}</div>
          <Rank data={item.posts} />
        </section>
      );
    });
  };

  return (
    <main className="cat-main">
      <MainItem />
    </main>
  );
};

export default Main;
