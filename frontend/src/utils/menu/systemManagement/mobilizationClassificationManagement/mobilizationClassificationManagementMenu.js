import store from '../../../../store/store';

import MenuItem from '../../MenuItem';

import MobilizationClassificationManagement from '../../../../components/SystemManagement/MobilizationClassificationManagement/MobilizationClassificationManagement';
import AddMobilizationClassificationManagement from '../../../../components/SystemManagement/MobilizationClassificationManagement/AddMobilizationClassificationManagement/AddMobilizationClassificationManagement';

import Path from '../../../path/path';
import { userHasRole } from '../../../auth/auth';

const language = store.getState().language.languageInfo.languageObject;

const addMobilizationClassificationManagement = new MenuItem({
  name: language.systemManagement.subMenus.addMobilizationClassificationManagement,
  path: Path.addMobilizationClassificationManagementPath,
  component: AddMobilizationClassificationManagement,
  display: () => userHasRole(42),
});

const mobilizationClassificationManagement = new MenuItem({
  name: language.systemManagement.subMenus.mobilizationClassificationManagement,
  path: Path.mobilizationClassificationManagementPath,
  component: MobilizationClassificationManagement,
  subMenus: [addMobilizationClassificationManagement],
  hide: true,
  display: () => userHasRole(112),
});

export default mobilizationClassificationManagement;
