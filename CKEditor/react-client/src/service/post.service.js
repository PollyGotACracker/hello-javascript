export const submitPost = async (data) => {
  // 본문에서 thumbnail 경로를 추출해 별도의 칼럼에 저장?
  const content = item?.b_content;
  let imgSrc = "";
  if (content) {
    const imgStartIdx = content.indexOf("![](");
    if (imgStartIdx > -1) {
      const imgLastIdx = item?.b_content.indexOf(")", imgStartIdx);
      imgSrc = item?.b_content.slice(imgStartIdx + 4, imgLastIdx);
    }
  }

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
    const response = await fetch("/all");
    const result = await response.json();
    return result;
  } catch (err) {
    return null;
  }
};
