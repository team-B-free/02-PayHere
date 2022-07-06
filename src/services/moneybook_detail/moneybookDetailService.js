import MoneybookDetail from "../../models/moneybookDetail.js";
import Moneybook from "../../models/moneybook.js";

const moneybookDetailService = {
  createMoneybook: async (req) => {
    /**
     * @author 오주환
     * @version 1.0 22.07.07 가계부 상세내역
     */
    // 1.미들웨어 토큰 정보
    // const userInfo = req.userInfo;
    // 2.Header 토큰 정보
    const authorization = req.header("Authorization");

    if (authorization === undefined) {
      return 0;
    }

    const { money, memo, money_type } = req.body;
    try {
      const moneybook = await MoneybookDetail.create({
        money,
        memo,
        money_type,
        moneybook_id: 55,
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
    // 1.미들웨어 토큰 정보
    // const userInfo = req.userInfo;
    // 2.Header 토큰 정보
    const authorization = req.header("Authorization");

    if (authorization === undefined) {
      return 0;
    }

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

    return result;
  },
  updateMoneybook: async (req) => {
    /**
     * @author 오주환
     * @version 1.0 22.07.07 가계부 상세내역 수정
     */
    // 1.미들웨어 토큰 정보
    // const userInfo = req.userInfo;
    // 2.Header 토큰 정보
    const { moneybook_id } = req.params;
    const { money, memo, money_type } = req.body;
    const authorization = req.header("Authorization");

    if (authorization === undefined) {
      return -1;
    }

    const moneybook = await MoneybookDetail.update(
      {
        money,
        memo,
        money_type,
      },
      {
        where: { moneybook_id },
      }
    );

    return moneybook;
  },
  deleteMoneybook: (req, res) => {},
  recoverMoneybook: (req, res) => {},
};

export default moneybookDetailService;
