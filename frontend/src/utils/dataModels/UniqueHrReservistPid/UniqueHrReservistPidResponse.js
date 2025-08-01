import DateHelper from '../../helper/DateHelper';
import { dateObjectToDateTimeString } from '../../parsers/dateParser';

class UniqueHrReservistPidResponse {
  constructor({ pid, creDate, name }) {
    this.pid = pid;
    this.name = name;
    this.creDate = DateHelper.momentDate(creDate);
    this.creDateString = dateObjectToDateTimeString(this.creDate);
  }
}

export default UniqueHrReservistPidResponse;
