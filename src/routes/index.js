import { Router } from "express";
const router = Router();
import userRouter from "./user/index.js";
import MoneybookRouter from "./moneybook/index.js";

router.use("/users", userRouter);
router.use("/moneybooks", MoneybookRouter);

export default router;
