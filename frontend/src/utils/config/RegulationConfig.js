import RegulationType from '../constants/RegulationType';

import oneDefault from '../../assets/images/regulation/01_default.png';
import twoDefault from '../../assets/images/regulation/02_default.png';
import threeDefault from '../../assets/images/regulation/03_default.png';
import fourDefault from '../../assets/images/regulation/04_default.png';
import fiveDefault from '../../assets/images/regulation/05_default.png';

import oneHover from '../../assets/images/regulation/01_hover.png';
import twoHover from '../../assets/images/regulation/02_hover.png';
import threeHover from '../../assets/images/regulation/03_hover.png';
import fourHover from '../../assets/images/regulation/04_hover.png';
import fiveHover from '../../assets/images/regulation/05_hover.png';

const mobilization = {
  normalImage: oneDefault,
  hoverImage: oneHover,
  type: RegulationType.MOBILIZATION,
  name: '動員類',
};

const nationDefense = {
  normalImage: twoDefault,
  hoverImage: twoHover,
  type: RegulationType.NATION_DEFENSE,
  name: '國防類',
};

const civilDefense = {
  normalImage: threeDefault,
  hoverImage: threeHover,
  type: RegulationType.CIVIL_DEFENSE,
  name: '民防類',
};

const disaster = {
  normalImage: fourDefault,
  hoverImage: fourHover,
  type: RegulationType.DISASTER,
  name: '災防類',
};

const militaryService = {
  normalImage: fiveDefault,
  hoverImage: fiveHover,
  type: RegulationType.MILITARY_SERVICE,
  name: '兵役類',
};

export default [
  mobilization,
  nationDefense,
  civilDefense,
  disaster,
  militaryService,
];
