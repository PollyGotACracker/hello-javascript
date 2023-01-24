export const submitPost = async (data) => {
  const username = "polly";
  const fetchOption = {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ data, username }),
  };
  try {
    const response = await fetch("/post/insert", fetchOption);
    const result = await response.json();
    alert(result.MESSAGE);
  } catch (err) {
    return null;
  }
};
