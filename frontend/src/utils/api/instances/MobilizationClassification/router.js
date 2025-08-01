import ApiKey from '../../ApiKey';
import urlParser from '../../../parsers/urlParser';

export default Object.freeze({
  createMobilizationClassification: ApiKey.mobilizationClassification,
  updateMobilizationClassification: (id) =>
    urlParser([ApiKey.mobilizationClassification, id]),
  getMobilizationClassificationList: urlParser([
    ApiKey.mobilizationClassification,
    ApiKey.list,
  ]),
});
