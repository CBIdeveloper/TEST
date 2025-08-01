import DateHelper from '../../helper/DateHelper';

class AnnouncementReminder {
  constructor({
    id,
    announcement_reminder_type,
    referencing_announcement_id,
    created_at,
    referencing_announcement,
  }) {
    const { title } = referencing_announcement;

    this.type = 'announcement';
    this.moduleString = '系統公告維護';
    this.typeString = '通知';

    this.id = id;
    this.title = title;
    this.reminderType = announcement_reminder_type;
    this.referencingId = referencing_announcement_id;
    this.createdAt = DateHelper.momentDate(created_at);
  }
}

export default AnnouncementReminder;
