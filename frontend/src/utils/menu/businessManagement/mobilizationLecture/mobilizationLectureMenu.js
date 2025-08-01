import store from '../../../../store/store';

import MenuItem from '../../MenuItem';

import MobilizationLecture from '../../../../components/BusinessManagement/MobilizationLecture/MobilizationLecture';
import AddMobilizationLecture from '../../../../components/BusinessManagement/MobilizationLecture/AddMobilizationLecture/AddMobilizationLecture';
import EditMobilizationLecture from '../../../../components/BusinessManagement/MobilizationLecture/EditMobilizationLecture/EditMobilizationLecture';

import Path from '../../../path/path';
import { userHasRole } from '../../../auth/auth';

const language = store.getState().language.languageInfo.languageObject;

const addMobilizationLecture = new MenuItem({
  name: language.businessManagement.subMenus.addMobilizationLecture,
  path: Path.addMobilizationLecturePath,
  component: AddMobilizationLecture,
  display: () => userHasRole(139),
});

const editMobilizationLecture = new MenuItem({
  name: language.businessManagement.subMenus.editMobilizationLecture,
  path: Path.editMobilizationLecturePath,
  component: EditMobilizationLecture,
  display: () => userHasRole(140),
});

const mobilizationLecture = new MenuItem({
  name: language.businessManagement.subMenus.mobilizationLecture,
  path: Path.mobilizationLecturePath,
  component: MobilizationLecture,
  subMenus: [addMobilizationLecture, editMobilizationLecture],
  display: () => userHasRole(99),
});

export default mobilizationLecture;
