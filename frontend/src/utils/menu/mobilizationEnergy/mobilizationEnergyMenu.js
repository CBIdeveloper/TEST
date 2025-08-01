import store from '../../../store/store';

import MenuItem from '../MenuItem';

import MobilizationEnergy from '../../../components/MobilizationEnergy/MobilizationEnergy';

import Dashboard from '../../../components/MobilizationEnergy/Dashboard/Dashboard';
import ReportSearch from '../../../components/MobilizationEnergy/ReportSearch/ReportSearch';

import Path from '../../path/path';
import { userHasRole } from '../../auth/auth';

const language = store.getState().language.languageInfo.languageObject;

const dashboard = new MenuItem({
  name: language.mobilizationEnergy.subMenus.dashboard,
  path: Path.dashboardPath,
  component: Dashboard,
  display: () => userHasRole(90),
});

const reportSearch = new MenuItem({
  name: language.mobilizationEnergy.subMenus.reportSearch,
  path: Path.reportSearchPath,
  component: ReportSearch,
  display: () => userHasRole(91),
});

const mobilizationEnergy = new MenuItem({
  name: language.mobilizationEnergy.title,
  path: Path.mobilizationEnergyPath,
  component: MobilizationEnergy,
  subMenus: [dashboard, reportSearch],
});

export default mobilizationEnergy;
