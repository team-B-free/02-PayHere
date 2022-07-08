import { verifyAccessToken } from "../utils/jwtUtil.js";
import { errResponse } from "../utils/response.js";
import statusCode from "../utils/statusCode.js";
import message from "../utils/responseMessage.js";

const authJWT = (req, res, next) => {
  const token = req.headers["authorization"]?.split(" ").reverse()[0];
  console.log("token: ", token);

  if (!token) {
    return res
      .status(statusCode.UNAUTHORIZED)
      .send(
        errResponse(statusCode.UNAUTHORIZED, message.NULL_VALUE_ACEESS_TOKEN),
      );
  }

  const result = verifyAccessToken(token);

  if (result.ok) {
    req.userId = result.userId;
    console.log(req.userId);
    next();
  } else {
    //토큰 만료
    if (result.message.includes("expired")) {
      return res
        .status(statusCode.UNAUTHORIZED)
        .send(
          errResponse(statusCode.UNAUTHORIZED, message.ACCESS_TOKEN_EXPIRES),
        );
    }
    //검증 실패
    return res
      .status(statusCode.UNAUTHORIZED)
      .send(errResponse(statusCode.UNAUTHORIZED, message.INVALID_ACCESS_TOKEN));
  }
};

export default authJWT;
