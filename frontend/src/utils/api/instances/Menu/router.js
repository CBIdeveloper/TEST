import ApiKey from '../../ApiKey';
import urlParser from '../../../parsers/urlParser';

export default Object.freeze({
  createMenu: ApiKey.menu,
  updateMenu: (id) => urlParser([ApiKey.menu, id]),
  deleteMenu: (id) => urlParser([ApiKey.menu, id]),
});
