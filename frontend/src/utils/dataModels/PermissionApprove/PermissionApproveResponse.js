import {
  dateObjectToDateString,
  dateObjectToDateTimeMinuteString,
} from '../../parsers/dateParser';
import DateHelper from '../../helper/DateHelper';
import { PermissionApproveStatusType } from '../../constants/PermissionApplicationStatusType';

class PermissionApproveResponse {
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
    firstlevelAgency,
    secondaryAgency,
    maintainManufacturer,
    militaryagencyId,
  }) {
    this.id = id;
    this.name = name;
    this.unitName = unitName;
    this.createdAt = DateHelper.momentDateString(createdAt, 'YYYY-MM-DD');
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
    this.status = status;
    this.statusString = PermissionApproveStatusType.find(
      (x) => x.value === status,
    )?.text;
    this.braidingCategory = braidingCategory;
    this.auditOpinion = auditOpinion;
    this.firstlevelAgency = firstlevelAgency;
    this.secondaryAgency = secondaryAgency;
    this.maintainManufacturer = maintainManufacturer;
    this.militaryagencyId = militaryagencyId;
  }
}

export default PermissionApproveResponse;
