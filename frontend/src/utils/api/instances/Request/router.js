import ApiKey from '../../ApiKey';
import urlParser from '../../../parsers/urlParser';
export default Object.freeze({
  getRequestList: (id) =>
    urlParser([ApiKey.businessManagementTest, ApiKey.request, id]),
});
