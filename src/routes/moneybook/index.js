import { Router } from "express";
import moneybookController from "./../../controllers/moneybook/moneybookController.js";
const router = Router();

router.get("/test", moneybookController.getTest);

export default router;
