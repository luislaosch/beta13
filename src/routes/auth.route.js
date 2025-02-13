import { Router } from "express";
const router = Router();
//importar los controladores
import * as authController from '../controllers/auth.controller'
// import * as logoutController from '../controllers/logout.controller'
//importar middleware de validacion de roles y usuarios
import { verifySignup,authJwt } from "../middlewares";

router.post('/signup',[verifySignup.checkUsernameExisted,verifySignup.checkEmailExisted,verifySignup.checkRoleExisted],authController.signUp);
router.post('/signin',authController.signIn);
router.post('/logout',authController.logout);

export default router;