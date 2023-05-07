import ReplyItem from "./ReplyItem";

const ReplyList = ({ data }) => {
  const ReplyBox = () => {
    return data
      .filter((item) => {
        return !item.r_parent_code;
      })
      .map((item) => {
        return <ReplyItem key={item.r_code} data={data} item={item} />;
      });
  };

  return (
    <section className="reply">
      <ReplyBox />
    </section>
  );
};

export default ReplyList;
