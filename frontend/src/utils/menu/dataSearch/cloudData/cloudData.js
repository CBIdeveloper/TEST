import store from '../../../../store/store';

import MenuItem from '../../MenuItem';

import CloudData from '../../../../components/DataSearch/CloudData';
import Criteria from '../../../../components/DataSearch/Criteria/Criteria';
import CloudDataEdit from '../../../../components/DataSearch/CloudDataEdit';

import Path from '../../../path/path';
import { userHasRole } from '../../../auth/auth';

const language = store.getState().language.languageInfo.languageObject;

const criteria = new MenuItem({
  name: language.dataSearch.subMenus.criteria,
  path: Path.criteriaPath,
  component: Criteria,
});

const cloudDataEdit = new MenuItem({
  name: language.dataSearch.subMenus.cloudDataEdit,
  path: Path.cloudDataEditPath,
  component: CloudDataEdit,
  // display: () => userHasRole(104),
});

const dataSearch = new MenuItem({
  name: language.dataSearch.subMenus.cloudData,
  path: Path.cloudDataPath,
  component: CloudData,
  subMenus: [criteria,cloudDataEdit],
  display: () => userHasRole(179),
});

export default dataSearch;
