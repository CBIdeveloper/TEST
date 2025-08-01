import store from '../../../../store/store';

import MenuItem from '../../MenuItem';

import MobilizationAccess from '../../../../components/BusinessManagement/MobilizationAccess/MobilizationAccess';
import AddMobilizationAccess from '../../../../components/BusinessManagement/MobilizationAccess/AddMobilizationAccess/AddMobilizationAccess';
import EditMobilizationAccess from '../../../../components/BusinessManagement/MobilizationAccess/EditMobilizationAccess/EditMobilizationAccess';

import Path from '../../../path/path';
import { userHasRole } from '../../../auth/auth';

const language = store.getState().language.languageInfo.languageObject;

const addMobilizationAccess = new MenuItem({
  name: language.businessManagement.subMenus.addMobilizationAccess,
  path: Path.addMobilizationAccessPath,
  component: AddMobilizationAccess,
  display: () => userHasRole(130),
});

const editMobilizationAccess = new MenuItem({
  name: language.businessManagement.subMenus.editMobilizationAccess,
  path: Path.editMobilizationAccessPath,
  component: EditMobilizationAccess,
  display: () => userHasRole(131),
});

const mobilizationAccess = new MenuItem({
  name: language.businessManagement.subMenus.mobilizationAccess,
  path: Path.mobilizationAccessPath,
  component: MobilizationAccess,
  subMenus: [addMobilizationAccess, editMobilizationAccess],
  display: () => userHasRole(96),
});

export default mobilizationAccess;
