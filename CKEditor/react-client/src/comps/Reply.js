import ReplyItem from "./ReplyItem";
import { useState } from "react";

const sample = [
  {
    b_code: "01",
    r_date: "2023-01-27",
    r_time: "15:55",
    username: "polly@gmail.com",
    r_content: "테스트",
    r_count: 2,
    r_parent_code: null,
  },
  {
    b_code: "02",
    r_date: "2023-01-27",
    r_time: "15:55",
    username: "polly@gmail.com",
    r_content: "테스트",
    r_count: 0,
    r_parent_code: "01",
  },
  {
    b_code: "03",
    r_date: "2023-01-27",
    r_time: "15:55",
    username: "polly@gmail.com",
    r_content: "테스트",
    r_count: 0,
    r_parent_code: "01",
  },
  {
    b_code: "04",
    r_date: "2023-01-27",
    r_time: "15:55",
    username: "polly@gmail.com",
    r_content: "테스트",
    r_count: 0,
    r_parent_code: null,
  },
  {
    b_code: "05",
    r_date: "2023-01-27",
    r_time: "15:55",
    username: "polly@gmail.com",
    r_content: "테스트",
    r_count: 0,
    r_parent_code: null,
  },
];

const Reply = () => {
  const [replyData, setReplyData] = useState();

  const ReplyList = () => {
    return sample
      .filter((item) => {
        return !item.r_parent_code;
      })
      .map((item) => {
        return <ReplyItem data={sample} item={item} />;
      });
  };

  return (
    <section className="reply">
      <ReplyList />
    </section>
  );
};

export default Reply;
