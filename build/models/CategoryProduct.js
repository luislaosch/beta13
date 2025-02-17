"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;
var _mongoose = require("mongoose");
var categorySchema = new _mongoose.Schema({
  name: {
    type: String,
    unique: true
  }
}, {
  timestamps: true,
  versionKey: false
});
var _default = exports["default"] = (0, _mongoose.model)('CategoryProduct', categorySchema);