import { Router } from "express";
import userController from "./../../controllers/user/userController.js";
import authJWT from '../../middlewares/auth.js';

const router = Router();

router.get("/test", userController.getTest);
router.get("/login", authJWT, userController.login);

export default router;
