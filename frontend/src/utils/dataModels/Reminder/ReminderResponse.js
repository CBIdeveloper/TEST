import AnnouncementReminder from './AnnouncementReminder';
import BusinessManagementReminder from './BusinessManagementReminder';
import RegulationReminder from './RegulationReminder';
import PlatformUploadRecordReminder from './PlatformUploadRecordReminder';
import PlatformUploadRecordLogReminder from './PlatformUploadRecordLogReminder';
import PlanMobilizationClassificationReminder from './PlanMobilizationClassificationReminder';
import PlanMobilizationExecutionReminder from './PlanMobilizationExecutionReminder';
import PlanMobilizationPlanReminder from './PlanMobilizationPlanReminder';
import PlanMobilizationProgramReminder from './PlanMobilizationProgramReminder';
import BraidingCategoryReminder from './BraidingCategoryReminder';
import BraidingCategoryPlanReminder from './BraidingCategoryPlanReminder';

class ReminderResponse {
  constructor({ reminder_get_dto }) {
    const {
      announcement_reminder_list,
      business_management_test_reminder_list,
      regulation_reminder_list,
      platform_upload_record_reminder_list,
      platform_upload_record_log_reminder_list,
      plan_mobilization_classification_reminder_list,
      plan_mobilization_execution_reminder_list,
      plan_mobilization_plan_reminder_list,
      plan_mobilization_program_reminder_list,
      braiding_category_reminder_list,
      braiding_category_plan_reminder_list,
    } = reminder_get_dto;

    const announcementReminderList = announcement_reminder_list.map(
      (item) => new AnnouncementReminder(item),
    );
    const businessManagementTestReminderList =
      business_management_test_reminder_list.map(
        (item) => new BusinessManagementReminder(item),
      );
    const regulationReminderList = regulation_reminder_list.map(
      (item) => new RegulationReminder(item),
    );
    const platformUploadRecordReminderList = platform_upload_record_reminder_list.map(
      (item) => new PlatformUploadRecordReminder(item),
    );
    const platformUploadRecordLogReminderList = platform_upload_record_log_reminder_list.map(
      (item) => new PlatformUploadRecordLogReminder(item),
    );

    const planMobilizationClassificationReminderList = plan_mobilization_classification_reminder_list.map(
      (item) => new PlanMobilizationClassificationReminder(item),
    );

    const planMobilizationExecutionReminderList = plan_mobilization_execution_reminder_list.map(
      (item) => new PlanMobilizationExecutionReminder(item),
    );

    const planMobilizationPlanReminderList = plan_mobilization_plan_reminder_list.map(
      (item) => new PlanMobilizationPlanReminder(item),
    );

    const planMobilizationProgramReminderList = plan_mobilization_program_reminder_list.map(
      (item) => new PlanMobilizationProgramReminder(item),
    );

    const braidingCategoryReminderList = braiding_category_reminder_list.map(
      (item) => new BraidingCategoryReminder(item),
    );

    const braidingCategoryPlanReminderList = braiding_category_plan_reminder_list.map(
      (item) => new BraidingCategoryPlanReminder(item),
    );

    this.data = [
      ...announcementReminderList,
      ...businessManagementTestReminderList,
      ...regulationReminderList,
      ...platformUploadRecordReminderList,
      ...platformUploadRecordLogReminderList,
      ...planMobilizationClassificationReminderList,
      ...planMobilizationExecutionReminderList,
      ...planMobilizationPlanReminderList,
      ...planMobilizationProgramReminderList,
      ...braidingCategoryReminderList,
      ...braidingCategoryPlanReminderList,
    ].sort((a, b) => b.createdAt.getTime() - a.createdAt.getTime());
  }
}

export default ReminderResponse;
