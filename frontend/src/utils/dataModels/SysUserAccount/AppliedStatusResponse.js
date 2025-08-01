import DateHelper from '../../helper/DateHelper';

import UserAccountAppliedStatusType from '../../constants/UserAccountAppliedStatusType';
import { dateObjectToDateString } from '../../parsers/dateParser';

class AppliedStatusResponse {
  constructor(props) {
    const { executed } = props;

    this.executed = executed;

    if (executed) {
      const { get_dto } = props;
      const {
        account,
        name,
        created_at,
        user_account_applied_status,
        city,
        firstlevel_agency,
        firstlevel_unit,
        secondary_agency,
        reason_of_failure,
      } = get_dto;

      this.account = account;
      this.name = name;
      this.createdAt = DateHelper.momentDate(created_at);
      this.userAccountAppliedStatus = user_account_applied_status;
      this.reasonOfFailure = reason_of_failure;
      const userAccountAppliedStatusItem = UserAccountAppliedStatusType.find(
        (item) => item.value === this.userAccountAppliedStatus,
      );
      this.userAccountAppliedStatusString =
        userAccountAppliedStatusItem === undefined
          ? ''
          : userAccountAppliedStatusItem.text;

      this.createdAtString = dateObjectToDateString(this.createdAt);

      this.workPlace = '';

      if (firstlevel_agency !== null) {
        this.workPlace = `${this.workPlace}${firstlevel_agency.short_name}`;
      }
      if (secondary_agency !== null) {
        this.workPlace = `${this.workPlace}${secondary_agency.short_name}`;
      }
      if (city !== null) {
        this.workPlace = `${this.workPlace}${city.city_name}`;
      }
      if (firstlevel_unit !== null) {
        this.workPlace = `${this.workPlace}${firstlevel_unit.full_name}`;
      }
    }
  }
}

export default AppliedStatusResponse;
