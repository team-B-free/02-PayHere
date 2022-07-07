import { Router } from "express";
const router = Router();
import userRouter from "./user/index.js";
import MoneybookRouter from "./moneybook/index.js";
import MoneybookDetailRouter from "./moneybook_detail/index.js";

router.use("/users", userRouter);
router.use("/moneybook", MoneybookRouter);
router.use("/moneybook", MoneybookRouter);
router.use("/moneybook/:idx", MoneybookDetailRouter);

export default router;
