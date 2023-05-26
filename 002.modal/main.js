const btnBlue = document.querySelector("#btnBox .btn-blue");
const btnRed = document.querySelector("#btnBox .btn-red");
const birdBox = document.querySelector("#birdBox");
const boxs = document.querySelectorAll("#birdBox > div");
const modal = document.querySelector("#modal");
const btnClose = document.querySelector("#modal .modal-close");
const btnSearch = modal.querySelector(".modal-search");
const blurBox = document.querySelector("#blur");

const birdInfo = [
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

let currentNum, currentName;

const openModal = (e) => {
  const targetNum = e.currentTarget.dataset.num;
  modal.classList.add("open");
  blurBox.classList.add("active");
  showBirdInfo(targetNum);
};

const closeModal = () => {
  modal.classList.remove("open");
  blurBox.classList.remove("active");
};

const showBirdInfo = (dataNum) => {
  const [{ num, name }] = birdInfo.filter((bird) => bird.num === dataNum);
  currentNum = num;
  currentName = name;

  const img = modal.querySelector(".modal-img");
  const desc = modal.querySelector(".modal-desc");
  const btnSearch = modal.querySelector(".modal-search");

  img.src = `./images/bird${currentNum}.png`;
  desc.textContent = currentName;
  btnSearch.textContent = `Search ${currentName} on Google`;
};

birdInfo.forEach((bird) => {
  const div = document.createElement("DIV");
  div.className = "bird";
  div.dataset.num = bird.num;
  div.textContent = bird.name;
  let boxIdx;
  div.addEventListener("click", openModal);
  if (bird.group === "parrot") boxIdx = 0;
  if (bird.group === "nonparrot") boxIdx = 1;
  boxs[boxIdx].append(div);
});

btnBlue.addEventListener("click", () => {
  birdBox.classList.remove("active");
});
btnRed.addEventListener("click", () => {
  birdBox.classList.add("active");
});
btnClose.addEventListener("click", closeModal);
btnSearch.addEventListener("click", () => {
  window.open(`https://www.google.com/search?q=${currentName}`);
});
