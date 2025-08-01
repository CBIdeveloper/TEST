import store from '../../../store/store';
import ApiService from '../../../utils/api/ApiService';
import { getUserId } from '../../../utils/auth/auth';
import MenuItem from '../MenuItem';

import dataSearch from './dataSearch/dataSearch';
import cloudDataEdit from './cloudData/cloudData';
import cloudDataSearch from './cloudData/cloudDataSearch'
import Path from '../../path/path';

const language = store.getState().language.languageInfo.languageObject;
// ApiService.sysUserAccount
//   .readSysUserAccountById(getUserId())
//   .then((response) => {
//     console.log(response);
//   })
//   .catch((error) => {
//     console.log('111111111111');

//     console.error('Error fetching user account:', error);
//   });
const dataSearchMenu = new MenuItem({
  name: language.dataSearch.title,
  path: Path.dataSearchPath,
  notExact: true,
  subMenus: [dataSearch, cloudDataEdit, cloudDataSearch],
  disableInBreadcrumb: true,
});
export default dataSearchMenu;
