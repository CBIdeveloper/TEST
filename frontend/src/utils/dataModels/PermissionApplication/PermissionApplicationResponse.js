import {
  dateObjectToDateString,
  dateObjectToDateTimeMinuteString,
} from '../../parsers/dateParser';
import DateHelper from '../../helper/DateHelper';
import PermissionApplicationStatusType from '../../constants/PermissionApplicationStatusType';

class PermissionApplicationResponse {
  constructor({
    id,
    name,
    unitName,
    createdAt,
    useStartDate,
    useEndDate,
    requirements,
    braidingCategory,
    status,
    auditOpinion,
    FirstlevelAgency,
    SecondaryAgency,
    MaintainManufacturer,
  }) {
    this.id = id;
    this.name = name;
    this.unitName = unitName;
    this.createdAt = DateHelper.momentDateString(createdAt);
    this.useStartDate = DateHelper.momentDateString(
      useStartDate,
      'YYYY-MM-DD HH:mm',
    );
    this.useEndDate = DateHelper.momentDateString(
      useEndDate,
      'YYYY-MM-DD HH:mm',
    );
    this.useDate = `${this.useStartDate} ~ ${this.useEndDate}`;
    this.requirements = requirements;
    this.braidingCategory = braidingCategory;
    this.status = status;
    this.statusString = PermissionApplicationStatusType.find(
      (x) => x.value === status,
    )?.text;
    this.auditOpinion = auditOpinion;
    this.FirstlevelAgency = FirstlevelAgency;
    this.SecondaryAgency = SecondaryAgency;
    this.MaintainManufacturer = MaintainManufacturer
  }
}

export default PermissionApplicationResponse;
