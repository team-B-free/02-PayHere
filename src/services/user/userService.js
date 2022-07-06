import User from "../../models/user.js";
import Moneybook from "../../models/moneybook.js";
import { getTimeToDate } from "./../../modules/measureTime.js";

const userService = {
  signupUser: async (req) => {
    const { nickname, email, password, mbti } = req.body;
    try {
      const user = await User.create({
        nickname,
        email,
        password,
        mbti,
      });
      return user;
    } catch (err) {
      console.error(err);
    }
  },
  readAllMoneybookByDate: async (req) => {
    /**
     * @author 오주환
     * @version 1.0 22.07.07 가계부 조회(날짜) 생성
     */
    // 1.미들웨어 토큰 정보
    // const userInfo = req.userInfo;
    // 2.Header 토큰 정보
    const authorization = req.header("Authorization");

    if (authorization === undefined) {
      return 0;
    }

    const { startDate, endDate } = getTimeToDate(req.query);

    if (startDate === undefined || endDate === undefined) {
      return 0;
    } else {
      const result = Moneybook.sequelize.query(
        `SELECT id, title, is_shared, view, created_at FROM moneybook WHERE user_id=4 AND created_at >= '${startDate}' AND created_at <= '${endDate}';`,
        { model: Moneybook }
      );

      return result;
    }
  },
  createMoneybook: async (req) => {
    /**
     * @author 오주환
     * @version 1.0 22.07.06 가계부 생성
     */
    // 1.미들웨어 토큰 정보
    // const userInfo = req.userInfo;
    // 2.Header 토큰 정보
    const authorization = req.header("Authorization");

    console.log(authorization);

    if (authorization === undefined) {
      return 0;
    }

    const { title, is_shared, view } = req.body;
    try {
      const moneybook = await Moneybook.create({
        title,
        is_shared,
        view,
        user_id: 2,
      });
      return moneybook;
    } catch (error) {
      console.error(error);
    }
  },
};

export default userService;
