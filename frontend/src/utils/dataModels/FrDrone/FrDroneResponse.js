import DateHelper from '../../helper/DateHelper';
import { dateObjectToDateTimeString } from '../../parsers/dateParser';
import genderParser from '../../parsers/genderParser';

class FrDroneResponse {
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
    abode,
    abodeCity,
    abodeTown,
    abodeVillage,
    tel,

    companyName,
    companyAddress,
    companyCity,
    companyTown,
    companyVillage,
    companyTel,

    registerno,
    structure,
    brand,
    model,
    maxtakeoffweight,
    size,
    wingstyle,
    powertype,
    takeoffmethod,
    remotemethod,
    navigation,
    maxspeed,

    deputyname,
    deputyid,
    levyType,
    levyUnit,
    levyPlace,
    levyCity,
    levyTown,
    levyVillage,
    levyTime,
    levyRegisterno,
    creDate,
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
    this.abode = abode;
    this.abodeCity = abodeCity;
    this.abodeTown = abodeTown;
    this.abodeVillage = abodeVillage;
    this.tel = tel;

    this.companyName = companyName;
    this.companyAddress = companyAddress;
    this.companyCity = companyCity;
    this.companyTown = companyTown;
    this.companyVillage = companyVillage;
    this.companyTel = companyTel;

    this.registerno = registerno;
    this.structure = structure;
    this.brand = brand;
    this.model = model;
    this.maxtakeoffweight = maxtakeoffweight;
    this.size = size;
    this.wingstyle = wingstyle;
    this.powertype = powertype;
    this.takeoffmethod = takeoffmethod;
    this.remotemethod = remotemethod;
    this.navigation = navigation;
    this.maxspeed = maxspeed;

    this.deputyname = deputyname;
    this.deputyid = deputyid;
    this.levyType = levyType;
    this.levyUnit = levyUnit;
    this.levyPlace = levyPlace;
    this.levyCity = levyCity;
    this.levyTown = levyTown;
    this.levyVillage = levyVillage;
    this.levyTime = levyTime;
    this.levyRegisterno = levyRegisterno;

    this.creDate = DateHelper.momentDate(creDate);
    this.creDateString = dateObjectToDateTimeString(this.creDate);
  }
}

export default FrDroneResponse;
