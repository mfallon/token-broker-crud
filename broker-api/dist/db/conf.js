"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;
var _default = {
  host: 'mongodb://mongo:27017',
  db: 'broker',
  collection: 'tokens',
  options: {
    useNewUrlParser: true,
    useUnifiedTopology: true
  }
};
exports["default"] = _default;