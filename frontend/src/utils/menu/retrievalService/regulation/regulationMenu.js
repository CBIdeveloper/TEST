import store from '../../../../store/store';

import MenuItem from '../../MenuItem';

import Regulation from '../../../../components/RetrievalService/Regulation/Regulation';

import Path from '../../../path/path';

const language = store.getState().language.languageInfo.languageObject;

const importantPolicy = new MenuItem({
  name: language.retrievalService.subMenus.regulation,
  path: Path.regulationPath,
  component: Regulation,
  subMenus: [],
});

export default importantPolicy;
