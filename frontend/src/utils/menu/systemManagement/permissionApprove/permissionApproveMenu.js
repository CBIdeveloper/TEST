import store from '../../../../store/store';

import MenuItem from '../../MenuItem';

import PermissionApprove
    from '../../../../components/SystemManagement/PermissionApprove/PermissionApprove';
import PermissionApproveDetail
    from '../../../../components/SystemManagement/PermissionApprove/PermissionApproveDetail/PermissionApproveDetail';

import Path from '../../../path/path';
import {userHasRole} from '../../../auth/auth';

const language = store.getState().language.languageInfo.languageObject;

const permissionApproveDetail = new MenuItem({
    name: language.systemManagement.subMenus.approvePermissionApplication,
    path: Path.permissionApproveDetailPath,
    component: PermissionApproveDetail,
    display: () => userHasRole(169),
});

const permissionApprove = new MenuItem({
    name: language.systemManagement.subMenus.systemPermissionApprove,
    path: Path.permissionApprovePath,
    component: PermissionApprove,
    subMenus: [permissionApproveDetail],
    display: () => userHasRole(168),
});

export default permissionApprove;