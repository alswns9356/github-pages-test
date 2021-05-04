"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.registerUser = registerUser;
exports.loginUser = loginUser;
exports.auth = auth;
exports.logoutUser = logoutUser;

var _axios = _interopRequireDefault(require("axios"));

var _types = require("./types");

var _Config = require("../hoc/Config");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

function registerUser(dataToSubmit) {
  var request = _axios["default"].post("".concat(_Config.USER_SERVER, "/register"), dataToSubmit).then(function (response) {
    return response.data;
  });

  return {
    type: _types.REGISTER_USER,
    payload: request
  };
}

function loginUser(dataToSubmit) {
  var request = _axios["default"].post("".concat(_Config.USER_SERVER, "/login"), dataToSubmit).then(function (response) {
    return response.data;
  });

  return {
    type: _types.LOGIN_USER,
    payload: request
  };
}

function auth() {
  var request = _axios["default"].get("".concat(_Config.USER_SERVER, "/auth")).then(function (response) {
    return response.data;
  });

  return {
    type: _types.AUTH_USER,
    payload: request
  };
}

function logoutUser() {
  var request = _axios["default"].get("".concat(_Config.USER_SERVER, "/logout")).then(function (response) {
    return response.data;
  });

  return {
    type: _types.LOGOUT_USER,
    payload: request
  };
}