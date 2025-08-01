import store from '../../../../store/store';

import MenuItem from '../../MenuItem';

import RegulationManagement from '../../../../components/RetrievalService/RegulationManagement/RegulationManagement';

import AddRegulationManagement from '../../../../components/RetrievalService/RegulationManagement/AddRegulationManagement/AddRegulationManagement';
import EditRegulationManagement from '../../../../components/RetrievalService/RegulationManagement/EditRegulationManagement/EditRegulationManagement';

import GeneralManagement from '../../../../components/RetrievalService/RegulationManagement/GeneralManagement/GeneralManagement';
import CivilManagement from '../../../../components/RetrievalService/RegulationManagement/CivilManagement/CivilManagement';
import SpiritualManagement from '../../../../components/RetrievalService/RegulationManagement/SpiritualManagement/SpiritualManagement';
import HumanResourceManagement from '../../../../components/RetrievalService/RegulationManagement/HumanResourceManagement/HumanResourceManagement';
import SupplyResourceManagement from '../../../../components/RetrievalService/RegulationManagement/SupplyResourceManagement/SupplyResourceManagement';
import FinanceManagement from '../../../../components/RetrievalService/RegulationManagement/FinanceManagement/FinanceManagement';
import TransportationManagement from '../../../../components/RetrievalService/RegulationManagement/TransportationManagement/TransportationManagement';
import HealthManagement from '../../../../components/RetrievalService/RegulationManagement/HealthManagement/HealthManagement';
import TechnologyManagement from '../../../../components/RetrievalService/RegulationManagement/TechnologyManagement/TechnologyManagement';
import MilitaryManagement from '../../../../components/RetrievalService/RegulationManagement/MilitaryManagement/MilitaryManagement';
import DisasterManagement from '../../../../components/RetrievalService/RegulationManagement/DisasterManagement/DisasterManagement';

import Path from '../../../path/path';
import { userHasRole } from '../../../auth/auth';

const language = store.getState().language.languageInfo.languageObject;

const addRegulation = new MenuItem({
  name: language.retrievalService.subMenus.addRegulation,
  path: Path.addRegulationPath,
  component: AddRegulationManagement,
  ignore: true,
  hide: true,
});

const editRegulation = new MenuItem({
  name: language.retrievalService.subMenus.editRegulation,
  path: Path.editRegulationPath,
  component: EditRegulationManagement,
  ignore: true,
  hide: true,
});

const generalManagement = new MenuItem({
  name: language.retrievalService.subMenus.general,
  path: Path.generalManagementPath,
  component: GeneralManagement,
  ignore: true,
});

const civilManagement = new MenuItem({
  name: language.retrievalService.subMenus.civil,
  path: Path.civilManagementPath,
  component: CivilManagement,
  ignore: true,
});

const spiritualManagement = new MenuItem({
  name: language.retrievalService.subMenus.spiritual,
  path: Path.spiritualManagementPath,
  component: SpiritualManagement,
  ignore: true,
});

const humanResourceManagement = new MenuItem({
  name: language.retrievalService.subMenus.humanResource,
  path: Path.humanResourceManagementPath,
  component: HumanResourceManagement,
  ignore: true,
});

const supplyResourceManagement = new MenuItem({
  name: language.retrievalService.subMenus.supplyResource,
  path: Path.supplyResourceManagementPath,
  component: SupplyResourceManagement,
  ignore: true,
});

const financeManagement = new MenuItem({
  name: language.retrievalService.subMenus.finance,
  path: Path.financeManagementPath,
  component: FinanceManagement,
  ignore: true,
});

const transportationManagement = new MenuItem({
  name: language.retrievalService.subMenus.transportation,
  path: Path.transportationManagementPath,
  component: TransportationManagement,
  ignore: true,
});

const healthManagement = new MenuItem({
  name: language.retrievalService.subMenus.health,
  path: Path.healthManagementPath,
  component: HealthManagement,
  ignore: true,
});

const technologyManagement = new MenuItem({
  name: language.retrievalService.subMenus.technology,
  path: Path.technologyManagementPath,
  component: TechnologyManagement,
  ignore: true,
});

const militaryManagement = new MenuItem({
  name: language.retrievalService.subMenus.military,
  path: Path.militaryManagementPath,
  component: MilitaryManagement,
  ignore: true,
});

const disasterManagement = new MenuItem({
  name: language.retrievalService.subMenus.disaster,
  path: Path.disasterManagementPath,
  component: DisasterManagement,
  ignore: true,
});

const regulationManagement = new MenuItem({
  name: language.retrievalService.subMenus.regulationManagement,
  path: Path.regulationManagementPath,
  component: RegulationManagement,
  subMenus: [
    addRegulation,
    editRegulation,

    generalManagement,
    civilManagement,
    spiritualManagement,
    humanResourceManagement,
    supplyResourceManagement,
    financeManagement,
    transportationManagement,
    healthManagement,
    technologyManagement,
    militaryManagement,
    disasterManagement,
  ],
  notExact: true,
  display: () => userHasRole(104),
  disableInBreadcrumb: true,
});

export default regulationManagement;
