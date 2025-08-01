import ApiKey from '../../ApiKey';
import urlParser from '../../../parsers/urlParser';

export default Object.freeze({
  createSecondaryAgency: ApiKey.secondaryAgency,
  updateSecondaryAgency: (id) => urlParser([ApiKey.secondaryAgency, id]),
  getSecondaryAgencyList: urlParser([ApiKey.secondaryAgency, ApiKey.list]),
});
