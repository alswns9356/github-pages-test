const express = require("express");
const router = express.Router();

const kBook = require("../../public/models/kBook");
const kBookReply = require("../../public/models/kBookReply");
const session = require("../session");

router.use(session);


// 한식 북

//북 메뉴 삽입 페이지
router.post("/write", (req, res, next) => {
    const { kBookTitle, kBookImg } = req.body;
    console.log(req.body);
  
    const kBookModel = new kBook();
  
    kBookModel.kBookTitle = kBookTitle;
    kBookModel.kBookImg = kBookImg;
  
    kBookModel
      .save()
      .then((newKBook) => {
        console.log("한식 북 생성");
        res.status(200).json({
          data: {
            kBook: newKBook,
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
    const kBookNo = req.params.kBookNo;
  
    cBook
      .aggregate([{$sample : {size : 1}}])
      .then((kBook) => {
        if (kBook == "")
          return res.status(404).json({ message: "Not Found kBook" });
        console.log("한식 북 결과창 보기");
  
        kBookReply.find({ kBookNo: kBookNo }).then((reply) => {
          console.log(reply);
          res.status(200).json({
            data: {
              kBook: kBook,
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