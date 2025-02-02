import { Router } from "express";
const router = Router();
//importar los controladores
import * as authController from '../controllers/auth.controller'

router.post('/signup',authController.signUp);
router.post('/signin',authController.signIn);


export default router;