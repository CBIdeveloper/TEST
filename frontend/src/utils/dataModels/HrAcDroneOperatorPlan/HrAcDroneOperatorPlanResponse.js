import DateHelper from '../../helper/DateHelper';
import { dateObjectToDateTimeString } from '../../parsers/dateParser';

class HrAcDroneOperatorPlanResponse {
  constructor({
    id,
    name,
    pid,

    planType,
    planStart,
    planEnd,
    planPlace,
    planCity,
    planTown,
    planVillage,

    levyUnit,
    levyType,

    creDate,
  }) {
    this.id = id;
    this.name = name;
    this.pid = pid;

    this.planType = planType;
    this.planStart = planStart;
    this.planEnd = planEnd;
    this.planPlace = planPlace;
    this.planCity = planCity;
    this.planTown = planTown;
    this.planVillage = planVillage;

    this.levyUnit = levyUnit;
    this.levyType = levyType;

    this.creDate = DateHelper.momentDate(creDate);
    this.creDateString = dateObjectToDateTimeString(this.creDate);
  }
}

export default HrAcDroneOperatorPlanResponse;
