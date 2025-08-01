import ApiKey from '../../ApiKey';
import urlParser from '../../../parsers/urlParser';

export default Object.freeze({
  getNonCount: urlParser([ApiKey.dataform, ApiKey.getNonCount]),
  getSendTime: urlParser([ApiKey.dataform, ApiKey.getSendTime]),
  getCount: urlParser([ApiKey.dataform, ApiKey.getCount]),
  getNonCount2: urlParser([ApiKey.dataform, ApiKey.getNonCount,2]),
  getNonReason: urlParser([ApiKey.dataform, ApiKey.getNonReason]),
});
