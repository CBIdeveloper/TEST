import DateHelper from '../../helper/DateHelper';

class BraidingCategoryReminder {
  constructor({
    id,
    braiding_category_reminder_type,
    referencing_braiding_category_id,
    created_at,
    referencing_braiding_category,
  }) {
    const { full_name, system_num, transmission_date } = referencing_braiding_category;

    this.type = 'braiding_category';
    this.moduleString = '編管類別異動';
    this.typeString = '通知';

    this.id = id;
    this.title = `【異動通知】【${full_name}】編管資料資料更新通知`;
    this.reminderType = braiding_category_reminder_type;
    this.referencingId = referencing_braiding_category_id;
    this.createdAt = DateHelper.momentDate(created_at);

    this.fullName = full_name;
    this.systemNum = system_num;
    this.transmissionDate = DateHelper.momentDateString(transmission_date);
  }
}

export default BraidingCategoryReminder;
