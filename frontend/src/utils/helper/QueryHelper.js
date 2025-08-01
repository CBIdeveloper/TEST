const queryCreator = (action, name, value, type) => {
  if (Array.isArray(name) && name.length > 1) {
    const [field, ...rest] = name;
    return `{ ${field}: ${queryCreator(action, rest, value, type)} }`;
  }
  return type === 'string'
    ? `{ ${name}: { ${action}: "${value}" } }`
    : `{ ${name}: { ${action}: ${value} } }`;
};

const equal = (name, value, type) => queryCreator('eq', name, value, type);
const notEqual = (name, value, type) => queryCreator('neq', name, value, type);
const contains = (name, value, type) =>
  queryCreator('contains', name, value, type);

const include = (name, value, type) => queryCreator('in', name, value, type);
const notInclude = (name, value, type) =>
  queryCreator('nin', name, value, type);

const boolean = (name, value) => `{ ${name}: { eq: ${value} } }`;

const dateRange = (name, start, end) =>
  `{ ${name}: { gte: "${start}" } } { ${name}: { lte: "${end}" } }`;

const greater = (name, value) => `{ ${name}: { gte: "${value}" } }`;
const lt = (name, value) => `{ ${name}: { lt: "${value}" } }`;
const less = (name, value) => `{ ${name}: { lte: "${value}" } }`;

const singleQuery = (query) => `where: ${query}`;
const multipleAndQuery = (queryList) =>
  `where: { and: [ ${queryList.filter((item) => item !== null).join(', ')} ] }`;
const multipleOrQuery = (queryList) =>
  `where: { or: [ ${queryList.filter((item) => item !== null).join(', ')} ] }`;

const andQuery = (queryList) =>
  `{and: [ ${queryList.filter((item) => item !== null).join(', ')} ]}`;

const orQuery = (queryList) =>
  `{or: [ ${queryList.filter((item) => item !== null).join(', ')} ]}`;

export default {
  equal,
  notEqual,
  contains,

  include,
  notInclude,

  boolean,

  dateRange,

  greater,
  lt,
  less,

  singleQuery,
  multipleAndQuery,
  multipleOrQuery,

  andQuery,
  orQuery,
};
