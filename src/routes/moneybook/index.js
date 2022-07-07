import { Router } from "express";
import moneybookController from "./../../controllers/moneybook/moneybookController.js";
const router = Router();
/**
 * @author 오주환
 * @version 1.0 22.07.06 가계부 수정
 */
router.patch("/:moneybook_id", moneybookController.updateMoneybook);

/**
 * @author 오주환
 * @version 1.0 22.7.6 최초 작성 {문서 구조 작성}
 *
 *  @author 박성용
 *  @version 1.1 22.7.6 {가계부 수정, 삭제기능 patch 메서드 작성}
 *
 *  @author 박성용
 *  @version 1.2 22.7.7 {가계부 삭제기능 delete 메서드로 변경}
 */

router.get("/", moneybookController.getMbtiTypeMoneybook);
router.delete("/:moneybook_id/status/", moneybookController.setDeleteMoneybook);
router.patch("/recover/:moneybook_id", moneybookController.setRestoreMoneyBook);

export default router;
