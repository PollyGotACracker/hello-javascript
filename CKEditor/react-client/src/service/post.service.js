export const submitPost = async (data) => {
  // 본문에서 thumbnail 경로를 추출해 별도의 칼럼에 저장하는 방식은 좋지 않다...
  // const content = item?.b_content;
  // let imgSrc = "";
  // if (content) {
  //   const imgStartIdx = content.indexOf("![](");
  //   if (imgStartIdx > -1) {
  //     const imgLastIdx = item?.b_content.indexOf(")", imgStartIdx);
  //     imgSrc = item?.b_content.slice(imgStartIdx + 4, imgLastIdx);
  //   }
  // }

  const fetchOption = {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(data),
  };

  try {
    const response = await fetch("/post/insert", fetchOption);
    const result = await response.json();
    alert(result.MESSAGE);
  } catch (err) {
    return null;
  }
};

export const getMainPosts = async () => {
  try {
    const response = await fetch("/posts/get");
    const result = await response.json();
    return result;
  } catch (err) {
    return null;
  }
};

export const getCatPosts = async (catCode) => {
  try {
    const response = await fetch(`/cat/${catCode}/get`);
    const result = await response.json();
    return result;
  } catch (err) {
    return null;
  }
};

export const getDetailPost = async (bCode) => {
  try {
    const response = await fetch(`/post/${bCode}/get`);
    const result = await response.json();
    return result;
  } catch (err) {
    return null;
  }
};

export const deletePost = async (bCode) => {
  try {
    const response = await fetch(`/community/post/${bCode}/delete`);
    const result = await response.json();
    return result;
  } catch (err) {
    return null;
  }
};

export const upvotePost = async (bCode, username) => {
  try {
    const fetchOption = {
      method: "PATCH",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ b_code: bCode, username: username }),
    };
    const response = await fetch(`/post/upvote`, fetchOption);
    const result = await response.json();
    if (result.MESSAGE) {
      alert(result.MESSAGE);
      return null;
    } else {
      return result;
    }
  } catch (err) {
    return null;
  }
};

export const getReply = async (bCode) => {
  try {
    const response = await fetch(`/reply/${bCode}/get`);
    const result = await response.json();
    // replyList, replyCount
    return result;
  } catch (err) {
    return null;
  }
};

export const insertReply = async (data) => {
  try {
    const fetchOption = {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(data),
    };
    const response = await fetch(`/reply/insert`, fetchOption);
    const result = await response.json();
    if (result.MESSAGE) {
      alert(result.MESSAGE);
      return null;
    }
  } catch (err) {
    return null;
  }
  try {
    const result = await getReply(data.b_code);
    return result;
  } catch (err) {
    return null;
  }
};
