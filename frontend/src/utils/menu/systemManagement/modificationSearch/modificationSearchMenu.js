import store from '../../../../store/store';

import MenuItem from '../../MenuItem';

import ModificationSearch from '../../../../components/SystemManagement/ModificationSearch/ModificationSearch';

import Path from '../../../path/path';
import { userHasRole } from '../../../auth/auth';

const language = store.getState().language.languageInfo.languageObject;

const modificationSearch = new MenuItem({
  name: language.systemManagement.subMenus.modificationSearch,
  path: Path.modificationSearchPath,
  component: ModificationSearch,
  display: () => userHasRole(116),
});

export default modificationSearch;
