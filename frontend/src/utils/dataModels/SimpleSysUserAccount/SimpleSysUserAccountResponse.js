import UserAccountAppliedStatusType from '../../constants/UserAccountAppliedStatusType';
import UserStateType from '../../constants/UserStateType';
import DateHelper from '../../helper/DateHelper';
import { dateObjectToDateString } from '../../parsers/dateParser';

class SimpleSysUserAccountResponse {
  constructor({
    id,
    name,
    email,
    businessPhone,
    businessPlan,
    jobPosition,
    pid,
    state,
    userAccountAppliedStatus,
    telephoneExtension,
    agencyType,

    firstlevelAgencyId,
    firstlevelAgency,
    secondaryAgencyId,
    secondaryAgency,
    department,

    cityId,
    city,
    firstlevelUnitId,
    firstlevelUnit,
    unitName,
    mobilizationPlanId,
    maintainManufacturer,
    createdAt,
    levelId,
    levelName,
    militaryagencyId,
    militaryagencyName,
    secondlevelMilitaryagency,
    workPlace,
    isPlansponsor,
    braidingCategories,
    mobilizationPlanText,
  }) {
    const userAccountAppliedStatusItem = UserAccountAppliedStatusType.find(
      (item) => item.value === userAccountAppliedStatus,
    );
    const stateItem = UserStateType.find((item) => item.value === state);

    this.id = id;
    this.name = name;
    this.email = email;
    this.businessPhone = businessPhone;
    this.businessPlan = businessPlan;
    this.jobPosition = jobPosition;
    this.pid = pid;
    this.state = state;
    this.userAccountAppliedStatus = userAccountAppliedStatus;
    this.telephoneExtension = telephoneExtension;
    this.createdAt = DateHelper.momentDate(createdAt);
    if (telephoneExtension) {
      this.fullPhone = businessPhone + '-' + telephoneExtension;
    } else {
      this.fullPhone = businessPhone;
    }
    this.firstlevelAgencyId = firstlevelAgencyId;
    this.firstlevelAgency =
      firstlevelAgency === null ? '' : firstlevelAgency.shortName;
    this.secondaryAgencyId = secondaryAgencyId;
    this.secondaryAgency =
      secondaryAgency === null ? '' : secondaryAgency.shortName;
    this.department = department === null ? '' : department;
    this.cityId = cityId;
    this.city = city === null ? '' : city.cityName;
    this.cityAreaCode = city === null ? '' : city.areaCode;
    this.firstlevelUnitId = firstlevelUnitId;
    this.firstlevelUnit =
      firstlevelUnit === null ? '' : firstlevelUnit.fullName;
    this.unitName = unitName === null ? '' : unitName;
    this.mobilizationPlanId = mobilizationPlanId;
    this.maintainManufacturer = maintainManufacturer;
    this.levelId = levelId;
    this.levelName = levelName;
    this.militaryagencyId = militaryagencyId;
    this.militaryagencyName = militaryagencyName;
    this.secondlevelMilitaryagency = secondlevelMilitaryagency;
    if (agencyType === '1') {
      this.workPlace = workPlace;
      this.fullWorkPlace = `${this.workPlace}${this.department}`;
      this.agencyName = '中央機關';
    } else if (agencyType === '2') {
      this.workPlace = workPlace;
      this.fullWorkPlace = `${this.workPlace}${this.unitName}`;
      this.agencyName = '地方政府';
    } else if (agencyType === '3') {
      this.workPlace = workPlace;
      this.fullWorkPlace = `${this.maintainManufacturer}`;
      this.agencyName = '維護廠商';
    } else if (agencyType === '4') {
      this.workPlace = workPlace;
      if (this.secondlevelMilitaryagency == null) {
        this.fullWorkPlace = `${this.workPlace}`;
      } else {
        this.fullWorkPlace = `${this.workPlace}${this.secondlevelMilitaryagency}`;
      }
      this.agencyName = '國軍單位';
    }

    this.fullTelephone =
      this.telephoneExtension === null
        ? this.businessPhone
        : `${this.businessPhone} 分機${this.telephoneExtension}`;

    this.stateString = stateItem === undefined ? '' : stateItem.text;
    this.userAccountAppliedStatusString =
      userAccountAppliedStatusItem === undefined
        ? ''
        : userAccountAppliedStatusItem.text;
    this.createdAtString = dateObjectToDateString(this.createdAt);
    this.isPlansponsor = isPlansponsor;
    this.braidingCategories = braidingCategories;
    this.agencyType = agencyType;
    this.mobilizationPlanText = mobilizationPlanText;
  }
}

export default SimpleSysUserAccountResponse;
