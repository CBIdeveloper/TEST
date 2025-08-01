import store from '../../../../store/store';

import MenuItem from '../../MenuItem';

import RegulationDetail from '../../../../components/RetrievalService/RegulationDetail/RegulationDetail';

import General from '../../../../components/RetrievalService/RegulationDetail/General/General';
import Civil from '../../../../components/RetrievalService/RegulationDetail/Civil/Civil';
import Spiritual from '../../../../components/RetrievalService/RegulationDetail/Spiritual/Spiritual';
import HumanResource from '../../../../components/RetrievalService/RegulationDetail/HumanResource/HumanResource';
import SupplyResource from '../../../../components/RetrievalService/RegulationDetail/SupplyResource/SupplyResource';
import Finance from '../../../../components/RetrievalService/RegulationDetail/Finance/Finance';
import Transportation from '../../../../components/RetrievalService/RegulationDetail/Transportation/Transportation';
import Health from '../../../../components/RetrievalService/RegulationDetail/Health/Health';
import Technology from '../../../../components/RetrievalService/RegulationDetail/Technology/Technology';
import Military from '../../../../components/RetrievalService/RegulationDetail/Military/Military';
import Disaster from '../../../../components/RetrievalService/RegulationDetail/Disaster/Disaster';

import Path from '../../../path/path';
import { userHasRole } from '../../../auth/auth';

const language = store.getState().language.languageInfo.languageObject;

const general = new MenuItem({
  name: language.retrievalService.subMenus.general,
  path: Path.generalPath,
  component: General,
  ignore: true,
});

const civil = new MenuItem({
  name: language.retrievalService.subMenus.civil,
  path: Path.civilPath,
  component: Civil,
  ignore: true,
});

const spiritual = new MenuItem({
  name: language.retrievalService.subMenus.spiritual,
  path: Path.spiritualPath,
  component: Spiritual,
  ignore: true,
});

const humanResource = new MenuItem({
  name: language.retrievalService.subMenus.humanResource,
  path: Path.humanResourcePath,
  component: HumanResource,
  ignore: true,
});

const supplyResource = new MenuItem({
  name: language.retrievalService.subMenus.supplyResource,
  path: Path.supplyResourcePath,
  component: SupplyResource,
  ignore: true,
});

const finance = new MenuItem({
  name: language.retrievalService.subMenus.finance,
  path: Path.financePath,
  component: Finance,
  ignore: true,
});

const transportation = new MenuItem({
  name: language.retrievalService.subMenus.transportation,
  path: Path.transportationPath,
  component: Transportation,
  ignore: true,
});

const health = new MenuItem({
  name: language.retrievalService.subMenus.health,
  path: Path.healthPath,
  component: Health,
  ignore: true,
});

const technology = new MenuItem({
  name: language.retrievalService.subMenus.technology,
  path: Path.technologyPath,
  component: Technology,
  ignore: true,
});

const military = new MenuItem({
  name: language.retrievalService.subMenus.military,
  path: Path.militaryPath,
  component: Military,
  ignore: true,
});

const disaster = new MenuItem({
  name: language.retrievalService.subMenus.disaster,
  path: Path.disasterPath,
  component: Disaster,
  ignore: true,
});

const regulationDetail = new MenuItem({
  name: language.retrievalService.subMenus.regulationDetail,
  path: Path.regulationDetailPath,
  component: RegulationDetail,
  subMenus: [
    general,
    civil,
    spiritual,
    humanResource,
    supplyResource,
    finance,
    transportation,
    health,
    technology,
    military,
    disaster,
  ],
  notExact: true,
  display: () => userHasRole(103),
  disableInBreadcrumb: true,
});

export default regulationDetail;
