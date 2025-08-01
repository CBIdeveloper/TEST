import DateHelper from '../../helper/DateHelper';

class PlanMobilizationProgramReminder {
  constructor({
    id,
    plan_mobilization_program_reminder_type,
    referencing_plan_mobilization_program_id,
    created_at,
    referencing_plan_mobilization_program,
  }) {
    const { mobilization_program_subject } = referencing_plan_mobilization_program;

    this.type = 'plan_mobilization_program';
    this.moduleString = '計畫下載';
    this.typeString = '通知';

    this.id = id;
    this.title = `已發布【動員綱領】${mobilization_program_subject}`;
    this.reminderType = plan_mobilization_program_reminder_type;
    this.referencingId = referencing_plan_mobilization_program_id;
    this.createdAt = DateHelper.momentDate(created_at);
  }
}

export default PlanMobilizationProgramReminder;
