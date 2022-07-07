import MoneybookDetail from "../../models/moneybookDetail.js";
import Moneybook from "../../models/moneybook.js";
import { getCurrentTime, setConvertTime } from "../../modules/time.js";

const moneybookDetailService = {
  createMoneybook: async (req) => {
    /**
     * @author 오주환
     * @version 1.0 22.07.07 가계부 상세내역
     */
    const { moneybook_id } = req.params;
    const { money, memo, money_type, occured_at } = req.body;
    const occuredAt = setConvertTime(occured_at);

    try {
      const moneybook = await MoneybookDetail.create({
        money,
        memo,
        money_type,
        moneybook_id,
        occured_at: occuredAt,
      });
      return moneybook;
    } catch (error) {
      console.error(error);
    }
  },
  readAllMoneybook: async (req) => {
    /**
     * @author 오주환
     * @version 1.0 22.07.07 가계부 상세내역 조회
     */
    const { moneybook_id } = req.params;

    const result = await MoneybookDetail.findAll({
      where: {
        moneybook_id,
      },
      include: [
        {
          model: Moneybook,
          attributes: ["user_id"],
        },
      ],
      order: [["createdAt", "DESC"]],
    });

    let moneybookDetailInfo = JSON.parse(JSON.stringify(result));

    const user_id = moneybookDetailInfo[0].MONEYBOOK.user_id;

    for (let element of moneybookDetailInfo) {
      delete element.MONEYBOOK;
    }

    let moneybookDetail = {
      user_id: user_id,
      moneybookDetailInfo: moneybookDetailInfo,
    };

    return moneybookDetail;
  },
  updateMoneybook: async (req) => {
    /**
     * @author 오주환
     * @version 1.0 22.07.07 가계부 상세내역 수정
     */
    const { moneybook_id } = req.params;
    const { money, memo, money_type } = req.body;
    const authorization = req.header("Authorization");

    if (authorization === undefined) {
      return 0;
    }

    const moneybook = await MoneybookDetail.update(
      {
        money,
        memo,
        money_type,
      },
      {
        where: { id: moneybook_id },
      }
    );

    return moneybook;
  },
  deleteMoneybook: async (req) => {
    /**
     * @author 오주환
     * @version 1.0 22.07.07 가계부 상세내역 삭제
     */
    const { moneybook_id } = req.params;
    const currentTime = getCurrentTime();

    const moneybook = await MoneybookDetail.update(
      {
        deletedAt: currentTime,
      },
      {
        where: { id: moneybook_id },
      }
    );

    return moneybook;
  },
  recoverMoneybook: async (req) => {
    /**
     * @author 오주환
     * @version 1.0 22.07.07 가계부 상세내역 복구
     */
    const { moneybook_id } = req.params;
    console.log(moneybook_id);

    const moneybook = await MoneybookDetail.restore({
      where: { id: moneybook_id },
    });

    return moneybook;
  },
};

export default moneybookDetailService;
