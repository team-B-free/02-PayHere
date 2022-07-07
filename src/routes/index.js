import { Router } from "express";
const router = Router();
import userRouter from "./user/index.js";
import MoneybookRouter from "./moneybook/index.js";
import MoneybookDetailRouter from "./moneybook_detail/index.js";

router.use("/user", userRouter);
router.use("/moneybooks", MoneybookRouter);
router.use("/moneybooks/moneybook_idx", MoneybookRouter);
router.use("/moneybooks", MoneybookDetailRouter);
router.use("/moneybooks/:idx", MoneybookDetailRouter);


export default router;