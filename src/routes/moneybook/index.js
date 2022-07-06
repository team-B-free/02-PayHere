import { Router } from "express";
import moneybookController from "./../../controllers/moneybook/moneybookController.js";
const router = Router();
/**
 * @author 오주환
 * @version 1.0 22.07.06 가계부 수정
 */

router.patch("/:moneybook_idx", moneybookController.updateMoneybook);
export default router;
