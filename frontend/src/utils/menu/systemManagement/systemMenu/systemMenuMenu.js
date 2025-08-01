import store from '../../../../store/store';

import MenuItem from '../../MenuItem';

import SystemMenu from '../../../../components/SystemManagement/SystemMenu/SystemMenu';
import AddSystemMenu from '../../../../components/SystemManagement/SystemMenu/AddSystemMenu/AddSystemMenu';

import Path from '../../../path/path';
import { userHasRole } from '../../../auth/auth';

const language = store.getState().language.languageInfo.languageObject;

const addSystemMenu = new MenuItem({
  name: language.systemManagement.subMenus.addSystemMenu,
  path: Path.addSystemMenuPath,
  component: AddSystemMenu,
  display: () => userHasRole(39),
});

const systemMenu = new MenuItem({
  name: language.systemManagement.subMenus.systemMenu,
  path: Path.systemMenuPath,
  component: SystemMenu,
  subMenus: [addSystemMenu],
  display: () => userHasRole(115),
});

export default systemMenu;
