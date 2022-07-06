import { Router } from "express";
import userController from "./../../controllers/user/userController.js";
const router = Router();

router.post("/signup", userController.signupUser);

//인증 필요(미들웨어 사용)
/**
 * @author 오주환
 * @version 1.0 22.07.06 가계부 생성
 */
router.post("/moneybook", userController.createMoneybook);
/**
 * @author 오주환
 * @version 1.0 22.07.06 가계부 상세조회
 */
router.get("/moneybook", userController.readAllMoneybook);

export default router;
