import ReplyItem from "./ReplyItem";

const Reply = ({ data }) => {
  const ReplyList = () => {
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
      <ReplyList />
    </section>
  );
};

export default Reply;
