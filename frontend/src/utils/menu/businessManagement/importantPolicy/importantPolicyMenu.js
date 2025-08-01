import store from '../../../../store/store';

import MenuItem from '../../MenuItem';

import ImportantPolicy from '../../../../components/BusinessManagement/ImportantPolicy/ImportantPolicy';
import AddImportantPolicy from '../../../../components/BusinessManagement/ImportantPolicy/AddImportantPolicy/AddImportantPolicy';
import EditImportantPolicy from '../../../../components/BusinessManagement/ImportantPolicy/EditImportantPolicy/EditImportantPolicy';

import Path from '../../../path/path';
import { userHasRole } from '../../../auth/auth';

const language = store.getState().language.languageInfo.languageObject;

const addImportantPolicy = new MenuItem({
  name: language.businessManagement.subMenus.addImportantPolicy,
  path: Path.addImportantPolicyPath,
  component: AddImportantPolicy,
  display: () => userHasRole(118),
});

const editImportantPolicy = new MenuItem({
  name: language.businessManagement.subMenus.editImportantPolicy,
  path: Path.editImportantPolicyPath,
  component: EditImportantPolicy,
  display: () => userHasRole(119),
});

const importantPolicy = new MenuItem({
  name: language.businessManagement.subMenus.importantPolicy,
  path: Path.importantPolicyPath,
  component: ImportantPolicy,
  subMenus: [addImportantPolicy, editImportantPolicy],
  display: () => userHasRole(92),
});

export default importantPolicy;
