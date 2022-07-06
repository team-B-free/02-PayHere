export const getTimeToDate = (time) => {
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
