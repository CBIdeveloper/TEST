import DateHelper from '../../helper/DateHelper';
import { dateObjectToDateTimeString } from '../../parsers/dateParser';
import genderParser from '../../parsers/genderParser';

class HrWatertransportmanResponse {
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
    lic,
    unit,
    shipOrgan,
    organTitle,
    manualno,
    manualDeadline,
    shipno,
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
    this.lic = lic;
    this.unit = unit;
    this.shipOrgan = shipOrgan;
    this.organTitle = organTitle;
    this.manualno = manualno;
    this.manualDeadline = manualDeadline;
    this.shipno = shipno;

    this.creDateString = dateObjectToDateTimeString(this.creDate);
  }
}

export default HrWatertransportmanResponse;
