import { Router } from "express";
import moneybookController from "./../../controllers/moneybook/moneybookController.js";
const router = Router();

router.patch("/status/:id", moneybookController.setDeleteMoneybook);

export default router;
