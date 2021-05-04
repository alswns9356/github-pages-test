const express = require("express");
const router = express.Router();
const addBoard = require("../../public/models/addBoard");
const session = require("../session");

router.use(session);

// 게시글 작성
router.post("/write", (req, res, next) => {
  const { aContent } = req.body;
  const aUserid = req.session.user_id;
  console.log(req.body);

  const addBoardModel = new addBoard();

  addBoardModel.aUserid = aUserid;
  addBoardModel.aContent = aContent;

  addBoardModel
    .save()
    .then((newAddBoard) => {
      console.log("메뉴 추가 게시판 생성중");
      res.status(200).json({
        data: {
          addboard: newAddBoard,
        },
      });
    })
    .catch((e) => {
      res.status(500).json({
        message: e,
      });
    });
});

// 게시판 목록
router.get("/", (req, res, next) => {
  addBoard
    .find()
    .sort({"aNo":-1})
    .then((addboard) => {
      console.log("addBoard All");
      res.status(200).json({
        addboard: addboard,
      });
    })
    .catch((e) => {
      res.status(500).json({
        message: e,
      });
    });
});

// 게시글 자세히 보기
router.get("/:aNo", (req, res, next) => {
  const aNo = req.params.aNo;

  addBoard
    .find({ aNo: aNo })
    .then((addboard) => {
      console.log("addBoard Detail");
      res.status(200).json({
        addboard: addboard,
      });
    })
    .catch((e) => {
      res.status(500).json({
        message: e,
      });
    });
});

module.exports = router;
