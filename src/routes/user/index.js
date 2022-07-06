import { Router } from "express";
import userController from "./../../controllers/user/userController.js";
const router = Router();

router.post("/signup", userController.signupUser);

/**
 * @author 오주환
 * @version 1.0 22.07.06 가계부 생성
 */
router.post("/moneybooks", userController.createMoneybook);
/**
 * @author 오주환
 * @version 1.0 22.07.06 모든 가계부 조회(제목)
 */
router.get("/moneybooks", userController.readAllMoneybookByDate);

export default router;
