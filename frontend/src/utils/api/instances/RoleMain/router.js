import ApiKey from '../../ApiKey';
import urlParser from '../../../parsers/urlParser';

export default Object.freeze({
  createRoleMain: ApiKey.roleMain,
  updateRoleMain: (id) => urlParser([ApiKey.roleMain, id]),
  deleteRoleMain: (id) => urlParser([ApiKey.roleMain, id]),
});
