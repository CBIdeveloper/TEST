import ApiKey from '../../ApiKey';
import urlParser from '../../../parsers/urlParser';

export default Object.freeze({
  createRolePermission: ApiKey.rolePermission,
  updateRolePermission: (id) => urlParser([ApiKey.rolePermission, id]),
  deleteRolePermission: (id) => urlParser([ApiKey.rolePermission, id]),
});
