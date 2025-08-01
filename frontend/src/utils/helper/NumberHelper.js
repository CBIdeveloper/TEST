const fixFloatingPoint = (val) => Number.parseFloat(val.toFixed(2));

const numberWithCommas = (number) => {
  if (number === null || number === undefined || number === '') {
    return '';
  }
  return number.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',');
};

export default {
  fixFloatingPoint,
  numberWithCommas,
};
