import DateHelper from '../../helper/DateHelper';
import UserAccountAppliedStatusType from '../../constants/UserAccountAppliedStatusType';
import UserStateType from '../../constants/UserStateType';
import permissionGroup from '../../config/accessControl/permissionGroup';
import { dateObjectToDateString } from '../../parsers/dateParser';

class SysUserAccountResponse {
  constructor({
    id,
    name,
    account,
    agencyType,
    businessNeeds,
    businessPhone,
    businessPlan,
    cellphone,
    email,
    isPlansponsor,
    jobPosition,
    lineId,
    pid,
    remark,
    pamacc,
    ztacc,
    splacc,
    toacc,
    roleMainId,
    roleMain,
    state,
    userAccountAppliedStatus,
    telephoneExtension,
    appliedIpAddress,
    mobilizationPlanId,
    createdAt,

    firstlevelAgencyId,
    firstlevelAgency,
    secondaryAgencyId,
    secondaryAgency,
    department,
    maintainManufacturer,
    levelId,
    levelName,
    militaryagencyId,
    militaryagencyName,
    secondlevelMilitaryagency,

    cityId,
    city,
    firstlevelUnitId,
    firstlevelUnit,
    unitName,

    mobilizationType,
    braidingCategories,

    sysUserAccountAppliedAttachments,

    reasonOfFailure,
  }) {
    const userAccountAppliedStatusItem = UserAccountAppliedStatusType.find(
      (item) => item.value === userAccountAppliedStatus,
    );
    const stateItem = UserStateType.find((item) => item.value === state);

    this.id = id;
    this.name = name;
    this.account = account;
    this.agencyType = agencyType;
    this.businessNeeds = businessNeeds;
    this.businessPhone = businessPhone;
    this.businessPlan = businessPlan;
    this.cellphone = cellphone;
    this.email = email;
    this.isPlansponsor = isPlansponsor;
    this.jobPosition = jobPosition;
    this.lineId = lineId;
    this.pid = pid;
    this.remark = remark;
    this.pamacc = pamacc;
    this.ztacc = ztacc;
    this.splacc = splacc;
    this.toacc = toacc;
    this.roleMain = roleMain;
    this.roleMainId = roleMainId;
    this.state = state;
    this.userAccountAppliedStatus = userAccountAppliedStatus;
    this.telephoneExtension = telephoneExtension;
    this.appliedIpAddress = appliedIpAddress;
    if (mobilizationPlanId === null) {
      this.mobilizationPlanId = '';
    } else {
      this.mobilizationPlanId = mobilizationPlanId;
    }
    this.createdAt = DateHelper.momentDate(createdAt);
    this.levelId = levelId;
    this.levelName = levelName;
    this.militaryagencyId = militaryagencyId;
    this.militaryagencyName = militaryagencyName;
    this.secondlevelMilitaryagency = secondlevelMilitaryagency;

    this.firstlevelAgencyId = firstlevelAgencyId;
    this.firstlevelAgency =
      firstlevelAgency === null ? '' : firstlevelAgency.shortName;
    this.secondaryAgencyId = secondaryAgencyId;
    this.secondaryAgency =
      secondaryAgency === null ? '' : secondaryAgency.shortName;
    this.department = department === null ? '' : department;
    this.maintainManufacturer = maintainManufacturer;

    this.cityId = cityId;
    this.city = city === null ? '' : city.cityName;
    this.cityAreaCode = city === null ? '' : city.areaCode;
    this.firstlevelUnitId = firstlevelUnitId;
    this.firstlevelUnit =
      firstlevelUnit === null ? '' : firstlevelUnit.fullName;
    this.unitName = unitName === null ? '' : unitName;

    this.sysUserAccountAppliedAttachments =
      sysUserAccountAppliedAttachments === null
        ? []
        : sysUserAccountAppliedAttachments;

    this.reasonOfFailure = reasonOfFailure;

    this.rolePermissionGroups =
      this.roleMain === null ? [] : this.roleMain.ownedPermissionGroups;
    this.rolePermissionGroupIdList = this.rolePermissionGroups.map(
      (item) => item.permissionGroupCode,
    );
    this.rolePermissionIdList = permissionGroup.getUserPermissionList(
      this.rolePermissionGroupIdList,
    );

    if (agencyType === '1') {
      this.workPlace = `${this.firstlevelAgency}${this.secondaryAgency}`;
      this.fullWorkPlace = `${this.workPlace}${this.department}`;
    } else if (agencyType === '2') {
      this.workPlace = `${this.city}${this.firstlevelUnit}`;
      this.fullWorkPlace = `${this.workPlace}${this.unitName}`;
    } else if (agencyType === '3') {
      this.workPlace = `${this.maintainManufacturer}`;
      this.fullWorkPlace = `${this.maintainManufacturer}`;
    } else if (agencyType === '4') {
      this.workPlace = `${this.militaryagencyName}`;
      if (this.secondlevelMilitaryagency == null) {
        this.fullWorkPlace = `${this.workPlace}`;
      } else {
        this.fullWorkPlace = `${this.workPlace}${this.secondlevelMilitaryagency}`;
      }
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

    this.mobilizationType = mobilizationType;

    this.braidingCategoryList = braidingCategories;
    this.braidingCategoryIdList = this.braidingCategoryList.map(
      (item) => item.id,
    );
    this.braidingCategoryNameList = this.braidingCategoryList.map(
      (item) => item.fullName,
    );
    this.braidingCategoryCodeList = this.braidingCategoryList.map((item) =>
      Number(item.code),
    );
    this.mobilizationClassificationIdList = this.braidingCategoryList.map(
      (item) => item.mobilizationClassificationId,
    );
    this.mobilizationPlanIdList = Array.isArray(this.braidingCategoryList)
      ? this.braidingCategoryList.map(
          (item) => item?.mobilizationClassification?.mobilizationPlanId ?? '',
        )
      : [];

    if (businessPlan === '3') {
      this.mobilizationClassificationId =
        this.mobilizationClassificationIdList.length > 0
          ? this.mobilizationClassificationIdList[0]
          : '';
    }
  }
}

export default SysUserAccountResponse;
