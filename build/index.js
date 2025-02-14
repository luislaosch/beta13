"use strict";

require("dotenv/config");
var _app = _interopRequireDefault(require("./app"));
require("./database");
function _interopRequireDefault(e) { return e && e.__esModule ? e : { "default": e }; }
// Carga las variables de entorno automáticamente

var PORT = process.env.PORT || 4000;
_app["default"].listen(PORT, function () {
  return console.log("Servidor corriendo en el puerto ".concat(PORT));
});