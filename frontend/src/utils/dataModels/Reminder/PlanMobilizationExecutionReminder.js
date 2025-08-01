import DateHelper from '../../helper/DateHelper';

class PlanMobilizationExecutionReminder {
  constructor({
    id,
    plan_mobilization_execution_reminder_type,
    created_at,
    referencing_plan_mobilization_execution,
  }) {
    const { mobilization_execution_subject, city_id, city } = referencing_plan_mobilization_execution;

    this.type = 'plan_mobilization_execution';
    this.moduleString = '計畫下載';
    this.typeString = '通知';

    this.id = id;
    this.title = `已發布【動員執行】${mobilization_execution_subject}`;
    this.reminderType = plan_mobilization_execution_reminder_type;
    this.referencingId = city_id;
    this.createdAt = DateHelper.momentDate(created_at);
    this.city_name = city.city_name;
  }
}

export default PlanMobilizationExecutionReminder;
