import DateHelper from '../../helper/DateHelper';
import { dateObjectToDateTimeString } from '../../parsers/dateParser';
import genderParser from '../../parsers/genderParser';

class FrFishingShipResponse {
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
    companyTel,
    uniteno,

    shipType,
    shipName,
    shipMaterial,
    totalweight,
    totallength,
    shipLength,
    shipWidth,
    fullLoad,
    maxspeed,
    rate,

    deputyname,
    deputyid,
    levyType,
    levyUnit,
    levyPlace,
    levyCity,
    levyTown,
    levyVillage,
    levyTime,
    levyShiptype,
    levyUniteno,
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
    this.companyTel = companyTel;
    this.uniteno = uniteno;

    this.shipType = shipType;
    this.shipName = shipName;
    this.shipMaterial = shipMaterial;
    this.totalweight = totalweight;
    this.totallength = totallength;
    this.shipLength = shipLength;
    this.shipWidth = shipWidth;
    this.fullLoad = fullLoad;
    this.maxspeed = maxspeed;
    this.rate = rate;

    this.deputyname = deputyname;
    this.deputyid = deputyid;
    this.levyType = levyType;
    this.levyUnit = levyUnit;
    this.levyPlace = levyPlace;
    this.levyCity = levyCity;
    this.levyTown = levyTown;
    this.levyVillage = levyVillage;
    this.levyTime = levyTime;
    this.levyShiptype = levyShiptype;
    this.levyUniteno = levyUniteno;

    this.creDate = DateHelper.momentDate(creDate);
    this.creDateString = dateObjectToDateTimeString(this.creDate);
  }
}

export default FrFishingShipResponse;
