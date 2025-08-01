import ApiKey from '../../ApiKey';
import urlParser from '../../../parsers/urlParser';

export default Object.freeze({
  getMilitaryCityMappingList: (id) =>
    urlParser([ApiKey.militaryCityMapping,id]),
});
