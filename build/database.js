"use strict";

var _mongoose = _interopRequireDefault(require("mongoose"));
var _config = _interopRequireDefault(require("./config.js"));
function _interopRequireDefault(e) { return e && e.__esModule ? e : { "default": e }; }
_mongoose["default"].connect(_config["default"].MONGO_URI || "mongodb+srv://admin:admin@hackaton17.crbbn.mongodb.net/H17"
// ,{
//     useNewUrlParser: true,
//     useUnifiedTopology: true,
//     useFindAndModify: true,
//     useCreateIndex: true
// }
).then(function (db) {
  return console.log("DB conectada");
})["catch"](function (error) {
  return console.log(error);
});