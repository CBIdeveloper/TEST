import store from '../../../../store/store';

import MenuItem from '../../MenuItem';

import ContactInformation from '../../../../components/RetrievalService/ContactInformation/ContactInformation';
import ContactDetail from '../../../../components/RetrievalService/ContactInformation/ContactDetail/ContactDetail';

import Path from '../../../path/path';
import { userHasRole } from '../../../auth/auth';

const language = store.getState().language.languageInfo.languageObject;

const contactInformationDetail = new MenuItem({
  name: language.retrievalService.subMenus.contactInformationDetail,
  path: Path.contactInformationDetailPath,
  component: ContactDetail,
});

const contactInformation = new MenuItem({
  name: language.retrievalService.subMenus.contactInformation,
  path: Path.contactInformationPath,
  component: ContactInformation,
  subMenus: [contactInformationDetail],
  display: () => userHasRole(107),
});

export default contactInformation;
