document.addEventListener("DOMContentLoaded", () => {
  const yearName = document.querySelector("h2.year_name");
  const monthName = document.querySelector("h1.month_name");
  const trs = document.querySelectorAll("table.schedule tbody tr");

  const time = new Date();
  const year = time.getFullYear();
  const month = time.getMonth() + 1;
  const day = time.getDay();
  // 이번 달 마지막 일 = 총 일수
  const lastdate = new Date(year, month, 0).getDate();
  // 이번 달 첫 요일 = 이번 달 첫 주에서 저번 달 날짜를 뺀 수(0부터 일요일)
  const lastmonthdate = new Date(year, month - 1, 0).getDay() + 1;
  // 이번 달 날짜 전부 monthDate배열에 push

  yearName.textContent = `${year}년`;
  monthName.textContent = `${month}월`;

  let dateIndex = 1;
  for (let j = 0; j < 5; j++) {
    let tds = trs[j].querySelectorAll("td");
    for (let k = 0; k < 7; k++) {
      let td = tds[k];
      let dateTxt = document.createElement("div");
      td.appendChild(dateTxt);
      if (j === 0 && k < lastmonthdate) {
        dateTxt.textContent = "";
      } else if (dateIndex <= lastdate) {
        dateTxt.textContent = dateIndex;
        dateIndex++;
      }
    }
  }
  // 왜 dateIndex가 다시 1로 초기화되면서 두 번 반복되는지?
});
