import Path from '../path/path';

import outline from '../../assets/images/planDownload/ic_outline.png';
import plan from '../../assets/images/planDownload/ic_plan.png';
import run from '../../assets/images/planDownload/ic_run.png';
import sort from '../../assets/images/planDownload/ic_sort.png';

const mobilizationProgram = {
  image: outline,
  color: 'purple',
  type: 'modal',
  title: '動員綱領',
  description: () => '行政院綱領',
};

const mobilizationPlan = {
  image: plan,
  color: 'green',
  type: 'link',
  title: '動員方案',
  description: (amount) => `${amount}案`,
  path: Path.mobilizationPlanPath,
};

const mobilizationClassification = {
  image: sort,
  color: 'red',
  type: 'link',
  title: '動員分類',
  description: (amount) => `${amount}類`,
  path: Path.mobilizationClassificationPath,
};

const mobilizationExecution = {
  image: run,
  color: 'orange',
  type: 'link',
  title: '動員執行',
  description: (amount) => `${amount}縣市政府`,
  path: Path.mobilizationExecutionPath,
};

export default [
  mobilizationProgram,
  mobilizationPlan,
  mobilizationClassification,
  mobilizationExecution,
];
