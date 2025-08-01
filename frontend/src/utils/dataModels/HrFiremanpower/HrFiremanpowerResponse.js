import DateHelper from '../../helper/DateHelper';
import { dateObjectToDateTimeString } from '../../parsers/dateParser';
import genderParser from '../../parsers/genderParser';

class HrFiremanpowerResponse {
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
    stationPlace,
    stationCity,
    stationTown,
    stationVillage,

    creDate,
    organDist1,
    organDist2,
    organDist3,
    organDist4,
    organTitle,
    lic,
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
    this.stationPlace = stationPlace;
    this.stationCity = stationCity;
    this.stationTown = stationTown;
    this.stationVillage = stationVillage;

    this.creDate = DateHelper.momentDate(creDate);
    this.organDist1 = organDist1;
    this.organDist2 = organDist2;
    this.organDist3 = organDist3;
    this.organDist4 = organDist4;
    this.organTitle = organTitle;
    this.lic = lic;

    this.creDateString = dateObjectToDateTimeString(this.creDate);
  }
}

export default HrFiremanpowerResponse;
