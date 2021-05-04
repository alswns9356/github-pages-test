const express = require("express");
const router = express.Router();

const jBook = require("../../public/models/jBook");
const jBookReply = require("../../public/models/jBookReply");

const session = require("../session");

router.use(session);


// 일식 북

//북 메뉴 삽입 페이지
router.post("/write", (req, res, next) => {
    const { jBookTitle, jBookImg } = req.body;
    console.log(req.body);
  
    const jBookModel = new jBook();
  
    jBookModel.jBookTitle = jBookTitle;
    jBookModel.jBookImg = jBookImg;
  
    jBookModel
      .save()
      .then((newJBook) => {
        console.log("일식 북 생성");
        res.status(200).json({
          data: {
            jBook: newJBook,
          },
        });
      })
      .catch((err) => {
        res.status(500).json({
          message: err,
        });
      });
  });
  
  //북 메뉴 결정 페이지
  router.get("/", (req, res, next) => {
    const jBookNo = req.params.jBookNo;
  
    cBook
      .aggregate([{$sample : {size : 1}}])
      .then((jBook) => {
        if (jBook == "")
          return res.status(404).json({ message: "Not Found jBook" });
        console.log("일식 북 결과창 보기");
  
        jBookReply.find({ jBookNo: jBookNo }).then((reply) => {
          console.log(reply);
          res.status(200).json({
            data: {
              jBook: jBook,
              Reply: reply,
            },
          });
        });
      })
      .catch((err) => {
        res.status(500).json({
          err: err,
        });
      });
  });

  module.exports = router;