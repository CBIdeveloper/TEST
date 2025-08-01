import DateHelper from '../../helper/DateHelper';
import { dateObjectToDateTimeString } from '../../parsers/dateParser';
import genderParser from '../../parsers/genderParser';

class HrReservistResponse {
  constructor({
    id,
    name,
    birthdate,
    pid,
    gender,
    habitation,
    habitatCity,
    habitatTown,
    habitatVillage,

    manageAvailable,
    manageType,
    manageUnit,
    managePlace,
    manageCity,
    manageTown,
    manageVillage,

    planType,
    planUnit,
    planTime,
    planDay,
    planPlace,
    planCity,
    planTown,
    planVillage,

    creDate,
    mainCity,
    militaryType,
    militaryClass,
    serviceType,
    unavailableCondition,
    unavailableElement,
    callTimes,
    callDays,
    retireDate,
    skillMain,
    skill1,
    skill2,
    skill3,
    skillCivil,
  }) {
    this.id = id;
    this.name = name;
    this.birthdate = birthdate;
    this.pid = pid;
    this.gender = genderParser(gender);
    this.habitation = habitation;
    this.habitatCity = habitatCity;
    this.habitatTown = habitatTown;
    this.habitatVillage = habitatVillage;

    this.manageAvailable = manageAvailable;
    this.manageType = manageType;
    this.manageUnit = manageUnit;
    this.managePlace = managePlace;
    this.manageCity = manageCity;
    this.manageTown = manageTown;
    this.manageVillage = manageVillage;

    this.planType = planType;
    this.planUnit = planUnit;
    this.planTime = planTime;
    this.planDay = planDay;
    this.planPlace = planPlace;
    this.planCity = planCity;
    this.planTown = planTown;
    this.planVillage = planVillage;

    this.creDate = DateHelper.momentDate(creDate);
    this.mainCity = mainCity;
    this.militaryType = militaryType;
    this.militaryClass = militaryClass;
    this.serviceType = serviceType;
    this.unavailableCondition = unavailableCondition;
    this.unavailableElement = unavailableElement;
    this.callTimes = callTimes;
    this.callDays = callDays;
    this.retireDate = retireDate;
    this.skillMain = skillMain;
    this.skill1 = skill1;
    this.skill2 = skill2;
    this.skill3 = skill3;
    this.skillCivil = skillCivil;

    this.creDateString = dateObjectToDateTimeString(this.creDate);
  }
}

export default HrReservistResponse;
