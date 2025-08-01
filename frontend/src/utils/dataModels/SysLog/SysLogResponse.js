import DateHelper from '../../helper/DateHelper';
import SysLogType from '../../constants/SysLogType';
import SysLogStatusType from '../../constants/SysLogStatusType';

class SysLogResponse {
  constructor({
    id,
    type,
    state,
    description,
    assoiciatedUserAccountId,
    assoiciatedUserAccount,
    loggedAt,
    ip,
  }) {
    const typeItem = SysLogType.find((item) => item.value === type);
    const stateItem = SysLogStatusType.find((item) => item.value === state);

    this.id = id;
    this.type = type;
    this.state = state;
    this.description = description;
    this.assoiciatedUserAccountId = assoiciatedUserAccountId;
    this.assoiciatedUserAccount =
      assoiciatedUserAccount === null ? '' : assoiciatedUserAccount.account;
    this.unitName = '';
    this.loggedAt = DateHelper.momentDate(loggedAt);
    this.ip = ip;

    this.typeString = typeItem === undefined ? '' : typeItem.text;
    this.stateString = stateItem === undefined ? '' : stateItem.text;

    this.loggedAtString = DateHelper.momentDateString(loggedAt, 'YYYY/MM/DD HH:mm:ss');

    if (assoiciatedUserAccount !== null) {
      const { firstlevelAgency, secondaryAgency, firstlevelUnit } =
        assoiciatedUserAccount;

      const firstlevelAgencyName =
        firstlevelAgency === null ? '' : firstlevelAgency.shortName;
      const secondaryAgencyName =
        secondaryAgency === null ? '' : secondaryAgency.shortName;
      const firstlevelUnitName =
        firstlevelUnit === null ? '' : firstlevelUnit.fullName;

      this.unitName = `${firstlevelAgencyName}${secondaryAgencyName}${firstlevelUnitName}`;
    }
  }
}

export default SysLogResponse;
