import DateHelper from '../../helper/DateHelper';
import { dateObjectToDateTimeString } from '../../parsers/dateParser';
import genderParser from '../../parsers/genderParser';

class FrHeavymachineryResponse {
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
    hmachineryCity,
    hmachineryTown,
    hmachineryVillage,

    hmachineryType,
    hmachineryModel,
    hmachineryAddress,

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
    this.hmachineryCity = hmachineryCity;
    this.hmachineryTown = hmachineryTown;
    this.hmachineryVillage = hmachineryVillage;

    this.hmachineryType = hmachineryType;
    this.hmachineryModel = hmachineryModel;
    this.hmachineryAddress = hmachineryAddress;

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

export default FrHeavymachineryResponse;
