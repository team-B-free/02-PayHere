import Moneybook from "../../models/moneybook.js";

const moneybookService = {
  updateMoneybook: async (req) => {
    /**
     * @author 오주환
     * @version 1.0 22.07.06 가계부 수정
     */
    // 1.미들웨어 토큰 정보
    // const userInfo = req.userInfo;
    // 2.Header 토큰 정보
    const { moneybook_idx } = req.params;
    const { title, is_shared } = req.body;
    const authorization = req.header("Authorization");

    if (authorization === undefined) {
      return 0;
    }

    try {
      const moneybook = await Moneybook.update(
        {
          title,
          is_shared,
        },
        {
          where: { id: moneybook_idx },
        }
      );
      return moneybook;
    } catch (err) {
      console.error(err);
    }

    return moneybook_idx;
  },
};

export default moneybookService;
