import store from '../../../../store/store';

import MenuItem from '../../MenuItem';

import MobilizationStrategy from '../../../../components/BusinessManagement/MobilizationStrategy/MobilizationStrategy';
import AddMobilizationStrategy from '../../../../components/BusinessManagement/MobilizationStrategy/AddMobilizationStrategy/AddMobilizationStrategy';
import EditMobilizationStrategy from '../../../../components/BusinessManagement/MobilizationStrategy/EditMobilizationStrategy/EditMobilizationStrategy';

import Path from '../../../path/path';
import { userHasRole } from '../../../auth/auth';

const language = store.getState().language.languageInfo.languageObject;

const addMobilizationStrategy = new MenuItem({
  name: language.businessManagement.subMenus.addMobilizationStrategy,
  path: Path.addMobilizationStrategyPath,
  component: AddMobilizationStrategy,
  display: () => userHasRole(124),
});

const editMobilizationStrategy = new MenuItem({
  name: language.businessManagement.subMenus.editMobilizationStrategy,
  path: Path.editMobilizationStrategyPath,
  component: EditMobilizationStrategy,
  display: () => userHasRole(125),
});

const mobilizationStrategy = new MenuItem({
  name: language.businessManagement.subMenus.mobilizationStrategy,
  path: Path.mobilizationStrategyPath,
  component: MobilizationStrategy,
  subMenus: [addMobilizationStrategy, editMobilizationStrategy],
  display: () => userHasRole(94),
});

export default mobilizationStrategy;
