import store from '../../../../store/store';

import MenuItem from '../../MenuItem';

import Path from '../../../path/path';
import { userHasRole } from '../../../auth/auth';
import Qanda from '../../../../components/QandA/Qanda';

const language = store.getState().language.languageInfo.languageObject;
const qandaMenu = new MenuItem({
  name: "常見問題",
  path: Path.qandaPath,
  component: Qanda,
});

export default qandaMenu;
