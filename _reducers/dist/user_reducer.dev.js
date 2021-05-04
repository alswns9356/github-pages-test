"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = _default;

var _types = require("../_actions/types");

function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); if (enumerableOnly) symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; }); keys.push.apply(keys, symbols); } return keys; }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; if (i % 2) { ownKeys(source, true).forEach(function (key) { _defineProperty(target, key, source[key]); }); } else if (Object.getOwnPropertyDescriptors) { Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)); } else { ownKeys(source).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } } return target; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

function _default() {
  var state = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};
  var action = arguments.length > 1 ? arguments[1] : undefined;
  console.log("action==>", action);

  switch (action.type) {
    case _types.REGISTER_USER:
      console.log("REGISTER_USER ==> action.payload", action.payload);
      return _objectSpread({}, state, {
        register: action.payload
      });

    case _types.LOGIN_USER:
      console.log("LOGIN_USER ==> action.payload", action.payload);
      return _objectSpread({}, state, {
        loginSucces: action.payload
      });

    case _types.AUTH_USER:
      console.log("AUTH_USER ==> action.payload", action.payload);
      return _objectSpread({}, state, {
        userData: action.payload
      });

    case _types.LOGOUT_USER:
      console.log("LOGOUT_USER ===> action.payload", action.payload);
      return _objectSpread({}, state);

    default:
      console.log('state ==> ', state);
      return state;
    // 여기서 문제이다.....
    // return {...state, userData: {} }
  }
}