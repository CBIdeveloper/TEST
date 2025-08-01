import ApiKey from '../../ApiKey';
import urlParser from '../../../parsers/urlParser';

export default Object.freeze({
  createMobilizationPlan: ApiKey.mobilizationPlan,
  updateMobilizationPlan: (id) => urlParser([ApiKey.mobilizationPlan, id]),
  getMobilizationPlanList: urlParser([ApiKey.mobilizationPlan, ApiKey.list]),
});
