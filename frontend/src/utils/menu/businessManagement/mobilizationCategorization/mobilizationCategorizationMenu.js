import store from '../../../../store/store';

import MenuItem from '../../MenuItem';

import MobilizationCategorization from '../../../../components/BusinessManagement/MobilizationCategorization/MobilizationCategorization';
import AddMobilizationCategorization from '../../../../components/BusinessManagement/MobilizationCategorization/AddMobilizationCategorization/AddMobilizationCategorization';
import EditMobilizationCategorization from '../../../../components/BusinessManagement/MobilizationCategorization/EditMobilizationCategorization/EditMobilizationCategorization';

import Path from '../../../path/path';
import { userHasRole } from '../../../auth/auth';

const language = store.getState().language.languageInfo.languageObject;

const addMobilizationCategorization = new MenuItem({
  name: language.businessManagement.subMenus.addMobilizationCategorization,
  path: Path.addMobilizationCategorizationPath,
  component: AddMobilizationCategorization,
  display: () => userHasRole(127),
});

const editMobilizationCategorization = new MenuItem({
  name: language.businessManagement.subMenus.editMobilizationCategorization,
  path: Path.editMobilizationCategorizationPath,
  component: EditMobilizationCategorization,
  display: () => userHasRole(128),
});

const mobilizationCategorization = new MenuItem({
  name: language.businessManagement.subMenus.mobilizationCategorization,
  path: Path.mobilizationCategorizationPath,
  component: MobilizationCategorization,
  subMenus: [addMobilizationCategorization, editMobilizationCategorization],
  display: () => userHasRole(95),
});

export default mobilizationCategorization;
