"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;
var _mongoose = require("mongoose");
var cartSchema = new _mongoose.Schema({
  //registro de usuario
  user: {
    ref: "User",
    type: _mongoose.Schema.Types.ObjectId,
    required: true
  },
  //registro de productos
  products: [{
    product: {
      ref: "Product",
      type: _mongoose.Schema.Types.ObjectId,
      required: true
    },
    quantity: {
      type: Number,
      required: true,
      min: 1,
      "default": 1
    }
  }],
  //monto acumulado
  payAmount: {
    type: Number,
    "default": 0
  }
}, {
  timestamps: true,
  versionKey: false
});
var _default = exports["default"] = (0, _mongoose.model)('Cart', cartSchema);