"use strict";

function _typeof(o) { "@babel/helpers - typeof"; return _typeof = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (o) { return typeof o; } : function (o) { return o && "function" == typeof Symbol && o.constructor === Symbol && o !== Symbol.prototype ? "symbol" : typeof o; }, _typeof(o); }
Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;
var _express = require("express");
var productsController = _interopRequireWildcard(require("../controllers/products.controller"));
var _index = require("../middlewares/index");
function _getRequireWildcardCache(e) { if ("function" != typeof WeakMap) return null; var r = new WeakMap(), t = new WeakMap(); return (_getRequireWildcardCache = function _getRequireWildcardCache(e) { return e ? t : r; })(e); }
function _interopRequireWildcard(e, r) { if (!r && e && e.__esModule) return e; if (null === e || "object" != _typeof(e) && "function" != typeof e) return { "default": e }; var t = _getRequireWildcardCache(r); if (t && t.has(e)) return t.get(e); var n = { __proto__: null }, a = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var u in e) if ("default" !== u && {}.hasOwnProperty.call(e, u)) { var i = a ? Object.getOwnPropertyDescriptor(e, u) : null; i && (i.get || i.set) ? Object.defineProperty(n, u, i) : n[u] = e[u]; } return n["default"] = e, t && t.set(e, n), n; }
var router = (0, _express.Router)();
//importar los controladores
// import {createProduct,getProducts,getProductById,updateProductById,deleteProductById} from '../controllers/products.controller' //importar individual

router.get('/', productsController.getProducts);
router.get('/:productId', productsController.getProductById);
router.post('/', [_index.authJwt.verifyToken, _index.authJwt.isModerator], productsController.createProduct);
router.put('/:productId', [_index.authJwt.verifyToken, _index.authJwt.isAdmin], productsController.updateProductById);
router["delete"]('/:productId', [_index.authJwt.verifyToken, _index.authJwt.isAdmin], productsController.deleteProductById);
var _default = exports["default"] = router;