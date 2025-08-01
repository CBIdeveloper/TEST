import DateHelper from '../../helper/DateHelper';
import { dateObjectToDateTimeString } from '../../parsers/dateParser';
import genderParser from '../../parsers/genderParser';

class FrMajormaterialResponse {
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

    factoryName,
    factoryAddress,
    factoryCity,
    factoryTown,
    factoryVillage,
    factoryTel,

    suppliesType,
    suppliesName,
    supplyQuantity,
    supplyUnit,

    deputyname,
    deputyid,
    levyApprovalno,
    levyType,
    levyUnit,
    levyPlace,
    levyCity,
    levyTown,
    levyVillage,
    levyDate,
    levySuppliestype,
    levySuppliesname,
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

    this.factoryName = factoryName;
    this.factoryAddress = factoryAddress;
    this.factoryCity = factoryCity;
    this.factoryTown = factoryTown;
    this.factoryVillage = factoryVillage;
    this.factoryTel = factoryTel;

    this.suppliesType = suppliesType;
    this.suppliesName = suppliesName;
    this.supplyQuantity = supplyQuantity;
    this.supplyUnit = supplyUnit;

    this.deputyname = deputyname;
    this.deputyid = deputyid;
    this.levyApprovalno = levyApprovalno;
    this.levyType = levyType;
    this.levyUnit = levyUnit;
    this.levyPlace = levyPlace;
    this.levyCity = levyCity;
    this.levyTown = levyTown;
    this.levyVillage = levyVillage;
    this.levyDate = levyDate;
    this.levySuppliestype = levySuppliestype;
    this.levySuppliesname = levySuppliesname;
    this.visaquantity = visaquantity;

    this.creDate = DateHelper.momentDate(creDate);
    this.creDateString = dateObjectToDateTimeString(this.creDate);
  }
}

export default FrMajormaterialResponse;
