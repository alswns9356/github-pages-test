const express = require("express");
const router = express.Router();

const wBook = require("../../public/models/wBook");
const wBookReply = require("../../public/models/wBookReply");

const session = require("../session");

router.use(session);

// 양식 북

//북 메뉴 삽입 페이지
router.post("/write", (req, res, next) => {
    const { wBookTitle, wBookImg } = req.body;
    console.log(req.body);
  
    const wBookModel = new wBook();
  
    wBookModel.wBookTitle = wBookTitle;
    wBookModel.wBookImg = wBookImg;
  
    wBookModel
      .save()
      .then((newWBook) => {
        console.log("양식 북 생성");
        res.status(200).json({
          data: {
            wBook: newWBook,
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
    const wBookNo = req.params.wBookNo;
  
    cBook
      .aggregate([{$sample : {size : 1}}])
      .then((wBook) => {
        if (wBook == "")
          return res.status(404).json({ message: "Not Found wBook" });
        console.log("양식 북 결과창 보기");
  
        wBookReply.find({ wBookNo: wBookNo }).then((reply) => {
          console.log(reply);
          res.status(200).json({
            data: {
              wBook: wBook,
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