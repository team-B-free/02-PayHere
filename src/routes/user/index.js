import { Router } from "express";
import { validate } from 'express-validation';
import userController from "./../../controllers/user/userController.js";
import * as validator from '../../validations/user/userValidator.js';
import authJWT from '../../middlewares/auth.js';

const router = Router();

router.get("/test", userController.getTest);
router.post("/token-resign", validate(validator.resignToken), userController.resignToken);
router.post("/login", validate(validator.login), userController.login);
router.post("/signup", validate(validator.signUp), userController.signUp);
router.post("/logout", authJWT, userController.logout);

export default router;
