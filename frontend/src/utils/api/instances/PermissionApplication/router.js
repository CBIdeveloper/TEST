import ApiKey from '../../ApiKey';
import urlParser from '../../../parsers/urlParser';

export default Object.freeze({
    createPermissionApplication: ApiKey.permissionApplication,
    deletePermissionApplication: (id) => urlParser([ApiKey.permissionApplication, id]),
    approvePermissionApplication: (id) =>
        urlParser([ApiKey.permissionApplication, ApiKey.approval, id]),
    getPermissionApplicationExpiration: () => urlParser([ApiKey.permissionApplication, ApiKey.expiration]),
    getPlainCode: () => urlParser([ApiKey.permissionApplication, ApiKey.plainCode])
});