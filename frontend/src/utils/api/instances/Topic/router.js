import ApiKey from '../../ApiKey';
import urlParser from '../../../parsers/urlParser';
export default Object.freeze({
  getTopicList: (id) =>
    urlParser([ApiKey.businessManagementTest, ApiKey.topic, id]),
});
