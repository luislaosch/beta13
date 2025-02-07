import { Router } from "express";
const router = Router();
//importar los controladores
// import {createProduct,getProducts,getProductById,updateProductById,deleteProductById} from '../controllers/products.controller' //importar individual
import * as productsController from '../controllers/products.controller'
import {authJwt} from '../middlewares/index'

router.get('/',productsController.getProducts);
router.get('/:productId',productsController.getProductById);
router.post('/',[authJwt.verifyToken,authJwt.isModerator],productsController.createProduct);
router.put('/:productId',[authJwt.verifyToken,authJwt.isAdmin],productsController.updateProductById);
router.delete('/:productId',[authJwt.verifyToken,authJwt.isAdmin],productsController.deleteProductById);

export default router;