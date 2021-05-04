"use strict";

var express = require("express");

var router = express.Router();

var freeBoard = require("../../public/models/freeBoard");

var freeBoardReply = require("../../public/models/freeBoardReply");

var freeBoardLike = require("../../public/models/freeBoardLike");

var session = require("../session");

router.use(session); // 로그인 유지하는것만 구현 되어있으면 userid쪽을 session으로 나 쿠키..?로 하는 방법 찾아서 userid에 넣어서 해보기
// 게시판 생성

router.post("/write", function (req, res, next) {
  console.log("게시판 생성");
  var _req$body = req.body,
      fTitle = _req$body.fTitle,
      fContent = _req$body.fContent;
  var fUserid = req.session.user_id;
  console.log(fUserid);
  console.log("fTitle, fContent ==> ", fTitle, fContent);
  var freeBoardModel = new freeBoard();
  freeBoardModel.fTitle = fTitle;
  freeBoardModel.fUserid = fUserid;
  freeBoardModel.fContent = fContent;
  console.log("freeBoardModel==>", freeBoardModel);
  freeBoardModel.save().then(function (newFreeBoard) {
    console.log("Post 생성");
    res.status(200).json({
      data: {
        freeboard: newFreeBoard
      }
    });
  })["catch"](function (err) {
    res.status(500).json({
      message: err
    });
  });
}); // 게시판 목록 보기

router.get("/", function (req, res, next) {
  freeBoard.find().sort({
    "fNo": -1
  }).then(function (freeboard) {
    console.log("freeBoard All");
    res.status(200).json({
      freeboard: freeboard
    });
  })["catch"](function (err) {
    res.status(500).json({
      message: err
    });
  });
}); // 게시판 자세히 보기
// 좋아요 기능 개수 보이기

router.get("/:fno", function _callee(req, res, next) {
  var fno;
  return regeneratorRuntime.async(function _callee$(_context) {
    while (1) {
      switch (_context.prev = _context.next) {
        case 0:
          fno = req.params.fno; // const reply = freeBoardReply.find({ fBoardNo: fno });
          // console.log(reply);
          // const fboard = await freeBoard.find({ fNo: fno });
          // console.log('fboard[0].fUserid',fboard[0].fUserid);

          freeBoard.find({
            fNo: fno
          }).then(function (freeboard) {
            if (freeboard == "") return res.status(404).json({
              message: "Not Found Board"
            });
            console.log("게시글 자세히 보기"); //조회수 기능

            console.log("freeboard==>", freeboard[0].fView); // 댓글

            freeBoardReply.find({
              fBoardNo: fno
            }).then(function (reply) {
              console.log('freeBoard 댓글 ==> ', reply);
              freeboard[0].fView += 1;
              freeboard[0].save(); // const

              res.status(200).json({
                data: {
                  freeboard: freeboard,
                  Reply: reply
                }
              });
            });
          })["catch"](function (err) {
            res.status(500).json({
              err: err
            });
          });

        case 2:
        case "end":
          return _context.stop();
      }
    }
  });
}); // 조회수 증가하지 않는 게시글 가져오기

router.get("/get/:fno", function (req, res) {
  console.log('게시글 조회수 증가하지 않는거 가져오는거');
  var fno = req.params.fno;
  freeBoard.find({
    fNo: fno
  }).then(function (freeboard) {
    if (freeboard == "") return res.status(404).json({
      message: "Not Found Board"
    });
    res.status(200).json({
      freeboard: freeboard
    });
  });
}); // 게시글 업데이트

router.put("/update/:fno", function _callee2(req, res, next) {
  var fno, _req$body2, fTitle, fContent, fUserid, fboard, updatefboard, output;

  return regeneratorRuntime.async(function _callee2$(_context2) {
    while (1) {
      switch (_context2.prev = _context2.next) {
        case 0:
          fno = req.params.fno;
          _req$body2 = req.body, fTitle = _req$body2.fTitle, fContent = _req$body2.fContent;
          fUserid = req.session.user_id;
          _context2.prev = 3;
          _context2.next = 6;
          return regeneratorRuntime.awrap(freeBoard.find({
            fNo: fno
          }));

        case 6:
          fboard = _context2.sent;
          console.log("fboard", fboard);

          if (fboard) {
            _context2.next = 10;
            break;
          }

          return _context2.abrupt("return", res.status(404).json({
            message: "freeboard not found"
          }));

        case 10:
          _context2.next = 12;
          return regeneratorRuntime.awrap(freeBoard.find({
            fNo: fno
          }));

        case 12:
          updatefboard = _context2.sent;
          // console.log('fboard[0].fUserid',fboard[0].fUserid);
          console.log("req.session.user_id", updatefboard[0].fUserid == req.session.user_id);

          if (!(updatefboard[0].fUserid != req.session.user_id)) {
            _context2.next = 16;
            break;
          }

          return _context2.abrupt("return", res.status(500).json({
            message: "해당 사용자가 아닙니다."
          }));

        case 16:
          fboard[0].fTitle = fTitle;
          fboard[0].fUserid = fUserid;
          fboard[0].fContent = fContent;
          console.log("freeBoard", fboard);
          _context2.next = 22;
          return regeneratorRuntime.awrap(fboard[0].save());

        case 22:
          output = _context2.sent;
          console.log("update complete");
          res.status(200).json({
            data: {
              freeboard: output
            }
          });
          _context2.next = 30;
          break;

        case 27:
          _context2.prev = 27;
          _context2.t0 = _context2["catch"](3);
          res.status(500).json({
            message: _context2.t0
          });

        case 30:
        case "end":
          return _context2.stop();
      }
    }
  }, null, null, [[3, 27]]);
}); // 게시글 삭제
// 게시글 삭제 시 댓글도 삭제되는-- 완료
//좋아요도 삭제되는 거 만들기.... --- 미안..

router["delete"]("/del/:fno", function _callee3(req, res, next) {
  var fno, delfboard;
  return regeneratorRuntime.async(function _callee3$(_context3) {
    while (1) {
      switch (_context3.prev = _context3.next) {
        case 0:
          console.log(req.session.user_id);
          fno = req.params.fno;
          _context3.prev = 2;
          _context3.next = 5;
          return regeneratorRuntime.awrap(freeBoard.find({
            fNo: fno
          }));

        case 5:
          delfboard = _context3.sent;
          console.log("delfboard", delfboard[0].fUserid != req.session.user_id);

          if (!(delfboard[0].fUserid != req.session.user_id)) {
            _context3.next = 11;
            break;
          }

          return _context3.abrupt("return", res.status(500).json({
            message: "해당 사용자가 아닙니다."
          }));

        case 11:
          freeBoard.deleteOne({
            fNo: fno
          }).then(function (output) {
            if (output.n == 0) return res.status(404).json({
              message: "Not found freeBoard"
            });
            console.log("게시글 삭제 완료"); // 댓글 삭제

            freeBoardReply.deleteMany({
              fBoardNo: fno
            }).then(function (output) {
              console.log("댓글 삭제 완료"); // 좋아요 삭제되는 것도 만들기

              freeBoardLike.deleteMany({
                fNo: fno
              }).then(function (output) {
                console.log("좋아요 삭제 완료");
                res.status(200).json({
                  message: "Delete Complete"
                });
              });
            });
          })["catch"](function (err) {
            res.status(500).json({
              message: "에러/..."
            });
          });

        case 12:
          _context3.next = 17;
          break;

        case 14:
          _context3.prev = 14;
          _context3.t0 = _context3["catch"](2);
          res.status(500).json({
            message: _context3.t0
          });

        case 17:
        case "end":
          return _context3.stop();
      }
    }
  }, null, null, [[2, 14]]);
}); // 댓글 작성

router.post("/fReply/write/:fno", function (req, res, next) {
  console.log("freeBoard 댓글 작성중");
  var fno = req.params.fno;
  var fReComment = req.body.fReComment;
  var fReUserid = req.session.user_id;
  console.log(fno, fReComment, fReUserid);
  var replyModel = new freeBoardReply();
  replyModel.fBoardNo = fno;
  replyModel.fReUserid = fReUserid;
  replyModel.fReComment = fReComment;
  console.log("fReUserid", replyModel);
  replyModel.save().then(function (newReply) {
    console.log("reply 생성완료");
    res.status(200).json({
      data: {
        reply: newReply
      }
    });
  })["catch"](function (e) {
    res.status(500).json({
      message: e
    });
  });
}); // 댓글 삭제 기능
// 해당 게시글의 작성자와 댓글 작성한 사람만 삭제할 수 있게 구성해야할듯..

router["delete"]("/fReply/del/:fReNo", function (req, res, next) {
  var fReNo = req.params.fReNo; // const sessionUserid = req.session.user_id;
  // const writefboard = freeBoard.find({ fNo: fno });
  // const Refboard = freeBoardReply.find({ fNo: fno });
  // if((sessionUserid!=writefboard[0].fUserid)||(Refboard!=sessionUserid)){
  // }

  freeBoardReply.deleteOne({
    fReNo: fReNo
  }).then(function (output) {
    if (output.n == 0) return res.status(404).json({
      message: "Not Found FreeBoardReply"
    });
    console.log("댓글 삭제");
    res.status(200).json({
      message: "Delete Complete"
    });
  });
}); // 좋아요 기능

router.post("/flike/:fno", function (req, res, next) {
  var fno = req.params.fno;
  var fUserid = req.body.fUserid;
  var likeModel = new freeBoardLike();
  likeModel.fNo = fno;
  likeModel.fUserid = fUserid;
  likeModel.save().then(function (like) {
    console.log("like 했어요!!");
    res.status(200).json({
      data: like
    });
  });
}); // 좋아요 취소 기능
// 기능이 구현이 되는 것을 확인하려면
// 프론트를 구성해야 알 수 있다.

router["delete"]("/flike/:fno", function (req, res, next) {
  var fno = req.params.fno;
  var fUserid = req.body.fUserid;
  freeBoardLike.deleteOne({
    fUserid: fUserid,
    fNo: fno
  }).then(function (output) {
    if (output.n == 0) {
      return res.status(404).json({
        message: " like not found"
      });
    }

    console.log("좋아요 취소기능 완료");
    res.status(200).json({
      message: " 좋아요 취소함"
    });
  })["catch"](function (e) {
    res.status(500).json({
      message: e
    });
  });
});
module.exports = router;