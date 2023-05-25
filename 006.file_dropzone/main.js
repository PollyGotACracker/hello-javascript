const input = document.querySelector("#inputFile");
const label = document.querySelector("#labelDrop");
const preview = document.querySelector("#preview");

let counter = 0;
let currentFiles = input?.files;

// 파일 중복 검사
const checkUnique = (fileList) => {
  // 현재 파일 리스트에서 lastModified(id 로 사용) 값을 배열로 저장
  const removeIds = [...currentFiles].map((file) => file.lastModified);
  const checkedFiles = fileList.filter(
    (file) => !removeIds.includes(file.lastModified)
  );

  if (checkedFiles.length === 0) {
    // input change 발생 시 무조건 최근 선택한 파일 리스트가 input 에 할당되는 문제 발생
    // 그래서 currentFiles 를 재할당하여 변경되지 않도록 함
    input.files = currentFiles;
    return false;
  } else {
    return checkedFiles;
  }
};

const resizeThumb = (src, type) => {
  // const animatedImgs = ["image/gif", "image/webp", "image/apng", "image/avif"];
  // if (animatedImgs.includes(type)) return src;
  const SCALE = 0.5;
  const _img = new Image();
  _img.src = src;

  const canvas = document.createElement("canvas");
  const canvasContext = canvas.getContext("2d");

  canvas.width = _img.width * SCALE;
  canvas.height = _img.height * SCALE;
  canvasContext.drawImage(_img, 0, 0, canvas.width, canvas.height);
  // const dataUrl = canvas.toDataURL(`${type}`);
  const dataUrl = canvas.toDataURL(`image/jpeg`);

  return dataUrl;
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

// preview 의 thumbnail 추가 또는 삭제
const updateThumbs = ({ newFiles, deleteId }) => {
  if (deleteId) {
    [...preview.children].forEach((thumb) => {
      if (thumb.dataset.id === deleteId) thumb.remove();
    });
    return false;
  }

  [...newFiles].forEach((file) => {
    const reader = new FileReader();
    reader.addEventListener("load", (e) => {
      const _dataUrl = resizeThumb(e.target?.result, file.type);
      const img = createNode("img", {
        className: "embed-img",
        src: _dataUrl,
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

// 업로드 파일 리스트 업데이트
const updateFiles = (fileList) => {
  const files = [...fileList];

  const dataTransfer = new DataTransfer();
  files.forEach((file) => {
    dataTransfer.items.add(file);
  });
  input.files = dataTransfer.files;
  currentFiles = dataTransfer.files;
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
    const _fileList = [...dropFiles].filter((file) => /^image/.test(file.type));
    const newFiles = checkUnique(_fileList);
    if (newFiles) {
      const fileList = [...currentFiles, ...newFiles];
      updateFiles(fileList);
      updateThumbs({ newFiles });
    }
  }
};

const selectFiles = (e) => {
  const _fileList = [...e.target.files];
  const newFiles = checkUnique(_fileList);
  if (newFiles) {
    const fileList = [...currentFiles, ...newFiles];
    updateFiles(fileList);
    updateThumbs({ newFiles });
  }
};

const deleteFile = (e) => {
  // label click 방지를 위해 추가
  e.preventDefault();

  const deleteId = e.currentTarget.dataset.id;

  const newFiles = [...currentFiles].filter((file) => {
    const isPreserved = file.lastModified !== Number(deleteId);
    if (isPreserved) return file;
  });
  updateFiles(newFiles);
  updateThumbs({ newFiles, deleteId });
};

input.addEventListener("change", selectFiles);
label.addEventListener("dragenter", enterDrag);
label.addEventListener("dragleave", leaveDrag);
label.addEventListener("drop", dropFiles);
// !! dragover 가 없으면 drop 이 발생하지 않음 !!
label.addEventListener("dragover", (e) => {
  e.preventDefault();
});
