import { Router } from 'express';
import { validate } from 'express-validation';
import moneybookController from './../../controllers/moneybook/moneybookController.js';
import commentController from './../../controllers/comment/commentController.js';
import * as commentValidator from '../../validations/comment/commentValidator.js';
import * as moneybookValidator from '../../validations/moneybook/moneybookValidator.js';

const router = Router();
/**
 * @author 오주환
 * @version 1.0 22.07.06 가계부 수정
 */
router.patch('/:moneybook_id', moneybookController.updateMoneybook);

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
router.get(
  '/',
  validate(moneybookValidator.getMbtiTypeMoneybook),
  moneybookController.getMbtiTypeMoneybook,
);
router.patch(
  '/recover/:moneybook_id',
  validate(moneybookValidator.setRestoreMoneyBook),
  moneybookController.setRestoreMoneyBook,
);
router.delete(
  '/:moneybook_id/status/',
  validate(moneybookValidator.setDeleteMoneybook),
  moneybookController.setDeleteMoneybook,
);

//댓글 생성
router.post(
  '/comments',
  validate(commentValidator.createComment),
  commentController.createComment,
);
//댓글 수정
router.patch(
  '/comments/:comment_id',
  validate(commentValidator.updateComment),
  commentController.updateComment,
);
//댓글 삭제
router.delete(
  '/comments/:comment_id',
  validate(commentValidator.deleteComment),
  commentController.deleteComment,
);

export default router;
