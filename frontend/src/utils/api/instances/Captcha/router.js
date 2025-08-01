import ApiKey from '../../ApiKey';
import urlParser from '../../../parsers/urlParser';

export default Object.freeze({
  getCaptchaImage: urlParser([ApiKey.captcha, ApiKey.getCaptchaImage]),
});
