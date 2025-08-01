import ApiKey from '../../ApiKey';
import urlParser from '../../../parsers/urlParser';

export default Object.freeze({
  createBraidingCategory: ApiKey.braidingCategory,
  updateBraidingCategory: (id) => urlParser([ApiKey.braidingCategory, id]),
  deleteBraidingCategory: (id) => urlParser([ApiKey.braidingCategory, id]),
  getBraidingCategoryList: urlParser([ApiKey.braidingCategory, ApiKey.list]),
});
