import store from '../../../store/store.js';

import MenuItem from '../MenuItem.js';

import Path from '../../path/path';
import qanda from './qanda/qandaMenu';
const language = store.getState().language.languageInfo.languageObject;
const serveMenu = new MenuItem({
  name: '檢索服務',
  path: Path.servePath,
  notExact: true,
  subMenus: [qanda],
  disableInBreadcrumb: true,
});

export default serveMenu;
