import { Router } from "express";
import moneybookDetailController from "./../../controllers/moneybook_detail/moneybookDetailController.js";
const router = Router();

router.get("/", moneybookDetailController.getOtherUsersMoneybook);

export default router;
