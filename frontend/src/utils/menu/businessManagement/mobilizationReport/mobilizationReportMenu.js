import store from '../../../../store/store';

import MenuItem from '../../MenuItem';

import MobilizationReport from '../../../../components/BusinessManagement/MobilizationReport/MobilizationReport';
import AddMobilizationReport from '../../../../components/BusinessManagement/MobilizationReport/AddMobilizationReport/AddMobilizationReport';
import EditMobilizationReport from '../../../../components/BusinessManagement/MobilizationReport/EditMobilizationReport/EditMobilizationReport';

import Path from '../../../path/path';
import { userHasRole } from '../../../auth/auth';

const language = store.getState().language.languageInfo.languageObject;

const addMobilizationReport = new MenuItem({
  name: language.businessManagement.subMenus.addMobilizationReport,
  path: Path.addMobilizationReportPath,
  component: AddMobilizationReport,
  display: () => userHasRole(145),
});

const editMobilizationReport = new MenuItem({
  name: language.businessManagement.subMenus.editMobilizationReport,
  path: Path.editMobilizationReportPath,
  component: EditMobilizationReport,
  display: () => userHasRole(146),
});

const mobilizationReport = new MenuItem({
  name: language.businessManagement.subMenus.mobilizationReport,
  path: Path.mobilizationReportPath,
  component: MobilizationReport,
  subMenus: [addMobilizationReport, editMobilizationReport],
  display: () => userHasRole(101),
});

export default mobilizationReport;
