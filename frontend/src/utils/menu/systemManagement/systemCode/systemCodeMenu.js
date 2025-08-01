import store from '../../../../store/store';

import MenuItem from '../../MenuItem';

import SystemCode from '../../../../components/SystemManagement/SystemCode/SystemCode';
import AddSystemCode from '../../../../components/SystemManagement/SystemCode/AddSystemCode/AddSystemCode';

import Path from '../../../path/path';
import { userHasRole } from '../../../auth/auth';

const language = store.getState().language.languageInfo.languageObject;

const addSystemCode = new MenuItem({
  name: language.systemManagement.subMenus.addSystemCode,
  path: Path.addSystemCodePath,
  component: AddSystemCode,
  display: () => userHasRole(26),
});

const systemCode = new MenuItem({
  name: language.systemManagement.subMenus.systemCode,
  path: Path.systemCodePath,
  component: SystemCode,
  subMenus: [addSystemCode],
  display: () => userHasRole(114),
});

export default systemCode;
