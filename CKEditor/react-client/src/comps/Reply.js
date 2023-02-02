import ReplyList from "./ReplyList";
import { useLayoutEffect } from "react";
import { getReply, insertReply } from "../service/post.service";
import { usePostContext } from "../context/PostContextProvider";

const Reply = ({ code, list, count }) => {
  const {
    replyData,
    setReplyData,
    initReply,
    replyList,
    setReplyList,
    replyCount,
    setReplyCount,
  } = usePostContext();

  useLayoutEffect(() => {
    (async () => {
      setReplyList([...list]);
      setReplyCount(count);
      setReplyData(initReply);
    })();
  }, []);

  /**
   * Reply 를 재사용 가능한 컴포넌트로...
   * 칼럼명을 포함한 데이터와 fetch 함수를 어떻게 해야 할까?
   */

  // 댓글 입력 데이터 갱신
  const onChangeHandler = (e) => {
    setReplyData({
      ...replyData,
      p_code: code,
      r_content: e.target.value,
    });
  };

  // 댓글 등록 버튼 클릭 시 fetch 및 reRendering
  const onClickReply = async () => {
    setReplyData(initReply);
    await insertReply(replyData);
    let data = await getReply(replyData.p_code);
    if (data) {
      setReplyList([...data.list]);
      setReplyCount(data.count);
      setReplyData(initReply);
    }
  };

  return (
    <section>
      <div>{`댓글 ${replyCount} 개`}</div>
      <div className="reply-input-box">
        <input value={replyData.r_content} onChange={onChangeHandler} />
        <button onClick={onClickReply}>등록</button>
      </div>

      <ReplyList data={replyList} />
    </section>
  );
};

export default Reply;
