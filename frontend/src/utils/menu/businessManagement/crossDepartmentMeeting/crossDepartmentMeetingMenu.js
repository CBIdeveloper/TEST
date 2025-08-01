import store from '../../../../store/store';

import MenuItem from '../../MenuItem';

import CrossDepartmentMeeting from '../../../../components/BusinessManagement/CrossDepartmentMeeting/CrossDepartmentMeeting';
import AddCrossDepartmentMeeting from '../../../../components/BusinessManagement/CrossDepartmentMeeting/AddCrossDepartmentMeeting/AddCrossDepartmentMeeting';
import EditCrossDepartmentMeeting from '../../../../components/BusinessManagement/CrossDepartmentMeeting/EditCrossDepartmentMeeting/EditCrossDepartmentMeeting';

import Path from '../../../path/path';
import { userHasRole } from '../../../auth/auth';

const language = store.getState().language.languageInfo.languageObject;

const addCrossDepartmentMeeting = new MenuItem({
  name: language.businessManagement.subMenus.addCrossDepartmentMeeting,
  path: Path.addCrossDepartmentMeetingPath,
  component: AddCrossDepartmentMeeting,
  display: () => userHasRole(121),
});

const editCrossDepartmentMeeting = new MenuItem({
  name: language.businessManagement.subMenus.editCrossDepartmentMeeting,
  path: Path.editCrossDepartmentMeetingPath,
  component: EditCrossDepartmentMeeting,
  display: () => userHasRole(122),
});

const crossDepartmentMeeting = new MenuItem({
  name: language.businessManagement.subMenus.crossDepartmentMeeting,
  path: Path.crossDepartmentMeetingPath,
  component: CrossDepartmentMeeting,
  subMenus: [addCrossDepartmentMeeting, editCrossDepartmentMeeting],
  display: () => userHasRole(92),
});

export default crossDepartmentMeeting;
