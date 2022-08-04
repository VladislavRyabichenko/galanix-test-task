const format = (value) => {
  return value < 10 ? "0".concat(String(value)) : value;
};

export const getDate = () => {
  const date = new Date();
  return {
    number: format(date.getDate()),
    month: format(date.getMonth()),
    year: format(date.getFullYear()),
    hours: format(date.getHours()),
    mins: format(date.getMinutes()),
    sec: format(date.getSeconds()),
  };
};
