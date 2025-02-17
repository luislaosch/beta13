import { Router } from "express";
const router = Router();

import * as categoryProductController from '../controllers/categoryP.controller'
import { authJwt } from "../middlewares/index";

router.post('/',[authJwt.verifyToken,authJwt.isAdmin],categoryProductController.createCategory);
router.get('/',[authJwt.verifyToken,authJwt.isAdmin],categoryProductController.getCategory);
router.get('/:categoryProductId',[authJwt.verifyToken,authJwt.isAdmin],categoryProductController.getCategoryById);
router.put('/:categoryProductId',[authJwt.verifyToken,authJwt.isAdmin],categoryProductController.updateCategoryById);
router.delete('/:categoryProductId',[authJwt.verifyToken,authJwt.isAdmin],categoryProductController.deleteCategoryById);