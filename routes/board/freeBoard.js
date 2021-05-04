const express = require("express");
const router = express.Router();
const freeBoard = require("../../public/models/freeBoard");
const freeBoardReply = require("../../public/models/freeBoardReply");
const freeBoardLike = require("../../public/models/freeBoardLike");
const session = require("../session");

router.use(session);
// 로그인 유지하는것만 구현 되어있으면 userid쪽을 session으로 나 쿠키..?로 하는 방법 찾아서 userid에 넣어서 해보기

// 게시판 생성
router.post("/write", (req, res, next) => {
  console.log("게시판 생성");
  const { fTitle, fContent } = req.body;
  const fUserid = req.session.user_id;
  console.log(fUserid);

  console.log("fTitle, fContent ==> ", fTitle, fContent);

  const freeBoardModel = new freeBoard();

  freeBoardModel.fTitle = fTitle;
  freeBoardModel.fUserid = fUserid;
  freeBoardModel.fContent = fContent;

  console.log("freeBoardModel==>", freeBoardModel);

  freeBoardModel
    .save()
    .then((newFreeBoard) => {
      console.log("Post 생성");
      res.status(200).json({
        data: {
          freeboard: newFreeBoard,
        },
      });
    })
    .catch((err) => {
      res.status(500).json({
        message: err,
      });
    });
});

// 게시판 목록 보기
router.get("/", (req, res, next) => {
  freeBoard
    .find().sort({"fNo":-1})
    .then((freeboard) => {
      console.log("freeBoard All");
      res.status(200).json({
        freeboard: freeboard,
      });
    })
    .catch((err) => {
      res.status(500).json({
        message: err,
      });
    });
});

// 게시판 자세히 보기
// 좋아요 기능 개수 보이기
router.get("/:fno", async (req, res, next) => {
  const fno = req.params.fno;

  // const reply = freeBoardReply.find({ fBoardNo: fno });
  // console.log(reply);
  // const fboard = await freeBoard.find({ fNo: fno });
  // console.log('fboard[0].fUserid',fboard[0].fUserid);
  freeBoard
    .find({ fNo: fno })
    .then((freeboard) => {
      if (freeboard == "")
        return res.status(404).json({ message: "Not Found Board" });
      console.log("게시글 자세히 보기");
      //조회수 기능
      console.log("freeboard==>", freeboard[0].fView);
      // 댓글
      freeBoardReply.find({ fBoardNo: fno }).then((reply) => {
        console.log('freeBoard 댓글 ==> ',reply);
        freeboard[0].fView += 1;
        freeboard[0].save();
        // const
        res.status(200).json({
          data: {
            freeboard: freeboard,
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

// 조회수 증가하지 않는 게시글 가져오기
router.get("/get/:fno", (req, res) => {
  console.log('게시글 조회수 증가하지 않는거 가져오는거')
  const fno = req.params.fno;
  freeBoard.find({ fNo: fno }).then((freeboard) => {
    if (freeboard == "")
      return res.status(404).json({ message: "Not Found Board" });
    res.status(200).json({
      freeboard: freeboard,
    });
  });
});

// 게시글 업데이트
router.put("/update/:fno", async (req, res, next) => {
  
  const fno = req.params.fno;
  const { fTitle, fContent } = req.body;
  const fUserid = req.session.user_id;
  try {
    //   게시글 수정할 때 로그인 된 유저와 게시글 유저가 같은지 확인하는거...?
    const fboard = await freeBoard.find({ fNo: fno });
    console.log("fboard", fboard);
    if (!fboard) {
      return res.status(404).json({
        message: "freeboard not found",
      });
    }
    const updatefboard = await freeBoard.find({ fNo: fno });
    // console.log('fboard[0].fUserid',fboard[0].fUserid);
    console.log(
      "req.session.user_id",
      updatefboard[0].fUserid == req.session.user_id
    );
    if (updatefboard[0].fUserid != req.session.user_id) {
      return res.status(500).json({
        message: "해당 사용자가 아닙니다.",
      });
    }
    fboard[0].fTitle = fTitle;
    fboard[0].fUserid = fUserid;
    fboard[0].fContent = fContent;
    console.log("freeBoard", fboard);
    const output = await fboard[0].save();
    console.log("update complete");
    res.status(200).json({
      data: {
        freeboard: output,
      },
    });
  } catch (err) {
    res.status(500).json({
      message: err,
    });
  }
});

// 게시글 삭제
// 게시글 삭제 시 댓글도 삭제되는-- 완료

//좋아요도 삭제되는 거 만들기.... --- 미안..
router.delete("/del/:fno", async (req, res, next) => {
  console.log(req.session.user_id);
  const fno = req.params.fno;
  try {
    const delfboard = await freeBoard.find({ fNo: fno });
    console.log("delfboard", delfboard[0].fUserid != req.session.user_id);
    if (delfboard[0].fUserid != req.session.user_id) {
      return res.status(500).json({
        message: "해당 사용자가 아닙니다.",
      });
    } else {
      freeBoard
        .deleteOne({ fNo: fno })
        .then((output) => {
          if (output.n == 0)
            return res.status(404).json({ message: "Not found freeBoard" });
          console.log("게시글 삭제 완료");
          // 댓글 삭제
          freeBoardReply.deleteMany({ fBoardNo: fno }).then((output) => {
            console.log("댓글 삭제 완료");
            // 좋아요 삭제되는 것도 만들기
            freeBoardLike.deleteMany({ fNo: fno }).then((output) => {
              console.log("좋아요 삭제 완료");
              res.status(200).json({
                message: "Delete Complete",
              });
            });
          });
        })
        .catch((err) => {
          res.status(500).json({
            message: "에러/...",
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
router.post("/fReply/write/:fno", (req, res, next) => {
  console.log("freeBoard 댓글 작성중");
  const fno = req.params.fno;
  const { fReComment } = req.body;
  const fReUserid = req.session.user_id;
  console.log(fno, fReComment, fReUserid);
  const replyModel = new freeBoardReply();
  replyModel.fBoardNo = fno;
  replyModel.fReUserid = fReUserid;
  replyModel.fReComment = fReComment;
  console.log("fReUserid", replyModel);
  replyModel
    .save()
    .then((newReply) => {
      console.log("reply 생성완료");
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

// 댓글 삭제 기능
// 해당 게시글의 작성자와 댓글 작성한 사람만 삭제할 수 있게 구성해야할듯..
router.delete("/fReply/del/:fReNo", (req, res, next) => {
  const fReNo = req.params.fReNo;
  // const sessionUserid = req.session.user_id;
  // const writefboard = freeBoard.find({ fNo: fno });
  // const Refboard = freeBoardReply.find({ fNo: fno });

  // if((sessionUserid!=writefboard[0].fUserid)||(Refboard!=sessionUserid)){

  // }
  freeBoardReply.deleteOne({ fReNo: fReNo }).then((output) => {
    if (output.n == 0)
      return res.status(404).json({ message: "Not Found FreeBoardReply" });
    console.log("댓글 삭제");
    res.status(200).json({
      message: "Delete Complete",
    });
  });
});

// 좋아요 기능
router.post("/flike/:fno", (req, res, next) => {
  const fno = req.params.fno;
  const { fUserid } = req.body;

  const likeModel = new freeBoardLike();
  likeModel.fNo = fno;
  likeModel.fUserid = fUserid;
  likeModel.save().then((like) => {
    console.log("like 했어요!!");
    res.status(200).json({
      data: like,
    });
  });
});

// 좋아요 취소 기능
// 기능이 구현이 되는 것을 확인하려면
// 프론트를 구성해야 알 수 있다.
router.delete("/flike/:fno", (req, res, next) => {
  const fno = req.params.fno;
  const { fUserid } = req.body;

  freeBoardLike
    .deleteOne({ fUserid: fUserid, fNo: fno })
    .then((output) => {
      if (output.n == 0) {
        return res.status(404).json({
          message: " like not found",
        });
      }
      console.log("좋아요 취소기능 완료");
      res.status(200).json({
        message: " 좋아요 취소함",
      });
    })
    .catch((e) => {
      res.status(500).json({
        message: e,
      });
    });
});

module.exports = router;
