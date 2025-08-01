import ApiKey from '../../ApiKey';
import urlParser from '../../../parsers/urlParser';
export default Object.freeze({
    getBraidingCategoryPlanList: urlParser([ApiKey.braidingCategoryPlan, ApiKey.list]),
  });