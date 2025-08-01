import store from '../../../store/store';

import MenuItem from '../MenuItem';

import Announcement from '../../../components/Announcement/Announcement';

import Path from '../../path/path';
import { userHasRole } from '../../auth/auth';

const language = store.getState().language.languageInfo.languageObject;

const latestNews = new MenuItem({
  name: language.latestNews.title,
  path: Path.announcementPath,
  component: Announcement,
  display: () => userHasRole(88),
});

const homepage = new MenuItem({
  name: language.breadcrumb.mainPage,
  path: Path.mainPath,
  display: () => userHasRole(87),
});

export default [homepage, latestNews];
