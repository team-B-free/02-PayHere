import userService from '../../services/user/userService.js';
import statusCode from '../../utils/statusCode.js';
import { errResponse } from '../../utils/response.js';
import message from '../../utils/responseMessage.js';


const userController = {
  getTest: (req, res) => {
    res.send("Test");
  },

  /** 회원정보 수정 API
   * @author 강채현
   * @version 1.0
   */
  editUser: async (req, res) => {
    const { userId } = req;
    const {
        new_nickname: newNickName,
        new_mbti: newMbti,
        new_password: newPassword
    } = req.body

    try {  
      // (DB) USER SELECT query 및 Vaildation
      const userInfo = userService.getUser(userId);
      if(!userInfo.data) {
        return res
          .status(userInfo.status)
          .send(userInfo);
      }

      // (DB) USER UPDATE query 및 Validation
      const editResultInfo = userService.editUser(userInfo.data, newNickName, newMbti, newPassword);
      if(!editResultInfo.data) {
        return res
          .status(editResultInfo.status)
          .send(editResultInfo);
      }

      return res
        .status(editResultInfo.status)
        .send(editResultInfo)
    } catch(err) {
      console.log(err);
      return res
        .status(statusCode.INTERNAL_SERVER_ERROR)
        .send(errResponse(statusCode.INTERNAL_SERVER_ERROR, message.INTERNAL_SERVER_ERROR));
    }
  },

  /** 회원정보 삭제 API
   * @author 강채현
   * @version 1.0
   */
  deleteUser: async (req, res) => {
    const { userId } = req;

    try {
      // (DB) USER SELECT query 및 Vaildation
      const userInfo = userService.getUser(userId);
      if(!userInfo.data) {
        return res
          .status(userInfo.status)
          .send(userInfo);
      }
      
      // (DB) USER DELETE query 및 Vaildation
      const delResultInfo = await userService.deleteUser(userInfo.data);
      if(!delResultInfo.data) {
        return res
          .status(delResultInfo.status)
          .send(delResultInfo);
      }
      
      return res
          .status(delResultInfo.status)
          .send(delResultInfo)
    } catch(err) {
      console.log(err);
      return res
      .status(statusCode.INTERNAL_SERVER_ERROR)
      .send(errResponse(statusCode.INTERNAL_SERVER_ERROR, message.INTERNAL_SERVER_ERROR));
    }
  },

  login: async (req, res) => {
    const { email, password } = req.body;
    const [statusCode, result] = await userService.login(email, password);

    return res
      .status(statusCode)
      .send(result);
  },

  resignToken: async (req, res) => {
    const { authorization, refreshtoken: refreshToken } = req.headers;
    const accessToken = authorization.split(' ').reverse()[0];

    const [statusCode, result] = await userService.resignToken(accessToken, refreshToken);

    return res
      .status(statusCode)
      .send(result);
  },

  signUp: async (req, res) => {
    const { email, password, nickname } = req.body;

    const [statusCode, result] = await userService.signUp(email, password, nickname);

    return res
      .status(statusCode)
      .send(result);
  },

  logout: async (req, res) => {
    const { userId } = req;
    const [statusCode, result] = await userService.logout(userId);

    return res
      .status(statusCode)
      .send(result);
  }
};

export default userController;
