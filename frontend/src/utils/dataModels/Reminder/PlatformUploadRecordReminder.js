import DateHelper from '../../helper/DateHelper';

class PlatformUploadRecordReminder {
  constructor({
    full_name,
    created_at,
  }) {
    this.type = 'platformuploadrecord';
    this.moduleString = '雲端資料編輯';
    this.typeString = '通知';

    this.full_name = full_name;
    this.createdAt = DateHelper.momentDate(created_at);
    //【編管類別】資料檔案已於【更新時間】上傳完成
    this.title = `【${this.full_name}】資料檔案已於【${DateHelper.momentDateString(created_at, 'YYYY/MM/DD HH:mm')}】上傳完成`;
  }
}
export default PlatformUploadRecordReminder;
