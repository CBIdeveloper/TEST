import BusinessManagementType from '../../constants/BusinessManagementType';
import DateHelper from '../../helper/DateHelper';

class BusinessManagementReminder {
  constructor({
    id,
    business_management_test_reminder_type,
    referencing_business_management_test_id,
    created_at,
    referencing_business_management_test,
  }) {
    const { title, business_management_test_type } =
      referencing_business_management_test;

    const businessManagementItem = BusinessManagementType.find(
      (item) => item.value === business_management_test_type,
    );

    if (businessManagementItem !== undefined) {
      this.businessManagementTypeString = businessManagementItem.text;
    }

    this.type = 'business';
    this.moduleString = '業務管考';

    this.id = id;
    this.reminderType = business_management_test_reminder_type;
    this.referencingId = referencing_business_management_test_id;
    this.createdAt = DateHelper.momentDate(created_at);

    this.typeString = (this.reminderType === 1 || this.reminderType === 3) ? '通知' : '待辦';

    this.title = `[${this.businessManagementTypeString}]${(this.reminderType === 3 ? '[附件回傳通知]' : '')}${title}`;
  }
}

export default BusinessManagementReminder;
