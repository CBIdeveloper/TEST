const safeParseJsonArray = (string) => {
  let parsedJson = [];
  try {
    const jsonString = string.replaceAll("'", '"');
    parsedJson = JSON.parse(jsonString);
  } catch (error) {
    console.error(error);
  }
  return parsedJson;
};

const safeParseJsonObject = (string) => {
  let parsedJson = {};
  try {
    parsedJson = JSON.parse(string);
  } catch (error) {
    console.error(error);
  }
  return parsedJson;
};

export default {
  safeParseJsonArray,
  safeParseJsonObject,
};
