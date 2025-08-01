import DateHelper from '../../helper/DateHelper';
import { dateObjectToDateTimeString } from '../../parsers/dateParser';
import genderParser from '../../parsers/genderParser';

class FrBusinessShipResponse {
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
    shipCenter,

    shipType,
    shipName,
    shipno,
    waterBusinessno,
    shipMaterial,
    totalweight,
    maxPassenger,
    maxWeight,
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
    levyShipno,
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
    this.shipCenter = shipCenter;

    this.shipType = shipType;
    this.shipName = shipName;
    this.shipno = shipno;
    this.waterBusinessno = waterBusinessno;
    this.shipMaterial = shipMaterial;
    this.totalweight = totalweight;
    this.maxPassenger = maxPassenger;
    this.maxWeight = maxWeight;
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
    this.levyShipno = levyShipno;

    this.creDate = DateHelper.momentDate(creDate);
    this.creDateString = dateObjectToDateTimeString(this.creDate);
  }
}

export default FrBusinessShipResponse;
