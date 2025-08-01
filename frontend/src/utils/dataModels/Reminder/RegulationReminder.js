import DateHelper from '../../helper/DateHelper';

class RegulationReminder {
  constructor({
    id,
    regulation_reminder_type,
    referencing_regulation_id,
    created_at,
    referencing_regulation,
  }) {
    const { regulation_name } = referencing_regulation;

    this.type = 'regulation';
    this.moduleString = '動員體系法規管理';
    this.typeString = '通知';

    this.id = id;
    this.reminderType = regulation_reminder_type;
    this.referencingId = referencing_regulation_id;
    this.createdAt = DateHelper.momentDate(created_at);
    this.url = referencing_regulation.regulation_url;

    this.titlePrefix = this.reminderType === 1 ? '法條新增' : '法條修改';

    this.title = `[${this.titlePrefix}]${regulation_name}`;
  }
}

export default RegulationReminder;
