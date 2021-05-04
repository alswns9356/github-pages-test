const express = require("express");
const router = express.Router();

const cBook = require("../../public/models/cBook");
const cBookReply = require("../../public/models/cBookReply");

const session = require("../session");

router.use(session);

// 중식 북

//북 메뉴 삽입 페이지
router.post("/write", (req, res, next) => {
    const { cBookTitle, cBookImg } = req.body;
    console.log(req.body);
  
    const cBookModel = new cBook();
  
    cBookModel.cBookTitle = cBookTitle;
    cBookModel.cBookImg = cBookImg;
  
    cBookModel
      .save()
      .then((newCBook) => {
        console.log("중식 북 생성");
        res.status(200).json({
          data: {
            cBook: newCBook,
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
  router.get('/', (req,res,next)=>{
    // const cBookNo = req.params.cBookNo;
    const cBookNo=req.body.cBookmNo
    console.log("cBookNo",cBookNo)
  
    cBook
      // .find({cBookNo:cBookNo})
      .aggregate([{$sample : {size : 1}}])
      .then((cBook)=>{
        if(cBook == "")
          return res.status(404).json({message:"Not Found cBook"});
          console.log("중식 북 결과창 보기");
            res.status(200).json({
              data: {
                cBook: cBook,
              },
          });
      })
      .catch((err)=>{
        res.status(500).json({
          err: err,
        });
      });
  });
  //중식 북 댓글 get

  router.get('/:cBookmNo', (req,res,next)=>{
    const cBookmNo = req.params.cBookmNo;
    console.log('댓글 들어옴')
    console.log("cBookmNo",cBookmNo);
  
    cBookReply
      .find({cBookmNo:cBookmNo})
      .sort({cBookReNo:'-1'})
      .limit(5)
      .then((cBookReply)=>{
        if(cBookReply == "")
          return res.status(404).json({message:"Not Found cBookReply"});
          console.log("중식 북 댓글창 보기");
          console.log('댓글창 보기 cbookmno==>',cBookmNo);
            res.status(200).json({
              data: {
                cBookReply : cBookReply,
              },
          });
      })
      .catch((err)=>{
        res.status(500).json({
          err: err,
        });
      });
  });
  
  //중식 북 댓글 write
  router.post("/cBookReply/write", (req, res, next) => {
  
    // const cBookNo = req.params.cBookNo;
    const { cBookReComment,cBookmNo } = req.body;
    const cBookReUserid = req.session.user_id;
    console.log('cBookNo',cBookmNo);
  
    const cBookReplyModel = new cBookReply();
    
    cBookReplyModel.cBookmNo = cBookmNo;
    cBookReplyModel.cBookReComment = cBookReComment;
    cBookReplyModel.cBookReUserid = cBookReUserid;
    console.log('cBookNo',cBookmNo);
    console.log("cBookReplyModel",cBookReplyModel)
    cBookReplyModel
      .save()
      .then((newcBookReply) => {
        console.log("중식 댓글 write");
        res.status(200).json({
          data: {
            cBookReply: newcBookReply,
          },
        });
      })
      .catch((err) => {
        res.status(500).json({
          message: err,
        });
      });
  });

  module.exports = router;