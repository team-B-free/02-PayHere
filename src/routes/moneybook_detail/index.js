import { Router } from 'express';
import moneybookDetailController from './../../controllers/moneybook_detail/moneybookDetailController.js';
import authJWT from '../../middlewares/auth.js';
const router = Router();

/**
 * @author 오주환
 * @version 1.0 22.07.07 가계부 상세내역 생성
 */
router.post(
  '/:moneybook_id',
  authJWT,
  moneybookDetailController.createMoneybook,
);
/**
 * @author 오주환
 * @version 1.0 22.07.07 가계부 상세내역 전체 조회
 */
router.get(
  '/:moneybook_id',
  authJWT,
  moneybookDetailController.readAllMoneybook,
);
/**
 * @author 오주환
 * @version 1.0 22.07.07 가계부 상세내역 수정
 */
router.patch(
  '/:moneybook_id',
  authJWT,
  moneybookDetailController.updateMoneybook,
);
/**
 * @author 오주환
 * @version 1.0 22.07.07 가계부 상세내역 삭게
 */
router.delete(
  '/:moneybook_id',
  authJWT,
  moneybookDetailController.deleteMoneybook,
);
/**
 * @author 오주환
 * @version 1.0 22.07.07 가계부 상세내역 복구
 */
router.patch(
  '/recovery/:moneybook_id',
  authJWT,
  moneybookDetailController.recoverMoneybook,
);

/**
 * @author 박성용
 * @version 1.0 22.07.07 다른 유저의 가계부 상세 조회
 */
router.get('/', authJWT, moneybookDetailController.getAnotherUsersMoneybook);

export default router;
