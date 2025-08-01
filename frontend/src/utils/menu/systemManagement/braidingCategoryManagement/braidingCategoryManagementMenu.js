import store from '../../../../store/store';

import MenuItem from '../../MenuItem';

import BraidingCategoryManagement from '../../../../components/SystemManagement/BraidingCategoryManagement/BraidingCategoryManagement';
import AddBraidingCategoryManagement from '../../../../components/SystemManagement/BraidingCategoryManagement/AddBraidingCategoryManagement/AddBraidingCategoryManagement';
import EditBraidingCategoryManagement from '../../../../components/SystemManagement/BraidingCategoryManagement/EditBraidingCategoryManagement/EditBraidingCategoryManagement';

import Path from '../../../path/path';
import { userHasRole } from '../../../auth/auth';

const language = store.getState().language.languageInfo.languageObject;

const addBraidingCategoryManagement = new MenuItem({
  name: language.systemManagement.subMenus.addBraidingCategoryManagement,
  path: Path.addBraidingCategoryManagementPath,
  component: AddBraidingCategoryManagement,
  display: () => userHasRole(8),
});

const editBraidingCategoryManagement = new MenuItem({
  name: language.systemManagement.subMenus.editBraidingCategoryManagement,
  path: Path.editBraidingCategoryManagementPath,
  component: EditBraidingCategoryManagement,
  display: () => userHasRole(9),
});

const braidingCategoryManagement = new MenuItem({
  name: language.systemManagement.subMenus.braidingCategoryManagement,
  path: Path.braidingCategoryManagementPath,
  component: BraidingCategoryManagement,
  subMenus: [addBraidingCategoryManagement, editBraidingCategoryManagement],
  hide: true,
  display: () => userHasRole(112),
});

export default braidingCategoryManagement;
