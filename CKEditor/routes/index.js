import express from "express";
import fileUp from "../modules/file_upload.js";
import DB from "../models/index.js";
import fs from "fs";
import path from "path";
import { v4 } from "uuid";

const BOARD = DB.models.board_content;
const ATTACH = DB.models.attach;
const UPVOTE = DB.models.upvote;
const REPLY = DB.models.reply;

const router = express.Router();

const catList = [
  {
    group: "C1",
    eng: "general",
    kor: "일반",
    sub: [
      { eng: "notice", kor: "공지", group: "C1", category: "C11" },
      { eng: "free", kor: "자유게시판", group: "C1", category: "C12" },
    ],
  },
  {
    group: "C2",
    eng: "hobbies",
    kor: "취미",
    sub: [
      { eng: "animals", kor: "동물", group: "C2", category: "C21" },
      { eng: "plants", kor: "식물", group: "C2", category: "C22" },
    ],
  },
  {
    group: "C3",
    eng: "learning",
    kor: "학습",
    sub: [
      { eng: "programming", kor: "프로그래밍", group: "C3", category: "C31" },
      { eng: "modeling", kor: "모델링", group: "C3", category: "C32" },
    ],
  },
  {
    group: "C4",
    eng: "lifestyle",
    kor: "생활",
    sub: [
      { eng: "health", kor: "건강", group: "C4", category: "C41" },
      { eng: "fashion", kor: "패션", group: "C4", category: "C42" },
    ],
  },
  {
    group: "C5",
    eng: "issue",
    kor: "이슈",
    sub: [
      { eng: "politics", kor: "정치", group: "C5", category: "C51" },
      { eng: "entertainment", kor: "연예", group: "C5", category: "C52" },
    ],
  },
];

// community Main fetch
router.get("/posts/get", async (req, res) => {
  try {
    // 데이터를 객체에 담을 때
    // let data = {};
    // for (let prop in catList) {
    //   data[`${prop}`] = await BOARD.findAll({
    //     where: { b_group: `${prop}` },
    //     limit: 5,
    //     subQuery: false,
    //     order: [["b_upvote", "DESC"]],
    //     raw: true,
    //   });
    // }

    // BOARD-ATTACH 관계 설정할 경우 에디터에 이미지를 등록할 때
    // 게시글보다 첨부파일이 먼저 등록되므로 INSERT 되지 않는 문제 발생
    let data = [];
    for (let cat of catList) {
      let items = {};
      items.code = `${cat.group}`;
      items.name = `${cat.kor}`;
      items.posts = await BOARD.findAll({
        where: { [Op.and]: [{ b_group: `${cat.group}` }, { b_deleted: null }] },
        limit: 5,
        subQuery: false,
        order: [
          ["b_upvote", "DESC"],
          ["b_date", "DESC"],
        ],
        raw: true,
      });
      data.push(items);
    }

    return res.status(200).send({ catList, data });
  } catch (err) {
    console.error(err);
  }
});

// community category fetch
router.get("/cat/:catCode/get", async (req, res) => {
  const cat = req.params.catCode;
  try {
    const data = await BOARD.findAll({
      attributes: [
        "b_code",
        "b_title",
        "b_replies",
        "username",
        "b_date",
        "b_time",
        "b_views",
        "b_upvote",
      ],
      where: { [Op.and]: [{ b_category: cat }, { b_deleted: null }] },
      order: [["b_date", "DESC"]],
    });
    return res.status(200).send(data);
  } catch (err) {
    console.error(err);
  }
});

// community Detail fetch
router.get("/post/:bCode/get", async (req, res) => {
  try {
    const bCode = req.params?.bCode;
    const postData = await BOARD.findByPk(bCode);
    const result = await postData.increment("b_views", { by: 1 });
    console.log(result);
    return res.status(200).send(result);
  } catch (err) {
    console.error(err);
  }
});

// editor 에 이미지 업로드
// fileUp.single("...") : formData 객체에 file 을 append 했던 key 값으로 지정
// (key=value 로 저장되므로 input tag 의 name 과 동일한 역할)
// 파일을 여러 개 선택하더라도 별도로 요청하므로 single 로 받을 것
router.post("/upload", fileUp.single("upload"), async (req, res, next) => {
  console.log("file", req.file);
  // 게시글 uuid
  console.log("code", req.body.bcode);

  try {
    const file = req.file;
    const bcode = req.body.bcode;
    const uploadFileInfo = {
      a_code: v4(),
      b_code: bcode,
      a_original_name: file.originalname,
      a_save_name: file.filename,
      a_ext: file.mimetype,
    };
    await ATTACH.create(uploadFileInfo);

    return res.json({
      uploaded: true,
      url: uploadFileInfo.a_save_name,
    });
  } catch (err) {
    console.error(err);
  }
});

router.post("/post/insert", async (req, res) => {
  const data = req.body;
  try {
    await BOARD.create(data);

    return res.send({ MESSAGE: "POST INSERT" });
  } catch (err) {
    console.error(err);
  }
});

router.get("/post/:bCode/delete", async (req, res, next) => {
  const bCode = req.params.bCode;
  try {
    await BOARD.update({ b_deleted: "" }, { where: { b_code: bCode } });
    // 첨부파일, 댓글

    return res.send({ MESSAGE: "게시글이 삭제되었습니다." });
  } catch (err) {
    console.error(err);
  }
});

router.patch("/post/upvote", async (req, res, next) => {
  const data = req.body;
  try {
    await UPVOTE.create(data);
  } catch (err) {
    console.error(err);
    return res.send({ MESSAGE: "이미 추천한 게시글입니다." });
  }
  try {
    const result = await BOARD.update(
      { b_upvote: sequelize.literal("b_upvote + 1") },
      { where: { b_code: req.body.b_code } }
    );
    return res.send(result);
  } catch (err) {
    console.error(err);
  }
});

router.get("/reply/:bCode/get", async (req, res) => {
  const bCode = req.params.bCode;
  try {
    // 게시글의 모든 댓글
    const replyList = await REPLY.findAll({
      where: { [Op.and]: [{ b_code: bCode }, { r_deleted: null }] },
      order: [
        ["r_date", "DESC"],
        ["r_time", "DESC"],
      ],
    });
    // 게시글의 최상위 댓글 수
    const replyCount = await BOARD.findOne({
      attributes: ["b_replies"],
      where: { b_code: bCode },
    });

    return res.send({ replyList, replyCount });
  } catch (err) {
    console.error(err);
  }
});

router.post("/reply/insert", async (req, res) => {
  const data = req.body;
  try {
    const result = await REPLY.create(data);
    // r_parent_code 가 null 일 경우(최상위 댓글일 경우)
    if (!data.r_parent_code) {
      await BOARD.update(
        { b_replies: sequelize.literal("b_replies + 1") },
        { where: { b_code: req.body.b_code } }
      );
    }

    return res.send(result);
  } catch (err) {
    console.error(err);
    return res.send({ MESSAGE: "댓글 게시 중 오류가 발생했습니다." });
  }
});

export default router;
