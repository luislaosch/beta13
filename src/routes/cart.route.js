import { Router } from "express";
const router = Router();
import * as cartController from '../controllers/cart.controller'

router.get("/:userId", cartController.getCartByUserId);
router.post("/add", cartController.addProductToCart);
router.delete("/:userId/remove/:productId", cartController.removeProductFromCart);
router.delete("/:userId/clear", cartController.clearCart);

export default router;