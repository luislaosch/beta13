"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;
var _culqiNode = _interopRequireDefault(require("culqi-node"));
function _interopRequireDefault(e) { return e && e.__esModule ? e : { "default": e }; }
var culqi = new _culqiNode["default"]({
  privateKey: process.env.PRIVATEKEY || 'sk_test_SWyklAB8rIyjXmje',
  publicKey: process.env.PUBLICKEY || 'pk_test_89a1417406ce7fa2',
  pciCompliant: true
});
var _default = exports["default"] = culqi;