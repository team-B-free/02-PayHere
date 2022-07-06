import { Router } from "express";
import moneybookDetailController from "./../../controllers/moneybook_detail/moneybookDetailController.js";
const router = Router();

router.post("/", moneybookDetailController.createMoneybook);
router.get("/", moneybookDetailController.readAllMoneybook);
router.get("/:idx", moneybookDetailController.readMoneybook);
router.patch("/:idx", moneybookDetailController.updateMoneybook);
router.delete("/:idx", moneybookDetailController.deleteMoneybook);
router.patch("/:idx/recovery", moneybookDetailController.recoverMoneybook);

export default router;
