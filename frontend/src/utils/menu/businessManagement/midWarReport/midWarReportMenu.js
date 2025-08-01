import store from '../../../../store/store';

import MenuItem from '../../MenuItem';

import MidWarReport from '../../../../components/BusinessManagement/MidWarReport/MidWarReport';
import AddMidWarReport from '../../../../components/BusinessManagement/MidWarReport/AddMidWarReport/AddMidWarReport';
import EditMidWarReport from '../../../../components/BusinessManagement/MidWarReport/EditMidWarReport/EditMidWarReport';

import Path from '../../../path/path';
import { userHasRole } from '../../../auth/auth';

const language = store.getState().language.languageInfo.languageObject;

const addMidWarReport = new MenuItem({
  name: language.businessManagement.subMenus.addMidWarReport,
  path: Path.addMidWarReportPath,
  component: AddMidWarReport,
  display: () => userHasRole(148),
});

const editMidWarReport = new MenuItem({
  name: language.businessManagement.subMenus.editMidWarReport,
  path: Path.editMidWarReportPath,
  component: EditMidWarReport,
  display: () => userHasRole(149),
});

const midWarReport = new MenuItem({
  name: language.businessManagement.subMenus.midWarReport,
  path: Path.midWarReportPath,
  component: MidWarReport,
  subMenus: [addMidWarReport, editMidWarReport],
  display: () => userHasRole(103),
});

export default midWarReport;
