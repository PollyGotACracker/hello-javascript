(() => {
  const buttonContainer = document.querySelector(".button_container");
  const buttons = [
    { className: "show", text: "Show Data" },
    { className: "cancel", text: "Cancel" },
  ].map(({ className, text }) => {
    const element = document.createElement("BUTTON");
    Object.assign(element, {
      className,
      title: text,
      type: "button",
    });
    element.textContent = text;
    return element;
  });

  buttonContainer.append(...buttons);
})();

const fetchBtn = document.querySelector("button.show");
const cancelBtn = document.querySelector("button.cancel");

const controller = new AbortController();

// 현재 fetch delay 는 5초이므로,
// 테스트 시 5000 미만으로 설정할 것

// const timeoutId = setTimeout(() => {
//   controller.abort();
// }, 10_000);
const timeoutSignal = AbortSignal.timeout(10_000);

// 사용자가 취소 버튼을 클릭하거나 일정 시간이 지나면 중단
const combinedSignal = AbortSignal.any([controller.signal, timeoutSignal]);

const fetchMyData = async () => {
  const tryFetch = async (retries) => {
    try {
      const response = await fetch("https://httpbin.org/delay/5", {
        headers: { "Content-Type": "application/json" },
        signal: combinedSignal,
      });
      if (response.ok) {
        // clearTimeout(timeoutId);
        return response.json();
      }
    } catch (err) {
      if (err.name === "AbortError") {
        console.error("Fetch canceled:", err);
        throw err;
      }
      if (retries === 1 || retries < 1) {
        console.error("Unknown error occurred when fetching:", err);
        throw err;
      }
      return await tryFetch(retries - 1);
    }
  };
  return await tryFetch(5);
};

fetchBtn.addEventListener("click", async () => {
  console.info("Fetch started...");
  const data = await fetchMyData();
  if (data) console.log(data);
});
cancelBtn.addEventListener("click", () => controller.abort());
