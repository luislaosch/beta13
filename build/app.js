"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;
require("dotenv/config");
var _express = _interopRequireDefault(require("express"));
var _cors = _interopRequireDefault(require("cors"));
var _morgan = _interopRequireDefault(require("morgan"));
var _package = _interopRequireDefault(require("../package.json"));
var _config2 = _interopRequireDefault(require("./config"));
var _initialSetup = require("./libs/initialSetup");
var _products = _interopRequireDefault(require("./routes/products.route"));
var _auth = _interopRequireDefault(require("./routes/auth.route"));
var _user = _interopRequireDefault(require("./routes/user.route"));
var _cart = _interopRequireDefault(require("./routes/cart.route"));
var _culqi = _interopRequireDefault(require("./routes/culqi.route"));
function _interopRequireDefault(e) { return e && e.__esModule ? e : { "default": e }; }
//importar los roles al inicio de la aplicacion 

//importando las rutas

// const Culqi = require('culqi-node');
// const culqi = new Culqi({
//     // privateKey: process.env.privateKey,
//     // publicKey: process.env.publicKey,
//     privateKey: config.PRIVATEKEY,
//     publicKey: config.PUBLICKEY,
//     pciCompliant: true
// });

// ruta para Culqi

var app = (0, _express["default"])();
//creando roles por defecto
(0, _initialSetup.createRoles)();
app.set('pkg', _package["default"]);
app.use((0, _morgan["default"])('dev'));
app.use(_express["default"].json());
app.use((0, _cors["default"])({
  origin: '*'
}));
app.get('/', function (req, res) {
  console.log("hola beta 13");
  res.json({
    name: app.get('pkg').name,
    autor: app.get('pkg').author,
    proyecto: app.get('pkg').description,
    version: app.get('pkg').version
  });
});

// app.post('/api/process/pay', async (req, res) => {
//     const producto = req.body;
//     const mires = await culqi.tokens.createToken({
//         card_number: producto.creditcard,
//         cvv: producto.cvv,
//         expiration_month: producto.month,
//         expiration_year: producto.year,
//         email: producto.email
//     }).then( (data)=>{
//       //  console.log(data);
//         try {
//              culqi.charges.createCharge({
//                 amount: producto.amount,
//                 currency_code: producto.currency_code,
//                 email: producto.email,
//                 installments: producto.installments,
//                 description: producto.description,
//                 source_id: data.id
//             }).then((respuesta)=>{
//                 console.log(respuesta);
//                 res.send({ message: respuesta });
//             }).catch(err=>{
//                 res.send({ message: err});
//             })
//         } catch (error) {
//             res.send({ message: error});
//         }
//     }).catch(err=>{
//         res.send({ message: err});
//     })
// })

//definiendo rutas
app.use('/api/products', _products["default"]);
app.use('/api/auth', _auth["default"]);
app.use('/api/users', _user["default"]);
app.use('/api/cart', _cart["default"]);
app.use('/api/process', _culqi["default"]); // Usando la nueva ruta de Culqi
var _default = exports["default"] = app;