import ApiKey from '../../ApiKey';
import urlParser from '../../../parsers/urlParser';

export default Object.freeze({
  createFirstlevelUnit: ApiKey.firstlevelUnit,
  updateFirstlevelUnit: (id) => urlParser([ApiKey.firstlevelUnit, id]),
  getFirstlevelUnitList: urlParser([ApiKey.firstlevelUnit, ApiKey.list]),
});
