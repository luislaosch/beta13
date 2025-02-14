import { Router } from "express";
const router = Router();

//importar los controladores
// import {createUser,getUsers,getUserById,updateUserById,deleteUserById} from '../controllers/user.controller' //importar individual
import * as userController from '../controllers/user.controller'
import {authJwt, verifySignup} from '../middlewares/index'

router.get('/',userController.getUsers);
router.get('/:userId',userController.getUserById);
router.post('/',[authJwt.verifyToken, verifySignup.checkRoleExisted,verifySignup.checkUsernameExisted,verifySignup.checkEmailExisted],userController.createUser);
router.put('/:userId',[authJwt.verifyToken],userController.updateUserById);
router.delete('/:userId',[authJwt.verifyToken],userController.deleteUserById);

export default router;
