import { Router } from "express";
const router = Router();
import { verifyToken } from "../middlewares/authJwt.js";
import * as cartController from '../controllers/cart.controller'

//agregamos el verifyToken para que accedan usuarios autenticados
router.get("/", verifyToken,cartController.getCartByUserId);
router.post("/add", verifyToken,cartController.addProductToCart);
// router.delete("/remove/:productId", verifyToken, cartController.removeProductFromCart);
router.delete("/remove", verifyToken, cartController.removeProductFromCart);
router.delete("/clear", verifyToken, cartController.clearCart);

export default router;