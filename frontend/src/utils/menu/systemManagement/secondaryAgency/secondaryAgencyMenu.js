import store from '../../../../store/store';

import MenuItem from '../../MenuItem';

import SecondaryAgency from '../../../../components/SystemManagement/SecondaryAgency/SecondaryAgency';
import AddSecondaryAgency from '../../../../components/SystemManagement/SecondaryAgency/AddSecondaryAgency/AddSecondaryAgency';
import EditSecondaryAgency from '../../../../components/SystemManagement/SecondaryAgency/EditSecondaryAgency/EditSecondaryAgency';

import Path from '../../../path/path';
import { userHasRole } from '../../../auth/auth';

const language = store.getState().language.languageInfo.languageObject;

const addSecondaryAgency = new MenuItem({
  name: language.systemManagement.subMenus.addSecondaryAgency,
  path: Path.addSecondaryAgencyPath,
  component: AddSecondaryAgency,
  display: () => userHasRole(81),
});

const editSecondaryAgency = new MenuItem({
  name: language.systemManagement.subMenus.editSecondaryAgency,
  path: Path.editSecondaryAgencyPath,
  component: EditSecondaryAgency,
  display: () => userHasRole(82),
});

const secondaryAgency = new MenuItem({
  name: language.systemManagement.subMenus.secondaryAgency,
  path: Path.secondaryAgencyPath,
  component: SecondaryAgency,
  subMenus: [addSecondaryAgency, editSecondaryAgency],
  hide: true,
  display: () => userHasRole(113),
});

export default secondaryAgency;
