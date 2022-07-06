import { Router } from "express";
import moneybookController from "./../../controllers/moneybook/moneybookController.js";
const router = Router();
// 인증 필요(미들웨어 사용)
router.get("/:idx", moneybookController.updateMoneybook);

export default router;
