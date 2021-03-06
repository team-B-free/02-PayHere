const message = {
  SUCCESS: "성공",
  NO_CONTENT: "콘텐츠 없음",
  BAD_REQUEST: "잘못된 요청",
  UNAUTHORIZED: "인증 실패",
  FORBIDDEN: "Forbidden",
  NOT_FOUND: "존재하지 않는 자원",
  INTERNAL_SERVER_ERROR: "서버 내부 오류",

  //로그인 관련
  INVALID_USER_INFO: "존재하지 않는 회원정보",
  NULL_VALUE_ACEESS_TOKEN: "token 필요",
  ACCESS_TOKEN_EXPIRES: "token 만료",
  INVALID_ACCESS_TOKEN: "token 검증 실패",

  REFRESH_TOKEN_UNNECESSARY: "token 갱신 불필요",

  //회원가입 관련
  ALREADY_EXIST_EMAIL: "이미 존재하는 이메일",
  ALREADY_EXIST_NICKNAME: "이미 존재하는 닉네임",

  //가계부 상세 관련
  INVALID_MONEYBOOK_ID: "존재하지 않는 moneybook_id",
};

export default message;
