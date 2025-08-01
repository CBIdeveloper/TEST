import ApiKey from '../../ApiKey';
import urlParser from '../../../parsers/urlParser';
import { baseURL } from '../../ApiConfig';

export default Object.freeze({
  createMobilizationPlan: urlParser([ApiKey.planMobilizationPlan, ApiKey.upload]),
  updateMobilizationPlan: (id) => urlParser([ApiKey.planMobilizationPlan, id]),
  updateMobilizationPlanWithoutFile: (id) => urlParser([ApiKey.planMobilizationPlan, ApiKey.withoutFile, id]),
  deleteMobilizationPlan: (id) => urlParser([ApiKey.planMobilizationPlan, id]),
  downloadMobilizationPlan: (id) => urlParser([ApiKey.planMobilizationPlan, ApiKey.download, id]),
  mobilizationPlanFileLink: (id) => urlParser([baseURL, ApiKey.planMobilizationPlan, ApiKey.download, id]),
});
