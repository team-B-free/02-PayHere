import { Router } from "express";
import moneybookController from "./../../controllers/moneybook/moneybookController.js";
const router = Router();

router.get("/", moneybookController.getMbtiTypeMoneybook);
router.patch("/status/:id", moneybookController.setDeleteMoneybook);
router.patch("/recover/:id", moneybookController.setRestoreMoneyBook);

export default router;
