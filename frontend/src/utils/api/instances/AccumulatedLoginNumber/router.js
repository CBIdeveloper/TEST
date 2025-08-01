import ApiKey from '../../ApiKey';
import urlParser from '../../../parsers/urlParser';

export default Object.freeze({
  getAccumulatedLoginNumber: urlParser([ApiKey.accumulatedLoginNumber]),
});
