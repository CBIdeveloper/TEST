import store from '../../../../store/store';

import MenuItem from '../../MenuItem';

import DataSearch from '../../../../components/DataSearch/DataSearch';
import CategoryDetail from '../../../../components/DataSearch/CategoryDetail/CategoryDetail';
import ResultDetail from '../../../../components/DataSearch/ResultDetail/ResultDetail';
import Criteria from '../../../../components/DataSearch/Criteria/Criteria';

import Path from '../../../path/path';
import { userHasRole } from '../../../auth/auth';

const language = store.getState().language.languageInfo.languageObject;

const categoryDetail = new MenuItem({
  name: language.dataSearch.subMenus.categoryDetail,
  path: Path.categoryDetailPath,
  component: CategoryDetail,
});

const resultDetail = new MenuItem({
  name: language.dataSearch.subMenus.resultDetail,
  path: Path.resultDetailPath,
  component: ResultDetail,
});

const criteria = new MenuItem({
  name: language.dataSearch.subMenus.criteria,
  path: Path.criteriaPath,
  component: Criteria,
});

const dataSearch = new MenuItem({
  name: language.dataSearch.subMenus.dataSearch,
  path: Path.dataSearchPath,
  component: DataSearch,
  subMenus: [categoryDetail, resultDetail, criteria],
  display: () => userHasRole(108),
});

export default dataSearch;
