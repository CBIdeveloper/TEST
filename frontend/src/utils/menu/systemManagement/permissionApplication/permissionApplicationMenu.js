import store from '../../../../store/store';

import MenuItem from '../../MenuItem';

import PermissionApplication
    from '../../../../components/SystemManagement/PermissionApplication/PermissionApplication';
import PermissionApplicationDetail
    from '../../../../components/SystemManagement/PermissionApplication/PermissionApplicationDetail/PermissionApplicationDetail';

import Path from '../../../path/path';
import {userHasRole} from '../../../auth/auth';
import AddPermissionApplication
    from "../../../../components/SystemManagement/PermissionApplication/AddPermissionApplication/AddPermissionApplication";

const language = store.getState().language.languageInfo.languageObject;

const permissionApplicationDetail = new MenuItem({
    name: language.systemManagement.subMenus.permissionApplicationDetail,
    path: Path.permissionApplicationDetailPath,
    component: PermissionApplicationDetail,
    display: () => userHasRole(167),
});

const addPermissionApplication = new MenuItem({
    name: language.systemManagement.subMenus.addPermissionApplication,
    path: Path.addPermissionApplicationPath,
    component: AddPermissionApplication,
    display: () => userHasRole(166),
});

const permissionApplication = new MenuItem({
    name: language.systemManagement.subMenus.systemPermissionApplication,
    path: Path.permissionApplicationPath,
    component: PermissionApplication,
    subMenus: [permissionApplicationDetail, addPermissionApplication],
    display: () => userHasRole(165),
});

export default permissionApplication;
