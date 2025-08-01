import DateHelper from '../../helper/DateHelper';
import { dateObjectToDateTimeString } from '../../parsers/dateParser';
import genderParser from '../../parsers/genderParser';

class HrFishermanResponse {
  constructor({
    id,
    name,
    birthdate,
    age,
    pid,
    gender,
    habitation,
    habitatCity,
    habitatTown,
    habitatVillage,
    abode,
    abodeCity,
    abodeTown,
    abodeVillage,
    tel,

    manageType,
    manageUnit,
    managePlace,
    manageCity,
    manageTown,
    manageVillage,

    planType,
    planTime,
    planPlace,
    planCity,
    planTown,
    planVillage,
    levyUnit,

    creDate,
    skill,
    uniteno,
    shipname,
  }) {
    this.id = id;
    this.name = name;
    this.birthdate = birthdate;
    this.age = age;
    this.pid = pid;
    this.gender = genderParser(gender);
    this.habitation = habitation;
    this.habitatCity = habitatCity;
    this.habitatTown = habitatTown;
    this.habitatVillage = habitatVillage;
    this.abode = abode;
    this.abodeCity = abodeCity;
    this.abodeTown = abodeTown;
    this.abodeVillage = abodeVillage;
    this.tel = tel;

    this.manageType = manageType;
    this.manageUnit = manageUnit;
    this.managePlace = managePlace;
    this.manageCity = manageCity;
    this.manageTown = manageTown;
    this.manageVillage = manageVillage;

    this.planType = planType;
    this.planTime = planTime;
    this.planPlace = planPlace;
    this.planCity = planCity;
    this.planTown = planTown;
    this.planVillage = planVillage;
    this.levyUnit = levyUnit;

    this.creDate = DateHelper.momentDate(creDate);
    this.skill = skill;
    this.uniteno = uniteno;
    this.shipname = shipname;

    this.creDateString = dateObjectToDateTimeString(this.creDate);
  }
}

export default HrFishermanResponse;
