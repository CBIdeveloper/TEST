import store from '../../../../store/store';

import MenuItem from '../../MenuItem';

import MobilizationValidation from '../../../../components/BusinessManagement/MobilizationValidation/MobilizationValidation';
import AddMobilizationValidation from '../../../../components/BusinessManagement/MobilizationValidation/AddMobilizationValidation/AddMobilizationValidation';
import EditMobilizationValidation from '../../../../components/BusinessManagement/MobilizationValidation/EditMobilizationValidation/EditMobilizationValidation';

import Path from '../../../path/path';
import { userHasRole } from '../../../auth/auth';

const language = store.getState().language.languageInfo.languageObject;

const addMobilizationValidation = new MenuItem({
  name: language.businessManagement.subMenus.addMobilizationValidation,
  path: Path.addMobilizationValidationPath,
  component: AddMobilizationValidation,
  display: () => userHasRole(136),
});

const editMobilizationValidation = new MenuItem({
  name: language.businessManagement.subMenus.editMobilizationValidation,
  path: Path.editMobilizationValidationPath,
  component: EditMobilizationValidation,
  display: () => userHasRole(137),
});

const mobilizationValidation = new MenuItem({
  name: language.businessManagement.subMenus.mobilizationValidation,
  path: Path.mobilizationValidationPath,
  component: MobilizationValidation,
  subMenus: [addMobilizationValidation, editMobilizationValidation],
  display: () => userHasRole(98),
});

export default mobilizationValidation;
