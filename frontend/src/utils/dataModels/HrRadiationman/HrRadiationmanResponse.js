import DateHelper from '../../helper/DateHelper';
import { dateObjectToDateTimeString } from '../../parsers/dateParser';
import genderParser from '../../parsers/genderParser';

class HrRadiationmanResponse {
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

    creDate,
    skill,
    licNumber,
    expiryDate,
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

    this.creDate = DateHelper.momentDate(creDate);
    this.skill = skill;
    this.licNumber = licNumber;
    this.expiryDate = expiryDate;

    this.creDateString = dateObjectToDateTimeString(this.creDate);
  }
}

export default HrRadiationmanResponse;
