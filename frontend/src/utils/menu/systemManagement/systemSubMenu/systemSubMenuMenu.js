import store from '../../../../store/store';

import MenuItem from '../../MenuItem';

import SystemSubMenu from '../../../../components/SystemManagement/SystemSubMenu/SystemSubMenu';
import AddSystemSubMenu from '../../../../components/SystemManagement/SystemSubMenu/AddSystemSubMenu/AddSystemSubMenu';
import EditSystemSubMenu from '../../../../components/SystemManagement/SystemSubMenu/EditSystemSubMenu/EditSystemSubMenu';

import Path from '../../../path/path';
import { userHasRole } from '../../../auth/auth';

const language = store.getState().language.languageInfo.languageObject;

const addSystemSubMenu = new MenuItem({
  name: language.systemManagement.subMenus.addSystemSubMenu,
  path: Path.addSystemSubMenuPath,
  component: AddSystemSubMenu,
  display: () => userHasRole(39),
});

const editSystemSubMenu = new MenuItem({
  name: language.systemManagement.subMenus.editSystemSubMenu,
  path: Path.editSystemSubMenuPath,
  component: EditSystemSubMenu,
  display: () => userHasRole(40),
});

const systemSubMenu = new MenuItem({
  name: language.systemManagement.subMenus.systemSubMenu,
  path: Path.systemSubMenuPath,
  component: SystemSubMenu,
  subMenus: [addSystemSubMenu, editSystemSubMenu],
  hide: true,
  display: () => userHasRole(115),
});

export default systemSubMenu;
