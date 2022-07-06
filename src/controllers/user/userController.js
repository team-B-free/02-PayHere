import { signTokens } from '../../utils/jwtUtil.js';
import userService from '../../services/user/userService.js';
import { response, errResponse } from '../../utils/response.js';
import statusCode from '../../utils/statusCode.js';
import message from '../../utils/responseMessage.js'
import { loginResponse } from '../../utils/responseData.js';

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
};

export default userController;
