import store from '../../../../store/store';

import MenuItem from '../../MenuItem';
import BusinessManagement from '../../../../components/BusinessManagement/BusinessManagement';
import importantPolicyMenu from '../importantPolicy/importantPolicyMenu';
import crossDepartmentMeetingMenu from '../crossDepartmentMeeting/crossDepartmentMeetingMenu';
import excellenceRecognitionMenu from '../excellenceRecognition/excellenceRecognitionMenu';
import midWarReportMenu from '../midWarReport/midWarReportMenu';
import mobilizationAccessMenu from '../mobilizationAccess/mobilizationAccessMenu';
import mobilizationCategorizationMenu from '../mobilizationCategorization/mobilizationCategorizationMenu';
import mobilizationEvaluationMenu from '../mobilizationEvaluation/mobilizationEvaluationMenu';
import mobilizationLectureMenu from '../mobilizationLecture/mobilizationLectureMenu';
import mobilizationReportMenu from '../mobilizationReport/mobilizationReportMenu';
import mobilizationStrategyMenu from '../mobilizationStrategy/mobilizationStrategyMenu';
import mobilizationValidationMenu from '../mobilizationValidation/mobilizationValidationMenu';
import Path from '../../../path/path';

const language = store.getState().language.languageInfo.languageObject;

const businessManagementDetailMenu = new MenuItem({
  name: language.businessManagement.title,
  path: Path.businessManagementDetailPath,
  component: BusinessManagement,
  subMenus: [
    importantPolicyMenu,
    crossDepartmentMeetingMenu,
    mobilizationStrategyMenu,
    mobilizationCategorizationMenu,
    mobilizationAccessMenu,
    mobilizationEvaluationMenu,
    mobilizationValidationMenu,
    mobilizationLectureMenu,
    excellenceRecognitionMenu,
    midWarReportMenu,
    mobilizationReportMenu,
  ],
  notExact: true,
  disableInBreadcrumb: true,
});

export default businessManagementDetailMenu;
