"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;
var _mongoose = require("mongoose");
// models/Token.js

var tokenSchema = new _mongoose.Schema({
  token: {
    type: String,
    required: true,
    unique: true
  },
  expiresAt: {
    type: Date,
    required: true,
    index: {
      expires: 0
    } // Borra automáticamente el documento cuando expire
  }
});
var _default = exports["default"] = (0, _mongoose.model)('Token', tokenSchema);