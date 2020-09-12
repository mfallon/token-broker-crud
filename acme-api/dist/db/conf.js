"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;
var _default = {
  host: 'mongodb://localhost:27017',
  db: 'acme',
  collection: 'claims',
  options: {
    useNewUrlParser: true,
    useUnifiedTopology: true
  }
};
exports["default"] = _default;