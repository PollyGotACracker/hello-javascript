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
// fileUp.array("...") : formData 객체에 file 을 append 했던 key 값으로 지정
// (key=value 로 저장되므로 input tag 의 name 과 동일한 역할)
router.post("/upload", fileUp.array("upload"), async (req, res, next) => {
  console.log("files", req.files);
  // 게시글 uuid
  console.log("code", req.body.bcode);

  try {
    const files = req.files;
    const bcode = req.body.bcode;

    const uploadFile = (file, bcode) => {
      const uploadFileInfo = {
        a_code: v4(),
        b_code: bcode,
        a_original_name: file.originalname,
        a_save_name: file.filename,
        a_ext: file.mimetype,
      };
      return uploadFileInfo;
    };
    const filesData = files.map((file) => {
      return uploadFile(file, bcode);
    });
    await ATTACH.bulkCreate(filesData);

    return res.send({
      MESSAGE: "IMAGE UPLOADED",
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
