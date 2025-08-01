import store from '../../../../store/store';

import MenuItem from '../../MenuItem';

import UserManagement from '../../../../components/SystemManagement/UserManagement/UserManagement';
import AddUserManagement from '../../../../components/SystemManagement/UserManagement/AddUserManagement/AddUserManagement';
import EditUserManagement from '../../../../components/SystemManagement/UserManagement/EditUserManagement/EditUserManagement';

import Path from '../../../path/path';
import { userHasRole } from '../../../auth/auth';

const language = store.getState().language.languageInfo.languageObject;

const addUserManagement = new MenuItem({
  name: language.systemManagement.subMenus.addUserManagement,
  path: Path.addUserManagementPath,
  component: AddUserManagement,
  display: () => userHasRole(151),
});

const editUserManagement = new MenuItem({
  name: language.systemManagement.subMenus.editUserManagement,
  path: Path.editUserManagementPath,
  component: EditUserManagement,
  display: () => userHasRole(85),
});

const userManagement = new MenuItem({
  name: language.systemManagement.subMenus.userManagement,
  path: Path.userManagementPath,
  component: UserManagement,
  subMenus: [addUserManagement, editUserManagement],
  display: () => userHasRole(109),
});

export default userManagement;
