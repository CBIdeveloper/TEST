import DateHelper from '../../helper/DateHelper';

class BraidingCategoryPlanReminder {
  constructor({
    id,
    braiding_category_plan_reminder_type,
    referencing_braiding_category_plan_id,
    created_at,
    referencing_braiding_category_plan,
  }) {
    const { full_name, system_num, transmission_date } = referencing_braiding_category_plan;

    this.type = 'braiding_category';
    this.moduleString = '編管類別異動';
    this.typeString = '通知';

    this.id = id;
    this.title = `【異動通知】【${full_name}】編管資料資料更新通知`;
    this.reminderType = braiding_category_plan_reminder_type;
    this.referencingId = referencing_braiding_category_plan_id;
    this.createdAt = DateHelper.momentDate(created_at);

    this.fullName = full_name;
    this.systemNum = system_num;
    this.transmissionDate = DateHelper.momentDateString(transmission_date);
  }
}

export default BraidingCategoryPlanReminder;
