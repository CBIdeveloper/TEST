import ApiKey from '../../ApiKey';
import urlParser from '../../../parsers/urlParser';

export default Object.freeze({
  createRegulation: ApiKey.regulation,
  updateRegulation: (id) => urlParser([ApiKey.regulation, id]),
  abandonRegulation: (id) => urlParser([ApiKey.regulation, ApiKey.abandon, id]),
  deleteRegulation: (id) => urlParser([ApiKey.regulation, id]),
});
