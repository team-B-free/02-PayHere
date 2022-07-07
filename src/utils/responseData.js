const loginResponse = (accessToken, refreshToken) => {
  return {
    accessToken,
    refreshToken,
  };
};

const resignTokenResponse = (accessToken, refreshToken) => {
  return {
    accessToken,
    refreshToken,
  };
};

const signUpResponse = (accessToken, refreshToken) => {
  return {
    accessToken,
    refreshToken,
  }
}

export {
  loginResponse,
  resignTokenResponse,
  signUpResponse,
};