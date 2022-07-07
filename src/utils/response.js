const response = (status, message, data) => {
  return {
    status,
    success: true,
    message,
    data,
  };
};

const errResponse = (status, message, data) => {
  return {
    status,
    success: false,
    message,
    data,
  };
};

export { response, errResponse };
