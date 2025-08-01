import store from '../../../../store/store';

import MenuItem from '../../MenuItem';

import AccessControl from '../../../../components/SystemManagement/AccessControl/AccessControl';
import AddAccessControl from '../../../../components/SystemManagement/AccessControl/AddAccessControl/AddAccessControl';
import EditAccessControl from '../../../../components/SystemManagement/AccessControl/EditAccessControl/EditAccessControl';

import Path from '../../../path/path';
import { userHasRole } from '../../../auth/auth';

const language = store.getState().language.languageInfo.languageObject;

const addAccessControl = new MenuItem({
  name: language.systemManagement.subMenus.addAccessControl,
  path: Path.addAccessControlPath,
  component: AddAccessControl,
  display: () => userHasRole(75),
});

const editAccessControl = new MenuItem({
  name: language.systemManagement.subMenus.editAccessControl,
  path: Path.editAccessControlPath,
  component: EditAccessControl,
  display: () => userHasRole(76),
});

const accessControl = new MenuItem({
  name: language.systemManagement.subMenus.accessControl,
  path: Path.accessControlPath,
  component: AccessControl,
  subMenus: [addAccessControl, editAccessControl],
  display: () => userHasRole(111),
});

export default accessControl;
