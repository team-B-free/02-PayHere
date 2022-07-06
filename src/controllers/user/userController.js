import { resignAccessToken } from '../../utils/jwtUtil.js';
import userService from '../../services/user/userService.js';
import { response, errResponse } from '../../utils/response.js';
import statusCode from '../../utils/statusCode.js';
import message from '../../utils/responseMessage.js'
import { resignTokenResponse } from '../../utils/responseData.js';
import { refreshStatus } from '../../utils/constants.js';

const userController = {
  getTest: (req, res) => {
    res.send("Test");
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

    const [result, newAccessToken] = await resignAccessToken(accessToken, refreshToken);

    if (result === refreshStatus.RESIGN_ACCESS_TOKEN){

      const data = resignTokenResponse(newAccessToken, refreshToken);
      return res
        .status(statusCode.OK)
        .send(response(statusCode.SUCCESS, message.SUCCESS, data));
    }
    else if (result === refreshStatus.UNAUTHORIZED){
      return res
        .status(statusCode.UNAUTHORIZED)
        .send(errResponse(statusCode.UNAUTHORIZED, message.FORBIDDEN));
    }
    else if (result === refreshStatus.UNNECESSARY){
      return res
        .status(statusCode.BAD_REQUEST)
        .send(errResponse(statusCode.BAD_REQUEST, message.REFRESH_TOKEN_UNNECESSARY));
    }
  },

  signUp: async (req, res) => {
    const { email, password, nickname } = req.body;
    const [statusCode, result] = await userService.signUp(email, password, nickname);

    return res
      .status(statusCode)
      .send(result);
  }
};

export default userController;
