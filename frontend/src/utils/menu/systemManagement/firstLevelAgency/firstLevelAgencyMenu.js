import store from '../../../../store/store';

import MenuItem from '../../MenuItem';

import FirstLevelAgency from '../../../../components/SystemManagement/FirstLevelAgency/FirstLevelAgency';
import AddFirstLevelAgency from '../../../../components/SystemManagement/FirstLevelAgency/AddFirstLevelAgency/AddFirstLevelAgency';

import Path from '../../../path/path';
import { userHasRole } from '../../../auth/auth';

const language = store.getState().language.languageInfo.languageObject;

const addFirstLevelAgency = new MenuItem({
  name: language.systemManagement.subMenus.addFirstLevelAgency,
  path: Path.addFirstLevelAgencyPath,
  component: AddFirstLevelAgency,
  display: () => userHasRole(29),
});

const firstLevelAgency = new MenuItem({
  name: language.systemManagement.subMenus.firstLevelAgency,
  path: Path.firstLevelAgencyPath,
  component: FirstLevelAgency,
  subMenus: [addFirstLevelAgency],
  display: () => userHasRole(113),
});

export default firstLevelAgency;
