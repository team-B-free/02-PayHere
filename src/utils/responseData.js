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
  };
};

const getMoneybookDetailResponse = (moneybookOwnerId, detail, comments) => {
  return {
    user_id: moneybookOwnerId,
    moneybook_detail: detail,
    comments,
  };
};

export {
  loginResponse,
  resignTokenResponse,
  signUpResponse,
  getMoneybookDetailResponse,
};
