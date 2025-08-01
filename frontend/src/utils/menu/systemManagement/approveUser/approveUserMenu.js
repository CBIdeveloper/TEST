import store from '../../../../store/store';

import MenuItem from '../../MenuItem';

import ApproveUser from '../../../../components/SystemManagement/ApproveUser/ApproveUser';
import ApproveUserDetail from '../../../../components/SystemManagement/ApproveUser/ApproveUserDetail/ApproveUserDetail';

import Path from '../../../path/path';
import { userHasRole } from '../../../auth/auth';

const language = store.getState().language.languageInfo.languageObject;

const approveUserDetail = new MenuItem({
  name: language.systemManagement.subMenus.approveUserDetail,
  path: Path.approveUserDetailPath,
  component: ApproveUserDetail,
  display: () => userHasRole(86),
});

const approveUser = new MenuItem({
  name: language.systemManagement.subMenus.approveUser,
  path: Path.approveUserPath,
  component: ApproveUser,
  subMenus: [approveUserDetail],
  display: () => userHasRole(110),
});

export default approveUser;
