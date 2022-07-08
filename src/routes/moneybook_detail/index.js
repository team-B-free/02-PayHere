import { Router } from 'express';
import { validate } from 'express-validation';
import * as validator from '../../validations/moneybookDetail/moneybookDetailValidator.js';
import moneybookDetailController from './../../controllers/moneybook_detail/moneybookDetailController.js';
const router = Router();

/**
 * @author 최예진
 * @version 1.0 22.07.08 가계부 상세내역 조회
 */
router.get(
  '/:moneybook_id',
  validate(validator.getMoneybookDetail),
  moneybookDetailController.getMoneybookDetail,
);
/**
 * @author 오주환
 * @version 1.0 22.07.07 가계부 상세내역 생성
 */
router.post(
  '/:moneybook_id',
  validate(validator.createMoneybook),
  moneybookDetailController.createMoneybook,
);
/**
 * @author 오주환
 * @version 1.0 22.07.07 가계부 상세내역 수정
 */
router.patch(
  '/:moneybook_id',
  validate(validator.updateMoneybook),
  moneybookDetailController.updateMoneybook,
);
/**
 * @author 오주환
 * @version 1.0 22.07.07 가계부 상세내역 삭게
 */
router.delete(
  '/:moneybook_id',
  validate(validator.deleteMoneybook),
  moneybookDetailController.deleteMoneybook,
);
/**
 * @author 오주환
 * @version 1.0 22.07.07 가계부 상세내역 복구
 */
router.patch(
  '/recovery/:moneybook_id',
  validate(moneybookDetailController.recoverMoneybook),
  moneybookDetailController.recoverMoneybook,
);
router.get(
  '/:moneybook_id',
  validate(validator.getAnotherUsersMoneybook),
  moneybookDetailController.getAnotherUsersMoneybook,
);

export default router;
