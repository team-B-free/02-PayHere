import { Router } from "express";
import userController from "./../../controllers/user/userController.js";
const router = Router();

router.get("/test", userController.getTest);

export default router;
