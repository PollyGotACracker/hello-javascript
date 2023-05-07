document.addEventListener("DOMContentLoaded", () => {
  const count = 200;
  const body = document.body;
  let i = 0;

  while (i < count) {
    const star = document.createElement("DIV");
    star.className = "star";
    const x = Math.floor(Math.random() * window.innerWidth);
    const y = Math.floor(Math.random() * window.innerHeight);
    const size = Math.random() * 4 + 1;
    const duration = Math.random() * 5;
    /**
     * cf)
     * DOM style Object
     * Object.assign 을 이용하여 대상 객체의 동일 키를 갖는 속성에 값을 덮어쓸 수 있다.
     * Object.assign(target, ...sources)
     * */
    Object.assign(star.style, {
      width: size + "px",
      height: size + "px",
      top: y + "px",
      left: x + "px",
      animationDuration: duration + 5 + "s",
      animationDelay: duration + "s",
    });
    body.appendChild(star);
    i++;
  }
});
