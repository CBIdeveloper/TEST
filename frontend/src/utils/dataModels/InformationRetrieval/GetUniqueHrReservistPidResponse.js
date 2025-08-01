import DateHelper from '../../helper/DateHelper';
import { dateObjectToDateTimeString } from '../../parsers/dateParser';

class GetUniqueHrReservistPidResponse {
  constructor({ get_dto_list }) {
    this.data = get_dto_list.map((item) => {
      const {
        id,
        name,
        pid,
        cre_date,
        manage_type,
        manage_unit,
        manage_place,
      } = item;
      const creDate = DateHelper.momentDate(cre_date);
      return {
        id,
        name,
        pid,
        manageType: manage_type,
        manageUnit: manage_unit,
        managePlace: manage_place,
        creDate,
        creDateString: dateObjectToDateTimeString(creDate),
      };
    });
  }
}

export default GetUniqueHrReservistPidResponse;
