import { Router } from "express";
import { validate } from "express-validation";
import userController from "./../../controllers/user/userController.js";
import * as validator from "../../validations/user/userValidator.js";
import authJWT from "../../middlewares/auth.js";

const router = Router();

router.post(
  "/token-resign",
  validate(validator.resignToken),
  userController.resignToken
);
router.post("/login", validate(validator.login), userController.login);
router.post("/signup", validate(validator.signUp), userController.signUp);
router.post("/logout", authJWT, userController.logout);
/**
 * @author 오주환
 * @version 1.0 22.07.06 가계부 조회(날짜)
 */
router.get("/moneybooks", authJWT, userController.readAllMoneybookByDate);
/**
 * @author 오주환
 * @version 1.0 22.07.06 가계부 생성
 */
router.post("/moneybooks", authJWT, userController.createMoneybook);
router.patch(
  "/",
  validate(validator.editUser),
  authJWT,
  userController.editUser
); // 회원정보 수정
router.delete(
  "/",
  validate(validator.deleteUser),
  authJWT,
  userController.deleteUser
); // 회원 삭제

export default router;
