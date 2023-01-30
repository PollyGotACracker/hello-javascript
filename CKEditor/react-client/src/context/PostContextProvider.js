import { createContext, useContext, useState } from "react";
import { v4 } from "uuid";

const PostContext = createContext();

export const usePostContext = () => {
  return useContext(PostContext);
};

export const PostContextProvider = ({ children }) => {
  const initPost = () => {
    const postData = {
      p_code: v4(),
      username: "polly@gmail.com",
      p_title: "",
      p_content: "",
      b_code: "C21",
      b_group_code: "C2",
    };
    return postData;
  };

  const initReply = () => {
    const replyData = {
      r_code: v4(),
      p_code: "",
      // session
      username: "polly@gmail.com",
      r_content: "",
      r_parent_code: null,
    };
    return replyData;
  };

  const [postData, setPostData] = useState(initPost);

  const [replyData, setReplyData] = useState(initReply);

  const props = {
    initPost,
    postData,
    setPostData,
    initReply,
    replyData,
    setReplyData,
  };

  return <PostContext.Provider value={props}>{children}</PostContext.Provider>;
};
