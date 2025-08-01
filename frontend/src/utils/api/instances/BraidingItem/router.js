import ApiKey from '../../ApiKey';
import urlParser from '../../../parsers/urlParser';

export default Object.freeze({
  getBraidingItemList: (id) =>
    urlParser([ApiKey.braidingItem, id]),
});
