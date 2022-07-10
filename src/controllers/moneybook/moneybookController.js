import moneybookService from './../../services/moneybook/moneybookService.js';
import statusCode from './../../utils/statusCode.js';
import message from './../../utils/responseMessage.js';
import { errResponse, response } from './../../utils/response.js';

const moneybookController = {
  getMbtiTypeMoneybook: async (req, res, next) => {
    /**
     * @author 박성용
     * @version 1.0 22.7.6 최초 작성
     *
     * @author 박성용
     * @version 1.1 22.7.7
     * 코드 리팩터링
     *
     *  @author 박성용
     *  @version 1.2 22.7.8
     * 가계부 생성시 공유 여부에 따라 mbti별 조회하여가게부를 보여준다
     *
     */
    // 쿼리 스트링 요청이 type이라면  쿼리를 getAnotherUsersMoneybook로 보냅니다
    // eslint-disable-next-line no-prototype-builtins
    if (req.query.hasOwnProperty('type')) {
      next();
    } else {
      let { mbti } = req.query;
      // mbti 요청이 비어있으면 BAD_REQUEST 응답
      if (mbti === '') {
        return res
          .status(statusCode.BAD_REQUEST)
          .send(errResponse(statusCode.BAD_REQUEST, message.BAD_REQUEST));
      }
      try {
        const result = await moneybookService.mbtiMoneybook(mbti);
        return res.status(result.status).send(result);
      } catch (err) {
        console.log(err);
        return res
          .status(statusCode.BAD_REQUEST)
          .send(errResponse(statusCode.BAD_REQUEST, message.BAD_REQUEST));
      }
    }
  },

  setDeleteMoneybook: async (req, res) => {
    /**
     * @author 박성용
     * @version 1.0 22.7.6
     * 가계부id 파라미터 요청시 해당 id의 가계부 제거
     *
     * @author 박성용
     * @version 1.2 22.7.8
     * 로그인한 유저 정보를 받아 유저가 생성한 가계부 내역 중 파라미터 요청과 일치하는 가계부만 제거
     */
    const { userId } = req;
    const { moneybook_id } = req.params;

    try {
      const delMoneybook = await moneybookService.deleteMoneybook(
        userId,
        moneybook_id,
      );
      return res.status(delMoneybook.status).send(delMoneybook);
    } catch (err) {
      console.log(err);
      return res
        .status(statusCode.BAD_REQUEST)
        .send(errResponse(statusCode.BAD_REQUEST, message.BAD_REQUEST));
    }
  },

  setRestoreMoneyBook: async (req, res) => {
    /**
     * @author 박성용
     * @version 1.0 22.7.6
     * 가계부id 파라미터 요청시 해당 id의 가계부 복구
     *
     *  @author 박성용
     * @version 1.1 22.7.8
     * 로그인한 유저 정보를 받아 (로그인한)유저가 삭제한 내역이 있는 가계부 중
     * (가계부id)파라미터 요청과 일치하는 가계부만 복원
     */
    const { userId } = req;
    const { moneybook_id } = req.params;

    try {
      const recoverMoneybook = await moneybookService.restoreMoneybook(
        moneybook_id,
        userId,
      );
      return res.status(recoverMoneybook.status).send(recoverMoneybook);
    } catch (err) {
      console.log(err);
      return res
        .status(statusCode.BAD_REQUEST)
        .send(errResponse(statusCode.BAD_REQUEST, message.BAD_REQUEST));
    }
  },

  updateMoneybook: async (req, res) => {
    /**
     * @author 오주환
     * @version 1.0 22.07.06 가계부 수정
     *
     * @author 박성용
     * @version 1.1 22.07.08 요청 시나리오 별 응답 수정
     */
    const moneybook = await moneybookService.updateMoneybook(req);

    if (moneybook === -1) {
      return res
        .status(statusCode.UNAUTHORIZED)
        .send(errResponse(statusCode.UNAUTHORIZED, message.UNAUTHORIZED));
    } else if (moneybook === null) {
      return res.send(errResponse(statusCode.BAD_REQUEST, message.BAD_REQUEST));
    } else if (moneybook === 0) {
      return res.send(errResponse(statusCode.NO_CONTENT, message.NO_CONTENT));
    } else if (moneybook === -2) {
      return res.send(
        errResponse(statusCode.CONFLICT, message.CONTENTS_CONFLICT),
      );
    } else {
      return res
        .status(statusCode.CREATED)
        .send(response(statusCode.CREATED, message.SUCCESS, moneybook));
    }
  },
};

export default moneybookController;
