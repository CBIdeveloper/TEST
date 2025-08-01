import DateHelper from '../../helper/DateHelper';

class PlanMobilizationClassificationReminder {
  constructor({
    id,
    plan_mobilization_classification_reminder_type,
    created_at,
    referencing_plan_mobilization_classification,
  }) {
    const { mobilization_classification_subject, mobilization_classification_id, mobilization_classification } = referencing_plan_mobilization_classification;

    this.type = 'plan_mobilization_classification';
    this.moduleString = '計畫下載';
    this.typeString = '通知';

    this.id = id;
    this.title = `已發布【動員分類】${mobilization_classification_subject}`;
    this.reminderType = plan_mobilization_classification_reminder_type;
    this.referencingId = mobilization_classification_id;
    this.createdAt = DateHelper.momentDate(created_at);
    this.classification_name = mobilization_classification.classification_name
  }
}

export default PlanMobilizationClassificationReminder;
