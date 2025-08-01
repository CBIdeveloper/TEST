import ApiKey from '../../ApiKey';
import urlParser from '../../../parsers/urlParser';
export default Object.freeze({
  getRequestAnswerList: (id) =>
    urlParser([
      ApiKey.businessManagementTest,
      ApiKey.request,
      ApiKey.answer,
      id,
    ]),
});
