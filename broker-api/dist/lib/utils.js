"use strict";

exports.__esModule = true;
exports.generateToken = void 0;

var generateToken = function generateToken(len) {
  if (len === void 0) {
    len = 32;
  }

  var a = "abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ1234567890".split("");
  var b = [];

  for (var i = 0; i < len; i++) {
    var j = (Math.random() * (a.length - 1)).toFixed(0);
    b[i] = a[j];
  }

  return b.join("");
};

exports.generateToken = generateToken;