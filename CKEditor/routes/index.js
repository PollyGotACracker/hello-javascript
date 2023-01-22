import express from "express";
import fileUp from "../modules/file_upload.js";
import DB from "../models/index.js";
import fs from "fs";
import path from "path";

const BOARD = DB.models.board_content;
const ATTACH = DB.models.attach;

const router = express.Router();

/* GET home page. */
router.post("/upload", async (req, res, next) => {
  console.log(req.body);
});

export default router;
