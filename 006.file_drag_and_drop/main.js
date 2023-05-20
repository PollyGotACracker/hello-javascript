const input = document.querySelector("#input_file");
const label = document.querySelector("#drop_label");
const preview = document.querySelector("#preview");

let counter = 0;
let currentFiles = input?.files;

// 파일 중복 검사
const checkUnique = (fileList) => {
  // 현재 파일 리스트에서 lastModified(id 로 사용) 값을 배열로 저장
  const removeIds = [...currentFiles].map((file) => file.lastModified);
  const checkedFiles = fileList.filter((file) => {
    const isUnique = !removeIds.includes(file.lastModified);
    if (isUnique) return file;
  });

  if (checkedFiles.length === 0) {
    // input change 발생 시 무조건 최근 선택한 파일 리스트가 input 에 할당되는 문제 발생
    // 그래서 currentFiles 를 재할당했음
    input.files = currentFiles;
    return false;
  } else {
    return checkedFiles;
  }
};

// thumbnail 을 위한 node 생성
const createNode = (tag, attr, ...children) => {
  // fragment 또는 element 생성
  const node =
    tag === "fragment"
      ? document.createDocumentFragment()
      : document.createElement(tag);

  // 생성한 node 에 events 또는 attrs 적용
  Object.entries(attr).forEach(([key, value]) => {
    if (key === "events") {
      Object.entries(value).forEach(([type, listener]) => {
        node.addEventListener(type, listener);
      });
    } else if (key in node) {
      try {
        node[key] = value;
      } catch (err) {
        node.setAttribute(key, value);
      }
    } else {
      node.setAttribute(key, value);
    }
  });

  // 배열로 받은 나머지 인자를 각각 childNode로 추가
  children.forEach((childNode) => {
    if (typeof childNode === "string") {
      // node.appendChild(document.createTextNode(childNode));
      const div = document.createElement("DIV");
      div.textContent = childNode;
      node.appendChild(div);
    } else {
      node.appendChild(childNode);
    }
  });
  return node;
};

// 업로드 파일 리스트 업데이트
const updateFiles = ({ newFiles, isDeleted }) => {
  // newFiles:
  // isDelete 일 경우 삭제 파일을 제외한 파일 전체 리스트
  // 그 외에는 중복을 제외한 추가 파일들
  const files = !isDeleted ? [...currentFiles, ...newFiles] : [...newFiles];

  const dataTransfer = new DataTransfer();
  files.forEach((file) => {
    dataTransfer.items.add(file);
  });
  input.files = dataTransfer.files;
  currentFiles = dataTransfer.files;

  // preview 의 thumbnail 추가
  if (isDeleted) preview.innerHTML = "";
  [...newFiles].forEach((file) => {
    const reader = new FileReader();
    reader.addEventListener("load", (e) => {
      const img = createNode("img", {
        className: "embed-img",
        src: e.target?.result,
      });
      const imgContainer = createNode(
        "div",
        {
          className: "container-img",
          "data-id": file.lastModified,
          events: { click: deleteFile },
        },
        img,
        file.name
      );
      preview.append(imgContainer);
    });
    reader.readAsDataURL(file);
  });
};

const enterDrag = (e) => {
  e.preventDefault();
  counter++;
  console.log(`enterCounter ${counter}`);
  e.currentTarget.classList.add("active");
};

const leaveDrag = (e) => {
  e.preventDefault();
  counter--;
  console.log(`leaveCounter ${counter}`);
  if (counter === 0) {
    e.currentTarget.classList.remove("active");
  }
};

const dropFiles = (e) => {
  // 파일이 브라우저에서 열리는 동작 방지
  e.preventDefault();
  counter = 0;
  e.currentTarget.classList.remove("active");

  /**
   * fileList 를 array type 으로...
   * 1. Array.from(files)
   * 2. [...files]
   */
  // cf) dataTransfer: drag n drop 시 drag 한 데이터의 정보가 저장된 객체
  const dropFiles = [...e.dataTransfer?.files];
  if (dropFiles) {
    // drop 할 경우 input accept 가 적용되지 않으므로 별도 검사
    const fileList = [...dropFiles].filter((file) => /^image/.test(file.type));
    const newFiles = checkUnique(fileList);
    if (newFiles) updateFiles({ newFiles });
  }
};

const selectFiles = (e) => {
  const fileList = [...e.target.files];
  const newFiles = checkUnique(fileList);
  if (newFiles) updateFiles({ newFiles });
};

const deleteFile = (e) => {
  // label click 방지를 위해 추가
  e.preventDefault();
  const deleteId = e.currentTarget.dataset.id;
  const newFiles = [...currentFiles].filter((file) => {
    const isPreserved = file.lastModified !== Number(deleteId);
    if (isPreserved) return file;
  });
  updateFiles({ newFiles, isDeleted: true });
};

input.addEventListener("change", selectFiles);
label.addEventListener("dragenter", enterDrag);
label.addEventListener("dragleave", leaveDrag);
label.addEventListener("drop", dropFiles);
// !! dragover 가 없으면 drop 이 발생하지 않음 !!
label.addEventListener("dragover", (e) => {
  e.preventDefault();
});
