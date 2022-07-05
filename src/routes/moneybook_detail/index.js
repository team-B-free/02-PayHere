import { Router } from "express";
import moneybookDetailController from "./../../controllers/moneybook_detail/moneybookDetailController.js";
const router = Router();

router.get("/test", moneybookDetailController.getTest);

export default router;
