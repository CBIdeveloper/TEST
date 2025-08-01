import store from '../../../../store/store';

import MenuItem from '../../MenuItem';

import MobilizationEvaluation from '../../../../components/BusinessManagement/MobilizationEvaluation/MobilizationEvaluation';
import AddMobilizationEvaluation from '../../../../components/BusinessManagement/MobilizationEvaluation/AddMobilizationEvaluation/AddMobilizationEvaluation';
import EditMobilizationEvaluation from '../../../../components/BusinessManagement/MobilizationEvaluation/EditMobilizationEvaluation/EditMobilizationEvaluation';

import Path from '../../../path/path';
import { userHasRole } from '../../../auth/auth';

const language = store.getState().language.languageInfo.languageObject;

const addMobilizationEvaluation = new MenuItem({
  name: language.businessManagement.subMenus.addMobilizationEvaluation,
  path: Path.addMobilizationEvaluationPath,
  component: AddMobilizationEvaluation,
  display: () => userHasRole(133),
});

const editMobilizationEvaluation = new MenuItem({
  name: language.businessManagement.subMenus.editMobilizationEvaluation,
  path: Path.editMobilizationEvaluationPath,
  component: EditMobilizationEvaluation,
  display: () => userHasRole(134),
});

const mobilizationEvaluation = new MenuItem({
  name: language.businessManagement.subMenus.mobilizationEvaluation,
  path: Path.mobilizationEvaluationPath,
  component: MobilizationEvaluation,
  subMenus: [addMobilizationEvaluation, editMobilizationEvaluation],
  display: () => userHasRole(97),
});

export default mobilizationEvaluation;
