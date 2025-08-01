const hasKey = (object, key) =>
  Object.prototype.hasOwnProperty.call(object, key);

const hasEmpty = (object) =>
  Object.values(object).some((item) => item === null || item === '');

const createObjectFromArray = ({ values, header }) =>
  Object.fromEntries(header.map((key, index) => [key, values[index]]));

export default {
  hasKey,
  hasEmpty,
  createObjectFromArray,
};
