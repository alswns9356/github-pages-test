"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.getFreeBoardList = getFreeBoardList;
exports.postFreeBoardPost = postFreeBoardPost;
exports.getFreeBoardDetail = getFreeBoardDetail;
exports.getAddBoardList = getAddBoardList;

var _axios = _interopRequireDefault(require("axios"));

var _BoardTypes = require("./BoardTypes");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

function getFreeBoardList() {
  var request = _axios["default"].get("/freeBoard").then(function (res) {});

  return {
    type: _BoardTypes.FREEBOARD_LIST,
    payload: request
  };
}

function postFreeBoardPost() {
  var request = _axios["default"].post("/freeBoard/write").then(function (res) {
    return res.data;
  });

  return {
    type: _BoardTypes.FREEBOARD_WRITE,
    payload: request
  };
}

function getFreeBoardDetail(fno) {
  console.log("action에 들어왔어요 수박");

  var request = _axios["default"].get("/freeBoard/".concat(fno)).then(function (res) {
    return res.data;
  });

  console.log("request", request);
  return {
    type: _BoardTypes.FREEBOARD_WRITE,
    payload: request
  };
} // export function postFreeBoardPost() {
//   const request = axios.post("/freeBoard/write").then((res) => res.data);
//   return {
//     type:FREEBOARD_WRITE,
//     payload:request
//   }
// }


function getAddBoardList() {
  console.log("addboardlist");

  var req = _axios["default"].get("/addBoard").then(function (res) {
    return res.data;
  });

  return {
    type: _BoardTypes.ADDBOARD_LIST,
    payload: req
  };
}