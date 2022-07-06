import { signTokens, resignAccessToken } from '../../utils/jwtUtil.js';
import userService from '../../services/user/userService.js';
import { response, errResponse } from '../../utils/response.js';
import statusCode from '../../utils/statusCode.js';
import message from '../../utils/responseMessage.js'
import { loginResponse, resignTokenResponse } from '../../utils/responseData.js';
import { refreshStatus } from '../../utils/constants.js';

const userController = {
  getTest: (req, res) => {
    res.send("Test");
  },

  login: async (req, res) => {
    const { email, password } = req.body;
    
    const userId = await userService.getUserId(email, password);
    if (userId === null){
      return res
      .status(statusCode.BAD_REQUEST)
      .send(errResponse(statusCode.BAD_REQUEST, message.INVALID_USER_INFO));
    }

    const { accessToken, refreshToken } = await signTokens(userId);
    const data = loginResponse(accessToken, refreshToken);

    return res
      .status(statusCode.OK)
      .send(response(statusCode.OK, message.SUCCESS, data));
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
  }
};

export default userController;
