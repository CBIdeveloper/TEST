import store from '../../../store/store';
import MenuItem from '../MenuItem';
import Path from '../../path/path';
import businessManagementDetailMenu from './businessManagementDetail/businessManagementDetailMenu';
import topicEffectMenu from './topicEffect/topicEffectMenu';
const language = store.getState().language.languageInfo.languageObject;

const businessManagement = new MenuItem({
  name: language.businessManagement.title,
  path: Path.businessManagementPath,
  subMenus: [businessManagementDetailMenu, topicEffectMenu],
  notExact: true,
  disableInBreadcrumb: true,
});

export default businessManagement;
