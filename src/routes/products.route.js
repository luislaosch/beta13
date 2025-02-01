import { Router } from "express";
const router = Router();
//importar los controladores
// import {createProduct,getProducts,getProductById,updateProductById,deleteProductById} from '../controllers/products.controller' //importar individual
import * as productsController from '../controllers/products.controller'

router.post('/',productsController.createProduct);
router.get('/',productsController.getProducts);
router.get('/:productId',productsController.getProductById);
router.put('/productId',productsController.updateProductById);
router.delete('/productId',productsController.deleteProductById);

export default router;