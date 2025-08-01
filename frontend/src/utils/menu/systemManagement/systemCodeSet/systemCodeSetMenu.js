import store from '../../../../store/store';

import MenuItem from '../../MenuItem';

import SystemCodeSet from '../../../../components/SystemManagement/SystemCodeSet/SystemCodeSet';
import AddSystemCodeSet from '../../../../components/SystemManagement/SystemCodeSet/AddSystemCodeSet/AddSystemCodeSet';
import EditSystemCodeSet from '../../../../components/SystemManagement/SystemCodeSet/EditSystemCodeSet/EditSystemCodeSet';

import Path from '../../../path/path';
import { userHasRole } from '../../../auth/auth';

const language = store.getState().language.languageInfo.languageObject;

const addSystemCodeSet = new MenuItem({
  name: language.systemManagement.subMenus.addSystemCodeSet,
  path: Path.addSystemCodeSetPath,
  component: AddSystemCodeSet,
  display: () => userHasRole(26),
});

const editSystemCodeSet = new MenuItem({
  name: language.systemManagement.subMenus.editSystemCodeSet,
  path: Path.editSystemCodeSetPath,
  component: EditSystemCodeSet,
  display: () => userHasRole(27),
});

const systemCodeSet = new MenuItem({
  name: language.systemManagement.subMenus.systemCodeSet,
  path: Path.systemCodeSetPath,
  component: SystemCodeSet,
  subMenus: [addSystemCodeSet, editSystemCodeSet],
  hide: true,
  display: () => userHasRole(114),
});

export default systemCodeSet;
