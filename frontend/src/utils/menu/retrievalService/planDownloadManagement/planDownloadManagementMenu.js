import store from '../../../../store/store';

import MenuItem from '../../MenuItem';

import PlanDownloadManagement from '../../../../components/RetrievalService/PlanDownloadManagement/PlanDownloadManagement';

import MobilizationProgramManagement from '../../../../components/RetrievalService/PlanDownloadManagement/MobilizationProgramManagement/MobilizationProgramManagement';
import AddMobilizationProgram from '../../../../components/RetrievalService/PlanDownloadManagement/MobilizationProgramManagement/AddMobilizationProgram/AddMobilizationProgram';
import EditMobilizationProgram from '../../../../components/RetrievalService/PlanDownloadManagement/MobilizationProgramManagement/EditMobilizationProgram/EditMobilizationProgram';

import MobilizationPlanManagement from '../../../../components/RetrievalService/PlanDownloadManagement/MobilizationPlanManagement/MobilizationPlanManagement';
import AddMobilizationPlan from '../../../../components/RetrievalService/PlanDownloadManagement/MobilizationPlanManagement/AddMobilizationPlan/AddMobilizationPlan';
import EditMobilizationPlan from '../../../../components/RetrievalService/PlanDownloadManagement/MobilizationPlanManagement/EditMobilizationPlan/EditMobilizationPlan';
import MobilizationPlanDetailManagement from '../../../../components/RetrievalService/PlanDownloadManagement/MobilizationPlanManagement/MobilizationPlanDetailManagement/MobilizationPlanDetailManagement';

import MobilizationClassificationManagement from '../../../../components/RetrievalService/PlanDownloadManagement/MobilizationClassificationManagement/MobilizationClassificationManagement';
import AddMobilizationClassification from '../../../../components/RetrievalService/PlanDownloadManagement/MobilizationClassificationManagement/AddMobilizationClassification/AddMobilizationClassification';
import EditMobilizationClassification from '../../../../components/RetrievalService/PlanDownloadManagement/MobilizationClassificationManagement/EditMobilizationClassification/EditMobilizationClassification';
import MobilizationClassificationDetailManagement from '../../../../components/RetrievalService/PlanDownloadManagement/MobilizationClassificationManagement/MobilizationClassificationDetailManagement/MobilizationClassificationDetailManagement';

import MobilizationExecutionManagement from '../../../../components/RetrievalService/PlanDownloadManagement/MobilizationExecutionManagement/MobilizationExecutionManagement';
import AddMobilizationExecution from '../../../../components/RetrievalService/PlanDownloadManagement/MobilizationExecutionManagement/AddMobilizationExecution/AddMobilizationExecution';
import EditMobilizationExecution from '../../../../components/RetrievalService/PlanDownloadManagement/MobilizationExecutionManagement/EditMobilizationExecution/EditMobilizationExecution';

import Path from '../../../path/path';
import { userHasRole, userBusinessPlanCheck } from '../../../auth/auth';

const language = store.getState().language.languageInfo.languageObject;

// MobilizationProgramManagement
const addMobilizationProgram = new MenuItem({
  name: language.retrievalService.subMenus.addMobilizationProgram,
  path: Path.addMobilizationProgramPath,
  component: AddMobilizationProgram,
});

const editMobilizationProgram = new MenuItem({
  name: language.retrievalService.subMenus.editMobilizationProgram,
  path: Path.editMobilizationProgramPath,
  component: EditMobilizationProgram,
});

const mobilizationProgramManagement = new MenuItem({
  name: language.retrievalService.subMenus.mobilizationProgramManagement,
  path: Path.mobilizationProgramManagementPath,
  component: MobilizationProgramManagement,
  subMenus: [addMobilizationProgram, editMobilizationProgram],
  ignore: true,
  display: () => userBusinessPlanCheck('1'),
});

// MobilizationPlanManagement
const addMobilizationPlan = new MenuItem({
  name: language.retrievalService.subMenus.addMobilizationPlan,
  path: Path.addMobilizationPlanPath,
  component: AddMobilizationPlan,
});

const editMobilizationPlan = new MenuItem({
  name: language.retrievalService.subMenus.editMobilizationPlan,
  path: Path.editMobilizationPlanPath,
  component: EditMobilizationPlan,
});

const mobilizationPlanDetailManagement = new MenuItem({
  name: language.retrievalService.subMenus.mobilizationPlanDetailManagement,
  path: Path.mobilizationPlanDetailManagementPath,
  component: MobilizationPlanDetailManagement,
});

const mobilizationPlanManagement = new MenuItem({
  name: language.retrievalService.subMenus.mobilizationPlanManagement,
  path: Path.mobilizationPlanManagementPath,
  component: MobilizationPlanManagement,
  subMenus: [
    addMobilizationPlan,
    editMobilizationPlan,
    mobilizationPlanDetailManagement,
  ],
  ignore: true,
  display: () => userBusinessPlanCheck('1') || userBusinessPlanCheck('2'),
});

// MobilizationClassification
const addMobilizationClassification = new MenuItem({
  name: language.retrievalService.subMenus.addMobilizationClassification,
  path: Path.addMobilizationClassificationPath,
  component: AddMobilizationClassification,
});

const editMobilizationClassification = new MenuItem({
  name: language.retrievalService.subMenus.editMobilizationClassification,
  path: Path.editMobilizationClassificationPath,
  component: EditMobilizationClassification,
});

const mobilizationClassificationDetailManagement = new MenuItem({
  name: language.retrievalService.subMenus
    .mobilizationClassificationDetailManagement,
  path: Path.mobilizationClassificationDetailManagementPath,
  component: MobilizationClassificationDetailManagement,
});

const mobilizationClassification = new MenuItem({
  name: language.retrievalService.subMenus.mobilizationClassificationManagement,
  path: Path.mobilizationClassificationManagementPath,
  component: MobilizationClassificationManagement,
  subMenus: [
    addMobilizationClassification,
    editMobilizationClassification,
    mobilizationClassificationDetailManagement,
  ],
  ignore: true,
  display: () =>
    userBusinessPlanCheck('1') ||
    userBusinessPlanCheck('2') ||
    userBusinessPlanCheck('3'),
});

// MobilizationExecution
const addMobilizationExecution = new MenuItem({
  name: language.retrievalService.subMenus.addMobilizationExecution,
  path: Path.addMobilizationExecutionPath,
  component: AddMobilizationExecution,
});

const editMobilizationExecution = new MenuItem({
  name: language.retrievalService.subMenus.editMobilizationExecution,
  path: Path.editMobilizationExecutionPath,
  component: EditMobilizationExecution,
});

const mobilizationExecution = new MenuItem({
  name: language.retrievalService.subMenus.mobilizationExecutionManagement,
  path: Path.mobilizationExecutionManagementPath,
  component: MobilizationExecutionManagement,
  subMenus: [addMobilizationExecution, editMobilizationExecution],
  ignore: true,
  display: () => userBusinessPlanCheck('1') || userBusinessPlanCheck('4'),
});

const planDownloadManagement = new MenuItem({
  name: language.retrievalService.subMenus.planDownloadManagement,
  path: Path.planDownloadManagementPath,
  component: PlanDownloadManagement,
  subMenus: [
    mobilizationProgramManagement,
    mobilizationPlanManagement,
    mobilizationClassification,
    mobilizationExecution,
  ],
  notExact: true,
  display: () => userHasRole(106),
  disableInBreadcrumb: true,
});

export default planDownloadManagement;
