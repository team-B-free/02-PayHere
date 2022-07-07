import Moneybook from "../../models/moneybook.js";

const moneybookService = {
  updateMoneybook: async (req) => {
    /**
     * @author 오주환
     * @version 1.0 22.07.06 가계부 수정
     */
    const { moneybook_id } = req.params;
    const { title, is_shared } = req.body;
    const authorization = req.header("Authorization");

    if (authorization === undefined) {
      return -1;
    }

    const moneybook = await Moneybook.update(
      {
        title,
        is_shared,
      },
      {
        where: { id: moneybook_id },
      }
    );
    return moneybook;
  },
};

export default moneybookService;
