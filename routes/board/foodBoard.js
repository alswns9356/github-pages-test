const express = require("express");
const router = express.Router();
const foodBoard = require("../../public/models/foodBoard");
const foodBoardReply = require("../../public/models/foodBoardReply");
const foodBoardLike = require("../../public/models/foodBoardLike");
const session = require("../session");

router.use(session);
// 게시판 생성
router.post("/write", (req, res, next) => {
  const { foTitle, foContent } = req.body;
  const foUserid = req.session.user_id;
  console.log(foUserid);

  const foodBoardModel = new foodBoard();

  foodBoardModel.foTitle = foTitle;
  foodBoardModel.foUserid = foUserid;
  foodBoardModel.foContent = foContent;

  foodBoardModel
    .save()
    .then((newFoodBoard) => {
      console.log("foodBoard 생성 중");
      res.status(200).json({
        data: {
          foodboard: newFoodBoard,
        },
      });
    })
    .catch((e) => {
      res.status(500).json({
        message: e,
      });
    });
});

// 게시판 목록 보기
router.get("/", (req, res, next) => {
  foodBoard
    .find()
    .then((foodboard) => {
      console.log("foodboard 게시판 목록보기");
      res.status(200).json({
        foodboard: foodboard,
      });
    })
    .catch((e) => {
      res.status(500).json({
        message: e,
      });
    });
});

// 게시판 자세히 보기
router.get("/:foNo", (req, res, next) => {
  const foNo = req.params.foNo;

  foodBoard
    .find({ foNo: foNo })
    .then((foodboard) => {
      if (foodboard == "")
        return res.status(404).json({ message: "Not Found foodBoard" });
      console.log("맛집 인증 게시판 자세히 보기");
      foodboard[0].foView += 1;
      foodboard[0].save();

      foodBoardReply.find({ foBoardNo: foNo }).then((reply) => {
        console.log(reply);
        res.status(200).json({
          data: {
            foodBoard: foodboard,
            Reply: reply,
          },
        });
      });
    })
    .catch((e) => {
      res.status(500).json({
        err: e,
      });
    });
});

// 게시글 업데이트
router.put("/update/:foNo", async (req, res, next) => {
  const foNo = req.params.foNo;
  const { foTitle, foUserid, foContent } = req.body;

  try {
    const foBoard = await foodBoard.find({ foNo: foNo });

    console.log(foBoard);

    if (!foBoard) {
      return res.status(404).json({
        message: "FoodBoard Not Found",
      });
    }

    const updatefoboard = await foodBoard.find({ fNo: fno });
    // console.log('fboard[0].fUserid',fboard[0].fUserid);
    console.log(
      "req.session.user_id",
      updatefoboard[0].foUserid == req.session.user_id
    );
    if (updatefoboard[0].foUserid != req.session.user_id) {
      return res.status(500).json({
        message: "해당 사용자가 아닙니다.",
      });
    }

    foBoard[0].foTitle = foTitle;
    foBoard[0].foUserid = foUserid;
    foBoard[0].foContent = foContent;

    const output = await foBoard[0].save();

    console.log("Update Complete");

    res.status(200).json({
      data: {
        post: output,
      },
    });
  } catch (e) {
    res.status(500).json({
      message: e,
    });
  }
});

// 게시글 삭제
router.delete("/del/:foNo",async (req, res, next) => {
  const foNo = req.params.foNo;

  try {
    const delfoboard = await foodBoard.find({ foNo: foNo });
    // console.log("delfboard", delfoboard[0].fUserid != req.session.user_id);
    if (delfoboard[0].foUserid != req.session.user_id) {
      return res.status(500).json({
        message: "해당 사용자가 아닙니다.",
      });
    } else {
      //   해당 게시글 삭제
      foodBoard.deleteOne({ foNo: foNo }).then((output) => {
        console.log("맛집 게시판 삭제 완료");
        // 해당 게시글 댓글 삭제
        foodBoardReply.deleteMany({ foBoardNo: foNo }).then((output) => {
          console.log("해당 게시글 댓글 삭제 완료");
          // 해당 게시글 좋아요 삭제
          foodBoardLike.deleteMany({ foNo: foNo }).then((output) => {
            console.log("해당 게시글 댓글 삭제 완료");
            res.status(200).json({
              message: "Delete Complete",
            });
          });
        });
      });
    }
  } catch (err) {
    res.status(500).json({
      message: err,
    });
  }
});

// 댓글 작성
router.post("/foReply/write/:foNo", (req, res, next) => {
  const foBoardNo = req.params.foNo;
  const { foReComment } = req.body;
  const foReUserid = req.session.user_id;

  
  const foReplyModel = new foodBoardReply();


  foReplyModel.foBoardNo = foBoardNo;
  foReplyModel.foReUserid = foReUserid;
  foReplyModel.foReComment = foReComment;

  foReplyModel
    .save()
    .then((newReply) => {
      console.log("댓글 생성중");
      res.status(200).json({
        data: {
          reply: newReply,
        },
      });
    })
    .catch((e) => {
      res.status(500).json({
        message: e,
      });
    });
});

// 댓글 삭제
// 해당 게시글의 작성자와 댓글 작성한 사람만 삭제할 수 있게 구성해야할듯..
router.delete("/foReply/del/:foNo", (req, res, next) => {
  const foNo = req.params.foNo;

  foodBoardReply.deleteOne({ foNo: foNo }).then((output) => {
    if (output == 0)
      return res.status(404).json({ message: "Not Found FoodBoardReply" });
    console.log("댓글 삭제");
    res.status(200).json({
      message: "Delete Reply Complete",
    });
  });
});

// 좋아요 기능
// 좋아요 취소 기능

module.exports = router;
