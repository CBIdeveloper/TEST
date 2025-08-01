import store from '../../../../store/store';

import MenuItem from '../../MenuItem';

import ExcellenceRecognition from '../../../../components/BusinessManagement/ExcellenceRecognition/ExcellenceRecognition';
import AddExcellenceRecognition from '../../../../components/BusinessManagement/ExcellenceRecognition/AddExcellenceRecognition/AddExcellenceRecognition';
import EditExcellenceRecognition from '../../../../components/BusinessManagement/ExcellenceRecognition/EditExcellenceRecognition/EditExcellenceRecognition';

import Path from '../../../path/path';
import { userHasRole } from '../../../auth/auth';

const language = store.getState().language.languageInfo.languageObject;

const addExcellenceRecognition = new MenuItem({
  name: language.businessManagement.subMenus.addExcellenceRecognition,
  path: Path.addExcellenceRecognitionPath,
  component: AddExcellenceRecognition,
  display: () => userHasRole(142),
});

const editExcellenceRecognition = new MenuItem({
  name: language.businessManagement.subMenus.editExcellenceRecognition,
  path: Path.editExcellenceRecognitionPath,
  component: EditExcellenceRecognition,
  display: () => userHasRole(143),
});

const excellenceRecognition = new MenuItem({
  name: language.businessManagement.subMenus.excellenceRecognition,
  path: Path.excellenceRecognitionPath,
  component: ExcellenceRecognition,
  subMenus: [addExcellenceRecognition, editExcellenceRecognition],
  display: () => userHasRole(100),
});

export default excellenceRecognition;
