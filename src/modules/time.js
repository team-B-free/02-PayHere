export const setConvertTime = time => {
  const year = time.slice(0, 4);
  const month = time.slice(4, 6);
  const day = time.slice(-2);

  const dateFormat = "".concat(year + "-" + month + "-" + day);

  return dateFormat;
};
export const setConvertTimePeriod = time => {
  const { start_date, end_date } = time;

  if (start_date >= end_date) {
    return 0;
  } else {
    const startYear = start_date.slice(0, 4);
    const startMonth = start_date.slice(4, 6);
    const startDay = start_date.slice(-2);

    const startDate = "".concat(startYear + "-" + startMonth + "-" + startDay);

    const endYear = end_date.slice(0, 4);
    const endMonth = end_date.slice(4, 6);
    const endDay = end_date.slice(-2);

    const endDate = "".concat(endYear + "-" + endMonth + "-" + endDay);

    return {
      startDate,
      endDate,
    };
  }
};
export const getCurrentTime = () => {
  const date = new Date();

  const year = date.getFullYear();
  const month = ("0" + (date.getMonth() + 1)).slice(-2);
  const day = ("0" + date.getDate()).slice(-2);

  // 결과 : 2022-07-07
  const dateString = year + "-" + month + "-" + day;

  const hours = ("0" + date.getHours()).slice(-2);
  const minutes = ("0" + date.getMinutes()).slice(-2);
  const seconds = ("0" + date.getSeconds()).slice(-2);

  // 결과 : 15:47:29
  const timeString = hours + ":" + minutes + ":" + seconds;

  // 결과 : 2022-07-07 09:29:24
  const totalTime = dateString + " " + timeString;

  return totalTime;
};
