"use strict";

var express = require("express");

var router = express.Router();

var addBoard = require("../../public/models/addBoard");

var session = require("../session");

router.use(session); // 게시글 작성

router.post("/write", function (req, res, next) {
  var aContent = req.body.aContent;
  var aUserid = req.session.user_id;
  console.log(req.body);
  var addBoardModel = new addBoard();
  addBoardModel.aUserid = aUserid;
  addBoardModel.aContent = aContent;
  addBoardModel.save().then(function (newAddBoard) {
    console.log("메뉴 추가 게시판 생성중");
    res.status(200).json({
      data: {
        addboard: newAddBoard
      }
    });
  })["catch"](function (e) {
    res.status(500).json({
      message: e
    });
  });
}); // 게시판 목록

router.get("/", function (req, res, next) {
  addBoard.find().sort({
    "aNo": -1
  }).then(function (addboard) {
    console.log("addBoard All");
    res.status(200).json({
      addboard: addboard
    });
  })["catch"](function (e) {
    res.status(500).json({
      message: e
    });
  });
}); // 게시글 자세히 보기

router.get("/:aNo", function (req, res, next) {
  var aNo = req.params.aNo;
  addBoard.find({
    aNo: aNo
  }).then(function (addboard) {
    console.log("addBoard Detail");
    res.status(200).json({
      addboard: addboard
    });
  })["catch"](function (e) {
    res.status(500).json({
      message: e
    });
  });
});
module.exports = router;