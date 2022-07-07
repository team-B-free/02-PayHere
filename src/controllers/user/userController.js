import userService from '../../services/user/userService.js';

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
