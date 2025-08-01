import store from '../../../../store/store';

import MenuItem from '../../MenuItem';

import MobilizationPlanManagement from '../../../../components/SystemManagement/MobilizationPlanManagement/MobilizationPlanManagement';
import AddMobilizationPlanManagement from '../../../../components/SystemManagement/MobilizationPlanManagement/AddMobilizationPlanManagement/AddMobilizationPlanManagement';

import Path from '../../../path/path';
import { userHasRole } from '../../../auth/auth';

const language = store.getState().language.languageInfo.languageObject;

const addMobilizationPlanManagement = new MenuItem({
  name: language.systemManagement.subMenus.addMobilizationPlanManagement,
  path: Path.addMobilizationPlanManagementPath,
  component: AddMobilizationPlanManagement,
  display: () => userHasRole(45),
});

const mobilizationPlanManagement = new MenuItem({
  name: language.systemManagement.subMenus.mobilizationPlanManagement,
  path: Path.mobilizationPlanManagementPath,
  component: MobilizationPlanManagement,
  subMenus: [addMobilizationPlanManagement],
  display: () => userHasRole(112),
});

export default mobilizationPlanManagement;
