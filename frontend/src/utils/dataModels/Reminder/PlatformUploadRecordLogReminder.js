import DateHelper from '../../helper/DateHelper';

class PlatformUploadRecordLogReminder {
  constructor({
    city_name,
    full_name,
    check_count,
    created_at,
  }) {
    this.type = 'platformuploadrecordlog';
    this.moduleString = '雲端資料傳輸';
    this.typeString = '通知';

    this.city_name = city_name;
    this.full_name = full_name;
    this.check_count = check_count;
    this.createdAt = DateHelper.momentDate(created_at);
    //【city】【編管類別】已於【傳輸時間】完成資料傳輸，傳輸筆數為【筆數】筆，中央主管機關可於【傳輸系統】接收資料
    this.title = `【${this.city_name}】【${this.full_name}】已於【${DateHelper.momentDateString(created_at, 'YYYY/MM/DD HH:mm')}】完成資料傳輸，傳輸筆數為【${this.check_count}】筆，中央主管機關可於【傳輸系統】接收資料`;
  }
}
export default PlatformUploadRecordLogReminder;
