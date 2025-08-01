import DateHelper from '../../helper/DateHelper';

class PlanMobilizationPlanReminder {
  constructor({
    id,
    plan_mobilization_plan_reminder_type,
    created_at,
    referencing_plan_mobilization_plan,
  }) {
    const { mobilization_plan_subject, mobilization_plan_id, mobilization_plan } = referencing_plan_mobilization_plan;

    this.type = 'plan_mobilization_plan';
    this.moduleString = '計畫下載';
    this.typeString = '通知';

    this.id = id;
    this.title = `已發布【動員方案】${mobilization_plan_subject}`;
    this.reminderType = plan_mobilization_plan_reminder_type;
    this.referencingId = mobilization_plan_id;
    this.createdAt = DateHelper.momentDate(created_at);
    this.plan_name = mobilization_plan.plan_name;
  }
}

export default PlanMobilizationPlanReminder;
