import ApiKey from '../../ApiKey';
import urlParser from '../../../parsers/urlParser';
export default Object.freeze({
  getRequestSignList: (id) =>
    urlParser([ApiKey.businessManagementTest, ApiKey.request, ApiKey.sign, id]),
});
