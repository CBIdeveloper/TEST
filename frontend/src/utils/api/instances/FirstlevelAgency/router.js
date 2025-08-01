import ApiKey from '../../ApiKey';
import urlParser from '../../../parsers/urlParser';

export default Object.freeze({
  createFirstlevelAgency: ApiKey.firstlevelAgency,
  updateFirstlevelAgency: (id) => urlParser([ApiKey.firstlevelAgency, id]),
  deleteFirstlevelAgency: (id) => urlParser([ApiKey.firstlevelAgency, id]),
  getFirstlevelAgencyList: urlParser([ApiKey.firstlevelAgency, ApiKey.list]),
});
