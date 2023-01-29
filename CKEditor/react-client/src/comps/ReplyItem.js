import { useState, useRef } from "react";

const ReplyItem = ({ data, item }) => {
  const itemRef = useRef(null);
  const [inputData, setInputData] = useState();

  const ShowChildReply = () => {
    itemRef.current.style.display = "flex";
  };

  return (
    <li>
      <div>{`${item.r_date} ${item.r_time}`}</div>
      <img alt="프로필 이미지" />
      <span>{item.username}</span>
      <div>{item.r_content || "삭제된 댓글입니다."}</div>
      <button>수정</button>
      <button>삭제</button>
      {item.r_content && (
        <>
          <button onClick={ShowChildReply}>
            {item.r_count ? `${item.r_count} 개의 댓글` : "댓글 입력"}
          </button>
          {item.r_parent_code === item.r_code ? (
            <ReplyItem ref={itemRef} item={item} style={{ display: "none" }} />
          ) : null}
          <div className="reply-input-box">
            <input />
            <button>게시</button>
          </div>
        </>
      )}
    </li>
  );
};

export default ReplyItem;
