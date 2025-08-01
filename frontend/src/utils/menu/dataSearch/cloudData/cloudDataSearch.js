import store from '../../../../store/store';

import MenuItem from '../../MenuItem';

import CloudDataSearch from '../../../../components/DataSearch/CloudDataSearch';
import Criteria from '../../../../components/DataSearch/Criteria/Criteria';

import Path from '../../../path/path';
import { userHasRole } from '../../../auth/auth';

const language = store.getState().language.languageInfo.languageObject;

const criteria = new MenuItem({
  name: language.dataSearch.subMenus.criteria,
  path: Path.criteriaPath,
  component: Criteria,
});

const dataSearch = new MenuItem({
  name: language.dataSearch.subMenus.cloudDataSearch,
  path: Path.cloudDataSearchPath,
  component: CloudDataSearch,
  subMenus: [criteria],
  display: () => userHasRole(180),
});

export default dataSearch;
