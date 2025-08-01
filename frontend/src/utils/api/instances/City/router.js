import ApiKey from '../../ApiKey';
import urlParser from '../../../parsers/urlParser';

export default Object.freeze({
  createCity: ApiKey.city,
  updateCity: (id) => urlParser([ApiKey.city, id]),
  getCityList: urlParser([ApiKey.city, ApiKey.list]),
});
