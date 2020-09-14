"use strict";

exports.__esModule = true;
exports["default"] = void 0;

var _axios = _interopRequireDefault(require("axios"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

function _extends() { _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; }; return _extends.apply(this, arguments); }

var config = {
  url: '/',
  baseURL: 'http://localhost:8081',
  // update when on containers
  headers: {
    'Accept': 'application/json',
    'Content-Type': 'application/json'
  }
};

var errorHandler = function errorHandler(err) {
  if (err.response) {
    // handle 4XX, 5XX errors
    console.log("Error response " + err.status + " from API", err);
  } else if (err.request) {
    // no response
    console.log('No response from API:', err.request);
  } else {
    console.log('Error:', err.message);
  }
};

var _default = {
  validate: function validate(token, callback) {
    _axios["default"].get("/validate?" + token, _extends({}, config)).then(function (res) {
      return callback(res);
    })["catch"](function (err) {
      return errorHandler(err);
    });
  }
};
exports["default"] = _default;