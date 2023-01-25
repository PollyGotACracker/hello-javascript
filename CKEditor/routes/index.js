import express from "express";
import fileUp from "../modules/file_upload.js";
import DB from "../models/index.js";
import fs from "fs";
import path from "path";
import { v4 } from "uuid";

const BOARD = DB.models.board_content;
const ATTACH = DB.models.attach;

const router = express.Router();

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

router.post("/post/insert", async (req, res, next) => {
  const data = req.body;
  try {
    await BOARD.create(data);

    return res.send({ MESSAGE: "POST INSERT" });
  } catch (err) {
    console.error(err);
  }
});

export default router;
