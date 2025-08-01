import DateHelper from '../../helper/DateHelper';
import { dateObjectToDateTimeString } from '../../parsers/dateParser';
import genderParser from '../../parsers/genderParser';

class FrVehicletransportResponse {
  constructor({
    id,
    name,
    birthdate,
    pid,
    gender,
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
    companytel,
    manageUnit,

    cartype,
    carmodel,
    carweight,
    makedate,
    checkdate,
    yearlycheckstatus,

    deputyname,
    deputyid,
    levyType,
    levyUnit,
    levyPlace,
    levyCity,
    levyTown,
    levyVillage,
    levyTime,
    levyModel,
    visaquantity,
    creDate,
  }) {
    this.id = id;
    this.name = name;
    this.birthdate = birthdate;
    this.pid = pid;
    this.gender = genderParser(gender);
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
    this.companytel = companytel;
    this.manageUnit = manageUnit;

    this.cartype = cartype;
    this.carmodel = carmodel;
    this.carweight = carweight;
    this.makedate = makedate;
    this.checkdate = checkdate;
    this.yearlycheckstatus = yearlycheckstatus;

    this.deputyname = deputyname;
    this.deputyid = deputyid;
    this.levyType = levyType;
    this.levyUnit = levyUnit;
    this.levyPlace = levyPlace;
    this.levyCity = levyCity;
    this.levyTown = levyTown;
    this.levyVillage = levyVillage;
    this.levyTime = levyTime;
    this.levyModel = levyModel;
    this.visaquantity = visaquantity;

    this.creDate = DateHelper.momentDate(creDate);
    this.creDateString = dateObjectToDateTimeString(this.creDate);
  }
}

export default FrVehicletransportResponse;
