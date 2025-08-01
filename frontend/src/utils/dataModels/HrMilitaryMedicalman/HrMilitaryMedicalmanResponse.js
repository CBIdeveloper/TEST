import DateHelper from '../../helper/DateHelper';
import { dateObjectToDateTimeString } from '../../parsers/dateParser';

class HrMilitaryMedicalmanResponse {
  constructor({ id, name, pid, militaryType, militaryClass, creDate }) {
    this.id = id;
    this.name = name;
    this.pid = pid;
    this.militaryType = militaryType;
    this.militaryClass = militaryClass;

    this.creDate = DateHelper.momentDate(creDate);
    this.creDateString = dateObjectToDateTimeString(this.creDate);
  }
}

export default HrMilitaryMedicalmanResponse;
