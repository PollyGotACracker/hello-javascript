const container = document.querySelector("#container");
const pagination = document.querySelector("#pagination");
const prev = document.querySelector(".btn-prev");
const next = document.querySelector(".btn-next");
const first = document.querySelector(".btn-first");
const last = document.querySelector(".btn-last");

const DATA_COUNT = 2048;
let dataSize = 20;
let pageSize = 10;
let dataOffset = 0;
let pageOffset = 1;

// pageCurrent: 버튼을 클릭했을 때 서버로 전송되는 현재 페이지 번호
let pageCurrent = 1;
let pageTotal = Math.ceil(DATA_COUNT / dataSize);
let pageLastOffset = pageTotal - (pageTotal % pageSize) + 1;

const genData = () => {
  const _arr = [...new Array(DATA_COUNT).keys()];
  const birdData = [
    { num: "01", name: "Macaw", group: "parrot" },
    { num: "02", name: "Cockatoo", group: "parrot" },
    { num: "03", name: "African Grey Parrot", group: "parrot" },
    { num: "04", name: "Kakapo", group: "parrot" },
    { num: "05", name: "Rose-ringed Parakeet", group: "parrot" },
    { num: "06", name: "Cockatiel", group: "parrot" },
    { num: "07", name: "Lovebird", group: "parrot" },
    { num: "08", name: "Budgerigar", group: "parrot" },
    { num: "09", name: "Feather Duster Budgerigar", group: "parrot" },
    { num: "10", name: "Parrotlet", group: "parrot" },
    { num: "11", name: "Bateleur", group: "nonparrot" },
    { num: "12", name: "Barn Owl", group: "nonparrot" },
    { num: "13", name: "Quetzal", group: "nonparrot" },
    { num: "14", name: "Toucan", group: "nonparrot" },
    { num: "15", name: "Mandarin Duck", group: "nonparrot" },
    { num: "16", name: "Booby", group: "nonparrot" },
    { num: "17", name: "Western Parotia", group: "nonparrot" },
    { num: "18", name: "Hoopoe", group: "nonparrot" },
    { num: "19", name: "Hill Myna", group: "nonparrot" },
    { num: "20", name: "Java Sparrow", group: "nonparrot" },
  ];

  const dateData = _arr
    .map((_) => {
      const startDateValue = new Date(2000, 0, 1).getTime();
      const endDateValue = new Date().getTime();
      const randomDate = new Date(
        Math.random() * (endDateValue - startDateValue) + startDateValue
      );
      const year = Number(randomDate.getFullYear());
      const month = Number(randomDate.getMonth() + 1);
      const date = Number(randomDate.getDate());

      return [month, date, year];
    })
    .sort((previous, current) => {
      let [monthP, dateP, yearP] = previous;
      let [monthC, dateC, yearC] = current;

      if (yearC > yearP) return 1;
      if (yearC < yearP) return -1;
      if (monthC > monthP) return 1;
      if (monthC < monthP) return -1;
      if (dateC > dateP) return 1;
      if (dateC < dateP) return -1;
      return 0;
    });

  return _arr.map((_, idx) => {
    const randIdx = Math.floor(Math.random() * birdData.length);
    const { num, name } = birdData[randIdx];
    const [month, date, year] = dateData[idx];

    return {
      index: idx + 1,
      title: `${name} is a beautiful bird!`,
      date: `${month}. ${date}. ${year}`,
      avatar: `./images/bird${num}.png`,
      nickname: name,
    };
  });
};
const DATA = genData();

const activeBtnPages = (e) => {
  const pageClicked = Number(e?.currentTarget.textContent);
  const allBtns = [...document.querySelector("#pagination").children];
  allBtns.forEach((btn) => {
    btn.classList.remove("active");
  });
  if (pageClicked) {
    e?.currentTarget.classList.add("active");
    pageCurrent = pageClicked;
  }
  if (!pageClicked) {
    allBtns.forEach((btn) => {
      if (Number(btn.textContent) === pageCurrent) {
        btn.classList.add("active");
      }
    });
  }

  first.disabled = pageCurrent === 1 ? true : false;
  prev.disabled = pageCurrent < pageSize + 1 ? true : false;
  next.disabled = pageCurrent >= pageLastOffset ? true : false;
  last.disabled = pageCurrent === pageTotal ? true : false;
};

const clickPageBtn = (e) => {
  changeBtnPages(e);
  activeBtnPages(e);
  dataOffset = (Number(e?.currentTarget.textContent) - 1) * dataSize;
  showData();
  window.scrollTo(0, 0);
};

const changeBtnPages = (e) => {
  const pageClicked = Number(e?.currentTarget.textContent);
  // const addNum = pageClicked - pageCurrent;
  // const absAddNum = Math.abs(addNum);
  // allBtns[i].remove();

  const allBtns = [...document.querySelector("#pagination").children];

  if (!pageClicked) {
    let textNum = pageOffset;
    let pageCount = pageSize - 1;
    if (pageOffset === pageLastOffset) {
      textNum = pageLastOffset;
      pageCount = (pageTotal % pageSize) - 1;
    }

    allBtns.forEach((btn, idx) => {
      if (idx > pageCount) {
        btn.textContent = "";
        btn.style.visibility = "hidden";
        return false;
      }
      btn.textContent = textNum;
      btn.style.visibility = "visible";
      textNum++;
    });
  }
};

const genBtnPages = () => {
  let i = pageCurrent;

  while (i < pageSize + 1) {
    const btn = document.createElement("BUTTON");
    btn.className = "btn-page";
    btn.textContent = i;
    btn.addEventListener("click", clickPageBtn);
    pagination.append(btn);
    i++;
  }
};

const genNode = (obj, imgKey) => {
  const _nodes = {};

  for (const key in obj) {
    const node = document.createElement("DIV");
    if (key !== imgKey) node.textContent = obj[key];
    node.className = key;
    _nodes[key] = node;
  }

  const img = document.createElement("IMG");
  img.src = obj[imgKey];
  _nodes[imgKey].append(img);

  const result = Object.values(_nodes);
  return result;
};

const showData = () => {
  container.innerHTML = "";

  const sliced = DATA.slice(dataOffset, dataSize * pageCurrent);
  const data = sliced.map((ele) => {
    const item = document.createElement("DIV");
    item.className = "item";
    const nodes = genNode(ele, "avatar");
    item.append(...nodes);
    return item;
  });

  container.append(...data);
};

genBtnPages();
activeBtnPages();
showData();

prev.addEventListener("click", () => {
  if (pageCurrent > pageSize) {
    pageOffset = pageOffset - pageSize;
    pageCurrent = pageOffset + pageSize - 1;
    dataOffset = (pageCurrent - 1) * dataSize;
    console.log(pageCurrent, pageOffset);
    changeBtnPages();
    activeBtnPages();
    showData();
    window.scrollTo(0, 0);
  }
});

next.addEventListener("click", () => {
  if (pageCurrent < pageLastOffset) {
    pageOffset = pageOffset + pageSize;
    pageCurrent = pageOffset;
    dataOffset = (pageCurrent - 1) * dataSize;
    console.log(pageCurrent, pageOffset);
    changeBtnPages();
    activeBtnPages();
    showData();
    window.scrollTo(0, 0);
  }
});

first.addEventListener("click", () => {
  pageOffset = 1;
  pageCurrent = 1;
  dataOffset = 0;
  console.log(pageCurrent, pageOffset);
  changeBtnPages();
  activeBtnPages();
  showData();
  window.scrollTo(0, 0);
});

last.addEventListener("click", () => {
  pageOffset = pageLastOffset;
  pageCurrent = pageTotal;
  dataOffset = (pageCurrent - 1) * dataSize;
  console.log(pageCurrent, pageOffset);
  changeBtnPages();
  activeBtnPages();
  showData();
  window.scrollTo(0, 0);
});
