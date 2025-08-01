import DateHelper from '../../helper/DateHelper';
import { dateObjectToDateTimeString } from '../../parsers/dateParser';
import genderParser from '../../parsers/genderParser';

class FrActivitycenterResponse {
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

    centerName,
    centerAddress,
    centerCity,
    centerTown,
    centerVillage,
    centerTel,

    hall,
    basement,
    grandstandseat,
    parking,
    space,
    entranceWidth,
    waterStorage,
    electromotor,
    extinguisher,

    deputyname,
    deputyid,
    activitycentreName,
    levyType,
    levyUnit,
    levyPlace,
    levyCity,
    levyTown,
    levyVillage,
    levyDate,
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

    this.centerName = centerName;
    this.centerAddress = centerAddress;
    this.centerCity = centerCity;
    this.centerTown = centerTown;
    this.centerVillage = centerVillage;
    this.centerTel = centerTel;

    this.hall = hall;
    this.basement = basement;
    this.grandstandseat = grandstandseat;
    this.parking = parking;
    this.space = space;
    this.entranceWidth = entranceWidth;
    this.waterStorage = waterStorage;
    this.electromotor = electromotor;
    this.extinguisher = extinguisher;

    this.deputyname = deputyname;
    this.deputyid = deputyid;
    this.activitycentreName = activitycentreName;
    this.levyType = levyType;
    this.levyUnit = levyUnit;
    this.levyPlace = levyPlace;
    this.levyCity = levyCity;
    this.levyTown = levyTown;
    this.levyVillage = levyVillage;
    this.levyDate = levyDate;
    this.visaquantity = visaquantity;

    this.creDate = DateHelper.momentDate(creDate);
    this.creDateString = dateObjectToDateTimeString(this.creDate);
  }
}

export default FrActivitycenterResponse;
