import store from '../../../../store/store';

import MenuItem from '../../MenuItem';

import TopicEffect from '../../../../components/BusinessManagement/TopicEffect/TopicEffect';

import Path from '../../../path/path';
import { userHasRole } from '../../../auth/auth';

const language = store.getState().language.languageInfo.languageObject;

const topicEffectMenu = new MenuItem({
  name: language.businessManagement.subMenus.topicEffect,
  path: Path.topicEffectPath,
  component: TopicEffect,
  display: () => userHasRole(207),
});

export default topicEffectMenu;
