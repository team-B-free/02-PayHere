import { Router } from "express";
import moneybookDetailController from "./../../controllers/moneybook_detail/moneybookDetailController.js";
const router = Router();

router.get(
  "/:moneybook_id",
  moneybookDetailController.getAnotherUsersMoneybook
);

export default router;