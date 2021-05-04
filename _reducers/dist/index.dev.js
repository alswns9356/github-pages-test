"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.rootReducer = void 0;

var _redux = require("redux");

var _user_reducer = _interopRequireDefault(require("./user_reducer"));

var _board_reducer = _interopRequireDefault(require("./board_reducer"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

// const rootReducer = combineReducers({
//     user
// })
var rootReducer = (0, _redux.combineReducers)({
  user: _user_reducer["default"],
  freeBoard: _board_reducer["default"]
});
exports.rootReducer = rootReducer;