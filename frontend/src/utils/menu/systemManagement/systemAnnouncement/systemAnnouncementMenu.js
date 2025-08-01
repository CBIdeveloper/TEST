import store from '../../../../store/store';

import MenuItem from '../../MenuItem';

import SystemAnnouncement from '../../../../components/SystemManagement/SystemAnnouncement/SystemAnnouncement';
import AddSystemAnnouncement from '../../../../components/SystemManagement/SystemAnnouncement/AddSystemAnnouncement/AddSystemAnnouncement';
import EditSystemAnnouncement from '../../../../components/SystemManagement/SystemAnnouncement/EditSystemAnnouncement/EditSystemAnnouncement';

import Path from '../../../path/path';
import { userHasRole } from '../../../auth/auth';

const language = store.getState().language.languageInfo.languageObject;

const addSystemAnnouncement = new MenuItem({
  name: language.systemManagement.subMenus.addSystemAnnouncement,
  path: Path.addSystemAnnouncementPath,
  component: AddSystemAnnouncement,
  display: () => userHasRole(1),
});

const editSystemAnnouncement = new MenuItem({
  name: language.systemManagement.subMenus.editSystemAnnouncement,
  path: Path.editSystemAnnouncementPath,
  component: EditSystemAnnouncement,
  display: () => userHasRole(2),
});

const systemAnnouncement = new MenuItem({
  name: language.systemManagement.subMenus.systemAnnouncement,
  path: Path.systemAnnouncementPath,
  component: SystemAnnouncement,
  subMenus: [addSystemAnnouncement, editSystemAnnouncement],
  display: () => userHasRole(117),
});

export default systemAnnouncement;
