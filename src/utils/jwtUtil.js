import dotenv from "dotenv";
dotenv.config();

import { promisify } from "util";
import jwt from "jsonwebtoken";
import redisClient from "../config/redis.js";
import { resignTokenStatus } from "./constants.js";

const jwtSecret = process.env.JWT_SECRET;

//access token 발급
export const signAccessToken = (userId) => {
  const payload = {
    userId,
  };

  return jwt.sign(payload, jwtSecret, {
    algorithm: "HS256",
    expiresIn: "1h",
  });
};

//access token 검증
export const verifyAccessToken = (token) => {
  let decoded = null;
  try {
    decoded = jwt.verify(token, jwtSecret);

    return {
      ok: true,
      userId: decoded.userId,
    };
  } catch (err) {
    return {
      ok: false,
      message: err.message,
    };
  }
};

//refresh token 발급
export const signRefreshToken = () => {
  return jwt.sign({}, jwtSecret, {
    algorithm: "HS256",
    expiresIn: "14d",
  });
};

//refresh token 검증
export const verifyRefreshToken = async (token, userId) => {
  const getAsync = promisify(redisClient.get).bind(redisClient);

  try {
    const data = await getAsync(String(userId));
    if (token === data) {
      try {
        jwt.verify(token, jwtSecret);
        return true;
      } catch (err) {
        return false;
      }
    } else {
      return false;
    }
  } catch (err) {
    return false;
  }
};

//access token, refresh token 발급
export const signTokens = async (userId) => {
  const accessToken = signAccessToken(userId);
  const refreshToken = signRefreshToken();

  await redisClient.set(String(userId), refreshToken); //발급한 refresh token을 redis에 저장

  return { accessToken, refreshToken };
};

/*
  access token 재발급

  토큰 재발급 시나리오
  1. access token 만료, refresh token 만료 => 새로 로그인 필요
  2. access token 만료, refresh token 만료x => 새로운 access token 발급
  3. access token 만료x => refresh 필요x
*/
export const resignAccessToken = async (accessToken, refreshToken) => {
  const accessTokenResult = verifyAccessToken(accessToken);
  const decoded = jwt.decode(accessToken);

  if (decoded === null) {
    return [resignTokenStatus.UNAUTHORIZED];
  }

  const { userId } = decoded;
  const refreshTokenResult = verifyRefreshToken(refreshToken, userId);

  if (accessTokenResult.message.includes("expires")) {
    //토큰 재발급 시나리오1
    if (refreshTokenResult.ok === false) {
      return [resignTokenStatus.UNAUTHORIZED];
    }
    //토큰 재발급 시나리오2
    else {
      const newAccessToken = signAccessToken(userId);
      return [resignTokenStatus.RESIGN_ACCESS_TOKEN, newAccessToken];
    }
  }
  //토큰 재발급 시나리오3
  else {
    return [resignTokenStatus.UNNECESSARY];
  }
};
