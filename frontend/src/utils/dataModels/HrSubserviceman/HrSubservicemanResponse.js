import DateHelper from '../../helper/DateHelper';
import { dateObjectToDateTimeString } from '../../parsers/dateParser';
import genderParser from '../../parsers/genderParser';

class HrSubservicemanResponse {
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
    requireunit,
    requnitPlace,
    requnitCity,
    requnitTown,
    requnitVillage,

    creDate,
    skill,
    enterdate,
    retiredate,
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
    this.requireunit = requireunit;
    this.requnitPlace = requnitPlace;
    this.requnitCity = requnitCity;
    this.requnitTown = requnitTown;
    this.requnitVillage = requnitVillage;

    this.creDate = DateHelper.momentDate(creDate);
    this.skill = skill;
    this.enterDate = enterdate;
    this.retireDate = retiredate;

    this.creDateString = dateObjectToDateTimeString(this.creDate);
  }
}

export default HrSubservicemanResponse;
