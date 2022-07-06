import { Router } from "express";
import { validate } from 'express-validation';
import userController from "./../../controllers/user/userController.js";
import authJWT from '../../middlewares/auth.js';
import * as validator from '../../validations/user/userValidator.js';

const router = Router();

router.get("/test", userController.getTest);
router.get("/token-resign", validate(validator.resignToken), userController.resignToken);
router.get("/login", validate(validator.login), authJWT, userController.login);

export default router;
