// 커뮤니티 초기 화면
import { ClipboardDocumentListIcon } from "@heroicons/react/20/solid";
import Rank from "./Rank";

const Main = () => {
  // catList: 임시 server 데이터
  const catList = [
    { eng: "hobbies", kor: "취미" },
    { eng: "learning", kor: "학습" },
    { eng: "life", kor: "생활" },
    { eng: "issue", kor: "이슈" },
  ];

  const MainItem = () => {
    return catList.map((cat) => {
      return (
        <section className="main-item" key={cat.eng}>
          <div>{cat.kor}</div>
          <Rank />
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
