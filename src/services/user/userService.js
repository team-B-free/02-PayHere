import Moneybook from "../../models/moneybook.js";
import User from "../../models/user.js";

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
  readAllMoneybook: (req, res) => {
    return res.send("hi");
  },
  createMoneybook: async (req) => {
    /**
     * @author 오주환
     * @version 1.0 22.07.06 가계부 생성
     */
    // 토큰 인증 정보
    // const userInfo = req.userInfo;
    const { title, is_shared, view } = req.body;
    try {
      const moneybook = await Moneybook.create({
        title,
        is_shared,
        view,
        user_id: 1,
      });
      return moneybook;
    } catch (error) {
      console.error(error);
    }
  },
};

export default userService;
