import store from '../../../../store/store';

import MenuItem from '../../MenuItem';

import PlanDownload from '../../../../components/RetrievalService/PlanDownload/PlanDownload';

import MobilizationPlan from '../../../../components/RetrievalService/PlanDownload/MobilizationPlan/MobilizationPlan';
import MobilizationClassification from '../../../../components/RetrievalService/PlanDownload/MobilizationClassification/MobilizationClassification';
import MobilizationExecution from '../../../../components/RetrievalService/PlanDownload/MobilizationExecution/MobilizationExecution';

import Path from '../../../path/path';
import { userHasRole } from '../../../auth/auth';

const language = store.getState().language.languageInfo.languageObject;

const mobilizationPlan = new MenuItem({
  name: language.retrievalService.subMenus.mobilizationPlan,
  path: Path.mobilizationPlanPath,
  component: MobilizationPlan,
});

const mobilizationClassification = new MenuItem({
  name: language.retrievalService.subMenus.mobilizationClassification,
  path: Path.mobilizationClassificationPath,
  component: MobilizationClassification,
});

const mobilizationExecution = new MenuItem({
  name: language.retrievalService.subMenus.mobilizationExecution,
  path: Path.mobilizationExecutionPath,
  component: MobilizationExecution,
});

const planDownload = new MenuItem({
  name: language.retrievalService.subMenus.planDownload,
  path: Path.planDownloadPath,
  component: PlanDownload,
  subMenus: [
    mobilizationPlan,
    mobilizationClassification,
    mobilizationExecution,
  ],
  display: () => userHasRole(105),
});

export default planDownload;
