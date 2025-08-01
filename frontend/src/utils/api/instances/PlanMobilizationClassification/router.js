import ApiKey from '../../ApiKey';
import urlParser from '../../../parsers/urlParser';
import { baseURL } from '../../ApiConfig';

export default Object.freeze({
  createMobilizationClassification: urlParser([ApiKey.planMobilizationClassification, ApiKey.upload]),
  updateMobilizationClassification: (id) => urlParser([ApiKey.planMobilizationClassification, id]),
  updateMobilizationClassificationWithoutFile: (id) => urlParser([ApiKey.planMobilizationClassification, ApiKey.withoutFile, id]),
  deleteMobilizationClassification: (id) => urlParser([ApiKey.planMobilizationClassification, id]),
  downloadMobilizationClassification: (id) => urlParser([ApiKey.planMobilizationClassification, ApiKey.download, id]),
  mobilizationClassificationFileLink: (id) => urlParser([baseURL, ApiKey.planMobilizationClassification, ApiKey.download, id]),
});
