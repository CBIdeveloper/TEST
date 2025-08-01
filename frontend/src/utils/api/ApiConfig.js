//const productionURL = 'https://adms.mnd.gov.tw/backend'; //正式機
// const productionURL = 'https://localhost/backend'; //測試機
const productionURL = '/backend'; //正式機 + 測試機
const developmentURL = 'https://localhost:61809';
const serverURL =
  process.env.NODE_ENV === 'development' ? developmentURL : productionURL;

export const baseURL = `${serverURL}/api`;

export default {};
