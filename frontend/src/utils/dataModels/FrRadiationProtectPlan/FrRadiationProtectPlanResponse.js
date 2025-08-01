import DateHelper from '../../helper/DateHelper';
import { dateObjectToDateTimeString } from '../../parsers/dateParser';

class FrRadiationProtectPlanResponse {
  constructor({
    id,
    companyName,
    protectionName,
    quality,

    planType,
    planStart,
    planEnd,
    planPlace,
    planCity,
    planTown,
    planVillage,
    creDate,
  }) {
    this.id = id;
    this.companyName = companyName;
    this.protectionName = protectionName;
    this.quality = quality;

    this.planType = planType;
    this.planStart = planStart;
    this.planEnd = planEnd;
    this.planPlace = planPlace;
    this.planCity = planCity;
    this.planTown = planTown;
    this.planVillage = planVillage;

    this.creDate = DateHelper.momentDate(creDate);
    this.creDateString = dateObjectToDateTimeString(this.creDate);
  }
}

export default FrRadiationProtectPlanResponse;
